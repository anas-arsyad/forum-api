const AddRepliesUsease = require("../../../../Applications/use_case/replies/AddRepliesUsease");
const DeleteReplyUseCase = require("../../../../Applications/use_case/replies/DeleteReplyUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postRepliesHandler = this.postRepliesHandler.bind(this);
    this.deleteRepliesHandler = this.deleteRepliesHandler.bind(this);
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

  async deleteRepliesHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadId, commentId,replyId } = request.params;

    const deleteRepliesUseCase = this._container.getInstance(
      DeleteReplyUseCase.name
    );
     await deleteRepliesUseCase.execute({
      userId,
      threadId,
      commentId,
      id:replyId
    });
    const response = h.response({
      status: "success",
    });
    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;
