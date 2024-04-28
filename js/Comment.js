import CommentAbstract from './CommentAbstract.js'
import CommentReply from './CommentReply.js'

class Comment extends CommentAbstract {
    render(parent) {
        super.render(parent)

        this.replies = document.createElement('div')
        this.replies.classList.add('comment-replies')

        if (this.data.replies.length) {
            this.data.replies.forEach((item) => {
                const newReply = new CommentReply(item, this.currentUser, this.cleanup, this.setReplyingToId, this.editContent, this.setRated, this.data)
                newReply.render(this.replies)
            })
        }

        parent.appendChild(this.replies)

        const reply = this.element.querySelector('.comment__action--reply')
        reply.addEventListener('click', () => this.setReplyingToId(this.data.id))
    }
}

export default Comment