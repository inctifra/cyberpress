# Django Starter Template


License: Apache Software License 2.0

---

## 🚀 Quick Start

Once you have cloned the repository, you can set up and run both the backend (Django) and frontend (Webpack + pnpm) with the following simple steps.

### 1. Sync Python environment

```bash
git clone <link> cyberconnect

cd cyberconnect

uv venv

.\.venv\Scripts\activate
uv sync
```

### 2. Install frontend dependencies

```bash
pnpm install
```

### 3. Run development servers

* Start the **frontend** development server:

  ```bash
  pnpm dev
  ```

* In another terminal, start the **Django backend**:

  ```bash
  python manage.py runserver
  ```

### 4. Production build

To build frontend assets for production:

```bash
pnpm build
```

---

## ⚙️ Settings

See [settings documentation](https://cookiecutter-django.readthedocs.io/en/latest/1-getting-started/settings.html).

---

## 👥 User Setup

* To create a **normal user account**, register through the Sign Up page. Check your console for the email verification link.

* To create a **superuser account**:

  ```bash
  python manage.py createsuperuser
  ```

---

## ✅ Type Checks

Run static type checks using **mypy**:

```bash
mypy ifidel
```

---

## 🧪 Testing

Run all tests and view coverage report:

```bash
coverage run -m pytest
coverage html
open htmlcov/index.html
```

or simply:

```bash
pytest
```

---

## 🔄 Celery Setup

Run a Celery worker:

```bash
cd ifidel
celery -A config.celery_app worker -l info
```

For periodic tasks:

```bash
cd ifidel
celery -A config.celery_app beat
```

or combined (for local testing only):

```bash
celery -A config.celery_app worker -B -l info
```

---

## 📧 Email Server (Development)

Local SMTP server [Mailpit](https://github.com/axllent/mailpit) is preconfigured via Docker. Access the mail UI at:

```
http://127.0.0.1:8025
```

---

## 🪲 Error Logging (Sentry)

To enable Sentry, set the DSN URL in your production environment variables.

---

## 🚢 Deployment Options

### Heroku

Refer to the [Cookiecutter Django Heroku guide](https://cookiecutter-django.readthedocs.io/en/latest/3-deployment/deployment-on-heroku.html).

### Docker

Refer to the [Docker deployment guide](https://cookiecutter-django.readthedocs.io/en/latest/3-deployment/deployment-with-docker.html).

---

## 🎨 Custom Bootstrap Compilation

You can customize Bootstrap by editing variables in `static/sass/custom_bootstrap_vars`. CSS will automatically rebuild via Webpack when running `pnpm dev` or `pnpm build`.
