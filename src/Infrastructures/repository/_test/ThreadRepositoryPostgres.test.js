const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const GetDetailThread = require("../../../Domains/threads/entities/GetDetailThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addThread function", () => {
    it("should presist thread and return thread correctly", async () => {
      /* arrange */
      const validatePayloadThread = new AddThread({
        title: "testing",
        body: "tetsing body",
        userId: "user-123",
      });

      const fakeIdGenerator = () => 123;
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      await threadRepositoryPostgres.addThread(validatePayloadThread);

      const thread = await ThreadsTableTestHelper.findThreadsById("thread-123");
      /* assert */
      expect(thread).toHaveLength(1);
    });

    it("should presist thread and return thread object correctly", async () => {
      /* arrange */
      const validatePayloadThread = new AddThread({
        title: "testing",
        body: "tetsing body",
        userId: "user-123",
      });

      const fakeIdGenerator = () => 123;
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      const addedThread = await threadRepositoryPostgres.addThread(
        validatePayloadThread
      );

      expect(addedThread).toStrictEqual(
        new AddedThread({
          title: "testing",
          //   body: "tetsing body",
          userId: "user-123",
          id: "thread-123",
        })
      );
    });
  });

  describe("getThreadById function", () => {
    it("should presist thread and return thread correctly", async () => {
      /* arrange */
      const validatePayloadThread = new AddThread({
        title: "testing",
        body: "tetsing body",
        userId: "user-1232344",
      });
      let threadId = "thread-123123";
      let date = new Date();
      let username = "alsgknals";
      await UsersTableTestHelper.addUser({
        id: validatePayloadThread.userId,
        username,
      });
      await ThreadsTableTestHelper.addThread({
        id: threadId,
        userId: validatePayloadThread.userId,
        date,
        body: validatePayloadThread.body,
        title: validatePayloadThread.title,
      });

      const fakeIdGenerator = () => 123;
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      let detailThread = await threadRepositoryPostgres.getThreadById(threadId);

      /* assert */
      expect(detailThread).toStrictEqual(
        new GetDetailThread({
          id: threadId,
          date,
          username,
          title: validatePayloadThread.title,
          body: validatePayloadThread.body,
        })
      );
    });
    it("should return not found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => 123
      );

      await expect(
        threadRepositoryPostgres.getThreadById({ id: "" })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("checkThreadById function", () => {
    it("should presist thread and return thread correctly", async () => {
      /* arrange */
      const validatePayloadThread = new AddThread({
        title: "testing",
        body: "tetsing body",
        userId: "user-1232344",
      });
      let threadId = "thread-123123";
      let date = new Date();
      let username = "alsgknals";
      await UsersTableTestHelper.addUser({
        id: validatePayloadThread.userId,
        username,
      });
      await ThreadsTableTestHelper.addThread({
        id: threadId,
        userId: validatePayloadThread.userId,
        date,
        body: validatePayloadThread.body,
        title: validatePayloadThread.title,
      });

      const fakeIdGenerator = () => 123;
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      /* action */
      let checkThread = await threadRepositoryPostgres.checkThreadById(threadId);

      /* assert */
      expect(checkThread).toStrictEqual(true);
    });
    it("should return not found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => 123
      );

      await expect(
        threadRepositoryPostgres.checkThreadById({ id: "" })
      ).rejects.toThrow(NotFoundError);
    });
  });
});
