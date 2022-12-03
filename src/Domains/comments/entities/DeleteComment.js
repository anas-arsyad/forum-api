class DeleteComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.userId = payload.userId;
    this.threadId = payload.threadId;
  }

  _verifyPayload({ userId, id, threadId }) {
    if (!userId || !id || !threadId) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (
      typeof id !== "string" ||
      typeof userId !== "string" ||
      typeof threadId !== "string"
    ) {
      throw new Error("DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
module.exports = DeleteComment;
