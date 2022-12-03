const AddThreadUseCase = require("../../../../Applications/use_case/threads/AddThreadUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute({
      ...request.payload,
      userId,
    });
    const response = h.response({
      status: "success",
      data: {
        addedThread: {
          id: addedThread.id,
          title: addedThread.title,
          owner: addedThread.userId,
        },
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
