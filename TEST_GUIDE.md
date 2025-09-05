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

### Test với tìm kiếm:

```bash
curl -X GET "http://localhost:3000/api/news?search=quốc%20tế"
```

### Test kết hợp nhiều parameters:

```bash
curl -X GET "http://localhost:3000/api/news?page=1&limit=2&category=program&search=anh"
```

## 2. Response mẫu:

```json
{
  "success": true,
  "message": "Lấy danh sách tin tức thành công",
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
      "updatedAt": "2019-02-22T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 6,
    "itemsPerPage": 6
  }
}
```

## 3. Các trường hợp test:

1. **Test thành công**: Status 200, có dữ liệu
2. **Test phân trang**: page=2, page=3 (có thể không có dữ liệu)
3. **Test limit**: limit=1, limit=10, limit=100 (max 50)
4. **Test tìm kiếm**: search="không tồn tại" (trả về mảng rỗng)
5. **Test validation**: page=-1, limit=0 (lỗi 400)
