//

export function deleteElement(
  event,
  element,
  idElementList,
  sendRequest,
  currentList
) {
  // delete
  if (event.target.id === "del-yes") {
    if (element.className == "overlay") element.remove();

    if (element.className == "main__block-content")
      element.querySelector("#del-pop-up").remove();

    document.querySelector(`#${idElementList}`).remove();

    //
    const url = `./ctrl/ctrl.php/?delete-${currentList}=${idElementList}`;
    sendRequest("GET", url)
      .then((result) => {
        console.log(`Result : ${result.msg}`);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    // delete ?
    element.insertAdjacentHTML(
      "afterbegin",
      `<div class="overlay-invisble" id="del-pop-up">
	 	 <div class="del-pop-up">
	 		 <span>Вы действительно хотите удалить эту запись ? Запись будет удалена безвозвратно.</span> 
			  <button class="btn"  id="del-no">нет</button>
	 		 <button class="btn" id="del-yes">удалить</button>
 		 </div>
	  </div>`
    );
  }
}
