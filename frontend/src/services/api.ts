const API_URL = import.meta.env.VITE_API_URL;

export interface Producto {
  id: string;
  codigoBarras: string;
  nombre: string;
  precio: string;
  stock: number;
  stockMinimo: number;
  activo: boolean;
}

export interface ItemVenta {
  productoId: string;
  cantidad: number;
}

const obtenerToken = () => {
  return localStorage.getItem("token");
};

export const login = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      "El servidor devolvió una respuesta no válida"
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Error del servidor (${response.status})`
    );
  }

  return data;
};

export const buscarProductoPorCodigo = async (
  codigo: string
): Promise<Producto> => {
  const response = await fetch(
    `${API_URL}/productos/codigo/${encodeURIComponent(codigo)}`
  );

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se encontró el producto"
    );
  }

  return data;
};

export const registrarVenta = async (
  montoRecibido: number,
  items: ItemVenta[]
) => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/ventas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      montoRecibido,
      items,
    }),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo registrar la venta"
    );
  }

  return data;
};

export const obtenerProductos = async (): Promise<Producto[]> => {
  const response = await fetch(`${API_URL}/productos`);

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudieron obtener los productos"
    );
  }

  return data;
};

export interface DetalleVenta {
  id: string;
  cantidad: number;
  precioUnitario: string;
  subtotal: string;
  producto: {
    id: string;
    nombre: string;
    codigoBarras: string;
  };
}

export interface Venta {
  id: string;
  total: string;
  montoRecibido: string;
  vuelto: string;
  estado: "COMPLETADA" | "ANULADA";
  fecha: string;
  usuario: {
    id: string;
    nombre: string;
    apellido: string;
  };
  detalles: DetalleVenta[];
}

export const obtenerVentas = async (): Promise<Venta[]> => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/ventas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudieron obtener las ventas"
    );
  }

  return data;
};

export interface MovimientoStock {
  id: string;
  tipo: "ENTRADA" | "VENTA" | "AJUSTE";
  cantidad: number;
  motivo: string | null;
  creadoEn: string;
  producto: {
    id: string;
    nombre: string;
    codigoBarras: string;
  };
  usuario: {
    id: string;
    nombre: string;
    apellido: string;
  };
}

export const obtenerMovimientosStock = async (): Promise<
  MovimientoStock[]
> => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/movimientos-stock`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudieron obtener los movimientos"
    );
  }

  return data;
};

export const registrarEntradaStock = async (
  productoId: string,
  cantidad: number,
  motivo: string
) => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(
    `${API_URL}/movimientos-stock/entrada`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productoId,
        cantidad,
        motivo,
      }),
    }
  );

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo registrar la entrada"
    );
  }

  return data;
};

export const registrarAjusteStock = async (
  productoId: string,
  nuevoStock: number,
  motivo: string
) => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(
    `${API_URL}/movimientos-stock/ajuste`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productoId,
        nuevoStock,
        motivo,
      }),
    }
  );

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo ajustar el stock"
    );
  }

  return data;
};export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
}

export interface NuevaCategoria {
  nombre: string;
  descripcion?: string;
}

export interface NuevoProducto {
  codigoBarras: string;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  categoriaId: string;
}

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const response = await fetch(`${API_URL}/categorias`);

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudieron obtener las categorías"
    );
  }

  return data;
};

export const crearCategoria = async (
  categoria: NuevaCategoria
): Promise<Categoria> => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoria),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo crear la categoría"
    );
  }

  return data;
};

export const crearProducto = async (
  producto: NuevoProducto
): Promise<Producto> => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo registrar el producto"
    );
  }

  return data;
};
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: "ADMIN" | "CAJERO";
  activo: boolean;
  creadoEn: string;
}

export interface NuevoUsuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: "ADMIN" | "CAJERO";
}

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudieron obtener los usuarios"
    );
  }

  return data;
};

export const crearUsuario = async (
  usuario: NuevoUsuario
): Promise<Usuario> => {
  const token = obtenerToken();

  if (!token) {
    throw new Error("No hay una sesión iniciada");
  }

  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo crear el usuario"
    );
  }

  return data;
};