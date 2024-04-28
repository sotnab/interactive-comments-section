class Dialog {
    constructor(root, resolve, reject = () => null) {
        this.element = document.querySelector(root)
        this.resolve = resolve
        this.reject = reject

        this.setup()
    }

    setup() {
        const noButton = this.element.querySelector('.btn--red')
        const yesButton = this.element.querySelector('.btn--gray')

        noButton.addEventListener('click', () => {
            this.resolve()
            this.hide()
        })
        
        yesButton.addEventListener('click', () => {
            this.reject()
            this.hide()
        })
    }

    show() {
        this.element.classList.add('dialog--visible')
    }

    hide() {
        this.element.classList.remove('dialog--visible')
    }
}

export default Dialog