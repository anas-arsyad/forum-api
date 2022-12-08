class GetDetailThread {
  constructor(threadDetail) {
    this._verifyPayload(threadDetail);

    const { id, title, body, username, date } = threadDetail;

    this.id = id;
    this.title = title;
    this.body = body;
    this.username = username;
    this.date = date;
  }

  _verifyPayload({ id, title, body, username, date }) {
    if (!id || !title || !body || !username || !date) {
      throw new Error("DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof body !== "string" ||
      typeof username !== "string" ||
      !date instanceof Date
    ) {
      throw new Error("DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = GetDetailThread;
