# 📝 Quick-start Guide
---

## 1 🌐 Clone the repo

```bash
git clone git@github.com:Sasuga-SA/doctorapp-backend.git
cd doctorapp-backend
```

---

## 2 🔧 Local prerequisites

| Tool               | Minimum version                      |
| ------------------ | ------------------------------------ |
| **Docker Desktop** | 4.x (Docker Engine 20+ & Compose v2) |
| **Git**            | 2.40                                 |

> **Why Docker only?** Using Docker guarantees "it-works-on-my-machine" consistency for every contributor.

---

## 3 📂 Environment variables

Each microservice and Docker ships a sample file. Copy it, then adjust credentials **once**:

```bash
cp .env.example .env
cp services/auth-service/.env.example services/auth-service/.env
```

Typical values (`auth-service/.env`):

```env
PORT=4000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=med_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=supersecret
```

---

## 4 🐳 Launch the stack

Enter the microservice to develop


```bash
cd .\service\<microservice>
npm i
```
Back to root

```bash
cd ../..
```
and

```bash
docker compose up --build
```

| Service             | URL                     |
| ------------------- | ----------------------- |
| PostgreSQL          | `localhost:5432`        |
| Auth-Service        | `http://localhost:4000` |
| Appointment-Service | `http://localhost:4001` |
| Finance-Service     | `http://localhost:4002` |
| Inventory-Service   | `http://localhost:4003` |
| Swagger Docs (each) | `/<service-url>/docs`   |

View logs:

```bash
docker compose logs -f
```

Stop everything:

```bash
docker compose down
```

---

## 5 🧪 Smoke-test the API

```bash
# list appointments
curl http://localhost:4001/api/v1/appointments

# list budgets
curl http://localhost:4002/api/v1/budgets
```

If you get `[]` or `200 OK` responses, the services are up.

--- 

## IMPORTANT:

**You are currently inside a Docker container. To access the terminal, use the following command:**

```bash
docker compose exec <microservice-name> sh
```

For example to test the microservice appointment-service
```bash
docker compose exec appointment-service sh
```
---

# 📚 Rules and tips

## 1 📏 Rules

### 📂 Naming Conventions

* **Folders** must use `kebab-case` → e.g. `auth-service`, `user-controller`
* **Files** must use `dot.notation` → e.g. `user.model.js`, `auth.route.js`
* **Classes** use `PascalCase` → e.g. `UserController`
* **Functions, variables, constants** use `camelCase` → e.g. `getUserById`
* **Environment variables** use `UPPER_SNAKE_CASE` → e.g. `JWT_SECRET`

### 🌍 Language & Style

* All code (variables, functions, comments, commits) must be written in **English**
* Follow **ESLint** and **Prettier** rules for linting and formatting
* Consistency is more important than preference

### 🔐 Git & Commits

* Use **Conventional Commits** standard enforced with **commitlint**

  * Example: `feat(auth): add login route with JWT support`
* Use **small, atomic commits** with clear intent
* Use **feature branches** and meaningful branch names → e.g. `feat/auth-login`

### ⚙️ Code Structure & Quality

* Keep functions **pure and single-purpose**
* Avoid hardcoding → use `.env` for configuration
* Separate concerns: controllers for logic, services for business, routes for endpoints
* Use **middleware** for auth, validation, error handling
* Favor **async/await** over `.then()`


## 2 ✔️ Commit-time quality gate

Before pushing code:

```bash
npm run lint   # inside the microservice you edited
npm test       # run unit tests
```

> **Tip:** add a pre-commit hook (Husky or lefthook) so `lint` + `test` run automatically.

---

## 3 🌳 Using REST Client

To test the endpoints directly in **VSCode**, use the **REST Client extension**.
You must create `.rest` files in the root or inside a dedicated folder like `requests/`.


### ⚙️ Notes:

* You can use variables with `@` files (e.g., `env.rest`) or placeholders like `{{jwt_token}}`.
* Keep `.rest` files **organized by service or resource**.
* Do not commit sensitive data like real tokens or passwords.

---


## 4 🖱️ Commit message best practices

| Rule                                                           | Example                            |
| -------------------------------------------------------------- | ---------------------------------- |
| Use **imperative present tense**                               | `feat: add Doctor CRUD`            |
| Start with a **type** (`feat`, `fix`, `docs`, `test`, `chore`) | `fix: handle DB reconnect`         |
| **Reference issue IDs** when relevant                          | `feat: #42 support JWT refresh`    |
| Keep the **subject ≤ 50 chars**                                | `chore: bump Sequelize to v6.37.1` |
| Add a **blank line** before the body                           |                                    |
| In the body, explain **what & why**, not how                   |                                    |

Example:

```
feat: add appointment pagination (#33)

Allows clients to request GET /appointments?page=X&limit=Y.
Uses Sequelize limit+offset. Keeps response time <100 ms
under DB seed of 50 k appointments.
```

