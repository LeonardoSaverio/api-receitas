export = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": { rejectUnauthorized: false }, //activate prod
  "logging": false,
  "entities": [
    process.env.PROD ? "dist/src/models/*.js" : "src/models/*.ts"
  ],
  "migrations": [
    process.env.PROD  ? "dist/src/database/migrations/*.js" : "src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}