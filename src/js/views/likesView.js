import { elements } from "./base";

export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? "heart-outlined" : "heart";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#icon-${iconString}`);
};

export const toggleLikeMenu = (likedNum) => {
  elements.likesMenu.style.visibility = likedNum > 0 ? "visible" : "hidden";
};

export const renderLike = (like) => {
  const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
  `;

  elements.likes.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = (id) => {
  document.querySelector(`a[href="#${id}"]`).closest("li")?.remove();
};
