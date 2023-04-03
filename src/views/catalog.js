import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById } from "../data/auth.js";

// TODO replace with actual view
const catalogTemplate = (fruits) => html`
  <!-- Dashboard page -->
  <h2>Fruits</h2>
  <section id="dashboard">
      ${
        fruits.length == 0
          ? html` <!-- Display an h2 if there are no posts -->
              <h2>No fruit info yet.</h2>`
          : fruits.map(
              (fruit) => html`
                <!-- Display a div with information about every post (if any)-->
                <div class="fruit">
                  <img src="${fruit.imageUrl}" alt="example1" />
                  <h3 class="title">${fruit.name}</h3>
                  <p class="description">${fruit.description}</p>
                  <a class="details-btn" href="/details/${fruit._id}">More Info</a>
                </div>
              `
            )
      }
    </div>
  </section>
`;

export async function catalogPage(ctx) {
  const fruits = await getById();
  ctx.render(catalogTemplate(fruits));
}
