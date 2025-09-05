import NewsModel from "../models/NewsModel.js";

export class NewsController {
  // [GET] /api/news - Lấy danh sách tin tức
  async getAllNews(req, res) {
    try {
      const { page, limit, category, search } = req.query;
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 6,
        category,
        search,
      };

      const result = await NewsModel.findAll(options);

      res.json({
        success: true,
        message: "Lấy danh sách tin tức thành công",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy danh sách tin tức",
        error: error.message,
      });
    }
  }

  // [GET] /api/news/:id - Lấy tin tức theo ID
  async getNewsById(req, res) {
    try {
      const { id } = req.params;
      const newsItem = await NewsModel.findById(id);

      res.json({
        success: true,
        message: "Lấy tin tức thành công",
        data: newsItem,
      });
    } catch (error) {
      const statusCode = error.message === "Tin tức không tồn tại" ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // [GET] /api/news/slug/:slug - Lấy tin tức theo slug
  async getNewsBySlug(req, res) {
    try {
      const { slug } = req.params;
      const newsItem = await NewsModel.findBySlug(slug);

      res.json({
        success: true,
        message: "Lấy tin tức thành công",
        data: newsItem,
      });
    } catch (error) {
      const statusCode = error.message === "Tin tức không tồn tại" ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // [POST] /api/news - Tạo tin tức mới
  async createNews(req, res) {
    try {
      const { title, description, content, image, author, category } = req.body;

      // Validation
      if (!title || !description || !content) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc (title, description, content)",
        });
      }

      const newsData = {
        title,
        description,
        content,
        image: image || "",
        author: author || "Cool Team",
        category: category || "program",
        date: new Date().toISOString().split("T")[0],
        status: "published",
      };

      const newNews = await NewsModel.create(newsData);

      res.status(201).json({
        success: true,
        message: "Tạo tin tức thành công",
        data: newNews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server khi tạo tin tức",
        error: error.message,
      });
    }
  }

  // [PUT] /api/news/:id - Cập nhật tin tức
  async updateNews(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedNews = await NewsModel.update(id, updateData);

      res.json({
        success: true,
        message: "Cập nhật tin tức thành công",
        data: updatedNews,
      });
    } catch (error) {
      const statusCode = error.message === "Tin tức không tồn tại" ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // [DELETE] /api/news/:id - Xóa tin tức
  async deleteNews(req, res) {
    try {
      const { id } = req.params;
      const deletedNews = await NewsModel.delete(id);

      res.json({
        success: true,
        message: "Xóa tin tức thành công",
        data: deletedNews,
      });
    } catch (error) {
      const statusCode = error.message === "Tin tức không tồn tại" ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // [GET] /api/news/categories - Lấy danh sách danh mục
  async getCategories(req, res) {
    try {
      const categories = await NewsModel.getCategories();

      res.json({
        success: true,
        message: "Lấy danh sách danh mục thành công",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy danh mục",
        error: error.message,
      });
    }
  }

  // [GET] /api/news/search - Tìm kiếm tin tức theo từ khóa
  async searchNews(req, res) {
    try {
      const { keyword, page, limit, category } = req.query;

      if (!keyword) {
        return res.status(400).json({
          success: false,
          message: "Từ khóa tìm kiếm là bắt buộc",
        });
      }

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 6,
        category,
      };

      const result = await NewsModel.search(keyword, options);

      res.json({
        success: true,
        message:
          result.data.length > 0
            ? `Tìm thấy ${result.searchInfo.totalMatches} kết quả cho từ khóa "${keyword}"`
            : `Không tìm thấy kết quả nào cho từ khóa "${keyword}"`,
        data: result.data,
        pagination: result.pagination,
        searchInfo: result.searchInfo,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server khi tìm kiếm tin tức",
        error: error.message,
      });
    }
  }
}

export default new NewsController();
