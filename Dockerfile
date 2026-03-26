# Stage 1: Build frontend
FROM node:22.14-bookworm-slim AS client-builder
WORKDIR /app
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Django backend
FROM python:3.12.11-slim-bookworm AS django-base
WORKDIR /app

# OS deps
RUN apt-get update && \
    apt-get install -y libpq-dev gettext curl && \
    rm -rf /var/lib/apt/lists/*

# Python deps
COPY requirements ./requirements
RUN pip install --no-cache-dir -r requirements/production.txt

# Copy backend code + frontend build
# COPY --from=client-builder /app/assets ./static
COPY . .

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings.production

# Entrypoint
COPY entrypoint /entrypoint
RUN chmod +x /entrypoint

CMD ["/entrypoint"]
