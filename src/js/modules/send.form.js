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
  showLoiading,
  output,
  containerList
) {
  event.preventDefault();

  const msgErr = document.querySelector(".msg-error");
  if (msgErr !== null) msgErr.remove();

  showLoiading(form, "show");

  const formData = new FormData(form);

  sendRequest("POST", url, formData)
    .then((responseData) => {
      if (responseData?.msg === "sent") {
        //console.log(responseData.msg);
        form.reset();
        form.insertAdjacentHTML(
          "afterend",
          `<sapan class="msg-ok">Отправлено !</sapan>`
        );

        // вывод отправленного элемента
        if (output !== null) {
          console.log(responseData);
          output([responseData.element], containerList);

          // Стираем текст: "Пока ничего нет".
          const emptyTxt = containerList.querySelector(".empty_txt");
          if (emptyTxt !== null) emptyTxt.remove();
        }

        showLoiading(form, "close");
      } else if (responseData?.msgErr) {
        showLoiading(form, "close");
        form.insertAdjacentHTML(
          "afterend",
          `<sapan class="msg-error">${responseData?.msgErr}</sapan>`
        );
      }
    })
    .catch((error) => {
      showLoiading(form, "close");
      form.insertAdjacentHTML(
        "afterend",
        `<sapan class="msg-error">Ошибка !</sapan>`
      );
      console.error(`Ошибуля! ${error}`);
    });
}
