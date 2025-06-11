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

> **Why Docker only?** Using Docker guarantees “it-works-on-my-machine” consistency for every contributor.

---

## 3 📂 Environment variables

Each microservice and Docker ships a sample file. Copy it, then adjust credentials **once**:

```bash
cp .env.example .env
cp services/appointment-service/.env.example services/appointment-service/.env
cp services/finance-service/.env.example      services/finance-service/.env
cp services/inventory-service/.env.example    services/inventory-service/.env
```

Typical values (`appointment-service/.env`):

```env
PORT=4001
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
npm init
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


# 📚 Test and format
---


## 1 ✔️ Commit-time quality gate

Before pushing code:

```bash
npm run lint   # inside the microservice you edited
npm test       # run unit tests
```

> **Tip:** add a pre-commit hook (Husky or lefthook) so `lint` + `test` run automatically.

---
## 2 🌳 Seeds 



## 2 🖱️ Commit message best practices

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

## 3 📖 Extensions recommend to VSC 

🔨 **ESLint** → Encuentra y corrige errores automáticamente.  
💅 **Prettier** → Formatea tu código con un solo guardado.  
⚙️ **EditorConfig** → Mantén consistencia entre equipos y editores.  
📝 **Conventional Commits** → Estandariza mensajes de commit.  
✅ **TODO Highlights** → No dejes tareas pendientes en el código.  
✨ **ES6 Snippets** → Atajos para escribir código rápido.  
🚀 **Express Snippets** → Agiliza la creación de endpoints.  
🌐 **REST Client** → Prueba APIs sin salir de VSCode.

That’s it!
Clone → configure `.env` → `docker compose up` → lint & test before every commit → clean, traceable Git history. Happy coding! 🚀