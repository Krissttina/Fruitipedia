import { html } from "../../node_modules/lit-html/lit-html.js";
import { listByName, own } from "../data/auth.js";
import { fruitList } from './fruitsList.js';

const searchTemplate = (fruits, onSearch) => html`
  <!-- Search page -->
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button @click=${onSearch} class="button-list">Search</button>
      </form>
    </div>
    ${fruits.length === 0 ? hrml`
     <h4>Results:</h4>
    <div class="search-result">
      <p class="no-result">No result.</p>
    `: html`
    ${fruits.map(fruitList)}
            `}
    </div>
  </section>
`;

export async function searchPage(ctx) {
  const fruitId = ctx.params.id;

  const fruits = await listByName(fruitId);
  ctx.render(searchTemplate(fruits));

  if (fruitId != "") {
      return alert("All fields are required");

  async function onSearch() {
    
    }
  }
}
