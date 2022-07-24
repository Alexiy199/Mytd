// Show loading

export function showLoading(form, action) {
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
			<div class="circle-loading" id="circle-load-1">
				<div class="circle-loading" id="circle-load-2">
					
				</div>
			</div>
			<span class="txt-loading">mytd</span>
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
