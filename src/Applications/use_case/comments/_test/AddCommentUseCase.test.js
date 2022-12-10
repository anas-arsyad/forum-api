const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const AddComment = require("../../../../Domains/comments/entities/AddComment");
const AddedComment = require("../../../../Domains/comments/entities/AddedComment");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const AddCommentUsease = require("../AddCommentUseCase");

describe("addComment", () => {
  it("should ochrestrating  the add comment action correctly", async () => {
    /* arrange */
    const payload = {
      content: "tetsing content",
      userId: "user-jkanf1",
      threadId: "thread-asf4",
    };

    const returnComment = new AddedComment({
      id: "comment-ahf1",
      content: payload.content,
      userId: payload.userId,
    });
    let mockCommentRepository = new CommentRepository();
    let mockThreadRepository = new ThreadRepository();
    
    mockCommentRepository.addComment = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        id: "comment-ahf1",
        content: payload.content,
        userId: payload.userId,
      });
    });
    mockThreadRepository.checkThreadById = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      });

    const commentUseCase = new AddCommentUsease({
      commentRepository: mockCommentRepository,
      threadRepository:mockThreadRepository
    });

    /* action */

    const createComment = await commentUseCase.execute(payload);
    /* assert */
    expect(createComment).toEqual(returnComment);
    expect(mockCommentRepository.addComment).toBeCalledWith(
      new AddComment(payload)
    );
    expect(mockThreadRepository.checkThreadById).toBeCalledWith(payload.threadId);
  });
});
