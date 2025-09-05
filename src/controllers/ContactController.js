import ContactModel from "../models/ContactModel.js";

class ContactController {
  /**
   * Tạo liên hệ mới
   * POST /api/contacts
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async createContact(req, res) {
    try {
      const { name, email, body, phone, subject } = req.body;

      // Validate dữ liệu đầu vào
      if (!name || !email || !body) {
        return res.status(400).json({
          success: false,
          message:
            "Vui lòng điền đầy đủ thông tin bắt buộc: Họ tên, Email, Nội dung",
          error: "MISSING_REQUIRED_FIELDS",
        });
      }

      // Tạo liên hệ mới
      const contactData = {
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
        phone: phone ? phone.trim() : null,
        subject: subject ? subject.trim() : null,
      };

      const newContact = ContactModel.create(contactData);

      // Log để debug (trong production nên sử dụng proper logging)
      console.log("Liên hệ mới được tạo:", {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        createdAt: newContact.createdAt,
      });

      // Trả về response thành công
      res.status(201).json({
        success: true,
        message:
          "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
        data: {
          id: newContact.id,
          name: newContact.name,
          email: newContact.email,
          subject: newContact.subject,
          createdAt: newContact.createdAt,
        },
      });
    } catch (error) {
      console.error("Lỗi khi tạo liên hệ:", error.message);

      // Trả về lỗi validation
      if (
        error.message.includes("Email không hợp lệ") ||
        error.message.includes("Thiếu thông tin bắt buộc")
      ) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: "VALIDATION_ERROR",
        });
      }

      // Trả về lỗi server
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại sau.",
        error: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  /**
   * Lấy danh sách tất cả liên hệ (dành cho admin)
   * GET /api/contacts
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getAllContacts(req, res) {
    try {
      const { page, limit, status, search } = req.query;

      const options = {
        page: page || 1,
        limit: limit || 10,
        status: status || null,
        search: search || null,
      };

      const result = ContactModel.getAll(options);

      res.status(200).json({
        success: true,
        message: "Lấy danh sách liên hệ thành công",
        data: result.contacts,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách liên hệ:", error.message);

      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi lấy danh sách liên hệ",
        error: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  /**
   * Lấy thông tin liên hệ theo ID
   * GET /api/contacts/:id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getContactById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID không hợp lệ",
          error: "INVALID_ID",
        });
      }

      const contact = ContactModel.getById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy liên hệ với ID này",
          error: "CONTACT_NOT_FOUND",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy thông tin liên hệ thành công",
        data: contact,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin liên hệ:", error.message);

      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi lấy thông tin liên hệ",
        error: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  /**
   * Cập nhật trạng thái liên hệ
   * PUT /api/contacts/:id/status
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async updateContactStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID không hợp lệ",
          error: "INVALID_ID",
        });
      }

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp trạng thái mới",
          error: "MISSING_STATUS",
        });
      }

      const updatedContact = ContactModel.updateStatus(id, status);

      if (!updatedContact) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy liên hệ với ID này",
          error: "CONTACT_NOT_FOUND",
        });
      }

      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái liên hệ thành công",
        data: updatedContact,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái liên hệ:", error.message);

      if (error.message.includes("Trạng thái không hợp lệ")) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: "INVALID_STATUS",
        });
      }

      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi cập nhật trạng thái liên hệ",
        error: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  /**
   * Xóa liên hệ
   * DELETE /api/contacts/:id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async deleteContact(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID không hợp lệ",
          error: "INVALID_ID",
        });
      }

      const isDeleted = ContactModel.deleteById(id);

      if (!isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy liên hệ với ID này",
          error: "CONTACT_NOT_FOUND",
        });
      }

      res.status(200).json({
        success: true,
        message: "Xóa liên hệ thành công",
        data: { id: parseInt(id) },
      });
    } catch (error) {
      console.error("Lỗi khi xóa liên hệ:", error.message);

      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi xóa liên hệ",
        error: "INTERNAL_SERVER_ERROR",
      });
    }
  }

  /**
   * Lấy thống kê liên hệ
   * GET /api/contacts/stats
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getContactStats(req, res) {
    try {
      const stats = ContactModel.getContactStats();

      res.status(200).json({
        success: true,
        message: "Lấy thống kê liên hệ thành công",
        data: stats,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thống kê liên hệ:", error.message);

      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi lấy thống kê liên hệ",
        error: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}

export default new ContactController();