Following these guidelines keeps the history readable and makes changelog generation (Conventional Commits, semantic-release) effortless.

---

## 5 📖 Extensions recommend to VSC 

🔨 **ESLint** → Automatically finds and fixes errors.

💅 **Prettier** → Formats your code on every save.

⚙️ **EditorConfig** → Keeps consistency across teams and editors.

📝 **Conventional Commits** → Standardizes commit messages.

✅ **TODO Highlights** → Don't leave tasks unfinished in your code.

✨ **ES6 Snippets** → Shortcuts for writing code quickly.

🚀 **Express Snippets** → Speeds up endpoint creation.

🌐 **REST Client** → Test APIs directly from VSCode.


That's it!
Clone → configure `.env` → `docker compose up` → lint & test before every commit → clean, traceable Git history. Happy coding! 🚀

# DoctorApp Backend - Microservicios

## 📋 Descripción

Sistema backend para aplicación médica construido con microservicios. Incluye servicios de autenticación y gestión de perfiles de usuario.

## 🏗️ Arquitectura

### Servicios Disponibles

1. **Auth Service** (`services/auth-service/`)
   - Autenticación y autorización
   - Registro de usuarios (solo guarda: email, password, role, isVerified)
   - Verificación de email
   - Gestión de contraseñas
   - Sistema de permisos por rol

2. **Profile Service** (`services/profile-service/`)
   - Gestión de perfiles de usuario (datos personales completos)
   - Subida de fotos de perfil
   - Búsqueda y listado de perfiles

## 🔄 Flujo de Registro y Perfil

### 1. Registro de Usuario (Auth Service)
```bash
POST /auth/register
{
  "firstName": "Alejandro",        # Se valida pero NO se guarda en BD
  "lastName": "Sanchez",           # Se valida pero NO se guarda en BD
  "email": "alejandro@example.com", # Se guarda en BD
  "password": "password123",       # Se guarda en BD
  "specialty": "Pediatra",         # Se valida pero NO se guarda en BD
  "phone": "1234567",              # Se valida pero NO se guarda en BD
  "role": "doctor"                 # Se guarda en BD
}
```

### 2. Verificación de Email
```bash
GET /auth/verify-email?token=abc123def456
```

### 3. Login para obtener Token
```bash
POST /auth/login
{
  "email": "alejandro@example.com",
  "password": "password123"
}
```

### 4. Crear Perfil (Profile Service)
```bash
POST /profiles
Authorization: Bearer <token>
{
  "firstName": "Dr. Alejandro",    # Se guarda en BD del profile service
  "lastName": "Sánchez",           # Se guarda en BD del profile service
  "dateOfBirth": "1985-03-15",     # Se guarda en BD del profile service
  "gender": "male",                # Se guarda en BD del profile service
  "phone": "+1234567890",          # Se guarda en BD del profile service
  "address": "Calle Principal 123", # Se guarda en BD del profile service
  "city": "Ciudad de México",      # Se guarda en BD del profile service
  "state": "CDMX",                 # Se guarda en BD del profile service
  "country": "México",             # Se guarda en BD del profile service
  "postalCode": "12345",           # Se guarda en BD del profile service
  "bio": "Médico pediatra con 10 años de experiencia" # Se guarda en BD del profile service
}
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- PostgreSQL

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd doctorapp-backend
```

2. **Configurar variables de entorno**
```bash
# Auth Service
cp services/auth-service/.env.example services/auth-service/.env

# Profile Service
cp services/profile-service/.env.example services/profile-service/.env
```

3. **Ejecutar con Docker Compose**
```bash
docker-compose up -d
```

### URLs de los Servicios
- **Auth Service**: http://localhost:3000
- **Profile Service**: http://localhost:4001

## 📚 Documentación

### Auth Service
- [Rutas de Autenticación](services/auth-service/README-AUTH-ROUTES.md)
- [Sistema de Permisos](services/auth-service/README-PERMISSIONS.md)

### Profile Service
- [Rutas de Perfil](services/profile-service/README-PROFILE-ROUTES.md)

## 🧪 Testing

### Archivos .rest para Testing
- [Flujo Completo](request/complete-flow.rest)
- [Auth Service](request/auth.rest)
- [Profile Service](request/profile.rest)

### Variables de Entorno para VS Code
```json
{
  "baseUrlAuth": "http://localhost:3000/auth",
  "baseUrlProfile": "http://localhost:4001/api/v1",
  "baseUrlPermissions": "http://localhost:3000/permissions",
  "email": "tu-email@example.com",
  "pwd": "tu-password",
  "token": "token-jwt-del-login"
}
```

## 🔐 Roles y Permisos

### Rol Doctor
- ✅ Ver y actualizar perfil
- ✅ Ver pacientes
- ✅ Crear, ver, actualizar y eliminar citas
- ✅ Ver y actualizar registros médicos
- ✅ Prescribir medicamentos
- ✅ Ver y actualizar horarios
- ✅ Ver reportes
- ✅ Exportar datos

