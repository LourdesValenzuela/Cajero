import { prisma } from "../lib/prisma";

interface CrearCategoriaData {
  nombre: string;
  descripcion?: string;
}

export const listarCategorias = async () => {
  return prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
};

export const crearCategoria = async (data: CrearCategoriaData) => {
  return prisma.categoria.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });
};