const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const CommentRepository = require("../../Domains/comments/CommentRepository");
const AddedComment = require("../../Domains/comments/entities/AddedComment");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(payload) {
    const id = `comment-${this._idGenerator()}`;
    const query = {
      text: "INSERT INTO comments VALUES($1,$2,$3,$4) returning id,content,user_id",
      values: [id, payload.content, payload.userId, payload.threadId],
    };

    let result = await this._pool.query(query);
    let { id: idComment, content, user_id: userId } = result.rows[0];
    return new AddedComment({
      id: idComment,
      content,
      userId,
    });
  }
  async addReply(payload) {
    const id = `comment-${this._idGenerator()}`;
    const query = {
      text: "INSERT INTO comments VALUES($1,$2,$3,$4) returning id,content,user_id",
      values: [id, payload.content, payload.userId, payload.threadId],
    };

    let result = await this._pool.query(query);
    let { id: idComment, content, user_id: userId } = result.rows[0];
    return new AddedComment({
      id: idComment,
      content,
      userId,
    });
  }

  async deleteComment(payload) {
    const query = {
      text: "UPDATE comments set is_deleted = true where id=$1 ",
      values: [payload.id],
    };

    let result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("comment tidak ditemukan");
    }
    return true;
  }

  async getCommentByThreadId(id) {
    const query = {
      text: `
      select
        t2.id,
        t3.username ,
        t2."date" ,
        case
            when 
            t2.is_deleted = true then '**komentar telah dihapus**'
            else t2."content"
        end content
        from
            threads t1
        join "comments" t2 on
            t1.id = t2.thread_id
        join users t3 on
            t3.id = t2.user_id
        where t1.id =$1`,
      values: [id],
    };

    let result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("comment tidak ditemukan");
    }
    return result.rows;
  }

  async checkCommentById(id) {
    const query = {
      text: "SELECT id FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("comment tidak ada 1");
    }
  }

  async checkCommentBelong({ id, userId }) {
    const query = {
      text: "SELECT id FROM comments WHERE id = $1 AND user_id=$2",
      values: [id, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError("comment tidak ada 2");
    }
  }
}
module.exports = CommentRepositoryPostgres;
