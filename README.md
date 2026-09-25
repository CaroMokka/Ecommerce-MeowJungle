# 🐾 Meow Jungle – Ecommerce

Bienvenida/o a **Meow Jungle**, somos una boutique creada por y para amantes de la belleza, la naturaleza y la vida lenta. Este proyecto se desarrolla como un MVP (Producto Mínimo Viable) de ecommerce en el frontend, con catálogo y carrito funcionales. La autenticación, el dashboard admin y la pasarela de pagos están planificados como roadmap (ver la sección 🔭 Roadmap).

---

## 🌱 Tabla de contenidos

- [🚀 Demo](#-demo)
- [🌿 Flujo de ramas e integración](#-flujo-de-ramas-e-integración)
- [🔁 Workflow del laboratorio](#-workflow-del-laboratorio-jira--git--github)
- [🖥️ Desarrollo](#-desarrollo)
- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [🔭 Roadmap](#-roadmap)

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
- **Default branch en GitHub**: `develop` ✔ (configurado).

---

## 🔁 Workflow del laboratorio (Jira → Git → GitHub)

Flujo por ticket (feature-branch sobre `develop`):

1. **Ticket en Jira** — se trabaja sobre un ticket `CA-XX` que incluye las *Instrucciones para el agente* (alcance, criterios de aceptación y reglas de autorización).
2. **Integración Jira ↔ GitHub** — la conexión está probada: los commits referencian el ticket (`[CA-XX]`) y la rama lleva el prefijo `CA-XX-...`; la descripción del PR vincula el ticket. La validación de la integración se registró en el ticket de prueba CA-17.
3. **Branch** — desde `develop`: `git checkout -b CA-XX-<descripción>`.
4. **SPEC (cuando aplica)** — el agente escribe una propuesta corta (contexto + opciones + recomendación) y espera el OK antes de implementar (ej.: CA-27, estrategia de ramas).
5. **Implementación + validación local** — cambios en la rama y chequeo: `npm run lint`, `npm test -- --coverage` y `npm run build`.
6. **Autorización humana** — **antes de push y PR** se presentan los cambios a la persona responsable y se espera su aprobación explícita. Regla del laboratorio.
7. **Push + PR** — se pushea la rama y se abre el PR hacia `develop` con la descripción de lo implementado.
8. **CI verde** — GitHub Actions ejecuta lint, tests (con cobertura) y build en el PR. Debe quedar en verde (incluye gate de cobertura).
9. **Merge y cierre** — la persona responsable aprueba y mergea el PR en GitHub, y cierra el ticket en Jira.

**Responsables por paso:**

| Paso | Responsable |
| --- | --- |
| 3–5, 7 (redacción) | Agente (OpenCode) |
| 4 aprobación, 6 autorización, 8–9 | Persona responsable del repo (revisión, merge, cierre de ticket) |
| Config de GitHub (default branch, protección) | Persona responsable (manual) |

**Release**: `main` se actualiza solo vía PR desde `develop` (sin commits directos).

---

## 🖥️ Desarrollo

### Requisitos

- **Node.js 20** (LTS) — pinned en `.nvmrc` y en `engines` de `package.json` (alineado con el CI).
- npm (probado con la versión que trae Node 20, ej. `10.x`); instalar con `npm ci` usando el `package-lock.json`.

### Primer arranque

```bash
nvm install 20     # si usas nvm
nvm use            # lee el .nvmrc
npm ci
npm run dev
```

Vite levanta el servidor de desarrollo en `http://localhost:5173`.

### Comandos por tarea

| Tarea | Comando | Notas |
| --- | --- | --- |
| Desarrollo | `npm run dev` | Dev server de Vite (puerto 5173) |
| Build | `npm run build` | `tsc -b` + `vite build` → `dist/` |
| Preview | `npm run preview` | Sirve localmente el build generado |
| Lint | `npm run lint` | ESLint (flat config en `eslint.config.js`) |
| Tests | `npm test` | Jest + ts-jest (jsdom). Con `-- --coverage` muestra cobertura (umbrales globales en `jest.config.ts`) |
| Tests (watch) | `npm test -- --watch` | Re-ejecuta al cambiar archivos |

### Troubleshooting del primer run

- **`ERROR: ... requires Node >=X <Y` o engine no satisfecho** → estás fuera de Node 20. Usa `nvm install 20 && nvm use`; el CI usa Node 20.
- **`npm ci` falla en la instalación** → borra `node_modules` y reintenta con Node 20 (`npm ci` requiere el lockfile y la versión correcta).
- **Puerto 5173 ocupado** → `npm run dev -- --port 5174`.
- **Tests fallan por imports de estilos** → los estilos se mockean vía `__mocks__/styleMock.js` (configurado en `jest.config.ts`); no es un problema de tu código.
- **Fallo por cobertura por debajo del umbral** → corre `npm test -- --coverage` localmente: `jest.config.ts` define umbrales globales que también aplica el CI (gate).

---

## 🛠️ Stack Tecnológico

### Frontend:
- [React](https://reactjs.org/) 19
- [Vite](https://vitejs.dev/) 6
- [Bootstrap](https://getbootstrap.com/) 5 (vía CDN en `index.html`)
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