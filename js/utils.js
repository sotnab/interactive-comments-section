export const commentContentTemplate = `
  <div class="comment__bar">
    <img src="images/avatars/image-maxblagun.png" alt="maxblagun avatar" class="comment__avatar">
    <div class="comment__username">
      example username
      <div class="comment__badge">you</div>
    </div>
    <div class="comment__time">example time</div>
  </div>

  <p class="comment__text">
    <button class="comment__mention comment__mention--hidden">example user</button>
    <span class="comment__content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nobis eum pariatur tempora ea nulla
      quibusdam voluptas, eaque ipsam. Atque minus officiis eum eligendi quia non id voluptatem? Aliquid, itaque.
    </span>
  </p>

  <div class="rate comment__rate">
    <button class="rate__btn rate__btn--plus">
      <img class="rate__icon" src="images/icon-plus.svg" alt="Plus">
    </button>

    <span class="rate__number">#</span>

    <button class="rate__btn rate__btn--minus">
      <img class="rate__icon" src="images/icon-minus.svg" alt="Minus">
    </button>
  </div>

  <div class="comment__actions">
    <button class="comment__action comment__action--reply">
      <img src="images/icon-reply.svg" alt="Reply" class="comment__reply-icon">
      Reply
    </button>

    <button class="comment__action comment__action--delete">
      <img src="images/icon-delete.svg" alt="Delete" class="comment__action-icon">
      Delete
    </button>

    <button class="comment__action comment__action--edit">
      <img src="images/icon-edit.svg" alt="Edit" class="comment__action-icon">
      Edit
    </button>
  </div>`

export const newCommentContentTemplate = `
  <textarea class="new-comment__text" cols="30" rows="3" placeholder="Add a comment..."></textarea>
  <img src="images/avatars/image-juliusomo.png" alt="juliusomo" class="new-comment__avatar">
  <button class="btn">Send</button>`