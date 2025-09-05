import express from "express";
import ContactController from "../controllers/ContactController.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: ID tự động sinh của liên hệ
 *         name:
 *           type: string
 *           description: Họ và tên người liên hệ
 *           example: "Nguyễn Văn A"
 *         email:
 *           type: string
 *           format: email
 *           description: Email người liên hệ
 *           example: "nguyenvana@gmail.com"
 *         body:
 *           type: string
 *           description: Nội dung liên hệ
 *           example: "Tôi muốn hỏi về chương trình học tại trường..."
 *         phone:
 *           type: string
 *           description: Số điện thoại (tùy chọn)
 *           example: "0901234567"
 *         subject:
 *           type: string
 *           description: Chủ đề liên hệ (tùy chọn)
 *           example: "Hỏi về tuyển sinh"
 *         status:
 *           type: string
 *           enum: [new, processing, resolved]
 *           description: Trạng thái xử lý
 *           example: "new"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật cuối
 *
 *     ContactCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - body
 *       properties:
 *         name:
 *           type: string
 *           description: Họ và tên người liên hệ
 *           example: "Nguyễn Văn A"
 *         email:
 *           type: string
 *           format: email
 *           description: Email người liên hệ
 *           example: "nguyenvana@gmail.com"
 *         body:
 *           type: string
 *           description: Nội dung liên hệ
 *           example: "Tôi muốn hỏi về chương trình học tại trường..."
 *         phone:
 *           type: string
 *           description: Số điện thoại (tùy chọn)
 *           example: "0901234567"
 *         subject:
 *           type: string
 *           description: Chủ đề liên hệ (tùy chọn)
 *           example: "Hỏi về tuyển sinh"
 *
 *     ContactStats:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Tổng số liên hệ
 *           example: 150
 *         new:
 *           type: integer
 *           description: Số liên hệ mới
 *           example: 25
 *         processing:
 *           type: integer
 *           description: Số liên hệ đang xử lý
 *           example: 50
 *         resolved:
 *           type: integer
 *           description: Số liên hệ đã giải quyết
 *           example: 75
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API quản lý liên hệ từ website
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Tạo liên hệ mới từ form website
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactCreate'
 *     responses:
 *       201:
 *         description: Tạo liên hệ thành công
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
 *                   example: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Nguyễn Văn A"
 *                     email:
 *                       type: string
 *                       example: "nguyenvana@gmail.com"
 *                     subject:
 *                       type: string
 *                       example: "Liên hệ từ website"
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Vui lòng điền đầy đủ thông tin bắt buộc"
 *                 error:
 *                   type: string
 *                   example: "VALIDATION_ERROR"
 *       500:
 *         description: Lỗi server
 */
router.post("/", ContactController.createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Lấy danh sách tất cả liên hệ (dành cho admin)
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng mỗi trang
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, processing, resolved]
 *         description: Lọc theo trạng thái
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên, email hoặc nội dung
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
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
 *                   example: "Lấy danh sách liên hệ thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalContacts:
 *                       type: integer
 *                       example: 50
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrev:
 *                       type: boolean
 *                       example: false
 */
router.get("/", ContactController.getAllContacts);

/**
 * @swagger
 * /api/contacts/stats:
 *   get:
 *     summary: Lấy thống kê liên hệ
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Lấy thống kê thành công
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
 *                   example: "Lấy thống kê liên hệ thành công"
 *                 data:
 *                   $ref: '#/components/schemas/ContactStats'
 */
router.get("/stats", ContactController.getContactStats);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Lấy thông tin liên hệ theo ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của liên hệ
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
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
 *                   example: "Lấy thông tin liên hệ thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Không tìm thấy liên hệ
 */
router.get("/:id", ContactController.getContactById);

/**
 * @swagger
 * /api/contacts/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái liên hệ
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của liên hệ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [new, processing, resolved]
 *                 example: "processing"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
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
 *                   example: "Cập nhật trạng thái liên hệ thành công"
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Không tìm thấy liên hệ
 */
router.put("/:id/status", ContactController.updateContactStatus);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Xóa liên hệ
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của liên hệ
 *     responses:
 *       200:
 *         description: Xóa thành công
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
 *                   example: "Xóa liên hệ thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Không tìm thấy liên hệ
 */
router.delete("/:id", ContactController.deleteContact);

export default router;
