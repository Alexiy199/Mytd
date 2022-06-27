// Show loading

export function showLoiading(form, action) {
  const btn = form.querySelectorAll("button");

  if (action === "show") {
    btn.forEach((element) => {
      console.log("show");
      element.disabled = true;
      element.style = "opacity: 0.5";
    });

    form.insertAdjacentHTML(
      "afterbegin",
      `<div class="cover-loading">
		  <span class="txt-loading">Загрузка...</span>
	  </div>`
    );
  } else if (action === "close") {
    btn.forEach((element) => {
      console.log("close");
      element.disabled = false;
      element.style = "opacity: 1";
    });

    form.querySelector(".cover-loading").remove();
  }
}
