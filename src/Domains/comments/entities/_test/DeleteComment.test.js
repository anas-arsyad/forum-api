const DeleteComment= require('../DeleteComment')

describe("test delete comment entitis", () => {
  it("should throw error if payload not match", async () => {
    const payload = {
      userId:'user-jsvdfl',
      // id: "comment-akjfw2",
      threadId:'thread-asd23'
    };
    expect(() => new DeleteComment(payload)).toThrowError(
      "DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error if payload data type not match", async () => {
    const payload = {
      userId: "user-jsvdfl",
      id: 123,
      threadId:'thread-asd23'
    };
    expect(() => new DeleteComment(payload)).toThrowError(
      "DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return correct object", async () => {
    /* arrange */
    const payload = {
      userId:'user-jsvdfl',
      id: "comment-akjfw2",
      threadId:'thread-asd23'
    };

    /* action */
    let deleteComment = new DeleteComment(payload);

    /* assert */
    expect(deleteComment.id).toEqual(payload.id);
    expect(deleteComment.userId).toEqual(payload.userId);
    expect(deleteComment.threadId).toEqual(payload.threadId);
  });
});
