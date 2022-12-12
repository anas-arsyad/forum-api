class GetThreadDetailUseCase {
  constructor({
    commentRepository,
    threadRepository,
    repliesRepository,
    userRepository,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._repliesRepository = repliesRepository;
    this._userRepository = userRepository;
  }

  async execute(threadId) {
    await this._threadRepository.checkThreadById(threadId);
    let threadDetail = await this._threadRepository.getThreadById(threadId);
    let commentList = await this._commentRepository.getCommentByThreadId(
      threadId
    );
    let getReplies = commentList.map(async (item) => {
      let replyList = await this._repliesRepository.getRepliesByCommentId(item.id);
      replyList = replyList.map( (itemReply) => {
        let result = { 
          ...itemReply,
          content: itemReply.isDeleted ? "**balasan telah dihapus**" : itemReply.content
        };
        delete result.isDeleted;
        return result;
      });

      let resultComment = {
        ...item,
        replies: replyList,
        content: item.isDeleted ? "**komentar telah dihapus**" : item.content,
      };
      delete resultComment.isDeleted;

      return resultComment;
    });

    commentList = await Promise.all(getReplies);
    let thread = { ...threadDetail, comments: commentList };
    return thread;
  }
}

module.exports = GetThreadDetailUseCase;
