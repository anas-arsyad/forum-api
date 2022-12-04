const AddRepliesUsease = require("../../../../Applications/use_case/replies/AddRepliesUsease");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postRepliesHandler = this.postRepliesHandler.bind(this);
  }

  async postRepliesHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadId, commentId } = request.params;
    const { content } = request.payload;

    const addRepliesUseCase = this._container.getInstance(
      AddRepliesUsease.name
    );
    const addedReply = await addRepliesUseCase.execute({
      content,
      userId,
      threadId,
      commentId,
    });
    const response = h.response({
      status: "success",
      data: { addedReply },
    });
    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
