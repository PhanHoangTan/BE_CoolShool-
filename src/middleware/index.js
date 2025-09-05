// Middleware xử lý lỗi toàn cục
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Lỗi validation
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      error: err.message,
    });
  }

  // Lỗi không tìm thấy
  if (err.name === "NotFoundError") {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy tài nguyên",
      error: err.message,
    });
  }

  // Lỗi server
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi server nội bộ",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

// Middleware xử lý route không tồn tại
export const notFound = (req, res, next) => {
  const error = new Error(`Route không tồn tại - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Middleware log request
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`
  );
  next();
};

// Middleware validation cho tin tức
export const validateNewsData = (req, res, next) => {
  const { title, description, content } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Tiêu đề là bắt buộc");
  }

  if (!description || description.trim().length === 0) {
    errors.push("Mô tả là bắt buộc");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Nội dung là bắt buộc");
  }

  if (title && title.length > 200) {
    errors.push("Tiêu đề không được vượt quá 200 ký tự");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      errors,
    });
  }

  next();
};

// Middleware phân trang
export const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;

  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: "Trang phải là số nguyên dương",
    });
  }

  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 50)) {
    return res.status(400).json({
      success: false,
      message: "Giới hạn phải là số nguyên từ 1 đến 50",
    });
  }

  next();
};
