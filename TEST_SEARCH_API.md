# Hướng dẫn test API Cool School News

## 1. Lấy toàn bộ danh sách tin tức

### Test cơ bản:

```bash
curl -X GET "http://localhost:3000/api/news"
```

### Test với phân trang (lấy 3 tin tức đầu tiên):

```bash
curl -X GET "http://localhost:3000/api/news?page=1&limit=3"
```

### Test với lọc danh mục:

```bash
curl -X GET "http://localhost:3000/api/news?category=program"
```

### Test với tìm kiếm trong danh sách (tìm trong title, description, content):

```bash
curl -X GET "http://localhost:3000/api/news?search=quốc%20tế"
```

### Test kết hợp nhiều parameters:

```bash
curl -X GET "http://localhost:3000/api/news?page=1&limit=2&category=program&search=anh"
```

## 2. API Tìm kiếm chuyên biệt (MỚI) 🔍

### Tìm kiếm theo từ khóa (tìm trong title, description, content):

```bash
curl -X GET "http://localhost:3000/api/news/search?keyword=quốc%20tế"
```

### Tìm kiếm với phân trang:

```bash
curl -X GET "http://localhost:3000/api/news/search?keyword=anh&page=1&limit=2"
```

### Tìm kiếm với lọc danh mục:

```bash
curl -X GET "http://localhost:3000/api/news/search?keyword=chương%20trình&category=program"
```

### Tìm kiếm từ khóa trong content:

```bash
curl -X GET "http://localhost:3000/api/news/search?keyword=montessori"
```

### Tìm kiếm từ khóa trong title:

```bash
curl -X GET "http://localhost:3000/api/news/search?keyword=nhật"
```

## 3. Response mẫu cho tìm kiếm chuyên biệt:

```json
{
  "success": true,
  "message": "Tìm thấy 2 kết quả cho từ khóa \"quốc tế\"",
  "data": [
    {
      "id": 1,
      "title": "Hệ quốc tế Anh - Nhật",
      "slug": "he-quoc-te-anh-nhat",
      "date": "2019-02-22",
      "author": "Cool Team",
      "image": "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/1.jpg?v=1550778252097",
      "description": "Bên cạnh tiếng Anh, tiếng Nhật cũng là một trong những ngôn ngữ của thời kỳ hội nhập toàn cầu.",
      "content": "Nội dung chi tiết...",
      "status": "published",
      "category": "program",
      "createdAt": "2019-02-22T00:00:00.000Z",
      "updatedAt": "2019-02-22T00:00:00.000Z",
      "searchHighlight": {
        "keyword": "quốc tế",
        "foundIn": ["title"]
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 6
  },
  "searchInfo": {
    "keyword": "quốc tế",
    "totalMatches": 2
  }
}
```

## 4. Test bằng Swagger UI 📖

1. Mở: `http://localhost:3000/api-docs`
2. Tìm section **News**
3. Chọn **GET /api/news/search**
4. Click **"Try it out"**
5. Nhập từ khóa cần tìm
6. Click **"Execute"**

## 5. Các trường hợp test:

### API GET /api/news (tìm kiếm tích hợp):

- ✅ Test thành công: Status 200, có dữ liệu
- ✅ Test phân trang: page=2, page=3
- ✅ Test limit: limit=1, limit=10, limit=100 (max 50)
- ✅ Test tìm kiếm: search="không tồn tại" (trả về mảng rỗng)
- ❌ Test validation: page=-1, limit=0 (lỗi 400)

### API GET /api/news/search (tìm kiếm chuyên biệt):

- ✅ Test từ khóa hợp lệ: keyword="anh", keyword="chương trình"
- ✅ Test từ khóa không tồn tại: keyword="xyz123" (trả về mảng rỗng)
- ❌ Test thiếu keyword: không truyền keyword (lỗi 400)
- ✅ Test keyword rỗng: keyword="" (trả về mảng rỗng)
- ✅ Test độ ưu tiên: từ khóa trong title sẽ xuất hiện trước
- ✅ Test highlight: kiểm tra thông tin searchHighlight.foundIn

## 6. Khác biệt giữa 2 API:

### GET /api/news với search parameter:

- Tìm kiếm đơn giản trong danh sách tin tức
- Không có thông tin highlight
- Không có searchInfo

### GET /api/news/search (MỚI):

- 🎯 Tìm kiếm chuyên biệt với ranking
- 🔍 Có thông tin highlight (foundIn)
- 📊 Có searchInfo (keyword, totalMatches)
- 📈 Sắp xếp theo mức độ liên quan (title > description > content)
- ⚠️ Bắt buộc phải có keyword
