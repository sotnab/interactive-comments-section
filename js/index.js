import Comment from './Comment.js'

const main = async () => {
    const comments = document.querySelector('.comments')

    const response = await fetch('../data.json')
    const json = await response.json()

    json.comments.forEach((item) => {
        const newComment = new Comment(item, json.currentUser)
        newComment.render(comments)
    })
}

main()