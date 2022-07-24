export const footerMenu = document.getElementsByClassName("footer__menu");
export const titleList = document.querySelector(".header__title-list");

/**
 *Элементы навигации. Выделение элемента меню соответствующему списку. 
 Смена заголовка и сохранение в lopcaleStorage текущей позиции.
 * @param {click} event
 * @param {HTMLCollection} buttons
 * @param {function} fetch function  ajax send GET
 * @returns string current list
 */
export function switchList(
  btnActive,
  buttons,
  listElements,
  typeElement,
  sendRequest,
  outputList,
  containerList,
  showLoading
) {
  for (let i = 0; buttons.length > i; i++) {
    if (buttons[i].className === "footer__menu-item active-list") {
      buttons[i].classList.remove("active-list");
      break;
    }
  }

  //--- remove elements of list -----------------------------

  listElements = Array.from(listElements);

  for (let i = 0; listElements.length > i; i++) {
    // Пропускаем глаз
    if (listElements[i].id === "eye") continue;

    // Очищаем блок
    listElements[i].remove();
  }

  //--------------------------------

  showLoading(containerList, "show");

  if (typeElement === "tasks") {
    titleList.innerText = "задачи";
    sendRequest("GET", "./ctrl/index_ctrl.php/?list=tasks")
      .then((responseData) => {
        if (responseData?.tasks) {
          outputList(responseData.tasks, containerList, typeElement);
        } else {
          containerList.insertAdjacentHTML(
            "afterbegin",
            `<span class="msg-error">Ошибка !</span>`
          );
        }
        showLoading(containerList, "close");
      })
      .catch((error) => {
        showLoading(containerList, "close");
        containerList.insertAdjacentHTML(
          "afterbegin",
          `<span class="msg-error">Ошибка !</span>`
        );
        console.error(`Ошибуля! ${error}`);
      });
  } else if (typeElement === "target") {
    titleList.innerText = "цели";
    sendRequest("GET", "./ctrl/index_ctrl.php/?list=targets")
      .then((responseData) => {
        console.log("data-", responseData);
        // outputList(responseData, containerList);
      })
      .catch((error) => console.error(`Ошибуля! ${error}`));
  } else if (typeElement === "journal") {
    titleList.innerText = "дневник";
    sendRequest("GET", "./ctrl/index_ctrl.php/?list=journal")
      .then((responseData) => {
        if (responseData?.journal) {
          // console.log("data-", responseData);
          outputList(responseData.journal, containerList, typeElement);
        } else {
          containerList.insertAdjacentHTML(
            "afterbegin",
            `<span class="msg-error">Ошибка !</span>`
          );
        }
        showLoading(containerList, "close");
      })
      .catch((error) => {
        showLoading(containerList, "close");
        containerList.insertAdjacentHTML(
          "afterbegin",
          `<span class="msg-error">Ошибка !</span>`
        );
        console.error(`Ошибуля! ${error}`);
      });
  }

  localStorage.setItem("currentList", typeElement);

  btnActive.closest("div").classList.add("active-list");

  return typeElement;
}
