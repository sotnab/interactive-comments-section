import Comment from './Comment.js'
import NewComment from './NewComment.js'

class CommentsSection {
    constructor(root, comments, currentUser) {
        this.commentsRoot = document.querySelector(root)
        this.comments = comments
        this.currentUser = currentUser

        this.replyingToId = null
        this.replyingToParentId = null
    }

    editContentOfComment = (id, newContent) => {
        // looks for comment or reply with specified id
        // and set its content to newContent

        this.comments = this.comments.map((item) => {
            if (item.id == id) item.content = newContent

            item.replies = item.replies.map((reply) => {
                if (reply.id == id) reply.content = newContent
                return reply
            })

            return item
        })
        this.renderComments()
    }

    setCommentRatedValue = (id, rated) => {
        // This method sets rated value to object with specified id in comments array
        // Its needed to save user rate between rerenders

        this.comments = this.comments.map((item) => {
            if (item.id == id) item.rated = rated

            item.replies = item.replies.map((reply) => {
                if (reply.id == id) reply.rated = rated
                return reply
            })

            return item
        })
    }

    setReplyingToId = (id, parentId) => {
        this.replyingToId = id

        // If user is replying to reply then parentId is specified
        // If use is replying to comment then parentId is set to comment id
        if (parentId) {
            this.replyingToParentId = parentId
        } else {
            this.replyingToParentId = id
        }

        // Find and delete old instance of NewComment component
        const oldNewComment = document.querySelector('.comment-replies > .new-comment')

        if (oldNewComment) {
            oldNewComment.remove()
        }

        const repliesElement = document.querySelector(`[data-id="${this.replyingToParentId}"] + .comment-replies`)

        const newComment = new NewComment(this.addNewReply)
        newComment.render(repliesElement)
    }

    deleteCommentOrReply = (id) => {
        this.comments = this.comments.filter((item) => {
            if (item.replies?.length) {
                item.replies = item.replies.filter((reply) => reply.id != id)
            }

            return item.id != id
        })
    }

    addNewComment = (e, content) => {
        e.preventDefault()

        this.comments.push({
            id: Date.now(),
            content: content,
            createdAt: 'Just now',
            score: 0,
            user: this.currentUser,
            replies: []
        },)

        this.renderComments()
    }

    addNewReply = (e, content) => {
        e.preventDefault()

        let commentToReply = this.comments.find((item) => item.id == this.replyingToId)
        
        // If there is no comment with this id then user is replying to another reply
        if (!commentToReply) {
            this.comments.forEach((item) => {
                commentToReply = item.replies.find((item) => item.id == this.replyingToId)
            })
        }

        const commentToReplyParent = this.comments.find((item) => item.id == this.replyingToParentId)

        commentToReplyParent.replies.push({
            id: Date.now(),
            content: content,
            createdAt: 'Just now',
            score: 0,
            replyingTo: commentToReply.user.username,
            user: this.currentUser
        },)

        this.renderComments()
    }

    renderComments = () => {
        this.commentsRoot.innerHTML = ''

        this.comments.forEach((item) => {
            const newComment = new Comment(
                item,
                this.currentUser,
                this.deleteCommentOrReply,
                this.setReplyingToId,
                this.editContentOfComment,
                this.setCommentRatedValue
            )

            newComment.render(this.commentsRoot)
        })

        const newComment = new NewComment(this.addNewComment)
        newComment.render(this.commentsRoot)
    }
}

export default CommentsSection