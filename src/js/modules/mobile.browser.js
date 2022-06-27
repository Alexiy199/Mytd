//==========if phone ============
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
export let vh = window.innerHeight * 0.01;

export function resizeWindow() {
  // We execute the same script as before
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
