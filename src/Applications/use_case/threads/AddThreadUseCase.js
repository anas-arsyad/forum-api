/* istanbul ignore file */
const AddThread = require("../../../Domains/threads/entities/AddThread");

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const validatePayload = new AddThread(useCasePayload);
    let addedThread = await this._threadRepository.addThread(validatePayload);
    return {
      id: addedThread.id,
      title: addedThread.title,
      owner: addedThread.userId,
    };
  }
}

module.exports = AddThreadUseCase;
