class AddReply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.content = payload.content;
    this.userId = payload.userId;
    this.commentId = payload.commentId;
    this.threadId = payload.threadId;
  }

  _verifyPayload({ userId, content, threadId, commentId }) {
    if (!userId || !content || !threadId || !commentId) {
      throw new Error("ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (
      typeof content !== "string" ||
      typeof userId !== "string" ||
      typeof threadId !== "string" ||
      typeof commentId !== "string"
    ) {
      throw new Error("ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
module.exports = AddReply;
