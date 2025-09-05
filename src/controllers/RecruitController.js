import RecruitModel from "../models/RecruitModel.js";

class RecruitController {
  /**
   * Tạo đăng ký tuyển sinh mới
   */
  async createRecruit(req, res) {
    try {
      const recruitData = req.body;

      // Validate dữ liệu đầu vào
      const requiredFields = [
        "parentName",
        "parentPhone",
        "childName",
        "childBirthdate",
      ];
      const missingFields = requiredFields.filter(
        (field) => !recruitData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Thiếu thông tin bắt buộc: ${missingFields.join(", ")}`,
          error: "MISSING_REQUIRED_FIELDS",
        });
      }

      const newRecruit = RecruitModel.create(recruitData);

      res.status(201).json({
        success: true,
        message: "Đăng ký tuyển sinh thành công",
        data: newRecruit,
      });
    } catch (error) {
      console.error("Error creating recruit:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Lỗi khi tạo đăng ký tuyển sinh",
        error: "CREATE_RECRUIT_ERROR",
      });
    }
  }

  /**
   * Lấy danh sách đăng ký tuyển sinh
   */
  async getAllRecruits(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        status: req.query.status,
        program: req.query.program,
        search: req.query.search,
      };

      const result = RecruitModel.getAll(options);

      res.status(200).json({
        success: true,
        message: "Lấy danh sách đăng ký thành công",
        data: result,
      });
    } catch (error) {
      console.error("Error getting recruits:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi lấy danh sách đăng ký",
        error: "GET_RECRUITS_ERROR",
      });
    }
  }

  /**
   * Lấy đăng ký theo ID
   */
  async getRecruitById(req, res) {
    try {
      const { id } = req.params;
      const recruit = RecruitModel.getById(id);

      if (!recruit) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đăng ký tuyển sinh",
          error: "RECRUIT_NOT_FOUND",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy thông tin đăng ký thành công",
        data: recruit,
      });
    } catch (error) {
      console.error("Error getting recruit by id:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi lấy thông tin đăng ký",
        error: "GET_RECRUIT_ERROR",
      });
    }
  }
}

export default new RecruitController();
