const AddReply = require("../../../Domains/replies/entities/AddReply");

class AddRepliesUsease {
  constructor({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._repliesRepository = repliesRepository;
  }

  async execute(useCasePayload) {
    const validatePaylod = new AddReply(useCasePayload);
    await this._threadRepository.checkThreadById(useCasePayload.threadId);
    await this._commentRepository.checkCommentById(useCasePayload.commentId);
    let newReply = await this._repliesRepository.addReply(validatePaylod);
    return {
      id: newReply.id,
      content: newReply.content,
      owner: newReply.userId,
    };
  }
}

module.exports = AddRepliesUsease;
