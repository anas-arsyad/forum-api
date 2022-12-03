const AddComment= require('../AddComment')

describe("test addcoment entitis", () => {
  it("should throw error if payload not match", async () => {
    const payload = {
      // userId:'user-jsvdfl',
      content: "tetsing contentt entites",
      threadId:'thread-asd23'
    };
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error if payload data type not match", async () => {
    const payload = {
      userId: "user-jsvdfl",
      content: 123,
      threadId:'thread-asd23'
    };
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return correct object", async () => {
    /* arrange */
    const payload = {
      userId: "user-jsvdfl",
      content: "tetsing contentt entites",
      threadId:'thread-asd23'
    };

    /* action */
    let addedComment = new AddComment(payload);

    /* assert */
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.userId).toEqual(payload.userId);
    expect(addedComment.threadId).toEqual(payload.threadId);
  });
});
