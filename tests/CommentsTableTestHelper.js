/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
  async addThread({
    id = "comment-123",
    content = "Test content",
    thread_id = "thread-kjasld",
    userId = "user-123",
  }) {
    const query = {
      text: "INSERT INTO comments (id, content,  user_id,thread_id) VALUES($1, $2, $3, $4)",
      values: [id, content, userId, thread_id],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentsTableTestHelper;
