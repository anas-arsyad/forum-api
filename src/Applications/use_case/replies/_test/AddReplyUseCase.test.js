const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const AddReply = require("../../../../Domains/replies/entities/AddReply");
const RepliesRepository = require("../../../../Domains/replies/RepliesRepository");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const AddRepliesUsease = require("../AddRepliesUsease");

describe("addReply", () => {
  it("should ochrestrating  the add reply action correctly", async () => {
    /* arrange */
    const payload = {
      content: "tetsing content",
      userId: "user-jkanf1",
      threadId: "thread-asf4",
      commentId: "comment-asf4",
    };

    const returnReply = {
      id: "reply-ahf1",
      content: payload.content,
      userId: payload.userId,
    };
    const expectedReply = {
      id: "reply-ahf1",
      content: payload.content,
      owner: payload.userId,
    };
    let mockCommentRepository = new CommentRepository();
    let mockThreadRepository = new ThreadRepository();
    let mockRepliesRepository = new RepliesRepository();

    mockCommentRepository.checkCommentById = jest
      .fn()
      .mockImplementation(() => {
        return Promise.resolve();
      });
    mockThreadRepository.checkThreadById = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });
    mockRepliesRepository.addReply = jest.fn().mockImplementation(() => {
      return Promise.resolve(returnReply);
    });
    const repliesUseCase = new AddRepliesUsease({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      repliesRepository: mockRepliesRepository,
    });

    /* action */

    const createReply = await repliesUseCase.execute(payload);
    /* assert */
    expect(createReply).toStrictEqual(expectedReply);
    expect(mockRepliesRepository.addReply).toBeCalledWith(
      new AddReply(payload)
    );
    expect(mockThreadRepository.checkThreadById).toBeCalledWith(payload.threadId);
  });
});
