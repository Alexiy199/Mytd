// eye

export class Eye {
  status = "hidden eye"; // статус позиции нижней границы блока

  constructor(block, scrollContainer) {
    this.block = block;
    this.scrollContainer = scrollContainer;
    this.containerEye = document.querySelector(".eyes-container");
  }

  soundPlay() {
    const audio = new Audio();

    audio.src = "./files/sounds/openeye.wav";
    audio.play();
    return;
  }

  openEye() {
    const rect = this.block;
    let windowPos, rectPos;

    //console.log(this.containerEye);

    const currentPosRect = () => {
      (windowPos = {
        //left: window.pageXOffset,
        //top: window.pageYOffset,
        //right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight,
      }),
        (rectPos = {
          // left: window.pageXOffset + rect.getBoundingClientRect().left,
          // top: window.pageYOffset + rect.getBoundingClientRect().top,
          // right: window.pageXOffset + rect.getBoundingClientRect().right,
          bottom: window.pageYOffset + rect.getBoundingClientRect().bottom,
        });

      //console.clear();
      //console.log(event);
      //console.log(rectPos.bottom + " : " + windowPos.bottom);

      if (rectPos.bottom > windowPos.bottom) {
        // В избежание многократного повторения вывода и озвучивания глаза, проверяем статус (status) позиции блока 'rect'.
        if (this.status !== "hidden eye") {
          // console.log("OVERFLOW");
          this.containerEye.classList.add("hidden-eye");
        }

        this.status = "hidden eye";
        return "hidden eye";
      } else if (rectPos.bottom < windowPos.bottom) {
        if (this.status !== "vision eye") {
          this.soundPlay();

          // console.log("VISION");
          this.containerEye.classList.remove("hidden-eye");
        }

        this.status = "vision eye";
        return "vision eye";
      }
    };

    this.scrollContainer.addEventListener("scroll", () => {
      currentPosRect();
    });
  }
}
