const AddCommentUseCase = require("../../../../Applications/use_case/comments/AddCommentUseCase");
const DeleteCommentUseCase = require("../../../../Applications/use_case/comments/deleteCommentUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadId } = request.params;
    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name
    );
    const addedComment = await addCommentUseCase.execute({
      ...request.payload,
      userId,
      threadId,
    });
    const response = h.response({
      status: "success",
      data: {
        addedComment: {
          id: addedComment.id,
          content: addedComment.content,
          owner: addedComment.userId,
        },
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadId, commentId: id } = request.params;
    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );
    await deleteCommentUseCase.execute({
      id,
      userId,
      threadId,
    });
    const response = h.response({ status: "success" });
    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;
