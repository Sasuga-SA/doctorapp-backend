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
cp services/auth-service/.env.example services/appointment-service/.env
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
npm install
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

## 2 🌳 Using REST Client

To test the endpoints directly in **VSCode**, use the **REST Client extension**.
You must create `.rest` files in the root or inside a dedicated folder like `requests/`.


### ⚙️ Notes:

* You can use variables with `@` files (e.g., `env.rest`) or placeholders like `{{jwt_token}}`.
* Keep `.rest` files **organized by service or resource**.
* Do not commit sensitive data like real tokens or passwords.

---


## 3 🖱️ Commit message best practices

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

🔨 **ESLint** → Automatically finds and fixes errors.
💅 **Prettier** → Formats your code on every save.
⚙️ **EditorConfig** → Keeps consistency across teams and editors.
📝 **Conventional Commits** → Standardizes commit messages.
✅ **TODO Highlights** → Don't leave tasks unfinished in your code.
✨ **ES6 Snippets** → Shortcuts for writing code quickly.
🚀 **Express Snippets** → Speeds up endpoint creation.
🌐 **REST Client** → Test APIs directly from VSCode.


That’s it!
Clone → configure `.env` → `docker compose up` → lint & test before every commit → clean, traceable Git history. Happy coding! 🚀