/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
  async addComment({
    id = "comment-123",
    content = "Test content",
    threadId = "thread-kjasld",
    userId = "user-123",
    isDeleted = false,
  }) {
    const query = {
      text: "INSERT INTO comments VALUES($1,$2,$3,$4,$5) returning id,content,user_id",
      values: [id, content, userId, threadId,isDeleted],
    };

    await pool.query(query);
  },

  async selectAll() {
    const query = {
      text: "SELECT * FROM comments",
      values: [],
    };

    const result = await pool.query(query);
    return result.rows;
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

  // async addReply({
  //   id = 'reply-123', content = 'Super Comment', threadId = 'thread-99999', userId = 'user-999999',
  //   isDeleted = false, commentId = 'comment-1234',
  // }) {
  //   const query = {
  //     text: 'INSERT INTO comments (id, content, thread_Id, user_id, reply_to, is_deleted) VALUES($1, $2, $3, $4, $5, $6)',
  //     values: [id, content, threadId, userId, commentId, isDeleted],
  //   };

  //   await pool.query(query);
  // },

  async deleteComment(payload) {
    const query = {
      text: "UPDATE comments set is_deleted = true where id=$1 ",
      values: [payload.id],
    };

    let result = await pool.query(query);
    
    return result.rows;
  }
};

module.exports = CommentsTableTestHelper;
