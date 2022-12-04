const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedThread = require("../../Domains/threads/entities/AddedThread");
const GetDetailThread = require("../../Domains/threads/entities/GetDetailThread");
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

  async getThreadById(id) {
    const query = {
      text: `
        select
            t.id,
            t.title ,
            t.body ,
            t.date ,
            u.username
        from
            threads t
        join users u on
            t.user_id = u.id
        WHERE t.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("thread tidak ada ");
    }
    const {
      id: idThread,
      title,
      body,
      date,
      username,
    } = result.rows[0];
    return new GetDetailThread({ id: idThread, title, body, username, date });
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
    return true
  }
}

module.exports = ThreadRepositoryPostgres;
