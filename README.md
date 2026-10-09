# sde-live-build

Node.js + Express + MongoDB (Mongoose) starter.

## Structure

```
src/
  config/      # DB connection
  controllers/ # Request handlers
  services/    # Business logic
  models/      # Mongoose schemas
  routes/      # Express routers
  app.js       # Express app setup
  server.js    # Entry point
tests/
```

## Setup

```
npm install
cp .env.example .env   # fill in MONGODB_URI
npm run dev
```

## Test

```
npm test
```
