import CommentsSection from './CommentsSection.js'

const main = async () => {
    const response = await fetch('./data.json')
    const { comments, currentUser } = await response.json()

    const commentsSection = new CommentsSection('.comments', comments, currentUser)

    commentsSection.renderComments()
}

main()