export async function sendRequest(method, url, body = null) {
  return fetch(url, {
    method: method,
    body: body,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((err) => {
      const e = new Error("Что-то пошло не так");
      e.data = err;
      throw e;
    });
  });
}

export function sendForm(
  event,
  form,
  url,
  showLoading,
  output,
  containerList,
  currentList
) {
  event.preventDefault();

  const msgErr = document.querySelector(".msg-error"),
    msgOk = document.querySelector(".msg-ok"),
    oldPreview = document.querySelector(".box-preview");

  // если есть старое превью, удаляем его
  if (oldPreview !== null) oldPreview.remove();

  if (msgErr !== null) msgErr.remove();

  if (msgOk !== null) msgOk.remove();

  showLoading(form, "show");

  const formData = new FormData(form);

  sendRequest("POST", url, formData)
    .then((responseData) => {
      if (responseData.msg === "sent") {
        //console.log(responseData.msg);
        form.reset();
        form.insertAdjacentHTML(
          "afterbegin",
          `<span class="msg-ok">Отправлено !</span>`
        );

        // вывод отправленного элемента
        if (output !== null) {
          console.log(responseData);
          output([responseData.element], containerList, currentList);

          // Стираем текст: "Пока ничего нет".
          const emptyTxt = containerList.querySelector(".empty_txt");
          if (emptyTxt !== null) emptyTxt.remove();
        }

        showLoading(form, "close");
      } else if (responseData?.msgErr) {
        showLoading(form, "close");
        form.insertAdjacentHTML(
          "afterbegin",
          `<span class="msg-error">${responseData?.msgErr}</span>`
        );
      }
    })
    .catch((error) => {
      showLoading(form, "close");
      form.insertAdjacentHTML(
        "afterbegin",
        `<span class="msg-error">Ошибка ! ( ${error} )</span>`
      );
      console.error(`Ошибуля! ${error}`);
    });
}
