class NewsModel {
  constructor() {
    // Khởi tạo dữ liệu tin tức (có thể thay thế bằng database thực)
    this.news = [
      {
        id: 1,
        title: "Hệ quốc tế Anh - Nhật",
        slug: "he-quoc-te-anh-nhat",
        date: "2019-02-22",
        author: "Cool Team",
        image:
          "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/1.jpg?v=1550778252097",
        description:
          "Bên cạnh tiếng Anh, tiếng Nhật cũng là một trong những ngôn ngữ của thời kỳ hội nhập toàn cầu.",
        content:
          "Bên cạnh tiếng Anh, tiếng Nhật cũng là một trong những ngôn ngữ của thời kỳ hội nhập toàn cầu. Trường Mầm non Quốc tế Cool School đã triển khai chương trình đào tạo song ngữ Anh - Nhật để giúp các em học sinh có thể tiếp cận với văn hóa và ngôn ngữ Nhật Bản một cách tự nhiên và hiệu quả nhất.",
        status: "published",
        category: "program",
        createdAt: new Date("2019-02-22"),
        updatedAt: new Date("2019-02-22"),
      },
      {
        id: 2,
        title: "Hệ đào tạo song ngữ",
        slug: "he-dao-tao-song-ngu",
        date: "2019-02-22",
        author: "Cool Team",
        image:
          "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/6.jpg?v=1550778312287",
        description:
          "Với mong muốn giúp trẻ đa dạng ngôn ngữ trong thời kỳ hội nhập, Trường Mầm non Quốc tế Cool School đã xây dựng hệ đào tạo song ngữ.",
        content:
          "Với mong muốn giúp trẻ đa dạng ngôn ngữ trong thời kỳ hội nhập, Trường Mầm non Quốc tế Cool School đã xây dựng hệ đào tạo song ngữ với môi trường học tập tự nhiên, giúp các em tiếp thu kiến thức một cách hiệu quả nhất.",
        status: "published",
        category: "program",
        createdAt: new Date("2019-02-22"),
        updatedAt: new Date("2019-02-22"),
      },
      {
        id: 3,
        title: "Hệ quốc tế Anh - Anh",
        slug: "he-quoc-te-anh-anh",
        date: "2019-02-22",
        author: "Cool Team",
        image:
          "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/9.jpg?v=1550778282473",
        description:
          "Trong xu thế tiếng Anh đã trở thành ngôn ngữ toàn cầu, ngay từ khi còn nhỏ, các bậc phụ huynh đã quan tâm đến việc dạy tiếng Anh cho con.",
        content:
          "Trong xu thế tiếng Anh đã trở thành ngôn ngữ toàn cầu, ngay từ khi còn nhỏ, các bậc phụ huynh đã quan tâm đến việc dạy tiếng Anh cho con. Chương trình Anh - Anh của Cool School được thiết kế để tạo môi trường học tập hoàn toàn bằng tiếng Anh.",
        status: "published",
        category: "program",
        createdAt: new Date("2019-02-22"),
        updatedAt: new Date("2019-02-22"),
      },
      {
        id: 4,
        title: "Chương trình học chuẩn quốc tế",
        slug: "chuong-trinh-hoc-chuan-quoc-te",
        date: "2019-02-22",
        author: "Cool Team",
        image:
          "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/7.jpg?v=1550779824993",
        description:
          "Được thiết kế và triển khai theo triết lý giáo dục của tiến sĩ Maria Montessori (31/8/1870 – 6/5/1952).",
        content:
          "Được thiết kế và triển khai theo triết lý giáo dục của tiến sĩ Maria Montessori (31/8/1870 – 6/5/1952), chương trình giáo dục của Cool School tập trung vào việc phát triển toàn diện các kỹ năng của trẻ thông qua các hoạt động thực hành.",
        status: "published",
        category: "program",
        createdAt: new Date("2019-02-22"),
        updatedAt: new Date("2019-02-22"),
      },
      {
        id: 5,
        title: "Chương trình Văn - Thể - Mỹ",
        slug: "chuong-trinh-van-the-my",
        date: "2019-02-22",
        author: "Cool Team",
        image:
          "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/8.jpg?v=1550779730693",
        description:
          "Cùng với sự phát triển của chương trình học thuật, chương trình phát triển Văn – Thể – Mỹ cũng là một phần quan trọng.",
        content:
          "Cùng với sự phát triển của chương trình học thuật, chương trình phát triển Văn – Thể – Mỹ cũng là một phần quan trọng trong việc giáo dục toàn diện cho trẻ. Chương trình này giúp trẻ phát triển các kỹ năng sáng tạo, thể chất và thẩm mỹ.",
        status: "published",
        category: "program",
        createdAt: new Date("2019-02-22"),
        updatedAt: new Date("2019-02-22"),
      },
      {
        id: 6,
        title: "Chương trình học văn hóa nhật",
        slug: "chuong-trinh-hoc-van-hoa-nhat",
        date: "2019-02-22",
        author: "Cool Team",
        image:
          "https://bizweb.dktcdn.net/thumb/large/100/347/562/articles/3.jpg?v=1550779664717",
        description:
          "Kỹ năng sống là một trong những kiến thức nền tảng quan trọng nhất, quyết định sự tồn tại, phát triển.",
        content:
          "Kỹ năng sống là một trong những kiến thức nền tảng quan trọng nhất, quyết định sự tồn tại, phát triển của con người trong xã hội hiện đại. Chương trình văn hóa Nhật của Cool School giúp trẻ học được những kỹ năng sống quý báu từ văn hóa Nhật Bản.",
        status: "published",
        category: "culture",
        createdAt: new Date("2019-02-22"),
        updatedAt: new Date("2019-02-22"),
      },
    ];
    this.nextId = 7;
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

    return this.news[index];
  }

  // Xóa tin tức
  async delete(id) {
    const index = this.news.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw new Error("Tin tức không tồn tại");
    }

    const deletedItem = this.news.splice(index, 1)[0];
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
