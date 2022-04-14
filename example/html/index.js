import { effect, state } from "../../lib/index.js";

const createElement = document.createElement.bind(document);
let mounted = false;

function element(tag, props = {}, events = {}) {
  const el = createElement(tag);
  for (const k in props) {
    if (k === "innerHTML" || k === "textContent" || k === "innerText") {
      el[k] = props[k];
      break;
    }
    el.setAttribute(k, props[k]);
  }
  for (const k in events) {
    el.addEventListener(k, events[k]);
  }
  return el;
}

function div(props) {
  return element("div", props);
}

function button(props, events) {
  return element("button", props, events);
}

function patch(o, n) {
  console.log("patch", o.innerHTML, n.innerHTML);
  o.parentNode.replaceChild(n, o);
}

function mount(comp) {
  const app = document.querySelector("#app");
  app.appendChild(comp);
}

function init() {
  const [count, setCount] = state(0);
  let App = div({
    innerHTML: `count:${count()}`,
  });
  mount(App);
  effect(() => {
    if (mounted) {
      patch(
        App,
        (App = div({
          innerHTML: `count:${count()}`,
        }))
      );
    } else {
      mounted = true;
    }
  });

  const Button = button(
    { innerHTML: "Add" },
    {
      click: () => {
        setCount(count() + 1);
      },
    }
  );
  mount(Button);
}

init();
