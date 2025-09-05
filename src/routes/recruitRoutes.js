import express from "express";
import RecruitController from "../controllers/RecruitController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Recruit:
 *       type: object
 *       required:
 *         - parentName
 *         - parentPhone
 *         - childName
 *         - childBirthdate
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của đăng ký tuyển sinh
 *         parentName:
 *           type: string
 *           description: Họ tên phụ huynh
 *         parentPhone:
 *           type: string
 *           description: Số điện thoại phụ huynh
 *         parentEmail:
 *           type: string
 *           format: email
 *           description: Email phụ huynh
 *         childName:
 *           type: string
 *           description: Họ tên bé
 *         childBirthdate:
 *           type: string
 *           format: date
 *           description: Ngày sinh của bé
 *         program:
 *           type: string
 *           enum: [standard, usa, japan]
 *           description: Chương trình học quan tâm
 *         schedule:
 *           type: string
 *           enum: [half-day, full-day, extended]
 *           description: Thời gian học
 *         notes:
 *           type: string
 *           description: Ghi chú
 *         status:
 *           type: string
 *           enum: [new, processing, confirmed, rejected]
 *           description: Trạng thái đăng ký
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật
 */

/**
 * @swagger
 * /api/recruits:
 *   post:
 *     summary: Tạo đăng ký tuyển sinh mới
 *     tags: [Recruits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parentName
 *               - parentPhone
 *               - childName
 *               - childBirthdate
 *             properties:
 *               parentName:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               parentPhone:
 *                 type: string
 *                 example: "0912345678"
 *               parentEmail:
 *                 type: string
 *                 example: "nguyenvana@email.com"
 *               childName:
 *                 type: string
 *                 example: "Nguyễn Minh An"
 *               childBirthdate:
 *                 type: string
 *                 format: date
 *                 example: "2018-05-15"
 *               program:
 *                 type: string
 *                 example: "standard"
 *               schedule:
 *                 type: string
 *                 example: "full-day"
 *               notes:
 *                 type: string
 *                 example: "Con tôi rất thích học tiếng Anh"
 *     responses:
 *       201:
 *         description: Đăng ký tuyển sinh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đăng ký tuyển sinh thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Recruit'
 *       400:
 *         description: Lỗi dữ liệu đầu vào
 */
router.post("/", RecruitController.createRecruit);

/**
 * @swagger
 * /api/recruits:
 *   get:
 *     summary: Lấy danh sách đăng ký tuyển sinh
 *     tags: [Recruits]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Số lượng items mỗi trang
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, processing, confirmed, rejected]
 *         description: Lọc theo trạng thái
 *       - in: query
 *         name: program
 *         schema:
 *           type: string
 *           enum: [standard, usa, japan]
 *         description: Lọc theo chương trình
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên phụ huynh hoặc tên bé
 *     responses:
 *       200:
 *         description: Danh sách đăng ký tuyển sinh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Lấy danh sách đăng ký thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     recruits:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Recruit'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                         totalItems:
 *                           type: integer
 *                         itemsPerPage:
 *                           type: integer
 *                         hasNextPage:
 *                           type: boolean
 *                         hasPrevPage:
 *                           type: boolean
 */
router.get("/", RecruitController.getAllRecruits);

/**
 * @swagger
 * /api/recruits/{id}:
 *   get:
 *     summary: Lấy đăng ký tuyển sinh theo ID
 *     tags: [Recruits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của đăng ký tuyển sinh
 *     responses:
 *       200:
 *         description: Thông tin đăng ký tuyển sinh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Lấy thông tin đăng ký thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Recruit'
 *       404:
 *         description: Không tìm thấy đăng ký tuyển sinh
 */
router.get("/:id", RecruitController.getRecruitById);

export default router;
