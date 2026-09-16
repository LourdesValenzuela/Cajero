import type { Producto } from "../../services/api";

export interface ProductoCarrito extends Producto {
  cantidad: number;
}