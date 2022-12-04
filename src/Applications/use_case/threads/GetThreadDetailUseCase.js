class GetThreadDetailUseCase {
  constructor({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._repliesRepository = repliesRepository;
  }

  async execute(threadId) {
    await this._threadRepository.checkThreadById(threadId);
    let threadDetail = await this._threadRepository.getThreadById(threadId);
    let commentList = await this._commentRepository.getCommentByThreadId( threadId);
    let getReplies = commentList.map(async (item) => ({
      ...item,
      replies: await this._repliesRepository.getRepliesByCommentId(item.id),
    }));
    commentList = await Promise.all(getReplies);
    let thread = {
      ...threadDetail,
      comments: commentList,
    };
    return thread;
  }
}

module.exports = GetThreadDetailUseCase;
