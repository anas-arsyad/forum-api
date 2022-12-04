const DeleteReply= require('../DeleteReply')

describe("test addcoment entitis", () => {
  it("should throw error if payload not match", async () => {
    const payload = {
      userId:'user-jsvdfl',
      threadId:'thread-asd23',
      // commentId:'comment-asd2qw3',
    };
    expect(() => new DeleteReply(payload)).toThrowError(
      "DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error if payload data type not match", async () => {
    const payload = {
      userId: "user-jsvdfl",
      threadId:'thread-asd23',
      commentId:13422134,
    };
    expect(() => new DeleteReply(payload)).toThrowError(
      "DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return correct object", async () => {
    /* arrange */
    const payload = {
      userId: "user-jsvdfl",
      threadId:'thread-asd23',
      commentId:'comment-asd2qw3',
    };

    /* action */
    let deleteReply = new DeleteReply(payload);

    /* assert */
    expect(deleteReply.userId).toEqual(payload.userId);
    expect(deleteReply.threadId).toEqual(payload.threadId);
    expect(deleteReply.commentId).toEqual(payload.commentId);
  });
});