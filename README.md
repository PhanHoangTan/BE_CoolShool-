# BE_CoolShool - Cool School News Backend API 🚀

Backend API cho hệ thống quản lý tin tức của Trường Mầm non Quốc tế Cool School, được xây dựng bằng Node.js và Express với Swagger documentation.

## ✨ Features

- 📰 Quản lý tin tức (CRUD operations)
- 🔍 Tìm kiếm tin tức chuyên biệt với highlight
- 📊 Phân trang và lọc theo danh mục
- 📖 Swagger UI documentation
- 🏗️ Cấu trúc MVC chuẩn
- ✅ Validation và error handling
- 📝 Request logging

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Architecture:** MVC Pattern
- **Data:** In-memory (có thể mở rộng với database)

## 🚀 Getting Started

1. **Clone repository:**

   ```bash
   git clone https://github.com/PhanHoangTan/BE_CoolShool-.git
   cd BE_CoolShool-
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm run dev
   ```

4. **Truy cập API:**
   - API Base: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api-docs`
   - News API: `http://localhost:3000/api/news`

## 📋 API Endpoints

### News Management

- `GET    /api/news` - Lấy danh sách tin tức (có phân trang, lọc, tìm kiếm)
- `GET    /api/news/:id` - Lấy tin tức theo ID
- `GET    /api/news/slug/:slug` - Lấy tin tức theo slug
- `GET    /api/news/categories` - Lấy danh sách danh mục
- `POST   /api/news` - Tạo tin tức mới
- `PUT    /api/news/:id` - Cập nhật tin tức
- `DELETE /api/news/:id` - Xóa tin tức

### Search API (Mới)

- `GET    /api/news/search` - Tìm kiếm tin tức với highlight và ranking

## 🔍 Search Features

### Tìm kiếm tích hợp (GET /api/news)

```bash
curl "http://localhost:3000/api/news?search=quốc%20tế&category=program&page=1&limit=3"
```

### Tìm kiếm chuyên biệt (GET /api/news/search)

```bash
curl "http://localhost:3000/api/news/search?keyword=montessori&page=1&limit=5"
```

**Response với highlight:**

```json
{
  "data": [
    {
      "id": 4,
      "title": "Chương trình học chuẩn quốc tế",
      "searchHighlight": {
        "keyword": "montessori",
        "foundIn": ["content"]
      }
    }
  ],
  "searchInfo": {
    "keyword": "montessori",
    "totalMatches": 1
  }
}
```

## 📁 Project Structure

```
src/
├── config/          # Cấu hình ứng dụng và Swagger
├── controllers/     # Controllers xử lý logic business
├── middleware/      # Middleware (validation, error handling, logging)
├── models/          # Models xử lý dữ liệu
├── routes/          # Route definitions với Swagger annotations
└── index.js         # Entry point
```

## 🧪 Testing

1. **Swagger UI:** `http://localhost:3000/api-docs`
2. **API Examples:** Xem file `API_EXAMPLES.md`
3. **Search Guide:** Xem file `TEST_SEARCH_API.md`

## 📚 Documentation Files

- `README.md` - Hướng dẫn chính
- `API_EXAMPLES.md` - Ví dụ API calls
- `TEST_GUIDE.md` - Hướng dẫn test cơ bản
- `TEST_SEARCH_API.md` - Hướng dẫn test tìm kiếm chi tiết

## 🎯 Sample Data

API bao gồm 6 tin tức mẫu về các chương trình của Cool School:

- Hệ quốc tế Anh - Nhật
- Hệ đào tạo song ngữ
- Hệ quốc tế Anh - Anh
- Chương trình học chuẩn quốc tế
- Chương trình Văn - Thể - Mỹ
- Chương trình học văn hóa Nhật

## 🔧 Configuration

Cấu hình trong `src/config/index.js`:

- Port: 3000 (mặc định)
- CORS: Enabled
- Pagination: 6 items/page (mặc định)
- Max limit: 50 items/page

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**Cool Team** - Development Team

- Email: coolteam@gmail.com
- Phone: 19006750

---

⭐ **Nếu project này hữu ích, hãy cho chúng tôi một star!** ⭐

- `DELETE /api/news/:id` - Delete news

## Note

- This backend uses in-memory mock data. All changes will reset when the server restarts.
- For production, connect to a real database.
