import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RecruitModel {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/recruitData.json");
    this.recruits = this.loadRecruits();
    this.nextId = this.getNextId();
  }

  loadRecruits() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, "utf8");
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error loading recruits:", error);
      return [];
    }
  }

  saveRecruits(recruits = this.recruits) {
    try {
      fs.writeFileSync(
        this.dataFile,
        JSON.stringify(recruits, null, 2),
        "utf8"
      );
      this.recruits = recruits;
    } catch (error) {
      console.error("Error saving recruits:", error);
    }
  }

  getNextId() {
    if (this.recruits.length === 0) return 1;
    return Math.max(...this.recruits.map((recruit) => recruit.id)) + 1;
  }

  /**
   * Tạo một đăng ký tuyển sinh mới
   * @param {Object} recruitData - Dữ liệu đăng ký
   * @param {string} recruitData.parentName - Họ tên phụ huynh
   * @param {string} recruitData.parentPhone - Số điện thoại phụ huynh
   * @param {string} recruitData.parentEmail - Email phụ huynh
   * @param {string} recruitData.childName - Họ tên bé
   * @param {string} recruitData.childBirthdate - Ngày sinh của bé
   * @param {string} recruitData.program - Chương trình học
   * @param {string} recruitData.schedule - Thời gian học
   * @param {string} recruitData.notes - Ghi chú
   * @returns {Object} - Thông tin đăng ký đã tạo
   */
  create(recruitData) {
    try {
      // Validate dữ liệu đầu vào
      if (
        !recruitData.parentName ||
        !recruitData.parentPhone ||
        !recruitData.childName ||
        !recruitData.childBirthdate
      ) {
        throw new Error(
          "Thiếu thông tin bắt buộc: parentName, parentPhone, childName, childBirthdate"
        );
      }

      // Validate email format nếu có
      if (recruitData.parentEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recruitData.parentEmail)) {
          throw new Error("Email không hợp lệ");
        }
      }

      // Validate phone format
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(recruitData.parentPhone.replace(/\s|-/g, ""))) {
        throw new Error("Số điện thoại không hợp lệ");
      }

      // Tạo recruit object
      const recruit = {
        id: this.nextId++,
        parentName: recruitData.parentName.trim(),
        parentPhone: recruitData.parentPhone.trim(),
        parentEmail: recruitData.parentEmail
          ? recruitData.parentEmail.trim().toLowerCase()
          : null,
        childName: recruitData.childName.trim(),
        childBirthdate: recruitData.childBirthdate,
        program: recruitData.program || null,
        schedule: recruitData.schedule || null,
        notes: recruitData.notes ? recruitData.notes.trim() : null,
        status: "new", // new, processing, confirmed, rejected
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Lưu vào file JSON
      this.recruits.push(recruit);
      this.saveRecruits();

      return recruit;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy tất cả đăng ký tuyển sinh
   * @param {Object} options - Tùy chọn lọc và phân trang
   * @param {number} options.page - Trang hiện tại
   * @param {number} options.limit - Số lượng mỗi trang
   * @param {string} options.status - Lọc theo trạng thái
   * @param {string} options.program - Lọc theo chương trình
   * @param {string} options.search - Tìm kiếm theo tên
   * @returns {Object} - Danh sách đăng ký và thông tin phân trang
   */
  getAll(options = {}) {
    try {
      let filteredRecruits = [...this.recruits];

      // Lọc theo trạng thái
      if (options.status) {
        filteredRecruits = filteredRecruits.filter(
          (recruit) => recruit.status === options.status
        );
      }

      // Lọc theo chương trình
      if (options.program) {
        filteredRecruits = filteredRecruits.filter(
          (recruit) => recruit.program === options.program
        );
      }

      // Tìm kiếm
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        filteredRecruits = filteredRecruits.filter(
          (recruit) =>
            recruit.parentName.toLowerCase().includes(searchTerm) ||
            recruit.childName.toLowerCase().includes(searchTerm) ||
            (recruit.parentEmail &&
              recruit.parentEmail.toLowerCase().includes(searchTerm))
        );
      }

      // Sắp xếp theo ngày tạo mới nhất
      filteredRecruits.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Phân trang
      const page = parseInt(options.page) || 1;
      const limit = parseInt(options.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedRecruits = filteredRecruits.slice(startIndex, endIndex);
      const totalRecruits = filteredRecruits.length;
      const totalPages = Math.ceil(totalRecruits / limit);

      return {
        recruits: paginatedRecruits,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalRecruits,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy đăng ký theo ID
   * @param {number} id - ID của đăng ký
   * @returns {Object|null} - Thông tin đăng ký hoặc null nếu không tìm thấy
   */
  getById(id) {
    try {
      const recruit = this.recruits.find(
        (recruit) => recruit.id === parseInt(id)
      );
      return recruit || null;
    } catch (error) {
      throw error;
    }
  }
}

export default new RecruitModel();
