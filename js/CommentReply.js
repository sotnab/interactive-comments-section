import CommentAbstract from './CommentAbstract.js';

class CommentReply extends CommentAbstract {
    constructor(data, currentUser, cleanup, setReplyingToId, editContent, setRated, parentData) {
        super(data, currentUser, cleanup, editContent, setReplyingToId, setRated)
        
        this.parentData = parentData
        this.editContent = editContent
        this.setReplyingTo()
    }

    render(parent) {
        const reply = this.element.querySelector('.comment__action--reply')
        reply.addEventListener('click', () => this.setReplyingToId(this.data.id, this.parentData.id))
        
        super.render(parent)
    }

    setReplyingTo() {
        const replyingTo = this.element.querySelector('.comment__mention')
        replyingTo.classList.remove('comment__mention--hidden')
        replyingTo.textContent = this.data.replyingTo
    }
}

export default CommentReply