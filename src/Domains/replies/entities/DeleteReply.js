class DeleteReply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.userId = payload.userId;
    this.commentId = payload.commentId;
    this.threadId = payload.threadId;
  }

  _verifyPayload({ userId, threadId, commentId }) {
    if (!userId  || !threadId || !commentId) {
      throw new Error("DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (
      typeof userId !== "string" ||
      typeof threadId !== "string" ||
      typeof commentId !== "string"
    ) {
      throw new Error("DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
module.exports = DeleteReply;
