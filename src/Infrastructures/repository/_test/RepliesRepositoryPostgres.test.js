const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const RepliesTableTestHelper = require("../../../../tests/RepliesTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AddReply = require("../../../Domains/replies/entities/AddReply");
const pool = require("../../database/postgres/pool");
const RepliesRepositoryPostgres = require("../RepliesRepositoryPostgres");

describe("RepliesRepositoryPostgres", () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addReplies function", () => {
    it("should presist comment and return comments correctly", async () => {
      /* arrange */
      const validatePayloadComments = new AddReply({
        threadId: "thread-34testing",
        content: "tetsing content",
        userId: "user-123",
        commentId: "comment-123234as",
      });

      const fakeIdGenerator = () => 123;
      const replyRepositoryPostgres = new RepliesRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      let newReply=await replyRepositoryPostgres.addReply(validatePayloadComments);
      
      const comment = await RepliesTableTestHelper.findReplyById("reply-123");
      /* assert */
      expect(newReply).toStrictEqual({ id: 'reply-123', content: 'tetsing content', userId: 'user-123' })
      expect(comment).toHaveLength(1);
    });
  });

  describe("delete reply function", () => {
    it("delete reply", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-34testing",
        id: "reply-1243252",
        userId: "user-klajf2",
        commentId: "comment-afnsdg",
      };

      const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.commentId,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await RepliesTableTestHelper.addReply({
        id: useCasePayload.id,
        commentId: useCasePayload.commentId,
        userId: useCasePayload.userId,
      });
      /* action */
      await repliesRepositoryPostgres.deleteReply({
        id: useCasePayload.id,
      });
      const reply = await RepliesTableTestHelper.findReplyById( useCasePayload.id);
      /* assert */
      expect(reply[0].is_deleted).toBe(true);
    });

    it("should return not found", async () => {
      // Arrange
      const repliesRepositoryPostgres = new RepliesRepositoryPostgres(
        pool,
        () => 123
      );

      await expect(
        repliesRepositoryPostgres.deleteReply({ id: "" })
      ).rejects.toThrow(NotFoundError);
    });
  });


  describe('getRepliesByCommentId', () => {
    it("getRepliesByCommentId comment", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-34testing",
        id: "reply-1243252",
        userId: "user-klajf2",
        commentId: "comment-afnsdg",
        content : "Test content",
      };

      const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.commentId,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await RepliesTableTestHelper.addReply({
        id: useCasePayload.id,
        commentId: useCasePayload.commentId,
        userId: useCasePayload.userId,
      });
      /* action */
      let getComment= await repliesRepositoryPostgres.getRepliesByCommentId(useCasePayload.commentId);
      /* assert */
      expect(getComment).toHaveLength(1);
      getComment.forEach(element => {
        expect(element).toHaveProperty('id')
        expect(element.id).toBe(useCasePayload.id)
        expect(element).toHaveProperty('date')
        expect(element.date).toBeInstanceOf(Date)
        expect(element).toHaveProperty('username')
        expect(element).toHaveProperty('isDeleted')
        expect(element.isDeleted).toBe(false)
        expect(element.username).toBe('dicoding')
        expect(element).toHaveProperty('content')
        expect(element.content).toBe(useCasePayload.content)
    });
      
    });

    it("should return not found", async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);
        expect( await repliesRepositoryPostgres.getRepliesByCommentId('')).toHaveLength(0);
      });
  })

  describe('checkReplyById', () => {
    it("checkReplyById checkReplyById", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-34testing",
        id: "reply-1243252",
        userId: "user-klajf2",
        commentId: "comment-afnsdg",
      };

      const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.commentId,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await RepliesTableTestHelper.addReply({
        id: useCasePayload.id,
        commentId: useCasePayload.commentId,
        userId: useCasePayload.userId,
      });
      /* action */
      let getReply= await repliesRepositoryPostgres.checkReplyById(useCasePayload.id);
      /* assert */
      expect(getReply).toBe(true);
    });

    it("should return not found", async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);
        await expect(
            repliesRepositoryPostgres.checkReplyById({ id: "" })
          ).rejects.toThrow(NotFoundError);
      });
  })

  describe('checkReplyBelong', () => {
    it("should checkReplyBelong correct ", async () => {
      /* arrange */
      const useCasePayload = {
        threadId: "thread-34testing",
        id: "reply-1243252",
        userId: "user-klajf2",
        commentId: "comment-afnsdg",
      };

      const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);

      await UsersTableTestHelper.addUser({
        id: useCasePayload.userId,
      });
      await ThreadsTableTestHelper.addThread({
        id: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await CommentsTableTestHelper.addComment({
        id: useCasePayload.commentId,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      });
      await RepliesTableTestHelper.addReply({
        id: useCasePayload.id,
        commentId: useCasePayload.commentId,
        userId: useCasePayload.userId,
      });
      /* action */
      let getReply= await repliesRepositoryPostgres.checkReplyBelong({id:useCasePayload.id,userId:useCasePayload.userId});
      /* assert */
      expect(getReply).toBe(true);
    });

    it("should return not found", async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres( pool, () => 123);
        await expect(
            repliesRepositoryPostgres.checkReplyBelong({ id: "" })
          ).rejects.toThrow(AuthorizationError);
      });
  })
});
