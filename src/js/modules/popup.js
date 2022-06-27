//=================================== Pop-up window ============================

/**
 *  класс для создания окон принимает 2 аргумента
 * @param {HTMLElement} html
 * @param {string} title
 * метод @create может приниматрь 1 аргумент string - title - string и возвращает promisse
 */

export class PopUp {
  #popup;
  #contentPopup;

  constructor(html, title) {
    this.html = html;
    this.title = title;
  }

  create(title, theme) {
    this.#popup = document.createElement("div");
    this.#popup.className = "overlay";
    this.#popup.dataset.popup = "close";
    this.#contentPopup = document.createElement("div");
    this.#contentPopup.className = "pop-up";

    if (theme === "dark") {
      this.#contentPopup.className = "pop-up dark";
    }

    this.#popup.prepend(this.#contentPopup);

    this.#contentPopup.insertAdjacentHTML(
      "afterbegin",
      `<div class="header-popup">
	 		 <span class="title-pop-up"> ${
         this.title === undefined ? title : this.title
       } </span>
	 		 <span class="close" data-popup="close">&#10060;</span>
		</div>
		<div class="wrap-content-popup">
		${this.html}
		</div>`
    );
    document.body.append(this.#popup);
    return new Promise((resolve, reject) => resolve(this.#popup));
  }
}

//================= HTML  Elements for pop-up =======================
//-------------- settings html-----
export const settingsHtml = `
		  <form action="#" class="settings-form">
		  	<div class="setting-element">
		 		 <label for="check-notify">
  					<span class="label-txt"> Уведомления </span>
  					<input type="checkbox" id="check-notify" data-settings="notify" checked>
				  </label>
	 		 </div>
	 		 <div class="setting-element">
			 	 <label for="check-notify-tlg">
			 		 <span class="label-txt"> Уведомления в telegram </span>
			 	 	<input type="checkbox" id="check-notify-tlg"  data-settings="notify-tlg"> <br> <br>
		 		 </label>
				  <div class="box-info">
					 	 <span class="txt-info"> Для того чтобы получить частичное управление, а также уведомления в telegram введите ваш ник из telegram и перейдите по <a href="http://t.me/My_T_D_bot" target="blank"> ссылке Telegram bot Mytd </a> или сканируйте QR-код. </span> 
					  	<img src="./img/mytd/qrmytd.png" alt="img" class="qr-mytd"> 
					</div> <br> 
					<input type="text" name="tlg" placeholder="ваш ник @example" pattern="^@[A-z0-9\_]{5,45}"> <br>
	 		 </div>
			  <div class="setting-element">
		 		 <label for="dark-theme">
  					<span class="label-txt"> Тёмная тема </span>
  					<input type="checkbox" id="dark-theme" data-settings="dark-theme">
				  </label>
	 		 </div>
			  <div class="setting-element" id="block-photo-avatar">
					<label for="inp-img-avatar" class="label-file">Фото профиля</label>
					<input type="file"  id="inp-img-avatar" name="img_avatar" accept="image/,.jpg,.jpeg,.gif,.png" class="input-file" data-settings="inp-avatar">
			  </div>
			  <button type="submit" class="btn btn-settings"> сохранить </button>
		  </form>
		  `;

//-------------- item of list html -------

export const itemListHtml = `
		<form action="#" class="item-list-form">
			<input type="text" name="title_popup" class="input-edit hidden"  maxlength="32" placeholder="нзвание"> <br> <br>
			<textarea  name="discription_popup" class="input-edit hidden" maxlength="600" placeholder="описание" rows="5" cols="35"></textarea> <br> <br>
			
			<input type="date" class="input-date hidden"> 
			<input type="time" class="input-date hidden"> 
			<div class="box-btn-item-popup">
				<button class="btn" id="edit"> изменить </button> 
				<button class="btn" id="put-aside"> отложить </button>
				<button class="btn" id="complete"> завершить </button>
				<button type="submit" class="btn hidden " id="save-edit" disabled> сохранить </button>
				<button class="btn" id="delete"> удалить </button>
			</div>
		</form>
`;

//-------------- new item (add) html -------

export const newItemHtml = `
	<form action="#" class="form-new-task" id="tasks">
		<input type="text" name="title_task" class="input-title"  maxlength="50" placeholder="название задачи"> <br><br>
		<textarea  name="description_task" class="input-popup" maxlength="400" placeholder="описание" rows="5" cols="35"></textarea> <br> <br>
	<select class="input-select" id="select-type" name="type_task">
		<option> ежедневно </option>
		<option> один раз </option>
		<option> выбрать дни </option>
	</select> <br> <br>

		<input type="date" class="input-date" name="date_execute">
		<input type="time" class="input-date"  name="time_execution"> <br> <br>
	
		<div class="box-days-week hidden">
		<input type="checkbox" id="monday" name="monday"> 	
		<label for="monday"> Понедельник </label> <br>

		<input type="checkbox" id="tuesday" name="tuesday"> 
		<label for="tuesday"> Вторник </label> <br>

		<input type="checkbox" id="wednesday" name="wednesday"> 
		<label for="wednesday"> Среда </label> <br>
	
		<input type="checkbox" id="thursday" name="thursday"> 
		<label for="thursday"> Четверг </label> <br>
	
		<input type="checkbox" id="friday" name="friday"> 
		<label for="friday"> Пятница </label> <br>

		<input type="checkbox" id="saturday" name="saturday"> 
		<label for="saturday"> Суббота </label> <br>

		<input type="checkbox" id="sunday" name="sunday"> 
		<label for="sunday"> Воскресенье </label> <br> <br>
	</div>
	
		<button type="submit" class="btn"> сохранить </button>
	</form>

	<form action="#" class="form-new-journal" id="journal">
		<input type="text" name="title_journal" class="input-title"  maxlength="32" placeholder="заголовок записи"> <br><br>
		<textarea  name="journal" class="input-popup" maxlength="600" placeholder="напишите здесь ваши мысли, идеи, события" rows="5" cols="35"></textarea> <br> <br>
		<button type="submit" class="btn"> сохранить </button> <label for="inp-img-journal" class="label-file">добавить фото</label> <input type="file" id="inp-img-journal" name="img_journal[]" multiple accept="image/,.jpg,.jpeg,.gif,.png" class="input-file">
	</form>

	<form action="#" class="form-new-wish" id="target">
		<input type="text" name="title_target" class="input-title"  maxlength="32" placeholder="назовите цель"> <br><br>
		<textarea  name="target" class="input-popup" maxlength="400" placeholder="опишите вашу цель" rows="5" cols="35"></textarea>  <br><br>
		<button type="submit" class="btn"> сохранить </button>
	</form>   
`;
