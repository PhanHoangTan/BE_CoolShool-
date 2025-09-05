import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cool School News API",
      version: "1.0.0",
      description: "API quản lý tin tức cho trường mầm non quốc tế Cool School",
      contact: {
        name: "Cool Team",
        email: "coolteam@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        News: {
          type: "object",
          required: ["title", "description", "content"],
          properties: {
            id: {
              type: "integer",
              description: "ID tin tức",
              example: 1,
            },
            title: {
              type: "string",
              description: "Tiêu đề tin tức",
              example: "Hệ quốc tế Anh - Nhật",
            },
            slug: {
              type: "string",
              description: "URL slug của tin tức",
              example: "he-quoc-te-anh-nhat",
            },
            date: {
              type: "string",
              format: "date",
              description: "Ngày đăng tin tức",
              example: "2019-02-22",
            },
            author: {
              type: "string",
              description: "Tác giả",
              example: "Cool Team",
            },
            image: {
              type: "string",
              format: "uri",
              description: "URL hình ảnh",
              example: "https://example.com/image.jpg",
            },
            description: {
              type: "string",
              description: "Mô tả ngắn",
              example:
                "Bên cạnh tiếng Anh, tiếng Nhật cũng là một trong những ngôn ngữ...",
            },
            content: {
              type: "string",
              description: "Nội dung chi tiết",
              example: "Nội dung đầy đủ của bài viết...",
            },
            status: {
              type: "string",
              enum: ["published", "draft", "archived"],
              description: "Trạng thái tin tức",
              example: "published",
            },
            category: {
              type: "string",
              description: "Danh mục tin tức",
              example: "program",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Ngày tạo",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Ngày cập nhật",
            },
          },
        },
        NewsInput: {
          type: "object",
          required: ["title", "description", "content"],
          properties: {
            title: {
              type: "string",
              description: "Tiêu đề tin tức",
              example: "Tin tức mới",
            },
            description: {
              type: "string",
              description: "Mô tả ngắn",
              example: "Mô tả tin tức mới",
            },
            content: {
              type: "string",
              description: "Nội dung chi tiết",
              example: "Nội dung đầy đủ của bài viết mới",
            },
            image: {
              type: "string",
              format: "uri",
              description: "URL hình ảnh",
              example: "https://example.com/image.jpg",
            },
            author: {
              type: "string",
              description: "Tác giả",
              example: "Cool Team",
            },
            category: {
              type: "string",
              description: "Danh mục tin tức",
              example: "program",
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Trạng thái thành công",
            },
            message: {
              type: "string",
              description: "Thông báo",
            },
            data: {
              description: "Dữ liệu trả về",
            },
            pagination: {
              type: "object",
              properties: {
                currentPage: {
                  type: "integer",
                  description: "Trang hiện tại",
                },
                totalPages: {
                  type: "integer",
                  description: "Tổng số trang",
                },
                totalItems: {
                  type: "integer",
                  description: "Tổng số item",
                },
                itemsPerPage: {
                  type: "integer",
                  description: "Số item trên mỗi trang",
                },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Thông báo lỗi",
            },
            error: {
              type: "string",
              description: "Chi tiết lỗi",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Đường dẫn đến các file route
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
