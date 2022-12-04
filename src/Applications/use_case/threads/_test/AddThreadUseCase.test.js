const AddedThread = require("../../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../../Domains/threads/entities/AddThread");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");

describe("AddThread", () => {
  it("should ochrestrating  the add user action correctly", async () => {
    /* arrange */
    const payload = {
      userId: "user-1XASdjksd",
      title: "Testing Title",
      body: "Dicoding body",
    };

    const expectedThread = {
      id: "thread-234234",
      title: payload.title,
      owner: payload.userId,
    };
    const returnThread = new AddedThread({
      id: "thread-234234",
      title: payload.title,
      userId: payload.userId,
    });
    let mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(returnThread));

    const threadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    /* action */
    const createThread = await threadUseCase.execute(payload);
    /* assert */
    expect(createThread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new AddThread(payload)
    );
  });
});
