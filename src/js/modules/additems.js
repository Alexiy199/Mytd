//========== Add new items to the list =========
/**
 * обработка кликов в окне длбавления элементов списка
 * @param {click} event
 * @param {object} data
 * @returns Promise
 */

export function addNewItem(event, data) {
  console.log(event.target);
  if (event.target.dataset.popup === "close") {
    data.remove();
    return;
  }
}

/**
 * переклюсение на текущую форму - current list
 * @param {click} event
 * @param {object} data
 * @param {string} currentList
 */

export function switchForm(event, data, currentList) {
  const forms = data.querySelectorAll("form");

  for (let i = 0; forms.length > i; i++) {
    if (forms[i].id !== currentList) forms[i].remove();
  }

  const selectTypeTask = data.querySelector("#select-type"),
    addPhoto = data.querySelector("#inp-img-journal");

  if (selectTypeTask !== null) {
    return new Promise((resolve, reject) => resolve(selectTypeTask));
  }

  if (addPhoto !== null) {
    return new Promise((resolve, reject) => resolve(addPhoto));
  }
}

export function setTypeTask(
  event,
  data,
  dateTime = "2022-04-03",
  hoursMin = "00:00"
) {
  const inputDate = data.querySelectorAll(".input-date"),
    daysWeek = data.querySelector(".box-days-week");
  console.log(event.target.value, inputDate[0]);

  if (event.target.value === "выбрать дни") {
    inputDate[0].disabled = true;
    daysWeek.classList.remove("hidden");
    console.log("change day");
  }

  if (event.target.value === "один раз") {
    inputDate[0].disabled = false;
    inputDate[0].value = dateTime;
    inputDate[1].value = hoursMin;

    daysWeek.className === "box-days-week hidden"
      ? false
      : daysWeek.classList.add("hidden");
    console.log("one day");
  }

  if (event.target.value === "ежедневно") {
    inputDate[0].disabled = false;
    inputDate[0].value = dateTime;
    console.log("every day");

    daysWeek.className === "box-days-week hidden"
      ? false
      : daysWeek.classList.add("hidden");
  }
}
