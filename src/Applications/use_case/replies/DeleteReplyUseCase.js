
class DeleteReplyUseCase {
  constructor({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._repliesRepository = repliesRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.checkThreadById(useCasePayload.threadId);
    await this._commentRepository.checkCommentById(useCasePayload.commentId)
    await this._repliesRepository.checkReplyById(useCasePayload.id);
    await this._repliesRepository.checkReplyBelong(useCasePayload);
    return await this._repliesRepository.deleteReply(useCasePayload);
  }
}

module.exports = DeleteReplyUseCase;