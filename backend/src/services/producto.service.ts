import { prisma } from "../lib/prisma";

interface CrearProductoData {
  codigoBarras: string;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  categoriaId: string;
}

export const listarProductos = async () => {
  return prisma.producto.findMany({
    include: {
      categoria: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });
};

export const buscarProductoPorCodigo = async (codigoBarras: string) => {
  return prisma.producto.findUnique({
    where: {
      codigoBarras,
    },
    include: {
      categoria: true,
    },
  });
};

export const crearProducto = async (data: CrearProductoData) => {
  return prisma.producto.create({
    data: {
      codigoBarras: data.codigoBarras,
      nombre: data.nombre,
      precio: data.precio,
      stock: data.stock,
      stockMinimo: data.stockMinimo,
      categoriaId: data.categoriaId,
    },
    include: {
      categoria: true,
    },
  });
};

export const listarProductosStockBajo = async () => {
  const productos = await prisma.producto.findMany({
    where: {
      activo: true,
    },
    include: {
      categoria: true,
    },
    orderBy: {
      stock: "asc",
    },
  });

  return productos.filter(
    (producto) => producto.stock <= producto.stockMinimo
  );
};