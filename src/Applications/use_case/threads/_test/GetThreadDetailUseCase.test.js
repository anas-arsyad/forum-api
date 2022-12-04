const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const GetDetailThread = require("../../../../Domains/threads/entities/GetDetailThread");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const GetThreadDetailUseCase = require("../GetThreadDetailUseCase");

describe("GetThreadDetailUseCase", () => {
  it("getthread", async () => {
    let useCasePayload = {
      threadId: "thread-lqkj123",
    };

    let expectedThreadDetail = new GetDetailThread({
      id: "thread-afa",
      title: "testing title",
      body: "testing body",
      username: "testing",
      date: "2021-08-08T07:19:09.775Z",
    });

    let expectedCommentList = [
      {
        id: "thread-afa",
        username: "testing",
        date: "2021-08-08T07:19:09.775Z",
        content: "testing body",
      },
    ];
    let mockCommentRepository = new CommentRepository();
    let mockThreadRepository = new ThreadRepository();

    mockThreadRepository.checkThreadById = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });
    mockCommentRepository.getCommentByThreadId = jest
      .fn()
      .mockImplementation(() => {
        return Promise.resolve(expectedCommentList);
      });
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => {
      return Promise.resolve(expectedThreadDetail);
    });

    const threadUseCase = new GetThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    let getDetailThread = await threadUseCase.execute(useCasePayload.threadId);
    
    /* assert */
    expect(getDetailThread).toStrictEqual({
      ...expectedThreadDetail,
      comments: expectedCommentList,
    });
    expect(mockThreadRepository.getThreadById).toBeCalledWith(
      useCasePayload.threadId
    );
  });
});
