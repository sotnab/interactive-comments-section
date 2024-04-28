import { newCommentContentTemplate } from './utils.js'

class NewComment {
    constructor(handler) {
        this.element = document.createElement('form')
        this.handler = handler

        this.element.classList.add('new-comment')
        this.element.innerHTML = newCommentContentTemplate
    }

    render(parent) {
        this.setup()

        parent.appendChild(this.element)
    }

    setup() {
        const btn = this.element.querySelector('.btn')

        btn.addEventListener('click', (e) => {
            const content = this.element.querySelector('.new-comment__text')

            if(!content.value?.length) {
                alert('Content field is empty')
                return
            }

            this.handler(e, content.value)

            content.value = ''
        })
    }

    delete() {
        this.delete()
        delete this
    }
}

export default NewComment