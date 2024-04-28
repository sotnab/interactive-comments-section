import Comment from './Comment.js'
import NewComment from './NewComment.js'

const main = async () => {
    const commentsRoot = document.querySelector('.comments')

    const response = await fetch('./data.json')
    let { comments, currentUser } = await response.json()

    let replyingToId = null
    let replyingToParentId = null

    const editContent = (id, newContent) => {
        comments = comments.map((item) => {
            if (item.id == id) item.content = newContent

            item.replies = item.replies.map((reply) => {
                if (reply.id == id) reply.content = newContent

                return reply
            })

            return item
        })

        renderComments()
    }

    const setRated = (id, rated) => {
        comments = comments.map((item) => {
            if(item.id == id) item.rated = rated

            item.replies = item.replies.map((reply) => {
                if(reply.id == id) reply.rated = rated
                return reply
            })
            
            return item
        })
    }

    const setReplyingToId = (id, parentId) => {
        replyingToId = id

        if (parentId) {
            replyingToParentId = parentId
        } else {
            replyingToParentId = id
        }

        const oldNewComment = document.querySelector('.comment-replies > .new-comment')

        if (oldNewComment) {
            oldNewComment.remove()
        }

        const repliesElement = document.querySelector(`[data-id="${replyingToParentId}"] + .comment-replies`)

        const newComment = new NewComment(addNewReply)
        newComment.render(repliesElement)
    }

    const deleteCommentOrReply = (id) => {
        comments = comments.filter((item) => {
            if (item.replies?.length) {
                item.replies = item.replies.filter((reply) => reply.id != id)
            }

            return item.id != id
        })
    }

    const addNewComment = (e, content) => {
        e.preventDefault()

        comments.push({
            id: Date.now(),
            content: content,
            createdAt: 'Just now',
            score: 0,
            user: currentUser,
            replies: []
        },)

        renderComments()
    }

    const addNewReply = (e, content) => {
        e.preventDefault()

        let commentToReply = comments.find((item) => item.id == replyingToId)

        if (!commentToReply) {
            comments.forEach((item) => {
                commentToReply = item.replies.find((item) => item.id == replyingToId)
            })
        }

        const commentToReplyParent = comments.find((item) => item.id == replyingToParentId)

        commentToReplyParent.replies.push({
            id: Date.now(),
            content: content,
            createdAt: 'Just now',
            score: 0,
            replyingTo: commentToReply.user.username,
            user: currentUser
        },)

        renderComments()
    }

    const renderComments = () => {
        commentsRoot.innerHTML = ''

        comments.forEach((item) => {
            const newComment = new Comment(item, currentUser, deleteCommentOrReply, setReplyingToId, editContent, setRated)
            newComment.render(commentsRoot)
        })

        const newComment = new NewComment(addNewComment)
        newComment.render(commentsRoot)
    }

    renderComments()
}

main()