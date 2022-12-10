const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AddComment = require("../../../Domains/comments/entities/AddComment");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const DeleteComment = require("../../../Domains/comments/entities/DeleteComment");
const pool = require("../../database/postgres/pool");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe("CommentRepositoryPostgres", () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
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

  describe("delete comment function", () => {
    it("delete comment", async () => {
      /* arrange */
      const validatePayloadComments = new DeleteComment({
        threadId: "thread-34testing",
        id: "comment-124324352",
        userId: "user-klajf2",
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );

      await UsersTableTestHelper.addUser({
        id: validatePayloadComments.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: validatePayloadComments.threadId,
        userId: validatePayloadComments.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: validatePayloadComments.id,
        threadId: validatePayloadComments.threadId,
        userId: validatePayloadComments.userId,
      });
      /* action */
      await commentRepositoryPostgres.deleteComment({
        id: validatePayloadComments.id,
      });
      const comment = await CommentsTableTestHelper.findCommentsById(
        validatePayloadComments.id
      );
      /* assert */
      expect(comment[0].is_deleted).toBe(true);
    });

    it("should return not found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );

      await expect(
        commentRepositoryPostgres.deleteComment({ id: "" })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("getCommentByThreadId", () => {
    it("getCommentByThreadId comment", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-342testing",
        id: "comment-1243243",
        userId: "user-klajf2",
      };

      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.id,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      /* action */
      let getComment = await commentRepositoryPostgres.getCommentByThreadId(
        useCasePayload.threadId
      );
      /* assert */
      expect(getComment).toHaveLength(1);
      expect(getComment).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: useCasePayload.id,
            userId: useCasePayload.userId,
            date: expect.any(Date),
            content: "Test content",
          }),
        ])
      );
    });

    it("should return not found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );
      await expect(
        commentRepositoryPostgres.getCommentByThreadId("")
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("checkCommentById", () => {
    it("checkCommentById comment", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-342tes",
        id: "comment-1243znxc",
        userId: "user-kla2",
      };

      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.id,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      /* action */
      let getComment = await commentRepositoryPostgres.checkCommentById(
        useCasePayload.id
      );
      /* assert */
      expect(getComment).toBe(true);
    });

    it("should return not found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );
      await expect(
        commentRepositoryPostgres.checkCommentById("")
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("checkCommentBelong", () => {
    it("checkCommentBelong comment", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-342tes",
        id: "comment-1243znxc",
        userId: "user-kla2",
      };

      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.id,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      /* action */
      let getComment = await commentRepositoryPostgres.checkCommentBelong({
        id: useCasePayload.id,
        userId: useCasePayload.userId,
      });
      /* assert */
      expect(getComment).toBe(true);
    });

    it("should return not found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => 123
      );
      await expect(
        commentRepositoryPostgres.checkCommentBelong("")
      ).rejects.toThrow(AuthorizationError);
    });
  });
});
