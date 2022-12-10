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
    let commentList = await this._commentRepository.getCommentByThreadId( threadId);
    let getReplies = commentList.map(async (item) => {
      let replyList = await this._repliesRepository.getRepliesByCommentId(item.id);
      let promiseReplyListGetUsername=replyList.map(async (itemReply) => {
          let getUser = await this._userRepository.getUserById(
            itemReply.userId
          );
          let result = { ...itemReply, username: getUser.username };
          delete result.userId;
          return result;
        })

      //prmise 
      replyList = await Promise.all(promiseReplyListGetUsername);
      let getUser = await this._userRepository.getUserById(item.userId);
      let resultComment = {
        ...item,
        replies: replyList,
        username: getUser.username,
      };
      delete resultComment.userId;

      return resultComment;
    });


    commentList = await Promise.all(getReplies);
    let thread = { ...threadDetail, comments: commentList };
    return thread;
  }
}

module.exports = GetThreadDetailUseCase;
