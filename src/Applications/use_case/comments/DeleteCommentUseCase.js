const DeleteComment = require("../../../Domains/comments/entities/DeleteComment");

class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const validatePaylod = new DeleteComment(useCasePayload);
    await this._commentRepository.checkCommentById(useCasePayload.id)
    await this._commentRepository.checkCommentBelong(useCasePayload)
    await this._threadRepository.checkThreadById(useCasePayload.threadId);
    return await this._commentRepository.deleteComment(validatePaylod);
  }
}

module.exports = DeleteCommentUseCase;