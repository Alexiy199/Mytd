"use strict";

//========== chapter title ============ --> начало нового логического блока
// ------ part title ---------- часть логики
/** prefix: evt = event + postfix: postfix = current logic */

import * as incFunc from "./modules/functions.js"; // incFunc --> дополнительные функции для бургера и т д
incFunc.isWebp(); //проверка поддежки webp изображений браузером
import { vh, resizeWindow } from "./modules/mobile.browser.js"; // адаптация под мобильные браузеры

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // We listen to the resize event
  window.addEventListener("resize", () => resizeWindow());
}

// ==============  local storage ===========
// стандартные настройки
const defaultSettings = {
  notify: true,
  tlgNotify: false,
  theme: "light",
  sound: false,
};

let currentSettings = JSON.parse(localStorage.getItem("settings"));

if (currentSettings === null) {
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
  currentSettings = JSON.parse(localStorage.getItem("settings"));
} else if (currentSettings.theme === "dark") {
  document.body.classList.add("dark-body");
}

//================ Entry (for index.html) ===================
import * as entry from "./modules/entry.js"; //elements for entry
import { sendRequest, sendForm } from "./modules/send.form.js"; //  send form  ajax
import { showLoading } from "./modules/show.loading.js";

if (document.querySelector(".form-box__title") !== null) {
  // dark theme
  if (currentSettings.theme === "dark") {
    document.querySelector(".main-index").classList.add("dark-body");
    document.querySelector(".footer-index").style =
      "background-color: #2a2a2a;";
    document
      .querySelectorAll("form")
      .forEach((elem) => (elem.style = "background-color: #2a2a2a;"));
  }

  entry.indexTitle.innerText = "вход";
  entry.btnEntry.classList.add("btn-active");
  entry.regForm[0].classList.add("hidden");

  entry.menuEntryOrReg[0].addEventListener("click", (evtMenu) => {
    entry.switchMenuEntry(evtMenu, currentSettings.theme);
    return;
  });

  // send form entry
  entry.entryForm[0].addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("send form");
    const msgErr = document.querySelector(".msg-error");
    if (msgErr !== null) msgErr.remove();

    showLoading(entry.entryForm[0], "show");

    const formData = new FormData(entry.entryForm[0]);

    sendRequest("POST", "./ctrl/ctrl.php", formData)
      .then((data) => {
        if (data?.msg === "entry ok") {
          //console.log(data.msg);
          document.location.assign(
            "https://www.alnik-portfolio.ru/mytd/?list=tasks"
          );
        } else if (data?.msgErr) {
          showLoading(entry.entryForm[0], "close");
          entry.entryForm[0].insertAdjacentHTML(
            "afterend",
            `<span class="msg-error">${data?.msgErr}</span>`
          );
        }
      })
      .catch((err) => {
        showLoading(entry.entryForm[0], "close");
        entry.entryForm[0].insertAdjacentHTML(
          "afterend",
          `<span class="msg-error">Ошибка !</span>`
        );
        console.error(`упс ${err} `);
      });
  });

  // send form reg
  entry.regForm[0].addEventListener("submit", function (evt) {
    evt.preventDefault();
    // console.log("send form");
    const msgErr = document.querySelector(".msg-error");
    if (msgErr !== null) msgErr.remove();

    showLoading(entry.regForm[0], "show");

    const formData = new FormData(entry.regForm[0]);

    sendRequest("POST", "./ctrl/ctrl.php", formData)
      .then((data) => {
        if (data?.msg === "REG") {
          console.log(data);
          document.location.assign(
            "https://www.alnik-portfolio.ru/mytd/?list=tasks"
          );
        } else if (data?.msgErr) {
          showLoading(entry.regForm[0], "close");
          entry.regForm[0].insertAdjacentHTML(
            "afterend",
            `<span class="msg-error">${data?.msgErr}</span>`
          );
        }
      })
      .catch((err) => {
        showLoading(entry.regForm[0], "close");
        entry.regForm[0].insertAdjacentHTML(
          "afterend",
          `<span class="msg-error">Ошибка !</span>`
        );
        console.error(`упс ${err}`);
      });
  });
}

//================ Main (main.html) ===========================
import dateTime from "./modules/date.js";
//import date from "./modules/date.js";

const ms = dateTime.minSec("-"),
  hm = dateTime.hourMin(":"),
  fullDate = dateTime.dmy("-");
//console.log(fullDate, hm, ms, `day ${dateTime.weekDay()}`);

// подключение модулей
import * as navigationFooter from "./modules/navigation.js";
import {
  PopUp,
  settingsHtml,
  itemListHtml,
  newItemHtml,
} from "./modules/popup.js";
import { setSettings } from "./modules/settings.js";
import { getItemListPopUp } from "./modules/itemslist.js";
import { addNewItem, switchForm, setTypeTask } from "./modules/additems.js";
import { previewing, removeFile } from "./modules/previewing.js";
import { outputList } from "./modules/output.list.js";
import { Eye } from "./modules/eye/eye.js";
import { deleteElement } from "./modules/delete.js";

//==================== Main page ===============================================

const mainPage = document.querySelector(".main"),
  header = document.querySelector(".header");

