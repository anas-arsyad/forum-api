/* istanbul ignore file */
const AddThread = require('../../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const validatePayload = new AddThread(useCasePayload);
    return await this._threadRepository.addThread(validatePayload)
  }
}

module.exports = AddThreadUseCase;