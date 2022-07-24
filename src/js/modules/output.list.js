// output list

export function outputList(data, containerList, currentList) {
  if (data.length === 0) {
    containerList.insertAdjacentHTML(
      "afterbegin",
      `<span class="empty_txt">Пока ничего нет</span>`
    );
    return;
  }

  // Dark theme
  let currentSettings = JSON.parse(localStorage.getItem("settings")),
    classElem = "main__content-item";

  if (currentSettings.theme === "dark")
    classElem = "main__content-item dark-list-elements";

  data.forEach((element) => {
    let img2 =
        element.img_2 !== null
          ? `<img src="./img/user/journal/${element.img_2}" alt="img" class="img-journal" id="img-j-2">`
          : "",
      img3 =
        element.img_3 !== null
          ? `<img src="./img/user/journal/${element.img_3}" alt="img" class="img-journal" id="img-j-3">`
          : "",
      img4 =
        element.img_4 !== null
          ? `<img src="./img/user/journal/${element.img_4}" alt="img" class="img-journal" id="img-j-4">`
          : "";

    let imgContainer = `
	<div class="container-img-journal hidden">
		<div class="column" id="column-1">
			<img src="./img/user/journal/${element.img_1}" alt="img" class="img-journal" id="img-j-1">
			${img3}
		</div>
		<div class="column" id="column-2">
			${img2}
			${img4}
		</div>
</div>
	`;

    if (element.img_1 === null || currentList !== "journal") imgContainer = "";
    //console.log(`output ${imgContainer}`);

    containerList.insertAdjacentHTML(
      "afterbegin",
      `<div class="${classElem}" id="item-${
        element.id
      }" data-listitem="custom-day">
	  <p class="main__title-item">${element.title}</p>
	  <p class="main__txt-item">${element.description}</p>

		<!-- Фото из дневника. Здесь для того чтобы выводить в попап дневника. (в списке элемнтов этот блок скрыт ) -->
		${imgContainer}

	  <div class="box-burger">
		  <div class="burger"></div>
		  <div class="menu-brg">
			  <ul>
				 ${element.task_of === undefined ? "" : "<li class='time_elem'> время </li>"}  
				 ${
           element.task_of === undefined
             ? ""
             : "<li class='later_elem' id='later'> <i class='_icon-later'></i> отложить </li>"
         }
				 ${
           element.task_of === undefined
             ? ""
             : "<li class='done_elem' id='done'> <i class='_icon-done'></i> завершить </li>"
         }
				  <li class='del_elem' id='delete'> <i class="_icon-delete"></i> удалить </li>
			  </ul>
		  </div>
	  </div>
  </div>`
    );
  });

  // прячем глаз
  // так как элементы списка могут не выходить за нижнюю границу блока.
  containerList.querySelector("#eye").classList.add("hidden-eye");
}
