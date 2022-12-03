class AddedComment {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, userId, content } = payload;

    this.id = id;
    this.userId = userId;
    this.content = content;
  }

  _verifyPayload({ id, userId, content }) {
    if (!id || !userId || !content) {
      throw new Error("ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (
      typeof id !== "string" ||
      typeof userId !== "string" ||
      typeof content !== "string"
    ) {
      throw new Error("ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }
  }
}
module.exports = AddedComment;
