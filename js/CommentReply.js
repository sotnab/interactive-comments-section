import CommentAbstract from './CommentAbstract.js';

class CommentReply extends CommentAbstract {
    constructor(data, currentUser) {
        super(data, currentUser)
        this.setReplyingTo()
    }

    setReplyingTo() {
        const replyingTo = this.element.querySelector('.comment__mention')
        replyingTo.classList.remove('comment__mention--hidden')
        replyingTo.textContent = this.data.replyingTo
    }
}

export default CommentReply