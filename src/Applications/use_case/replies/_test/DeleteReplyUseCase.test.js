const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const RepliesRepository = require("../../../../Domains/replies/RepliesRepository");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const DeleteReplyUseCase = require("../DeleteReplyUseCase");

describe("delete", () => {
    it("should ochrestrating  the delete reply action correctly", async () => {
      /* arrange */
      const payloadUseCase = {
        userId: "user-jkanf1",
        threadId: "thread-asf4",
        commentId: "comment-asf4",
        id: "reply-asf4",
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
      mockRepliesRepository.checkReplyById = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      });
      mockRepliesRepository.checkReplyBelong = jest.fn().mockImplementation(() => {
        return Promise.resolve(true);
      });
      mockRepliesRepository.deleteReply = jest.fn().mockImplementation(() => {
        return Promise.resolve(true);
      });
      
      const deleteUseCase = new DeleteReplyUseCase({
        commentRepository: mockCommentRepository,
        threadRepository: mockThreadRepository,
        repliesRepository: mockRepliesRepository,
      });
  
      /* action */
      const deleteReply = await deleteUseCase.execute(payloadUseCase);
      /* assert */
      expect(mockCommentRepository.checkCommentById).toBeCalledWith(payloadUseCase.commentId);
      expect(mockThreadRepository.checkThreadById).toBeCalledWith(payloadUseCase.threadId);
      expect(mockRepliesRepository.checkReplyById).toBeCalledWith(payloadUseCase.id);
      expect(mockRepliesRepository.checkReplyBelong).toBeCalledWith(payloadUseCase);
      expect(mockRepliesRepository.deleteReply).toBeCalledWith(payloadUseCase);
      expect(deleteReply).toBe(true);
    });
  });