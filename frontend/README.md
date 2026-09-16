# Cajero - Frontend

Interfaz web de Cajero desarrollada con React, TypeScript y Tailwind CSS.

La aplicación es responsive y puede utilizarse desde escritorio o dispositivos móviles.

## Funcionalidades

- Inicio de sesión
- Nueva venta
- Productos y categorías
- Inventario
- Historial de ventas
- Gestión de usuarios
- Dashboard
- Navegación según rol
- Escaneo de códigos de barras mediante cámara

El escáner utiliza ZXing y requiere HTTPS para acceder a la cámara desde dispositivos móviles.

## Configuración

Instalar las dependencias:

```bash
npm install
```

Crear `.env` a partir de `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar la aplicación:

```bash
npm run dev
```

Vite utiliza por defecto `http://localhost:5173`.

## Acceso por roles

**ADMIN:** al iniciar sesión accede al Dashboard y puede gestionar ventas, productos, inventario y usuarios.

**CAJERO:** al iniciar sesión accede directamente a Nueva Venta y puede consultar productos e historial.

La autorización de las operaciones protegidas se valida en el backend.
