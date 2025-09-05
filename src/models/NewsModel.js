import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * News Item Data Structure
 * @typedef {Object} NewsItem
 * @property {number} id - ID tin tức (integer, required)
 * @property {string} title - Tiêu đề tin tức (string, required, max: 200)
 * @property {string} slug - URL slug (string, auto-generated from title)
 * @property {string} date - Ngày đăng (date format: YYYY-MM-DD)
 * @property {string} author - Tác giả (string, default: "Cool Team")
 * @property {string} image - URL hình ảnh (string, URL format)
 * @property {string} description - Mô tả ngắn (string, required, max: 500)
 * @property {string} content - Nội dung chi tiết (string, required)
 * @property {string} status - Trạng thái (enum: 'published'|'draft'|'archived', default: 'published')
 * @property {string} category - Danh mục (enum: 'program'|'culture'|'news'|'event', default: 'program')
 * @property {Date} createdAt - Ngày tạo (Date, auto-generated)
 * @property {Date} updatedAt - Ngày cập nhật (Date, auto-updated)
 */

/**
 * Search Highlight Data Structure
 * @typedef {Object} SearchHighlight
 * @property {string} keyword - Từ khóa tìm kiếm
 * @property {string[]} foundIn - Các trường tìm thấy ['title'|'description'|'content']
 */

/**
 * Pagination Data Structure
 * @typedef {Object} Pagination
 * @property {number} currentPage - Trang hiện tại
 * @property {number} totalPages - Tổng số trang
 * @property {number} totalItems - Tổng số item
 * @property {number} itemsPerPage - Số item trên mỗi trang
 */

/**
 * Search Info Data Structure
 * @typedef {Object} SearchInfo
 * @property {string} keyword - Từ khóa đã tìm kiếm
 * @property {number} totalMatches - Tổng số kết quả tìm thấy
 */

class NewsModel {
  constructor() {
    // Load dữ liệu từ file JSON
    this.loadNewsData();
    this.nextId = Math.max(...this.news.map((item) => item.id)) + 1;
  }

  /**
   * Load dữ liệu tin tức từ file JSON
   * @private
   */
  loadNewsData() {
    try {
      const dataPath = path.join(__dirname, "../data/newsData.json");
      const rawData = fs.readFileSync(dataPath, "utf8");
      const jsonData = JSON.parse(rawData);

      // Convert date strings to Date objects
      this.news = jsonData.news.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }));
    } catch (error) {
      console.error("Error loading news data:", error);
      this.news = [];
    }
  }

  /**
   * Lưu dữ liệu tin tức vào file JSON
   * @private
   */
  saveNewsData() {
    try {
      const dataPath = path.join(__dirname, "../data/newsData.json");
      const jsonData = {
        news: this.news.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
        })),
      };
      fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2), "utf8");
    } catch (error) {
      console.error("Error saving news data:", error);
    }
  }

  // Lấy tất cả tin tức với phân trang và lọc
  async findAll(options = {}) {
    const {
      page = 1,
      limit = 6,
      category,
      status = "published",
      search,
    } = options;

    let filteredNews = this.news.filter((item) => item.status === status);

    // Lọc theo danh mục
    if (category) {
      filteredNews = filteredNews.filter((item) => item.category === category);
    }

    // Tìm kiếm theo tiêu đề, mô tả hoặc nội dung
    if (search) {
      const searchLower = search.toLowerCase();
      filteredNews = filteredNews.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.content.toLowerCase().includes(searchLower)
      );
    }

    // Sắp xếp theo ngày tạo mới nhất
    filteredNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Phân trang
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    return {
      data: paginatedNews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredNews.length / limit),
        totalItems: filteredNews.length,
        itemsPerPage: limit,
      },
    };
  }

  // Lấy tin tức theo ID
  async findById(id) {
    const newsItem = this.news.find((item) => item.id === parseInt(id));
    if (!newsItem) {
      throw new Error("Tin tức không tồn tại");
    }
    return newsItem;
  }

  // Lấy tin tức theo slug
  async findBySlug(slug) {
    const newsItem = this.news.find((item) => item.slug === slug);
    if (!newsItem) {
      throw new Error("Tin tức không tồn tại");
    }
    return newsItem;
  }

  // Tạo tin tức mới
  async create(data) {
    const newsItem = {
      id: this.nextId++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Tự động tạo slug nếu chưa có
    if (!newsItem.slug) {
      newsItem.slug = this.generateSlug(newsItem.title);
    }

    this.news.push(newsItem);

    // Lưu vào file JSON
    this.saveNewsData();

    return newsItem;
  }

  // Cập nhật tin tức
  async update(id, data) {
    const index = this.news.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw new Error("Tin tức không tồn tại");
    }

    this.news[index] = {
      ...this.news[index],
      ...data,
      updatedAt: new Date(),
    };

    // Lưu vào file JSON
    this.saveNewsData();

    return this.news[index];
  }

  // Xóa tin tức
  async delete(id) {
    const index = this.news.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw new Error("Tin tức không tồn tại");
    }

    const deletedItem = this.news.splice(index, 1)[0];

    // Lưu vào file JSON
    this.saveNewsData();

    return deletedItem;
  }

  // Tạo slug từ tiêu đề
  generateSlug(title) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  }

  // Lấy các danh mục tin tức
  async getCategories() {
    const categories = [...new Set(this.news.map((item) => item.category))];
    return categories;
  }

  // Tìm kiếm tin tức theo từ khóa (tìm trong title, description, content)
  async search(keyword, options = {}) {
    const { page = 1, limit = 6, category, status = "published" } = options;

    if (!keyword || keyword.trim().length === 0) {
      return {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limit,
        },
      };
    }

    let filteredNews = this.news.filter((item) => item.status === status);

    // Lọc theo danh mục nếu có
    if (category) {
      filteredNews = filteredNews.filter((item) => item.category === category);
    }

    // Tìm kiếm trong title, description và content
    const searchLower = keyword.toLowerCase().trim();
    const searchResults = filteredNews.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const descriptionMatch = item.description
        .toLowerCase()
        .includes(searchLower);
      const contentMatch = item.content.toLowerCase().includes(searchLower);

      return titleMatch || descriptionMatch || contentMatch;
    });

    // Sắp xếp theo mức độ liên quan (title > description > content)
    const sortedResults = searchResults.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchLower);
      const bTitle = b.title.toLowerCase().includes(searchLower);
      const aDesc = a.description.toLowerCase().includes(searchLower);
      const bDesc = b.description.toLowerCase().includes(searchLower);

      // Ưu tiên title trước, sau đó description
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      if (aDesc && !bDesc) return -1;
      if (!aDesc && bDesc) return 1;

      // Nếu cùng mức độ, sắp xếp theo ngày tạo
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Phân trang
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = sortedResults.slice(startIndex, endIndex);

    // Highlight từ khóa trong kết quả (thêm thông tin vị trí tìm thấy)
    const highlightedResults = paginatedResults.map((item) => {
      const foundIn = [];
      if (item.title.toLowerCase().includes(searchLower)) foundIn.push("title");
      if (item.description.toLowerCase().includes(searchLower))
        foundIn.push("description");
      if (item.content.toLowerCase().includes(searchLower))
        foundIn.push("content");

      return {
        ...item,
        searchHighlight: {
          keyword: keyword,
          foundIn: foundIn,
        },
      };
    });

    return {
      data: highlightedResults,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(sortedResults.length / limit),
        totalItems: sortedResults.length,
        itemsPerPage: limit,
      },
      searchInfo: {
        keyword: keyword,
        totalMatches: sortedResults.length,
      },
    };
  }
}

export default new NewsModel();
