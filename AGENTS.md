# AGENTS.md — Convenciones del repositorio (para agentes de IA)

Frontend MVP de ecommerce **Meow Jungle** (React 19 + Vite 6 + TypeScript + Jest). Las convenciones del laboratorio están en [README → Workflow del laboratorio](./README.md). Este archivo es la lista accionable para cualquier agente.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Dev server de Vite (http://localhost:5173) |
| `npm run build` | `tsc -b` + `vite build` → `dist/` |
| `npm run preview` | Sirve localmente el build |
| `npm run lint` | ESLint (flat config: `eslint.config.js`) |
| `npm test` | Jest (ts-jest, jsdom). `npm test -- --coverage` reporta cobertura |
| `nvm use` | Cambia a Node 20 (`.nvmrc`) |

**Verificación obligatoria antes de reportar "listo"**: `npm run lint` y, si tocas código, `npm run build` + `npm test -- --coverage`.

## Estructura

- Páginas: `src/pages/`
- Componentes UI reutilizables: `src/components/ui/` (p.ej. `ProductSummary/`, `ProductFilter/`)
- Estado global (Context API): `src/context/` — carrito en `cart/`, filtros en `filterProducts/`
- Bloques de la tienda: `src/store/blocks/` (header, minicart, plp, home, footer)
- Checkout: `src/checkout/` (formularios en `formsCheckout/` con tests colocated `*.test.tsx`)
- Datos y tipos: `src/data/`, `src/types/`
- Aliases de import: `@components/*` → `src/components/*`, `@utils/*` → `src/utils/*` (definidos en `tsconfig.json` y mapeados por ts-jest)
- Estilos: CSS Modules (`*.module.scss`) y CSS plano (`.css`); Bootstrap 5.3.3 vía CDN en `index.html`

## Reglas accionables

1. **Nunca** commitees a `develop` o `main` directamente. Trabaja en rama feature desde `develop` con nombre `CA-XX-<descripcion>`.
2. **No** crees commits, push ni PR sin **autorización humana explícita**. Presenta el diff/resumen y espera el OK.
3. **No** crees archivos nuevos salvo que el ticket lo pida explícitamente; prefiere editar archivos existentes.
4. **No bajes** los umbrales de cobertura de `jest.config.ts` (gate de CI: statements/branches/functions/lines).
5. **No toques** el CDN de Bootstrap en `index.html` ni las clases Webflow raleadas en `src/store/blocks/footer/Footer.tsx` (`w-input`, `w-button`) sin autorización.
6. **Node 20** queda fijado por `.nvmrc` y `engines`; no fuerces versiones de Node distintas.
7. **No** agregues dependencias sin justificarlo y sin autorización (`npm ci` es el flujo de instalación).
8. Contenido y UI en **español dominante**; marca canónica **Meow Jungle**.
9. Commits en formato **convencional + ticket**: p.ej. `fix(content): [CA-25] ...`, `test(coverage): [CA-32] ...` (idioma libre, español o inglés).
10. **No** incluyas secretos, tokens, `.env` ni artefactos generados (`coverage/`, `dist/`, `node_modules/`) — está en `.gitignore`.
11. **Definición de terminado (DoD)**: consulta `docs/definition-of-done.md`; usa los templates `.github/PULL_REQUEST_TEMPLATE.md` (PRs) y `.github/ISSUE_TEMPLATE/` (issues). **CI verde ≠ QA completo**: la validación manual humana es requisito antes del merge.

## Puntos de doble chequeo

- Después de editar `jest.config.ts` o `.github/workflows/ci.yml`: verifica que no cambiaste umbrales/gate sin autorización.
- Después de editar `index.html`: el CDN de Bootstrap debe seguir intacto.
- Tras cambios en rutas/contexto: `npm test` (los tests replican el uso real: `cartReducer`, `cartContext`, formularios de checkout, `GridProducts`, `ProductFilter`).