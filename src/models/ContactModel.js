import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ContactModel {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/ContactData.json");
    this.contacts = this.loadContacts();
    this.nextId = this.getNextId();
  }

  loadContacts() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, "utf8");
        return JSON.parse(data);
      } else {
        // Tạo file với data mẫu nếu chưa tồn tại
        const initialData = [
          {
            id: 1,
            name: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            subject: "Tư vấn chương trình học",
            body: "Tôi muốn tìm hiểu về chương trình tiếng Anh cho trẻ em",
            phone: "0912345678",
            status: "new",
            createdAt: "2024-01-15T00:00:00.000Z",
            updatedAt: "2024-01-15T00:00:00.000Z",
          },
          {
            id: 2,
            name: "Trần Thị B",
            email: "tranthib@email.com",
            subject: "Đăng ký học thử",
            body: "Con tôi 8 tuổi, muốn đăng ký học thử lớp tiếng Anh",
            phone: "0987654321",
            status: "processing",
            createdAt: "2024-01-16T00:00:00.000Z",
            updatedAt: "2024-01-17T00:00:00.000Z",
          },
        ];
        this.saveContacts(initialData);
        return initialData;
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
      return [];
    }
  }

  saveContacts(contacts = this.contacts) {
    try {
      fs.writeFileSync(
        this.dataFile,
        JSON.stringify(contacts, null, 2),
        "utf8"
      );
      this.contacts = contacts;
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  }

  getNextId() {
    if (this.contacts.length === 0) return 1;
    return Math.max(...this.contacts.map((contact) => contact.id)) + 1;
  }

  /**
   * Tạo một liên hệ mới
   * @param {Object} contactData - Dữ liệu liên hệ
   * @param {string} contactData.name - Họ và tên
   * @param {string} contactData.email - Email
   * @param {string} contactData.body - Nội dung liên hệ
   * @param {string} contactData.phone - Số điện thoại (tùy chọn)
   * @param {string} contactData.subject - Chủ đề (tùy chọn)
   * @returns {Object} - Thông tin liên hệ đã tạo
   */
  create(contactData) {
    try {
      // Validate dữ liệu đầu vào
      if (!contactData.name || !contactData.email || !contactData.body) {
        throw new Error("Thiếu thông tin bắt buộc: name, email, body");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email)) {
        throw new Error("Email không hợp lệ");
      }

      // Tạo contact object
      const contact = {
        id: this.nextId++,
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        body: contactData.body.trim(),
        phone: contactData.phone ? contactData.phone.trim() : null,
        subject: contactData.subject
          ? contactData.subject.trim()
          : "Liên hệ từ website",
        status: "new", // new, processing, resolved
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Lưu vào file JSON
      this.contacts.push(contact);
      this.saveContacts();

      return contact;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy tất cả liên hệ
   * @param {Object} options - Tùy chọn lọc và phân trang
   * @param {number} options.page - Trang hiện tại
   * @param {number} options.limit - Số lượng mỗi trang
   * @param {string} options.status - Lọc theo trạng thái
   * @param {string} options.search - Tìm kiếm theo tên hoặc email
   * @returns {Object} - Danh sách liên hệ và thông tin phân trang
   */
  getAll(options = {}) {
    try {
      let filteredContacts = [...this.contacts];

      // Lọc theo trạng thái
      if (options.status) {
        filteredContacts = filteredContacts.filter(
          (contact) => contact.status === options.status
        );
      }

      // Tìm kiếm
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        filteredContacts = filteredContacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.body.toLowerCase().includes(searchTerm)
        );
      }

      // Sắp xếp theo ngày tạo mới nhất
      filteredContacts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Phân trang
      const page = parseInt(options.page) || 1;
      const limit = parseInt(options.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedContacts = filteredContacts.slice(startIndex, endIndex);
      const totalContacts = filteredContacts.length;
      const totalPages = Math.ceil(totalContacts / limit);

      return {
        contacts: paginatedContacts,
        pagination: {
          currentPage: page,
          totalPages,
          totalContacts,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy thông tin liên hệ theo ID
   * @param {number} id - ID của liên hệ
   * @returns {Object|null} - Thông tin liên hệ hoặc null nếu không tìm thấy
   */
  getById(id) {
    try {
      const contact = this.contacts.find(
        (contact) => contact.id === parseInt(id)
      );
      return contact || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái của liên hệ
   * @param {number} id - ID của liên hệ
   * @param {string} status - Trạng thái mới (new, processing, resolved)
   * @returns {Object|null} - Thông tin liên hệ đã cập nhật hoặc null nếu không tìm thấy
   */
  updateStatus(id, status) {
    try {
      const validStatuses = ["new", "processing", "resolved"];
      if (!validStatuses.includes(status)) {
        throw new Error(
          "Trạng thái không hợp lệ. Chỉ chấp nhận: new, processing, resolved"
        );
      }

      const contactIndex = this.contacts.findIndex(
        (contact) => contact.id === parseInt(id)
      );
      if (contactIndex === -1) {
        return null;
      }

      this.contacts[contactIndex].status = status;
      this.contacts[contactIndex].updatedAt = new Date().toISOString();

      // Lưu vào file JSON
      this.saveContacts();

      return this.contacts[contactIndex];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa liên hệ theo ID
   * @param {number} id - ID của liên hệ
   * @returns {boolean} - true nếu xóa thành công, false nếu không tìm thấy
   */
  deleteById(id) {
    try {
      const contactIndex = this.contacts.findIndex(
        (contact) => contact.id === parseInt(id)
      );
      if (contactIndex === -1) {
        return false;
      }

      this.contacts.splice(contactIndex, 1);
      // Lưu vào file JSON
      this.saveContacts();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Đếm số lượng liên hệ theo trạng thái
   * @returns {Object} - Thống kê số lượng theo trạng thái
   */
  getContactStats() {
    try {
      const stats = {
        total: this.contacts.length,
        new: 0,
        processing: 0,
        resolved: 0,
      };

      this.contacts.forEach((contact) => {
        if (stats.hasOwnProperty(contact.status)) {
          stats[contact.status]++;
        }
      });

      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContactModel();
