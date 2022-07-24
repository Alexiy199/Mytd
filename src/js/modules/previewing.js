//=========== bpreviewing предпросмотр файлов ==========

export const previewing = function (
  event,
  data,
  typeFile,
  countFiles,
  sizeFile
) {
  // если есть старое превью, удаляем его
  const oldPreview = data.querySelector(".box-preview");
  if (oldPreview !== null) oldPreview.remove();

  const fileList = Array.from(event.target.files);

  if (fileList.length > countFiles)
    return alert(`Допустимо не более ${countFiles} файлов`);

  const boxPreview = document.createElement("div");
  boxPreview.className = "box-preview";

  data.insertAdjacentElement("beforeend", boxPreview);

  let filePreview = "";

  for (let i = 0, file; (file = fileList[i]); i++) {
    const reader = new FileReader();

    let { type, size, name } = file;

    if (size > sizeFile) {
      boxPreview.remove();
      return alert(
        `Файл не должен превышать допустимый размер ${
          Math.floor((sizeFile / 1024 / 1024) * 100) / 100
        } мб`
      );
    }

    size = Math.floor((size / 1024 / 1024) * 100) / 100; // SIZE bytes -> MB

    // валидация по типу и допустимому размеру файла
    switch (true) {
      case typeFile === "img":
        if (!type.match(/image\/(jpg|jpeg|png|gif|webp)/)) {
          boxPreview.remove();
          return alert("Файлы должны быть формата jpg, jpeg, png, gif, webp");
        }
        break;
      default:
        return alert("Тип файла не поддерживается !");
    }

    console.log(name, type, size);

    reader.onload = (event) => {
      const fileSrc = event.target.result;

      switch (true) {
        case type.includes("image"):
          file = new Image();
          file.src = fileSrc;
          filePreview = `<img src="${file.src}">`;
          break;
      }

      boxPreview.insertAdjacentHTML(
        "afterbegin",
        `<div>
		  <span class="close" data-prevfile="${name}"> &#10006; </span>
		  ${filePreview}
		  <div class="box-file-info">
		  	<span class="file-name">${name.replace(/\.[^.$]+$/g, "")}</span> <br>
			<span class="file-size">${size} Мб</span>
		  </div>
	  </div>`
      );
    };

    reader.onerror = (err) => console.error(err);
    reader.readAsDataURL(file);
  }

  const dataPreview = [fileList, boxPreview];

  return new Promise((resolve, reject) => resolve(dataPreview));
};

export function removeFile(event, data) {
  if (!event.target.dataset.prevfile) return;

  const { prevfile } = event.target.dataset;
  data[0] = data[0].filter((file) => file.name !== prevfile);

  event.target.closest("div").remove();

  if (data[1].children.length <= 0) {
    data[1].remove();
  }

  console.log(data[0]);
}
