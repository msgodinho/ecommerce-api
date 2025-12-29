import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { routes } from "./routes";
import { env } from "node:process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

try {
  const serviceAccountPath = join(process.cwd(), "firebase-adminsdk.json");
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

  initializeApp({
    credential: cert(serviceAccount),
  });

  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
  process.exit(1);
}

const app = express();

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(env.PORT, () => {
  console.log(`App listening on port ${env.PORT}`);
});
