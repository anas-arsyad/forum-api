const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addThread function",  () => {
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
      const addedThread=await threadRepositoryPostgres.addThread(validatePayloadThread);

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
});
