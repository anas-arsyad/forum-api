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


  async getRepliesByCommentId(commentId) {
    const query = {
      text: `
            select
                r.id,
                r."date" ,
                r.user_id "userId",
                case
                    when 
                    r.is_deleted = true then '**balasan telah dihapus**'
                    else r."content"
                end content
            from
                replies r
            where r.comment_id =$1
            order by
                r."date" asc
            `,
      values: [commentId],
    };

    let result = await this._pool.query(query);
    return result.rows;
  }

  async checkReplyBelong({ id, userId }) {
    const query = {
      text: "SELECT id FROM replies WHERE id = $1 AND user_id=$2",
      values: [id, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError("reply tidak ada 2");
    }
    return true
  }
  async checkReplyById(id) {
    const query = {
      text: "SELECT id FROM replies WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("reply tidak ada ");
    }
    return true;
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
