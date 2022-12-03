const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const AddComment = require("../../../Domains/comments/entities/AddComment");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const pool = require("../../database/postgres/pool");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe("CommentRepositoryPostgres", () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addComment function", () => {
    it("should presist comment and return comments correctly", async () => {
      /* arrange */
      const validatePayloadComments = new AddComment({
        threadId: "thread-34testing",
        content: "tetsing content",
        userId: "user-123",
      });

      const fakeIdGenerator = () => 123;
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      await commentRepositoryPostgres.addComment(validatePayloadComments);

      const comment = await CommentsTableTestHelper.findCommentsById(
        "comment-123"
      );
      /* assert */
      expect(comment).toHaveLength(1);
    });

    it("should presist comment and return comment object correctly", async () => {
      const validatePayloadComments = new AddComment({
        threadId: "thread-34testing",
        content: "testing content",
        userId: "user-123",
      });

      const fakeIdGenerator = () => 123;
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      let addedComment = await commentRepositoryPostgres.addComment(
        validatePayloadComments
      );

      expect(addedComment).toStrictEqual(
        new AddedComment({
          userId: "user-123",
          content: "testing content",
          id: "comment-123",
        })
      );
    });
  });
});
