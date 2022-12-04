/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const RepliesTableTestHelper = {
  async addReply({
    id = "reply-123",
    content = "Test content",
    commentId = "comment-kjasld",
    userId = "user-123",
    date=new Date()
  }) {
    const query = {
      text: "INSERT INTO replies VALUES($1,$2,$3,$4,$5,$6) returning id,content,user_id",
      values: [id, content, userId, commentId,false,date],
    };

    await pool.query(query);
  },

  async selectAll() {
    const query = {
      text: "SELECT * FROM replies",
      values: [],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findReplyById(id) {
    const query = {
      text: "SELECT * FROM replies WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM replies WHERE 1=1");
  },

  async deleteReply(payload) {
    const query = {
      text: "UPDATE replies set is_deleted = true where id=$1 ",
      values: [payload.id],
    };

    let result = await pool.query(query);
    
    return result.rows;
  }
};

module.exports = RepliesTableTestHelper;
