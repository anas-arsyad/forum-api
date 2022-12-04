const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const RepliesRepository = require("../../../../Domains/replies/RepliesRepository");
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

    let expectedReplies = [
      {
        id: "comment-afa",
        content: "sebuah balasan",
        date: "2022-12-04T09:32:56.864Z",
        username: "johndoe",
      },
    ];

    let expectedCommentList = [
      {
        id: "comment-afa",
        username: "testing",
        date: "2021-08-08T07:19:09.775Z",
        content: "testing body",
        replies:expectedReplies
      },
    ];
    
    let mockCommentRepository = new CommentRepository();
    let mockThreadRepository = new ThreadRepository();
    let mockRepliesRepository = new RepliesRepository();

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
    mockRepliesRepository.getRepliesByCommentId = jest
      .fn()
      .mockImplementation(() => {
        return Promise.resolve(expectedReplies);
      });
    const threadUseCase = new GetThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      repliesRepository: mockRepliesRepository,
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
