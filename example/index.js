import { effect, state } from "../lib/index.js";

const log = console.log.bind(console, "%c[log]:", "color:green");

// Vue的ref风格
const a = state(0);
// Solid风格
const [b, setB] = state(0);

effect(() => {
  log("a:" + a.value);
  log("b:" + b());
});

a.value = 2;

setB(b() + 1);

setB((b) => b + 1);
