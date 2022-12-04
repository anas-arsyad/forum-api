const RepliesRepository = require("../RepliesRepository");

describe("RepliesRepository Interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const repliesRepository = new RepliesRepository();
    await expect(repliesRepository.addReply({})).rejects.toThrowError(
      "REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
  
  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const repliesRepository = new RepliesRepository();
    await expect(repliesRepository.deleteReply({})).rejects.toThrowError(
      "REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });

  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const repliesRepository = new RepliesRepository();
    await expect(repliesRepository.checkReplyBelong({})).rejects.toThrowError(
      "REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });

  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const repliesRepository = new RepliesRepository();
    await expect(repliesRepository.getRepliesByCommentId({})).rejects.toThrowError(
      "REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });

  it("should throw error when invoke abstract behavior", async () => {
    /* arrange */
    const repliesRepository = new RepliesRepository();
    await expect(repliesRepository.checkReplyById({})).rejects.toThrowError(
      "REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
  
});
