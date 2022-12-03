class AddComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.content = payload.content;
    this.userId = payload.userId;
    this.threadId = payload.threadId;
  }

  _verifyPayload({ userId, content, threadId }) {
    if (!userId || !content || !threadId) {
      throw new Error("ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (typeof content !== "string" || typeof userId !== "string"|| typeof threadId !== "string") {
      throw new Error("ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
module.exports = AddComment;
