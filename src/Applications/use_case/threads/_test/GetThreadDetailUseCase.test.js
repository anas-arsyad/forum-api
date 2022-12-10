const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const RepliesRepository = require("../../../../Domains/replies/RepliesRepository");
const GetDetailThread = require("../../../../Domains/threads/entities/GetDetailThread");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const UserRepository = require("../../../../Domains/users/UserRepository");
const GetThreadDetailUseCase = require("../GetThreadDetailUseCase");

describe("GetThreadDetailUseCase", () => {
  it("getthread", async () => {
    let useCasePayload = {
      threadId: "thread-lqkj123",
    };

    let returnThreadDetail = new GetDetailThread({
      id: "thread-afa",
      title: "testing title",
      body: "testing body",
      username: "testing",
      date: "2021-08-08T07:19:09.775Z",
    });

    let returnReplies = [
      {
        id: "comment-afa",
        content: "sebuah balasan",
        date: "2022-12-04T09:32:56.864Z",
        username: "testing",
      },
    ];

    let returnCommentList = [
      {
        id: "comment-afa",
        username: "testing",
        date: "2021-08-08T07:19:09.775Z",
        content: "testing body",
        replies: returnReplies,
      },
    ];

    let returnUser = {
      id: "user-lqkj123",
      username: "testing",
    };

    let mockCommentRepository = new CommentRepository();
    let mockThreadRepository = new ThreadRepository();
    let mockRepliesRepository = new RepliesRepository();
    let mockUserRepository = new UserRepository();

    mockThreadRepository.checkThreadById = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });
    mockCommentRepository.getCommentByThreadId = jest
      .fn()
      .mockImplementation(() => {
        return Promise.resolve([
          {
            id: "comment-afa",
            userId: "user-lqkj123",
            date: "2021-08-08T07:19:09.775Z",
            content: "testing body",
            replies: returnReplies,
          },
        ]);
      });
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => {
      return Promise.resolve(returnThreadDetail);
    });
    mockRepliesRepository.getRepliesByCommentId = jest
      .fn()
      .mockImplementation(() => {
        return Promise.resolve([
          {
            id: "comment-afa",
            content: "sebuah balasan",
            date: "2022-12-04T09:32:56.864Z",
            userId: "user-lqkj123",
          },
        ]);
      });
    mockUserRepository.getUserById = jest.fn().mockImplementation(() => {
      return Promise.resolve(returnUser);
    });
    // console.log(await mockUserRepository.getUserById('asd'))
    const threadUseCase = new GetThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      repliesRepository: mockRepliesRepository,
      userRepository:mockUserRepository
    });

    let getDetailThread = await threadUseCase.execute(useCasePayload.threadId);

    /* assert */
    expect(getDetailThread).toStrictEqual({
      ...returnThreadDetail,
      comments: returnCommentList,
    });
    expect(mockThreadRepository.getThreadById).toBeCalledWith( useCasePayload.threadId);
    expect(mockThreadRepository.checkThreadById).toBeCalledWith( useCasePayload.threadId);
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith( useCasePayload.threadId);
    expect(mockRepliesRepository.getRepliesByCommentId).toBeCalledWith(returnCommentList[0].id);
    expect(mockUserRepository.getUserById).toBeCalledWith(returnUser.id);
  });
});
