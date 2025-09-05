export const config = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  database: {
    // Có thể thêm cấu hình database sau này
    type: "memory", // memory, mysql, mongodb, etc.
  },
  jwt: {
    secret: process.env.JWT_SECRET || "coolschool-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 6,
    maxLimit: 50,
  },
};
