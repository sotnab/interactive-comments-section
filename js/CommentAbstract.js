// This is abstract class of comment and shouldn't be used as object

const commentTemplate = document.getElementById('comment-template')

class CommentAbstract {
    constructor(data, currentUser) {
        this.data = data
        this.currentUser = currentUser
        this.element = commentTemplate.content.cloneNode(true)
    }

    render(parent) {        
        this.reload()

        const reply = this.element.querySelector('.comment__action--reply')
        const delete_ = this.element.querySelector('.comment__action--delete')
        const edit = this.element.querySelector('.comment__action--edit')

        if(this.currentUser.username === this.data.user.username) {
            reply.classList.add('comment__action--hidden')
        } else {
            delete_.classList.add('comment__action--hidden')
            edit.classList.add('comment__action--hidden')
        }

        parent.appendChild(this.element)
    }
    
    reload() {
        const content = this.element.querySelector('.comment__content')
        const time = this.element.querySelector('.comment__time')
        const rate = this.element.querySelector('.rate__number')
        const avatar = this.element.querySelector('.comment__avatar')
        const username = this.element.querySelector('.comment__username')

        content.textContent = this.data.content
        time.textContent = this.data.createdAt
        rate.textContent = this.data.score
        avatar.setAttribute('src', this.data.user.image.png)
        username.textContent = this.data.user.username
    }
}

export default CommentAbstract