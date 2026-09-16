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

La aplicación cuenta con dos roles:

**ADMIN:** accede al Dashboard y puede gestionar ventas, productos, inventario y usuarios.

**CAJERO:** accede directamente a Nueva Venta y dispone únicamente de las funciones correspondientes a su rol.

Para la versión de demostración están disponibles:

```text
ADMIN
Correo: admin@gmail.com
Contraseña: Admin123

CAJERO
Correo: ana@cajero.com
Contraseña: 123456