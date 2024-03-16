import { LitElement, css, html } from "lit";
import { TWStyles } from "../../css/tw";

export class MobileSideNav extends LitElement {
  static properties = {
    svgWidth: { type: String },
    svgHeight: { type: String },
  };

  static styles = [css``, TWStyles];

  constructor() {
    super();
    this.urlRoutes = {
      404: {
        page: "/src/pages/404.html",
        title: "404",
        description: "",
      },
      "/": {
        page: "/src/pages/index.html",
        title: "/",
        description: "",
      },
      "/projects": {
        page: "/src/pages/projects.html",
        title: "/projects",
        description: "",
      },
      "/skills": {
        page: "/src/pages/skills.html",
        title: "/skills",
        description: "",
      },
    };
  }

  firstUpdated() {
    this.urlLocationHandler();
    window.onpopstate = this.urlLocationHandler.bind(this);
  }

  handleNavigationClick(e) {
    const { target } = e;
    e.preventDefault();
    this.urlRoute(target.closest("a").href);
  }

  async urlLocationHandler() {
    let location = window.location.pathname;
    if (location.length === 0 || location === "/index.html") {
      location = "/";
    }
    const ROUTE = this.urlRoutes[location] || this.urlRoutes[404];
    const html = await fetch(ROUTE.page).then((response) => {
      return response.text();
    });
    window.history.pushState({}, "", ROUTE.title);
    document.getElementById("root").innerHTML = html;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  urlRoute(href) {
    window.history.pushState({}, "", href);
    this.urlLocationHandler();
  }

  displayNavBlock_Click() {
    const NAV = this.shadowRoot.getElementById("navbar-block");
    const computedStyle = window.getComputedStyle(NAV);
    if (computedStyle.getPropertyValue("display") === "block") {
      NAV.style.display = "none";
    } else {
      NAV.style.display = "block";
    }
  }

  render() {
    return html`
      <nav class="border-gray-200 bg-gray-700">
        <div class="flex flex-col">
          <div class="flex justify-end">
            <button
              @click=${this.displayNavBlock_Click}
              data-collapse-toggle="navbar-hamburger"
              type="button"
              class=" w-10 h-10 text-sm text-gray-500 rounded-lg"
              aria-controls="navbar-hamburger"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div class="hidden z-40 absolute top-9 w-full" id="navbar-block">
            <ul class="flex flex-col font-medium rounded-b-lg  bg-gray-200 ">
              <li>
                <a
                  href="/"
                  @click=${this.handleNavigationClick}
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                  aria-current="page"
                  >Home</a
                >
              </li>
              <li>
                <a
                  href="/projects"
                  @click=${this.handleNavigationClick}
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                  >Project</a
                >
              </li>
              <li>
                <a
                  href="/skills"
                  @click=${this.handleNavigationClick}
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 "
                  >Tech Stack</a
                >
              </li>
              <li
                @click=${this.displayNavBlock_Click}
                class="flex justify-center bg-gray-400 rounded-b-lg font-bold"
              >
                <button
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("mobile-side-nav", MobileSideNav);
