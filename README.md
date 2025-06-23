# -SA-_T3

Esta es una API RESTful desarrollada en Node.js (Express) que permite registrar, consultar, actualizar y eliminar Elementos de Configuración (CIs - Configuration Items) en una CMDB. Cumple con los requerimientos definidos en el contexto de Diseño y Transición de Servicios según ITIL.

## Funcionalidades Principales

- CRUD completo de CIs
- Tipos de CI: Servidor, Base de Datos, Aplicación, etc.
- Etiquetado por ambiente (DEV, QA, PROD)
- Registro de cambios (auditoría)
- Relación entre CIs (por ejemplo: servidor → aplicación)
- Filtro y búsqueda por atributos

## Tecnologías Usadas

- **Backend**: Node.js + Express
- **Base de Datos**: MySQL
- **ORM/Driver**: mysql2 o query directo
- **Autenticación**: Libre (puede integrarse JWT o básica)

## Estructura de la Base de Datos

La base de datos `cmdb` contiene las siguientes tablas principales:

- `ci_types`: Tipos de elementos de configuración
- `environments`: Ambientes (DEV, QA, PROD)
- `configuration_items`: Elementos de configuración (CIs)
- `ci_relationships`: Relación entre CIs (padre-hijo)
- `ci_audit_log`: Registro de cambios

## Endpoints RESTful

- `GET /cis`: Obtener todos los CIs
- `GET /cis/:id`: Obtener CI por ID
- `POST /cis`: Crear un nuevo CI
- `PUT /cis/:id`: Actualizar un CI existente
- `DELETE /cis/:id`: Eliminar (baja lógica) de un CI
- `GET /cis/:id/relaciones`: Obtener relaciones de un CI
- `POST /cis/:id/relaciones`: Crear una relación
- `GET /cis/filtrar`: Filtros por ambiente, tipo, estado, etc.

## Datos de Prueba

Se incluye un archivo `cmdb_seed.sql` con datos de ejemplo para:

- Tipos de CI
- Ambientes
- Elementos de configuración
- Relaciones entre CIs

## Uso

1. Clonar el repositorio
2. Crear base de datos con el script `schema.sql`
3. Cargar datos con `cmdb_seed.sql`
4. Configurar `.env` con credenciales de base de datos
5. Ejecutar con `npm run dev`
