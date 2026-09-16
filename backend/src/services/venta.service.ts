import { prisma } from "../lib/prisma";
import { TipoMovimiento } from "../generated/prisma/enums";

interface ItemVenta {
  productoId: string;
  cantidad: number;
}

interface CrearVentaData {
  usuarioId: string;
  montoRecibido: number;
  items: ItemVenta[];
}

export const crearVenta = async (data: CrearVentaData) => {
  return prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.findUnique({
      where: {
        id: data.usuarioId,
      },
    });

    if (!usuario || !usuario.activo) {
      throw new Error("USUARIO_INVALIDO");
    }

    if (data.items.length === 0) {
      throw new Error("VENTA_SIN_PRODUCTOS");
    }

    let total = 0;

    const productosVenta: {
      productoId: string;
      cantidad: number;
      precioUnitario: number;
      subtotal: number;
    }[] = [];

    for (const item of data.items) {
      if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        throw new Error("CANTIDAD_INVALIDA");
      }

      const producto = await tx.producto.findUnique({
        where: {
          id: item.productoId,
        },
      });

      if (!producto || !producto.activo) {
        throw new Error("PRODUCTO_INVALIDO");
      }

      if (producto.stock < item.cantidad) {
        throw new Error(`STOCK_INSUFICIENTE:${producto.nombre}`);
      }

      const precioUnitario = Number(producto.precio);
      const subtotal = precioUnitario * item.cantidad;

      total += subtotal;

      productosVenta.push({
        productoId: producto.id,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal,
      });
    }

    if (data.montoRecibido < total) {
      throw new Error("MONTO_INSUFICIENTE");
    }

    const vuelto = data.montoRecibido - total;

    const venta = await tx.venta.create({
      data: {
        usuarioId: data.usuarioId,
        total,
        montoRecibido: data.montoRecibido,
        vuelto,
      },
    });

    for (const item of productosVenta) {
      await tx.detalleVenta.create({
        data: {
          ventaId: venta.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          subtotal: item.subtotal,
        },
      });

      await tx.producto.update({
        where: {
          id: item.productoId,
        },
        data: {
          stock: {
            decrement: item.cantidad,
          },
        },
      });

      await tx.movimientoStock.create({
        data: {
          productoId: item.productoId,
          usuarioId: data.usuarioId,
          tipo: TipoMovimiento.VENTA,
          cantidad: item.cantidad,
          motivo: `Venta ${venta.id}`,
        },
      });
    }

    return tx.venta.findUnique({
      where: {
        id: venta.id,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
    }, {
    maxWait: 10000,
    timeout: 20000,
  });
};

export const listarVentas = async () => {
  return prisma.venta.findMany({
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true,
          apellido: true,
        },
      },
      detalles: {
        include: {
          producto: {
            select: {
              id: true,
              codigoBarras: true,
              nombre: true,
            },
          },
        },
      },
    },
    orderBy: {
      fecha: "desc",
    },
  });
};

export const buscarVentaPorId = async (id: string) => {
  return prisma.venta.findUnique({
    where: {
      id,
    },
    include: {
      usuario: {
        select: {
          id: true,
          nombre: true,
          apellido: true,
        },
      },
      detalles: {
        include: {
          producto: {
            select: {
              id: true,
              codigoBarras: true,
              nombre: true,
            },
          },
        },
      },
    },
  });
};