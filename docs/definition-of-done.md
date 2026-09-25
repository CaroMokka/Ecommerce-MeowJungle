# Definition of Done y proceso QA del laboratorio (Meow Jungle)

> Política única de calidad para Issues y Pull Requests. No automatiza QA: define el **proceso** y la evidencia mínima que deja de considerar una Issue "terminada".

## 1. Propósito

Una Issue no se considera terminada únicamente porque `lint`, `test` y `build` pasen. Este documento define:

- cuándo una Issue está realmente terminada (DoD);
- qué criterios debe cumplir antes de considerarse implementada;
- qué se comprueba antes de fusionar un PR;
- qué parte corresponde a CI y qué parte a validación humana;
- qué evidencia debe quedar asociada al trabajo realizado.

## 2. Definition of Done

### Issue

- Problema claramente definido.
- Evidencia/contexto suficiente.
- Criterios de aceptación explícitos y verificables.
- Dependencias identificadas.
- Fuera de alcance definido cuando corresponde.

### Implementación

- Solución alineada con el alcance de la Issue.
- Cambios acotados, sin modificaciones no relacionadas.
- Respeto de las convenciones del repositorio y `AGENTS.md`.

### Validación técnica

Cuando corresponde:

```bash
npm run lint
npm test -- --coverage
npm run build
```

Se siguen las instrucciones de validación obligatoria de `AGENTS.md`. El gate de cobertura en `jest.config.ts` no se puede bajar (regla de `AGENTS.md`).

### Validación funcional/manual

- Comprobación humana del comportamiento relevante.
- **La validación manual no queda reemplazada por CI verde.**

### Pull Request

- Referencia a la Issue.
- Criterios de aceptación revisados.
- Validaciones ejecutadas y resultado documentado.
- Revisión del diff.
- Aprobación humana antes del merge.

## 3. Flujo Issue → Implementación → PR → QA

```text
Issue
  ↓
Criteria de aceptación
  ↓
Implementación
  ↓
Validación técnica (lint, test --coverage, build)
  ↓
PR (con template)
  ↓
Validación de criterios de aceptación
  ↓
Validación manual humana
  ↓
Revisión del diff
  ↓
Aprobación
  ↓
Merge
```

### CI ≠ QA completo

CI verifica automáticamente los gates técnicos configurados (lint, tests, cobertura, build). La validación funcional/manual corresponde a una **etapa humana adicional** que se ejecuta antes del merge.

## 4. Responsabilidad de la validación manual

> La validación manual del funcionamiento corresponde a la persona humana antes del merge.

No existe en esta política un equipo formal de QA ni roles externos al repositorio: se establece el **paso del proceso**, no se automatiza ni se crea estructura organizacional.

## 5. Cómo usar las plantillas

- **Issue nueva:** usar `.github/ISSUE_TEMPLATE/general.md` (campos: Problema, Evidencia, Criterios de aceptación, Definition of Done, Dependencias, Fuera de alcance).
- **Pull Request:** completar `.github/PULL_REQUEST_TEMPLATE.md` (Issue, Criterios de aceptación, Validación técnica, Validación manual, Revisión, Merge con aprobación humana).

## 6. Relación con la documentación existente

- `AGENTS.md` — convenciones accionables para agentes de IA (reglas de ramas, autorización, validaciones). Este documento no duplica sus reglas.
- `README.md` — workflow del laboratorio, flujo de ramas (ADR CA-27) y arranque de desarrollo.
- `jest.config.ts` — umbrales de cobertura (gate técnico, CA-32).

Fuera de alcance de esta política: automatización de QA, tests E2E, herramientas de accesibilidad, integración con proveedores externos de cobertura y modificaciones de CI.