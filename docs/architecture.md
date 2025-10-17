# Onion Architecture in this Workspace

This repository now follows Onion Architecture with clear module boundaries enforced by Nx ESLint rules.

## Layers

- Domain (backend): Entities, value objects, business rules
  - Tag: `layer:domain`, `scope:backend`
  - May depend only on itself and `scope:shared`
- Application (backend): Use cases, coordinators, services
  - Tag: `layer:application`, `scope:backend`
  - May depend on `layer:domain`, `scope:shared`, and itself
- Interface (backend): Controllers, presenters, DTO mapping
  - Tag: `layer:interface`, `scope:backend`
  - May depend on `layer:application`, `layer:domain`, `scope:shared`, and itself
- Infrastructure (backend): ORM/models, DB, external APIs, frameworks
  - Tag: `layer:infrastructure`, `scope:backend`
  - May depend on `layer:application`, `layer:domain`, `scope:shared`, and itself
- Shared libs: Cross-cutting utils/types usable everywhere
  - Tag: `scope:shared`
  - May depend only on `scope:shared`
- Frontend libs: Feature/ui code for Next.js app
  - Tag: `scope:frontend`
  - May depend on `scope:frontend` and `scope:shared`
- Apps:
  - API (NestJS): `type:app-backend`, can depend on backend layers and shared
  - Web (Next.js): `type:app-frontend`, can depend on frontend libs and shared

## How it is enforced

Root `eslint.config.mjs` uses `@nx/enforce-module-boundaries` with depConstraints reflecting the rules above. Each project has tags in its `project.json`.

## How to add new libs

- Domain: `nx g @nx/js:lib libs/backend/domain/<name> --tags="layer:domain,scope:backend"`
- Application: `--tags="layer:application,scope:backend"`
- Interface: `--tags="layer:interface,scope:backend"`
- Infrastructure: `--tags="layer:infrastructure,scope:backend"`
- Shared: `--tags="scope:shared"`
- Frontend: `--tags="scope:frontend"`

Be sure to point `tsconfig.base.json` paths if you add new public entrypoints.
