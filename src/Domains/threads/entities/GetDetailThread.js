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

    date = typeof date === "string" || date instanceof Date ? false : true;
    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof body !== "string" ||
      typeof username !== "string" ||
      date
    ) {
      throw new Error("DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = GetDetailThread;
