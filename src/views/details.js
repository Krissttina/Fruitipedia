import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFruitById, deleteFruitById } from "../data/auth.js";
import { getUserData } from "../util.js";

const detailsTamplate = (fruit, isOwner, isLoggedIn, onDelete) => html`
  <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
      <p id="details-title">${fruit.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${fruit.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${fruit.nutrition}</p>
        </div>
        ${isOwner ? 
             html` 
            <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
                <a href="/edit/${fruit._id}"  id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              </div>` : ""}
      </div>
    </div>
  </section>`;

export async function detailsPage(ctx) {
  const fruitId = ctx.params.id;
  const fruit = await getFruitById(fruitId);
 // const user = ctx.user;

  let userId = getUserData()?._id;
  let totalBuysCount;
 // let didUserBuy;

  // if (user != null) {
  //   userId = user._id;
  //   didUserBuy = await didUserBought(fruitId, userId);
  // }

  const isOwner = fruit._ownerId === userId;
  const isLoggedIn = userId !== undefined;

  //totalBuysCount = await getTotalBuys(fruitId);
  ctx.render(detailsTamplate(fruit, isOwner, isLoggedIn, onDelete));

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteFruitById(fruitId);
      ctx.page.redirect("/catalog");
    }
  }
}