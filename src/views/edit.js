import { html } from "../../node_modules/lit-html/lit-html.js";
import { editFruitById, getFruitById } from "../data/auth.js";
import { createSubmitHandler } from '../util.js';

const editTemplate = (fruit, onEdit) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form">
    <h2>Edit Fruit</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        .value="${fruit.name}"
        placeholder="Fruit Name"
      />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        .value="${fruit.imageUrl}"
        placeholder="Fruit Image URL"
      />
      <textarea
        id="fruit-description"
        .value="${fruit.description}"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="fruit-nutrition"
        .value="${fruit.nutrition}"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">post</button>
    </form>
  </div>
</section>
`;

export async function editPage(ctx) {
  const fruitId = ctx.params.id;

  const fruit = await getFruitById(fruitId);
  ctx.render(editTemplate(fruit, createSubmitHandler(onEdit)));

  async function onEdit({ name, imageUrl, description, nutrition }) {
    if ([name, imageUrl, description, nutrition].some((x) => x == "")) {
      return alert("All fields are required");
    }

    await editFruitById(fruitId, {
      name,
      imageUrl,
      description,
      nutrition,
    });

    ctx.page.redirect("/details/" + fruitId);
  }
}