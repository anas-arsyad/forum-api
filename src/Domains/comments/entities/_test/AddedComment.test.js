const AddedComment = require("../AddedComment");

describe("addedcomment interface", () => {
  it("should throw error when data  not match", () => {
    let payload = {
      id: "comment-lakjf",
      content: "k akasdadada",
    };
    expect(() => new AddedComment(payload)).toThrowError(
      "ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when data type  not match", () => {
    let payload = {
      id: "comment-lakjf",
      content: "k akasdadada",
      userId: 123123,
    };
    expect(() => new AddedComment(payload)).toThrowError(
      "ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it('should create registeredUser object correctly',()=>{
    let payload = {
        id: "comment-lakjf",
        content: "k akasdadada",
        userId: 'user-iqreio',
      };

    let addedComment= new AddedComment(payload)

    expect(addedComment.id).toEqual(payload.id)
    expect(addedComment.userId).toEqual(payload.userId)
    expect(addedComment.content).toEqual(payload.content)
})
});
