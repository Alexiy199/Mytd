export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector("body").classList.add("webp");
    } else {
      document.querySelector("body").classList.add("no-webp");
    }
  });
}

//======================= menu burger ====================================

export const blockContent = document.querySelector(".main__block-content");

export const btnBrg = document.getElementsByClassName(".burger");
export const boxBrg = document.getElementsByClassName(".box-burger");
export const menu = document.getElementsByClassName("menu-brg");

export function openBrgMenu(event, currentSettings) {
  if (
    event.target.className === "box-burger" ||
    event.target.className === "burger"
  ) {
    let activeMenu = document.querySelector(".menu-open");
    if (activeMenu !== null) {
      activeMenu.previousElementSibling.classList.remove("close-brg");
      activeMenu.classList.remove("menu-open");
      activeMenu.closest(".box-burger").classList.remove("open");
    }

    let burgerElem = event.target.closest(".box-burger").children[0];
    burgerElem.classList.toggle("close-brg");
    //  dark theme
    if (currentSettings.theme === "dark") {
      event.target.closest(".box-burger").children[1].style =
        "background-color: #1a1a1a;";
    }

    event.target
      .closest(".box-burger")
      .children[1].classList.toggle("menu-open");

    event.target.closest(".box-burger").classList.toggle("open");
  } else if (
    event.target.className === "box-burger open" ||
    event.target.className === "burger close-brg"
  ) {
    closeMenu(event);
  }
  return;
}

// закрытие меню бургер
function closeMenu(event) {
  let burgerElem = event.target.closest(".box-burger").children[0];
  burgerElem.classList.toggle("close-brg");

  event.target.closest(".box-burger").children[1].classList.toggle("menu-open");

  event.target.closest(".box-burger").classList.toggle("open");
}
