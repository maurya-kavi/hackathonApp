import express from "express"
import "dotenv/config"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngestHandler } from "./inngest/index.js";
import webhookRoutes from "./routes/webhook.js";

const app = express();


app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }));

app.use("/api/webhooks", webhookRoutes);

app.use(express.json())
connectDB()

app.use("/api/inngest", inngestHandler);

app.use("/api/webhooks",webhookRoutes);

app.get("/", (_req,res) => {
    res.send("app is up and running")
})

if ( "development" === ENV?.node_env) {
    const activePort = ENV.port || 5000;
    await initDB();
    app.listen(activePort, () => {
        console.log(`server is running at: http://localhost:${activePort}`)
    })
}

export default app;