### Rol Paciente
- ✅ Ver y actualizar perfil
- ✅ Ver citas propias
- ✅ Ver registros médicos propios

### Rol Admin
- ✅ Todos los permisos de doctor
- ✅ Gestionar sistema
- ✅ Ver todos los usuarios
- ✅ Crear usuarios

## 📋 Campos de Registro (Auth Service)

### Campos Requeridos
- `firstName` (string, mínimo 2 caracteres) - Se valida pero NO se guarda en BD
- `lastName` (string, mínimo 2 caracteres) - Se valida pero NO se guarda en BD
- `email` (string, formato válido) - Se guarda en BD
- `password` (string, mínimo 8 caracteres) - Se guarda en BD

### Campos Opcionales
- `role` (string, default: "doctor") - Se guarda en BD
- `specialty` (string, requerido solo si role="doctor") - Se valida pero NO se guarda en BD
- `phone` (string, mínimo 7 dígitos) - Se valida pero NO se guarda en BD

### ⚠️ Nota Importante
**Solo se guardan en la base de datos del Auth Service:**
- `email`
- `password` 
- `role`
- `isVerified`

**Los campos `firstName`, `lastName`, `specialty`, `phone` se validan pero NO se almacenan en este servicio. Para guardar estos datos, usar el Profile Service después del registro.**

### Especialidades Válidas para Doctores
```
Alergólogo, Anestesiólogo, Cardiólogo, Cirujano cardiovascular, 
Cirujano general, Cirujano maxilofacial, Cirujano plástico, 
Dermatólogo, Endocrinólogo, Fisiatra, Fisioterapeuta, 
Gastroenterólogo, Geriatra, Ginecólogo, Hematólogo, Infectólogo, 
Internista, Médico del deporte, Médico familiar, Médico general, 
Neumólogo, Neurólogo, Nutriólogo, Obstetra, Odontólogo, 
Oftalmólogo, Oncólogo, Ortopedista, Otorrinolaringólogo, 
Patólogo, Pediatra, Podólogo, Psiquiatra, Psicólogo clínico, 
Psicoterapeuta, Radiólogo, Reumatólogo, Sexólogo, 
Terapeuta ocupacional, Traumatólogo, Urólogo
```

## 📋 Campos de Perfil (Profile Service)

### Campos Requeridos
- `firstName` (string, 2-50 caracteres) - Se guarda en BD
- `lastName` (string, 2-50 caracteres) - Se guarda en BD

### Campos Opcionales
- `dateOfBirth` (date) - Se guarda en BD
- `gender` (enum: "male", "female", "other") - Se guarda en BD
- `phone` (string, formato internacional) - Se guarda en BD
- `address` (text) - Se guarda en BD
- `city` (string, máximo 100 caracteres) - Se guarda en BD
- `state` (string, máximo 100 caracteres) - Se guarda en BD
- `country` (string, máximo 100 caracteres) - Se guarda en BD
- `postalCode` (string, máximo 20 caracteres) - Se guarda en BD
- `bio` (text) - Se guarda en BD
- `profilePicture` (file, jpeg/jpg/png/gif, máximo 5MB) - Se guarda en BD

## 🔧 Desarrollo

### Estructura de Directorios
```
doctorapp-backend/
├── services/
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   └── test/
│   └── profile-service/
│       ├── src/
│       │   ├── controllers/
│       │   ├── middlewares/
│       │   ├── models/
│       │   ├── routes/
│       │   └── services/
│       └── test/
├── request/
│   ├── auth.rest
│   ├── profile.rest
│   └── complete-flow.rest
└── docker-compose.yml
```

### Comandos de Desarrollo

```bash
# Ejecutar tests del auth service
cd services/auth-service
npm test

# Ejecutar tests del profile service
cd services/profile-service
npm test

# Ejecutar en modo desarrollo
cd services/auth-service
npm run dev

cd services/profile-service
npm run dev
```

## 🐳 Docker

### Construir imágenes
```bash
docker-compose build
```

### Ejecutar servicios
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f auth-service
docker-compose logs -f profile-service
```

### Detener servicios
```bash
docker-compose down
```

## 📝 Notas Importantes

1. **Separación de Responsabilidades**: 
   - Auth Service: Solo maneja autenticación y datos básicos (email, password, role)
   - Profile Service: Maneja toda la información personal del usuario

2. **Seguridad**: Todos los endpoints de perfil requieren autenticación JWT

3. **Validación**: Los datos se validan tanto en el frontend como en el backend

4. **Soft Delete**: Los perfiles eliminados se marcan como inactivos pero no se eliminan físicamente

5. **Paginación**: Las listas incluyen información de paginación

6. **Búsqueda**: La búsqueda es insensible a mayúsculas/minúsculas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.