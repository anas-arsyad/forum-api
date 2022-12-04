const AddReply= require('../AddReply')

describe("test addcoment entitis", () => {
  it("should throw error if payload not match", async () => {
    const payload = {
      // userId:'user-jsvdfl',
      content: "tetsing contentt entites",
      threadId:'thread-asd23',
      commentId:'comment-asd2qw3',
    };
    expect(() => new AddReply(payload)).toThrowError(
      "ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error if payload data type not match", async () => {
    const payload = {
      userId: "user-jsvdfl",
      content: 123,
      threadId:'thread-asd23',
      commentId:'comment-asd2qw3',
    };
    expect(() => new AddReply(payload)).toThrowError(
      "ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return correct object", async () => {
    /* arrange */
    const payload = {
      userId: "user-jsvdfl",
      content: "tetsing contentt entites",
      threadId:'thread-asd23',
      commentId:'comment-asd2qw3',
    };

    /* action */
    let addedReply = new AddReply(payload);

    /* assert */
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.userId).toEqual(payload.userId);
    expect(addedReply.threadId).toEqual(payload.threadId);
    expect(addedReply.commentId).toEqual(payload.commentId);
  });
});