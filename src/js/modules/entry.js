export const menuEntryOrReg = document.getElementsByClassName("form-box__menu");
export const btnEntry = menuEntryOrReg[0]?.firstElementChild;
export const btnReg = menuEntryOrReg[0]?.lastElementChild;
export const indexTitle = document.getElementsByClassName("form-box__title")[0];

export const regForm = document.getElementsByClassName("form-box__reg");
export const entryForm = document.getElementsByClassName("form-box__entry");

/**
 * обработка кликов по меню на стр. регистрации
 * @param {click} evt
 */

export function switchMenuEntry(evt) {
  if (evt.target.dataset.entry === "reg") {
    indexTitle.innerText = "регистрация";
    btnReg.classList.add("btn-active");
    btnEntry.classList.remove("btn-active");
    regForm[0].classList.remove("hidden");
    entryForm[0].classList.add("hidden");
  } else if (evt.target.dataset.entry === "entry") {
    indexTitle.innerText = "вход";
    btnReg.classList.remove("btn-active");
    btnEntry.classList.add("btn-active");
    regForm[0].classList.add("hidden");
    entryForm[0].classList.remove("hidden");
  }
}
