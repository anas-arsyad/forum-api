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
      let replyList=await this._repliesRepository.getRepliesByCommentId(item.id)
      replyList= await Promise.all(replyList.map(async(itemReply)=>{
        let getUser= await this._userRepository.getUserById(itemReply.userId)
        let result={ ...itemReply, username:getUser.username }
        delete result.userId
        return result
      })) 
      return { ...item, replies: replyList };
    });
    commentList = await Promise.all(getReplies);
    let thread = { ...threadDetail, comments: commentList, };
    return thread;
  }
}

module.exports = GetThreadDetailUseCase;
