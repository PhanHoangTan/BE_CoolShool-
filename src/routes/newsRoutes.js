import express from "express";
import NewsController from "../controllers/NewsController.js";
import { validateNewsData, validatePagination } from "../middleware/index.js";

const router = express.Router();

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Lấy danh sách tin tức
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Số trang (mặc định 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Số item trên mỗi trang (mặc định 6)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Lọc theo danh mục
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tiêu đề hoặc mô tả
 *     responses:
 *       200:
 *         description: Danh sách tin tức
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/News'
 *       400:
 *         description: Lỗi validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validatePagination, NewsController.getAllNews);

/**
 * @swagger
 * /api/news/categories:
 *   get:
 *     summary: Lấy danh sách danh mục tin tức
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Danh sách danh mục
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.get("/categories", NewsController.getCategories);

/**
 * @swagger
 * /api/news/search:
 *   get:
 *     summary: Tìm kiếm tin tức theo từ khóa
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa cần tìm kiếm (tìm trong title, description, content)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Số trang (mặc định 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Số item trên mỗi trang (mặc định 6)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Lọc theo danh mục
 *     responses:
 *       200:
 *         description: Kết quả tìm kiếm
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/News'
 *                           - type: object
 *                             properties:
 *                               searchHighlight:
 *                                 type: object
 *                                 properties:
 *                                   keyword:
 *                                     type: string
 *                                     description: Từ khóa tìm kiếm
 *                                   foundIn:
 *                                     type: array
 *                                     items:
 *                                       type: string
 *                                       enum: [title, description, content]
 *                                     description: Các trường tìm thấy từ khóa
 *                     searchInfo:
 *                       type: object
 *                       properties:
 *                         keyword:
 *                           type: string
 *                           description: Từ khóa đã tìm kiếm
 *                         totalMatches:
 *                           type: integer
 *                           description: Tổng số kết quả tìm thấy
 *       400:
 *         description: Thiếu từ khóa tìm kiếm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/search", NewsController.searchNews);

/**
 * @swagger
 * /api/news/slug/{slug}:
 *   get:
 *     summary: Lấy tin tức theo slug
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: URL slug của tin tức
 *     responses:
 *       200:
 *         description: Chi tiết tin tức
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/News'
 *       404:
 *         description: Không tìm thấy tin tức
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/slug/:slug", NewsController.getNewsBySlug);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Lấy tin tức theo ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của tin tức
 *     responses:
 *       200:
 *         description: Chi tiết tin tức
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/News'
 *       404:
 *         description: Không tìm thấy tin tức
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", NewsController.getNewsById);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Tạo tin tức mới
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsInput'
 *     responses:
 *       201:
 *         description: Tạo tin tức thành công
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/News'
 *       400:
 *         description: Lỗi validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateNewsData, NewsController.createNews);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Cập nhật tin tức
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của tin tức
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsInput'
 *     responses:
 *       200:
 *         description: Cập nhật tin tức thành công
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/News'
 *       400:
 *         description: Lỗi validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Không tìm thấy tin tức
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateNewsData, NewsController.updateNews);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Xóa tin tức
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của tin tức
 *     responses:
 *       200:
 *         description: Xóa tin tức thành công
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/News'
 *       404:
 *         description: Không tìm thấy tin tức
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", NewsController.deleteNews);

export default router;
