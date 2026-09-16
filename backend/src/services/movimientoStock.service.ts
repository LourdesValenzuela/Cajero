import { prisma } from "../lib/prisma";
import { TipoMovimiento } from "../generated/prisma/enums";

interface EntradaStockData {
  productoId: string;
  usuarioId: string;
  cantidad: number;
  motivo?: string;
}

export const listarMovimientos = async () => {
  return prisma.movimientoStock.findMany({
    include: {
      producto: {
        select: {
          id: true,
          nombre: true,
          codigoBarras: true,
        },
      },
      usuario: {
        select: {
          id: true,
          nombre: true,
          apellido: true,
        },
      },
    },
    orderBy: {
      creadoEn: "desc",
    },
  });
};

export const registrarEntradaStock = async (
  data: EntradaStockData
) => {
  if (!Number.isInteger(data.cantidad) || data.cantidad <= 0) {
    throw new Error("CANTIDAD_INVALIDA");
  }

  return prisma.$transaction(
    async (tx) => {
      const producto = await tx.producto.findUnique({
        where: {
          id: data.productoId,
        },
      });

      if (!producto || !producto.activo) {
        throw new Error("PRODUCTO_INVALIDO");
      }

      const usuario = await tx.usuario.findUnique({
        where: {
          id: data.usuarioId,
        },
      });

      if (!usuario || !usuario.activo) {
        throw new Error("USUARIO_INVALIDO");
      }

      const productoActualizado = await tx.producto.update({
        where: {
          id: data.productoId,
        },
        data: {
          stock: {
            increment: data.cantidad,
          },
        },
      });

      const movimiento = await tx.movimientoStock.create({
        data: {
          productoId: data.productoId,
          usuarioId: data.usuarioId,
          tipo: TipoMovimiento.ENTRADA,
          cantidad: data.cantidad,
          motivo: data.motivo ?? "Entrada de mercadería",
        },
      });

      return {
        movimiento,
        stockActual: productoActualizado.stock,
      };
    },
    {
      maxWait: 10000,
      timeout: 20000,
    }
  );
};

interface AjustarStockData {
  productoId: string;
  usuarioId: string;
  nuevoStock: number;
  motivo: string;
}

export const ajustarStock = async (data: AjustarStockData) => {
  if (!Number.isInteger(data.nuevoStock) || data.nuevoStock < 0) {
    throw new Error("STOCK_INVALIDO");
  }

  if (!data.motivo?.trim()) {
    throw new Error("MOTIVO_OBLIGATORIO");
  }

  return prisma.$transaction(
    async (tx) => {
      const producto = await tx.producto.findUnique({
        where: {
          id: data.productoId,
        },
      });

      if (!producto || !producto.activo) {
        throw new Error("PRODUCTO_INVALIDO");
      }

      const usuario = await tx.usuario.findUnique({
        where: {
          id: data.usuarioId,
        },
      });

      if (!usuario || !usuario.activo) {
        throw new Error("USUARIO_INVALIDO");
      }

      const diferencia = data.nuevoStock - producto.stock;

      const productoActualizado = await tx.producto.update({
        where: {
          id: data.productoId,
        },
        data: {
          stock: data.nuevoStock,
        },
      });

      const movimiento = await tx.movimientoStock.create({
        data: {
          productoId: data.productoId,
          usuarioId: data.usuarioId,
          tipo: TipoMovimiento.AJUSTE,
          cantidad: diferencia,
          motivo: data.motivo,
        },
      });

      return {
        stockAnterior: producto.stock,
        stockActual: productoActualizado.stock,
        diferencia,
        movimiento,
      };
    },
    {
      maxWait: 10000,
      timeout: 20000,
    }
  );
};