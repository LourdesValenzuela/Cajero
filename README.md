# Cajero

Sistema web de punto de venta para pequeños comercios.

El proyecto nació con la idea de cubrir un flujo de caja sencillo: registrar productos, controlar el stock y realizar ventas sin agregar funcionalidades innecesarias para un negocio pequeño.

Además de la carga manual por código de barras, permite utilizar la cámara de un celular para escanear productos.

## Funcionalidades

- Registro y gestión de productos y categorías
- Control de inventario y movimientos de stock
- Registro de ventas y cálculo de vuelto
- Descuento automático de stock
- Escaneo de códigos de barras
- Historial y detalle de ventas
- Gestión de usuarios
- Roles ADMIN y CAJERO
- Dashboard administrativo
- Interfaz responsive

## Tecnologías

**Frontend:** React, TypeScript, Tailwind CSS y Vite  
**Backend:** Node.js, Express, TypeScript y Prisma  
**Base de datos:** PostgreSQL en Aiven  
**Autenticación:** JWT y bcrypt

## Estructura

```text
Cajero/
├── backend/
└── frontend/
```

Cada parte contiene su propio README con instrucciones de configuración y ejecución.

## Demo

La aplicación se encuentra desplegada en:

https://cajero-six.vercel.app

Para probar las funcionalidades se encuentran disponibles dos cuentas de demostración:

### Administrador

**Correo:** admin@gmail.com  
**Contraseña:** Admin123

Permite acceder al dashboard y a las funciones de administración, ventas, productos, inventario, historial y usuarios.

### Cajero

**Correo:** ana@cajero.com  
**Contraseña:** 123456

Permite realizar ventas y acceder a las funciones disponibles para el rol CAJERO.

## API

El backend se encuentra desplegado en Render:

https://cajero-api-rml1.onrender.com

## Autor

Lourdes Valenzuela