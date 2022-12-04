
class GetThreadDetailUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute( threadId ) {
    await this._threadRepository.checkThreadById(threadId);
    let threadDetail = await this._threadRepository.getThreadById(threadId);
    let commentList = await this._commentRepository.getCommentByThreadId(threadId);
    let thread={
        ...threadDetail,
        comments:commentList
    }
    return thread
  }
}

module.exports = GetThreadDetailUseCase;
