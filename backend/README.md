# Cajero - Backend

API REST de Cajero desarrollada con Node.js, Express y TypeScript.

Prisma se utiliza para el acceso a PostgreSQL y la autenticación se maneja mediante JWT.

## Funcionalidades

- Autenticación y autorización por roles
- Gestión de usuarios
- Categorías y productos
- Registro de ventas y sus detalles
- Control de stock
- Entradas y ajustes de inventario
- Movimientos de stock

El registro de una venta se realiza dentro de una transacción para mantener consistentes la venta, sus detalles, el stock y los movimientos asociados.

## Configuración

Instalar las dependencias:

```bash
npm install
```

Crear `.env` a partir de `.env.example`:

```env
DATABASE_URL=postgresql://USUARIO:PASSWORD@HOST:PUERTO/cajero_db
JWT_SECRET=CAMBIA_ESTE_VALOR

SEED_ADMIN_EMAIL=admin@gmail.com
SEED_ADMIN_PASSWORD=Admin123
```

Para la conexión utilizada con Aiven también se requiere el certificado CA en:

```text
certs/ca.pem
```

Generar Prisma Client:

```bash
npx prisma generate
```

Crear las tablas en la base de datos:

```bash
npx prisma migrate deploy
```

## Primer acceso

En una instalación nueva se puede crear el administrador inicial ejecutando:

```bash
npm run seed
```

Por defecto se utilizarán las siguientes credenciales:

```text
Email: admin@gmail.com
Contraseña: Admin123
```

Las credenciales pueden modificarse mediante `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD` en `.env`.

El seed puede ejecutarse nuevamente sin crear usuarios duplicados.

Una vez iniciada la sesión como administrador, los demás usuarios pueden crearse desde la aplicación.

## Ejecución

Iniciar el servidor:

```bash
npm run dev
```

La API se ejecuta por defecto en:

```text
http://localhost:3000
```

## Endpoints principales

```text
/api/auth
/api/usuarios
/api/categorias
/api/productos
/api/ventas
/api/movimientos-stock
```

Los endpoints protegidos requieren autenticación mediante JWT y las operaciones administrativas están restringidas al rol `ADMIN`.