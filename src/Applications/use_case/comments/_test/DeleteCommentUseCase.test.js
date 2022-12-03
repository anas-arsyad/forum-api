const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const DeleteCommentUseCase = require("../deleteCommentUseCase");

describe("delete comment", () => {
  it("should ochrestrating  the add comment action correctly", async () => {
    /* arrange */
    const payload = {
      id: "comment-lkahr",
      userId: "user-jkanf1",
      threadId: "thread-asf4",
    };

    let mockCommentRepository = new CommentRepository();
    let mockThreadRepository = new ThreadRepository();
    
    
    mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => {
      return Promise.resolve(true);
    });
    mockCommentRepository.checkCommentBelong = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });
    mockCommentRepository.checkCommentById = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });
    mockThreadRepository.checkThreadById = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      });

    const commentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository:mockThreadRepository
    });

    /* action */
    const createComment = await commentUseCase.execute(payload);
    
    /* assert */
    expect(createComment).toStrictEqual(true);
    
  });
});
