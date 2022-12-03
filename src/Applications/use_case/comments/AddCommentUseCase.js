const AddComment = require("../../../Domains/comments/entities/AddComment");

class AddCommentUsease {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const validatePaylod = new AddComment(useCasePayload);
    await this._threadRepository.checkThreadById(useCasePayload.threadId);
    return await this._commentRepository.addComment(validatePaylod);
  }
}

module.exports = AddCommentUsease;
