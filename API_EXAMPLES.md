# API Test Examples

## Lấy danh sách tin tức

```bash
curl -X GET "http://localhost:3000/api/news"
curl -X GET "http://localhost:3000/api/news?page=1&limit=3"
curl -X GET "http://localhost:3000/api/news?category=program"
curl -X GET "http://localhost:3000/api/news?search=quốc tế"
```

## Lấy tin tức theo ID

```bash
curl -X GET "http://localhost:3000/api/news/1"
```

## Lấy tin tức theo slug

```bash
curl -X GET "http://localhost:3000/api/news/slug/he-quoc-te-anh-nhat"
```

## Tạo tin tức mới

```bash
curl -X POST "http://localhost:3000/api/news" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tin tức mới",
    "description": "Mô tả tin tức mới",
    "content": "Nội dung chi tiết của tin tức",
    "image": "https://example.com/image.jpg",
    "author": "Cool Team",
    "category": "news"
  }'
```

## Cập nhật tin tức

```bash
curl -X PUT "http://localhost:3000/api/news/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tiêu đề đã cập nhật"
  }'
```

## Xóa tin tức

```bash
curl -X DELETE "http://localhost:3000/api/news/1"
```

## Lấy danh mục tin tức

```bash
curl -X GET "http://localhost:3000/api/news/categories"
```
