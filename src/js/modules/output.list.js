// output list

export function outputList(data, containerList) {
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
    containerList.insertAdjacentHTML(
      "afterbegin",
      `<div class="${classElem}" data-listitem="custom-day">
	  <p class="main__title-item">${element.title}</p>
	  <p class="main__txt-item">${element.description}</p>
	  <div class="box-burger">
		  <div class="burger"></div>
		  <div class="menu-brg">
			  <ul>
				 ${element.task_of === undefined ? "" : "<li class='time_elem'> время </li>"}  
				 ${
           element.task_of === undefined
             ? ""
             : "<li class='later_elem'> <i class='_icon-later'></i> отложить </li>"
         }
				 ${
           element.task_of === undefined
             ? ""
             : "<li class='done_elem'> <i class='_icon-done'></i> завершить </li>"
         }
				  <li class='del_elem'> <i class="_icon-delete"></i> удалить </li>
			  </ul>
		  </div>
	  </div>
  </div>`
    );
  });
}
