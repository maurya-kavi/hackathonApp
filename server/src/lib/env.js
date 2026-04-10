import "dotenv/config"

export const ENV = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.MONGO_URI,
    webhook_url: process.env.CLERK_WEBHOOK_SECRET
}