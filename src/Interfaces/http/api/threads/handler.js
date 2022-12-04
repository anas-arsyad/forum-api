const AddThreadUseCase = require("../../../../Applications/use_case/threads/AddThreadUseCase");
const GetThreadDetailUseCase = require("../../../../Applications/use_case/threads/GetThreadDetailUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadDetailsHandler = this.getThreadDetailsHandler.bind(this);
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
      data: { addedThread },
    });
    response.code(201);
    return response;
  }

  async getThreadDetailsHandler(request, h) {
    const { threadId } = request.params;
    const getDetailThreadUseCase = this._container.getInstance(GetThreadDetailUseCase.name);
    const thread = await getDetailThreadUseCase.execute(threadId);
    const response = h.response({
      status: "success",
      data: { thread },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
