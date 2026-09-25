# 🐾 Meow Jungle – Ecommerce


Bienvenida/o a **Meow Jungle**, somos una boutique creada por y para amantes de la belleza, la naturaleza y la vida lenta. Este proyecto se desarrolla como un MVP (Producto Mínimo Viable) de ecommerce en el frontend, con catálogo y carrito funcionales. La autenticación, el dashboard admin y la pasarela de pagos están planificados como roadmap (ver la sección 🔭 Roadmap).

---

## 🌱 Tabla de contenidos

- [🚀 Demo](#-demo)
- [🌿 Flujo de ramas](#-flujo-de-ramas)
- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [📦 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧠 Funcionalidades](#-funcionalidades)
- [📲 Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [📤 Despliegue](#-despliegue)
- [🧪 Testing](#-testing)
- [👥 Equipo](#-equipo)
- [📌 Estado actual](#-estado-actual)

---

## 🚀 Demo

🔗 [Ver demo en producción (deploy frontend)](https://co-jungle.vercel.app) ( 🛠️ En construcción... )

🔗 [Ver demo API REST (backend)]() — pendiente, en roadmap

---

## 🌿 Flujo de ramas e integración

Decisión (ADR — CA-27):

- **Rama canónica de integración**: `develop`.
- **Feature-branch**: cada ticket crea su rama desde `develop` con el prefijo del ticket (ej. `CA-27-...`).
- **Integración**: la feature se fusiona a `develop` mediante Pull Request con CI verde (lint, test y build).
- **Release / estable**: `main` se mantiene estable y se actualiza mediante PR desde `develop` (sin commits directos a `main`).
- **CI**: se ejecuta sobre Pull Requests dirigidas a `develop` y `main`.
- **Default branch en GitHub**: `develop` (pendiente de aplicar en la configuración del repositorio).

---

## 🛠️ Stack Tecnológico

### Frontend:
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)
- [Context API] para manejo de estado global (carrito en `src/context/cart`)
- TypeScript
- [Jest](https://jestjs.io/) + Testing Library
- GitHub Actions (CI: lint, test y build)

### Backend (en roadmap):
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) y middleware de autenticación
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) para hashing de contraseñas

### Infraestructura:
- Frontend en [Vercel](https://vercel.com/)
- Backend en [Render / Railway](https://render.com/) (en roadmap)
- Base de datos en [Supabase / Neon](https://neon.tech/) (en roadmap)

---

## 🔭 Roadmap

- Autenticación de usuarios (JWT), dashboard admin y pasarela de pagos
- Backend y base de datos (API REST)
- Catálogo dinámico servido desde el backend

---

