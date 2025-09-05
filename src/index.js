import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import newsRoutes from "./routes/newsRoutes.js";
import { errorHandler, notFound, requestLogger } from "./middleware/index.js";
import { specs, swaggerUi } from "./config/swagger.js";

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Cool School News API Documentation",
  })
);

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cool School News API",
    version: "1.0.0",
    endpoints: {
      news: "/api/news",
      categories: "/api/news/categories",
      documentation: "/api-docs",
    },
  });
});

app.use("/api/news", newsRoutes);

// Middleware xử lý lỗi
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `🚀 Cool School News API running at http://localhost:${config.port}`
  );
  console.log(`📚 API Endpoints: http://localhost:${config.port}/api/news`);
  console.log(`📖 API Documentation: http://localhost:${config.port}/api-docs`);
});
