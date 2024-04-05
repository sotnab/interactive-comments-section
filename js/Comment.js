import CommentAbstract from './CommentAbstract.js'
import CommentReply from './CommentReply.js'

class Comment extends CommentAbstract {
    render(parent) {
        super.render(parent)

        if (this.data.replies.length) {
            const replies = document.createElement('div')
            replies.classList.add('comment-replies')

            this.data.replies.forEach((item) => {
                const newReply = new CommentReply(item, this.currentUser)
                newReply.render(replies)
            })

            parent.appendChild(replies)
        }
    }
}

export default Comment