const CommentRepository = require("../CommentRepository");

describe("CommentRepository Interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const commentRepository = new CommentRepository();
    await expect(commentRepository.addComment({})).rejects.toThrowError(
      "COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
  
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const commentRepository = new CommentRepository();
    await expect(commentRepository.checkCommentBelong({})).rejects.toThrowError(
      "COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const commentRepository = new CommentRepository();
    await expect(commentRepository.checkCommentById({})).rejects.toThrowError(
      "COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const commentRepository = new CommentRepository();
    await expect(commentRepository.deleteComment({})).rejects.toThrowError(
      "COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
  
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const commentRepository = new CommentRepository();
    await expect(commentRepository.getCommentByThreadId({})).rejects.toThrowError(
      "COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
