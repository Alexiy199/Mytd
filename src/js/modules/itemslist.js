/**
 *обработка кликов в pop-up
 * @param {click} event
 * @param {object} data текущий pop-up
 * @param {string} title
 * @param {object} content содержимое pop-up
 * @param {string} typeTask
 * @returns
 */

export function getItemListPopUp(
  event,
  data,
  title,
  content,
  typeTask,
  deleteElement,
  idElementList,
  sendRequest,
  currentList
) {
  let inputsItemList = data.querySelectorAll(".input-edit"),
    btnSave = data.querySelector("#save-edit"),
    inputDate = data.querySelectorAll(".input-date");

  if (event.target.id === "edit") {
    inputsItemList.forEach((element) => {
      element.classList.toggle("hidden");
    });

    inputsItemList[0].value = title !== undefined ? title : "";
    inputsItemList[1].value =
      content?.innerText !== undefined ? content.innerText : "";

    if (inputDate[0].className === "input-date hidden") {
      btnSave.classList.toggle("hidden");
    }

    data.querySelector("p")?.classList.toggle("hidden");
    return;
  }

  if (event.target.id === "put-aside") {
    for (let i = 0; inputDate.length > i; i++) {
      //console.log(i);
      if (typeTask === "every-day") {
        inputDate[1].classList.toggle("hidden");
        break;
      }
      inputDate[i].classList.toggle("hidden");
    }

    console.log(inputDate);

    if (inputsItemList[0].className === "input-edit hidden")
      btnSave.classList.toggle("hidden");
  }

  // Delete element list
  if (event.target.id === "delete" || event.target.id === "del-yes")
    deleteElement(event, data, idElementList, sendRequest, currentList);

  // remove pop-up  'delete ?'
  if (event.target.id === "del-no") data.querySelector("#del-pop-up").remove();

  // remove pop-up
  if (event.target.dataset.popup === "close") {
    data.remove();
    return;
  }
}
