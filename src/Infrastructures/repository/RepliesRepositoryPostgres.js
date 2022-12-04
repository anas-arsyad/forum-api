const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const RepliesRepository = require("../../Domains/replies/RepliesRepository");

class RepliesRepositoryPostgres extends RepliesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(payload) {
    const id = `reply-${this._idGenerator()}`;
    const query = {
      text: "INSERT INTO replies VALUES($1,$2,$3,$4) returning id,content,user_id",
      values: [id, payload.content, payload.userId, payload.commentId],
    };

    let result = await this._pool.query(query);
    let { id: idReply, content, user_id: userId } = result.rows[0];
    return {
      id: idReply,
      content,
      userId,
    };
  }

  async deleteReply(payload) {
    const query = {
      text: "UPDATE replies set is_deleted = true where id=$1 ",
      values: [payload.id],
    };

    let result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("replies tidak ditemukan");
    }
    return true;
  }

 
}
module.exports = RepliesRepositoryPostgres;