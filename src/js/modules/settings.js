/**
 * Обработка кликов в settings po[p-up]
 * @param {click} evt listen click
 * @param {object} data pop-up obj html
 * @param {HTMLCollection} listElements
 * @param {object} currentSettings
 * @param {object} settingElements obj html elements from pop-up settings
 * @param {object} inputTheme html element input checkbox
 * @returns
 */

export function setSettings(
  evt,
  data,
  listElements,
  currentSettings,
  settingElements,
  inputTheme
) {
  if (evt.target.dataset.popup === "close") {
    data.remove();
    return;
  }

  let currentElement = "";

  if (evt.target.dataset.settings === "notify") {
    currentElement = evt.target.closest("label").children[0];
    currentElement.classList.toggle("active-check");
  } else if (evt.target.dataset.settings === "notify-tlg") {
    currentElement = evt.target.closest("label").children[0];
    currentElement.classList.toggle("active-check");
  } else if (evt.target.dataset.settings === "dark-theme") {
    currentElement = evt.target.closest("label").children[0];
    currentElement.classList.toggle("active-check");
    document.body.classList.toggle("dark-body");
    data.children[0].classList.toggle("dark");

    settingElements.forEach((element) => {
      element.classList.toggle("dark-items");
    });

    Array.from(listElements).forEach((element) => {
      element.classList.toggle("dark-list-elements");
    });

    if (inputTheme.checked) {
      currentSettings.theme = "dark";
    } else {
      currentSettings.theme = "light";
    }

    localStorage.setItem("settings", JSON.stringify(currentSettings));
  }

  console.log(evt);

  return;
}
