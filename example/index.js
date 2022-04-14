import { effect, state } from "../lib/index.js";

const a = state(0);

effect(() => {
  console.log(a.value);
});

a.value += 1;