if (mainPage !== null) {
  //============== Block/unlock scroll ======================================

  document.body.style = "overflow-y: hidden;";

  // ================= элементы списка ====================

  // для обрабдтки и визуального представления
  const listElements = document.getElementsByClassName("main__content-item"),
    containerList = document.querySelector(".main__block-content"),
    containerWrap = document.querySelector(".main__container-wrap");
  //console.log(containerList.children);

  // Eye
  const eye = new Eye(containerList, containerWrap);
  eye.openEye();

  // Тёмная тема при загрузке стр.
  if (currentSettings.theme === "dark") {
    for (let element of listElements) {
      element.classList.toggle("dark-list-elements");
    }
  }

  //========================= open the item menu | function ===========================

  const itemListPopUp = new PopUp(itemListHtml); // title in create method

  let idElementList = null; //
  incFunc.blockContent.addEventListener("click", (evt) => {
    // ------ id element of list ---------
    if (
      evt.target.parentElement.className ==
        "main__content-item dark-list-elements" ||
      evt.target.parentElement.className == "main__content-item"
    ) {
      idElementList = evt.target.parentElement.id;
      console.log("click brg", idElementList);
    } else if (
      evt.target.className == "main__content-item" ||
      evt.target.className == "main__content-item dark-list-elements"
    ) {
      idElementList = evt.target.id;
    } else if (
      evt.target.className == "burger" ||
      evt.target.className == "box-burger" ||
      evt.target.className == "burger close-brg" ||
      evt.target.className == "box-burger open"
    ) {
      idElementList = evt.target.parentElement.parentElement.id;
      console.log("3 if = ", idElementList);
    }
    // ---------------------------------------

    incFunc.openBrgMenu(evt, currentSettings);

    //-------------- delete element of list ------------------------
    if (evt.target.id === "delete" || evt.target.id === "del-yes")
      deleteElement(
        evt,
        incFunc.blockContent,
        idElementList,
        sendRequest,
        currentList
      );

    // remove pop-up  'delete ?'
    if (evt.target.id === "del-no")
      incFunc.blockContent.querySelector("#del-pop-up")?.remove();
    //-----------------------------------

    //-------------- list element (pop-up) | main -----------
    let typeTask = evt.target.dataset.listitem; // тип задачи

    // если был клик по элементу списка, то открыаем окно элемента
    if (
      evt.target.className === "main__content-item" ||
      evt.target.className === "main__content-item dark-list-elements"
    ) {
      // находим необходимое содержимое в элементе списка
      let titleItemList =
          evt.target.querySelector(".main__title-item")?.innerText,
        imgJournal = evt.target.getElementsByClassName(
          "container-img-journal hidden"
        );

      // Если найден блок с изображениями, то этот элемент из списка дневника.
      if (imgJournal.length == 0) imgJournal = "";

      itemListPopUp
        .create(
          titleItemList !== "" ? titleItemList : "без названия",
          currentSettings.theme
        )
        .then((data) => {
          let txtItem = evt.target.getElementsByClassName("main__txt-item")[0];
          // --- output to the popup txtItem
          let form = data.querySelector("form");

          // input hidden
          const formCurrent = data.querySelector("#form-current"),
            inpId = data.querySelector("#id-elem");
          formCurrent.value = currentList;
          inpId.value = idElementList;

          form.insertAdjacentHTML(
            "afterbegin",
            `<p ${txtItem?.innerText !== "" ? "" : "class='empty_txt' "}>${
              txtItem?.innerText !== "" ? txtItem.innerText : "Без описания"
            }</p> <br> `
          );

          // View of images
          if (imgJournal !== "") incFunc.imgMosaic(imgJournal[0], form);

          // вывод актуальных кнопок для окна элемента списка
          if (currentList !== "tasks") {
            let btn = data.querySelectorAll("button");

            btn.forEach((element) => {
              if (element.id === "put-aside" || element.id === "complete")
                element.remove();
            });
          }

          // Empty txt remove
          if (imgJournal !== "" && txtItem?.innerText === "")
            data.querySelector(".empty_txt").remove();

          // прослушка события - клик, окна элемента списка ==============
          data.addEventListener("click", (evtItem) => {
            getItemListPopUp(
              evtItem,
              data,
              titleItemList,
              txtItem,
              typeTask,
              deleteElement,
              idElementList,
              sendRequest,
              currentList
            );
          });

          // send update element of list
          form.addEventListener("submit", (evtSubmit) => {
            sendForm(
              evtSubmit,
              form,
              "./ctrl/ctrl.php",
              showLoading,
              null, // outputList
              containerList,
              currentList
            );
          });
          //------------
        });
    }
  });

  //================= Navigation =================================

  let currentList = localStorage.getItem("currentList");

  // опредедление текущего списка для соответствующего вывода данных
  if (currentList === null || currentList === undefined) {
    localStorage.setItem("currentList", "tasks");
    currentList = localStorage.getItem("currentList");
    navigationFooter.titleList.innerText = "задачи";
  } else {
    currentList = localStorage.getItem("currentList");
  }

  if (currentList === "tasks") {
    navigationFooter.switchList(
      navigationFooter.footerMenu[0].children[0],
      navigationFooter.footerMenu[0].children,
      containerList.children,
      currentList,
      sendRequest,
      outputList,
      containerList,
      showLoading
    );
  } else if (currentList === "journal") {
    navigationFooter.switchList(
      navigationFooter.footerMenu[0].children[1],
      navigationFooter.footerMenu[0].children,
      containerList.children,
      currentList,
      sendRequest,
      outputList,
      containerList,
      showLoading
    );
  } else if (currentList === "target") {
    navigationFooter.footerMenu[0].children[2].classList.add("active-list");
    navigationFooter.titleList.innerText = "цели";
  }

  //---- add item list, switch list-----------------
  // прослушиваем события клик на элементе - "button plus"

  const newItemPopUp = new PopUp(newItemHtml, "новая запись");

  navigationFooter.footerMenu[0].addEventListener("click", (evt) => {
    // определяем по какому элементу был совершён клик
    if (evt.target.dataset.nav !== undefined) {
      //  console.log(sendRequest);
      currentList = navigationFooter.switchList(
        evt.target,
        navigationFooter.footerMenu[0].children,
        containerList.children,
        evt.target.dataset.nav,
        sendRequest,
        outputList,
        containerList,
        showLoading
      );
    } else if (evt.target.dataset.add) {
      newItemPopUp.create("", currentSettings.theme).then((data) => {
        // выводим текущую форму для добавления новых элементов списка.
        // Если текушая форма - форма 'tasks', тогда switchForm возвращает Promisse
        switchForm(evt, data, currentList)?.then((dataPopUp) => {
          if (dataPopUp.className === "input-select") {
            dataPopUp.addEventListener("change", (evtChangeType) =>
              setTypeTask(evtChangeType, data, fullDate)
            );
          }

          if (dataPopUp.id === "inp-img-journal") {
            dataPopUp.addEventListener("change", (evtChangePhoto) =>
              previewing(
                evtChangePhoto,
                data.children[0].children[1],
                "img",
                4,
                3_145_728
              )?.then((dataPreview) => {
                dataPreview[1].addEventListener("click", (evtPreview) =>
                  removeFile(evtPreview, dataPreview)
                );
              })
            );
          }
        });

        // форма для отправки. Текущая форма currentList (tasks | journal | targets)
        const formAddItem = data.getElementsByTagName("form")[0];

        // отправка нового элемента списка
        formAddItem.addEventListener("submit", (evtSubmit) =>
          sendForm(
            evtSubmit,
            formAddItem,
            "./ctrl/ctrl.php",
            showLoading,
            outputList,
            containerList,
            currentList
          )
        );

        // прослушка собтитя - клик, окна добавления новых элементов в текущий список
        data.addEventListener("click", (evtAdd) => addNewItem(evtAdd, data));
      });
    }
  });

  //=============================== pop-up settings | header listen ========================

  const settingsPopUp = new PopUp(settingsHtml, "настройки");

  header.addEventListener(
    "click",
    (evt) => {
      if (evt.target.dataset.header === "settings") {
        settingsPopUp.create("", currentSettings.theme).then((data) => {
          const inputNotify = data.querySelector("#check-notify"),
            settingElements = data.querySelectorAll(".setting-element"),
            inputTheme = data.querySelector("#dark-theme"),
            inputSound = data.querySelector("#sound"),
            inputAvatar = data.querySelector("#inp-img-avatar"),
            boxPreview = data.querySelector("#block-photo-avatar"),
            settingsForm = data.querySelector(".settings-form");

          // Тёиная тема
          if (currentSettings.theme === "dark") {
            settingElements.forEach((element) => {
              element.classList.toggle("dark-items");
            });

            inputTheme.checked = true;
            inputTheme.previousElementSibling.classList.add("active-check");
          }

          if (inputNotify.checked) {
            inputNotify.previousElementSibling.classList.add("active-check"); //active-check --> input checkbox | notify default true
          }
          if (currentSettings.sound === true) {
            inputSound.previousElementSibling.classList.add("active-check"); //active-check --> input checkbox | notify default true

            inputSound.checked = true;
            inputSound.previousElementSibling.classList.add("active-check");
          }

          // прослушка события - клик, окна настроек
          data.addEventListener("click", (evtSettings) =>
            setSettings(
              evtSettings,
              data,
              listElements,
              currentSettings,
              settingElements,
              inputTheme,
              inputSound
            )
          );

          inputAvatar.addEventListener("change", (evtAvatar) =>
            previewing(evtAvatar, boxPreview, "img", 1, 3_145_728)?.then(
              (dataPreview) => {
                dataPreview[1].addEventListener("click", (evtPreview) =>
                  removeFile(evtPreview, dataPreview)
                );
              }
            )
          );
          ``;
          // обработка отправки формы настроек
          settingsForm.addEventListener("submit", (evtSend) =>
            sendForm(
              evtSend,
              settingsForm,
              "./ctrl/ctrl.php",
              showLoading,
              null,
              null
            )
          );
        });
      }
      evt.stopPropagation();
    },
    { capture: true }
  );
}
