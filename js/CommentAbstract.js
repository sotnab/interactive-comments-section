// This is abstract class of comment and shouldn't be used as object
import Dialog from './Dialog.js'
import { commentContentTemplate } from './utils.js'

class CommentAbstract {
    constructor(data, currentUser, cleanup, setReplyingToId, editContent, setRated) {
        this.data = data
        this.currentUser = currentUser
        this.editContent = editContent
        this.cleanup = cleanup
        this.setReplyingToId = setReplyingToId
        this.setRated = setRated

        this.element = document.createElement('div')
        this.rated = this.data.rated || 0
        this.editing = false

        console.log(this.data.rated)

        this.element.classList.add('comment')
        this.element.innerHTML = commentContentTemplate
    }

    render(parent) {
        this.setup()

        parent.appendChild(this.element)
    }

    setup() {
        this.reloadData()

        const reply = this.element.querySelector('.comment__action--reply')
        const delete_ = this.element.querySelector('.comment__action--delete')
        const edit = this.element.querySelector('.comment__action--edit')
        const plus = this.element.querySelector('.rate__btn--plus')
        const minus = this.element.querySelector('.rate__btn--minus')

        plus.addEventListener('click', () => this.changeRate(1))
        minus.addEventListener('click', () => this.changeRate(-1))
        
        if (this.currentUser.username === this.data.user.username) {
            reply.classList.add('comment__action--hidden')

            // These two have to be the arrow functions
            delete_.addEventListener('click', () => this.delete())
            edit.addEventListener('click', () => this.edit())

        } else {
            delete_.classList.add('comment__action--hidden')
            edit.classList.add('comment__action--hidden')
        }
    }

    reloadData() {
        this.element.setAttribute('data-id', this.data.id)

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

    changeRate(value) {
        let userRate = this.rated + value

        if (userRate > 1 || userRate < -1) return

        this.data.score -= this.rated
        this.data.score += userRate
        this.rated = userRate

        this.setRated(this.data.id, userRate)

        this.reloadData()
    }

    delete() {
        const dialog = new Dialog('.dialog', () => {
            delete this
            this.element.remove()
            this.cleanup(this.data.id)
        })

        dialog.show()
    }

    edit() {
        if(this.editing) return

        this.editing = true

        const content = this.element.querySelector('.comment__text')
        content.classList.add('comment__text--hidden')

        const editText = document.createElement('textarea')
        const btn = document.createElement('button')

        editText.classList.add('comment__edit-text')
        btn.classList.add('btn', 'comment__update-btn')

        editText.textContent = this.data.content
        btn.textContent = 'Update'

        editText.addEventListener('input', (e) => {
            e.target.style.height = e.target.scrollHeight + 'px'
        })

        btn.addEventListener('click', () => {
            this.editContent(this.data.id, editText.value)
        })
        
        this.element.appendChild(editText)
        this.element.appendChild(btn)

        editText.style.height = editText.scrollHeight + 'px'
    }
}

export default CommentAbstract