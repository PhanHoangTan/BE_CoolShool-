# News Data Structure Documentation

## 📁 File Structure

```
src/
├── data/
│   └── newsData.json          # Dữ liệu tin tức dạng JSON
├── models/
│   └── NewsModel.js           # Model định nghĩa cấu trúc và methods
```

## 📋 News Item Data Structure

```javascript
{
  "id": number,                 // ID tin tức (integer, required, auto-increment)
  "title": string,              // Tiêu đề tin tức (required, max: 200)
  "slug": string,               // URL slug (auto-generated from title)
  "date": string,               // Ngày đăng (format: YYYY-MM-DD)
  "author": string,             // Tác giả (default: "Cool Team")
  "image": string,              // URL hình ảnh (URL format)
  "description": string,        // Mô tả ngắn (required, max: 500)
  "content": string,            // Nội dung chi tiết (required)
  "status": string,             // Trạng thái: 'published'|'draft'|'archived'
  "category": string,           // Danh mục: 'program'|'culture'|'news'|'event'
  "createdAt": string,          // Ngày tạo (ISO string)
  "updatedAt": string           // Ngày cập nhật (ISO string)
}
```

## 🔧 Model Features

### Data Management
- ✅ **Auto-load từ JSON:** Tự động load dữ liệu từ `newsData.json` khi khởi tạo
- ✅ **Auto-save:** Tự động lưu khi có thay đổi (create, update, delete)
- ✅ **Date conversion:** Tự động convert string ↔ Date object
- ✅ **Auto-increment ID:** Tự động tạo ID mới cho tin tức

### Data Types & Validation
- ✅ **TypeScript-style JSDoc:** Định nghĩa rõ ràng kiểu dữ liệu
- ✅ **Enum validation:** Status và Category có giá trị cố định
- ✅ **Required fields:** Title, description, content là bắt buộc
- ✅ **Auto slug generation:** Tự động tạo slug từ tiêu đề

## 📊 Sample Data Categories

- **program:** Các chương trình đào tạo (6 items)
- **culture:** Văn hóa giáo dục (1 item)

## 🔄 Data Operations

### CRUD Operations
```javascript
// Create - Tự động lưu vào JSON
const newNews = await NewsModel.create(newsData);

// Update - Tự động lưu vào JSON  
const updatedNews = await NewsModel.update(id, updateData);

// Delete - Tự động lưu vào JSON
const deletedNews = await NewsModel.delete(id);

// Read - Load từ JSON
const news = await NewsModel.findById(id);
```

### Search Operations
```javascript
// Basic search với phân trang
const results = await NewsModel.findAll(options);

// Advanced search với highlight
const searchResults = await NewsModel.search(keyword, options);
```

## 📝 Adding New News Item

### Via API (POST /api/news)
```json
{
  "title": "Tin tức mới",
  "description": "Mô tả ngắn gọn",
  "content": "Nội dung chi tiết đầy đủ",
  "image": "https://example.com/image.jpg",
  "author": "Cool Team",
  "category": "news"
}
```

### Directly in JSON (manual)
```json
{
  "id": 7,
  "title": "Tin tức mới",
  "slug": "tin-tuc-moi",
  "date": "2025-09-05",
  "author": "Cool Team",
  "image": "https://example.com/image.jpg",
  "description": "Mô tả ngắn gọn",
  "content": "Nội dung chi tiết đầy đủ",
  "status": "published",
  "category": "news",
  "createdAt": "2025-09-05T14:00:00.000Z",
  "updatedAt": "2025-09-05T14:00:00.000Z"
}
```

## 🎯 Benefits of This Structure

### ✅ Advantages
- **Separation of Concerns:** Data tách riêng khỏi logic
- **Easy to Maintain:** Dữ liệu dễ chỉnh sửa trực tiếp
- **Type Safety:** JSDoc cung cấp IntelliSense
- **Auto Persistence:** Tự động lưu thay đổi
- **Scalable:** Dễ dàng chuyển sang database thực

### 🚀 Migration Path
- **Phase 1:** JSON file (hiện tại)
- **Phase 2:** SQLite database  
- **Phase 3:** MySQL/PostgreSQL
- **Phase 4:** MongoDB

## 🔍 Search Features

### Basic Search (trong findAll)
- Tìm trong: title, description, content
- Phân trang và lọc danh mục

### Advanced Search (method riêng)
- Ranking theo mức độ liên quan
- Highlight kết quả tìm thấy
- Search info metadata

## 📋 Example Usage

```javascript
// Load tất cả tin tức
const allNews = await NewsModel.findAll();

// Tìm kiếm với highlight
const searchResults = await NewsModel.search("montessori");
console.log(searchResults.data[0].searchHighlight);
// { keyword: "montessori", foundIn: ["content"] }

// Lấy danh mục
const categories = await NewsModel.getCategories();
// ["program", "culture"]
```
