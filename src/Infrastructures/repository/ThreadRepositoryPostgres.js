const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedThread = require("../../Domains/threads/entities/AddedThread");
const ThreadRepository = require("../../Domains/threads/ThreadRepository");

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(payload) {
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: "INSERT INTO threads VALUES($1,$2,$3,$4) returning id,title,user_id",
      values: [id, payload.title, payload.body, payload.userId],
    };

    let result = await this._pool.query(query);
    let { id: idThread, title, user_id: userId } = result.rows[0];
    return new AddedThread({
      id: idThread,
      title,
      userId,
    });
  }

  async checkThreadById(id) {
    const query = {
      text: "SELECT id FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("thread tidak ada ");
    }
  }
}

module.exports = ThreadRepositoryPostgres;
