import express from "express";
import cors from "cors";

import categoriaRoutes from "./routes/categoria.routes";
import productoRoutes from "./routes/producto.routes";
import usuarioRoutes from "./routes/usuario.routes";
import ventaRoutes from "./routes/venta.routes";
import movimientoStockRoutes from "./routes/movimientoStock.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

const PORT = process.env.PORT || 3000;

const origenesPermitidos = [
  "http://localhost:5173",
  "https://cajero-six.vercel.app",
];

app.use(
  cors({
    origin: origenesPermitidos,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de Cajero funcionando",
  });
});

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/movimientos-stock", movimientoStockRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});