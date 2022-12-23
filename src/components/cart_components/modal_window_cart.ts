const inputName = document.getElementById("name") as HTMLInputElement;
const inputPhone = document.getElementById("phone-number") as HTMLInputElement;
const inputAddress = document.getElementById("address") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputNumberCard = document.getElementById(
  "card-number"
) as HTMLInputElement;
const img = document.querySelector(".imgCard img") as HTMLImageElement;
const inputDate = document.getElementById("Date") as HTMLInputElement;
const inputCVV = document.getElementById("CVV") as HTMLInputElement;
const headerForm = document.querySelector(".dataCard h3") as HTMLElement;
const buttonConfirm = document.querySelector(".buttonConfirm") as HTMLElement;

export function showModalWindow() {
  const buttonBuyNow = document.querySelector(".buy-now") as HTMLElement;
  const wrapDataCard = document.querySelector(
    ".wrapper_dataCard"
  ) as HTMLElement;
  if (buttonBuyNow) {
    buttonBuyNow.addEventListener("click", () => {
      (document.querySelector(".body") as HTMLElement).classList.add("active");
      wrapDataCard.classList.add("active");
    });
  }
  if (wrapDataCard) {
    wrapDataCard.addEventListener("click", (e) => {
      const block = e.target as HTMLElement;
      if (block.getAttribute("id") === "wrapper_dataCard") {
        wrapDataCard.classList.remove("active");
        (document.querySelector(".body") as HTMLElement).classList.remove(
          "active"
        );
      }
    });
  }

  trueValueInputName();
  trueValueInputPhone();
  trueValueInputAddress();
  trueValueInputEmail();
  trueValueInputNumberCard();
  trueValueInputDate();
  trueValueInputCVV();
  isTrueForm();
  isTrueforClickButton();
}

function trueValueInputName() {
  inputName.addEventListener("input", () => {
    const value = inputName.value
      .trim()
      .split(" ")
      .filter((item) => item !== "");
    console.log(value);
    if (value.every((item) => item.length >= 3) && value.length >= 2) {
      (document.querySelector(".nameError") as HTMLElement).classList.remove(
        "active"
      );
      inputName.className = "valid";
    } else {
      (document.querySelector(".nameError") as HTMLElement).classList.add(
        "active"
      );
      inputName.className = "invalid";
    }
    isTrueForm();
  });
}

function trueValueInputPhone() {
  inputPhone.addEventListener("input", () => {
    const value = inputPhone.value
      .trim()
      .split("")
      .filter((item) => item !== "");
    const valueNoPlus = value.slice(1).map((item) => Number(item));
    const isNan = valueNoPlus.some(isNaN);

    if (value[0] === "+" && value.length >= 9 && !isNan) {
      (document.querySelector(".phoneError") as HTMLElement).classList.remove(
        "active"
      );
      inputPhone.className = "valid";
    } else {
      (document.querySelector(".phoneError") as HTMLElement).classList.add(
        "active"
      );
      inputPhone.className = "invalid";
    }
    isTrueForm();
  });
}

function trueValueInputAddress() {
  inputAddress.addEventListener("input", () => {
    const value = inputAddress.value
      .trim()
      .split(" ")
      .filter((item) => item !== "");
    if (value.every((item) => item.length >= 5) && value.length >= 3) {
      (document.querySelector(".addressError") as HTMLElement).classList.remove(
        "active"
      );
      inputAddress.className = "valid";
    } else {
      (document.querySelector(".addressError") as HTMLElement).classList.add(
        "active"
      );
      inputAddress.className = "invalid";
    }
    isTrueForm();
  });
}

function trueValueInputEmail() {
  inputEmail.addEventListener("input", () => {
    if (inputEmail.validity.valid) {
      (document.querySelector(".emailError") as HTMLElement).classList.remove(
        "active"
      );
      inputEmail.className = "valid";
    } else {
      (document.querySelector(".emailError") as HTMLElement).classList.add(
        "active"
      );
      inputEmail.className = "invalid";
    }
    isTrueForm();
  });
}

function trueValueInputNumberCard() {
  inputNumberCard.addEventListener("input", () => {
    let value: string = inputNumberCard.value
      .replace(/\D/g, "")
      .substring(0, 16);
    if (value) value = value.match(/.{1,4}/g)?.join(" ") as string;
    inputNumberCard.value = value;
    if (value[0] === "6")
      img.src =
        "https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png";
    if (value[0] === "5")
      img.src =
        "https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg";
    if (value[0] === "4")
      img.src =
        "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png";
    if (inputNumberCard.value.length === 19) {
      (document.querySelector(
        ".card-numberError"
      ) as HTMLElement).classList.remove("active");
      inputNumberCard.className = "valid";
    } else {
      (document.querySelector(
        ".card-numberError"
      ) as HTMLElement).classList.add("active");
      inputNumberCard.className = "invalid";
    }
    isTrueForm();
  });
}

function trueValueInputDate() {
  inputDate.addEventListener("input", () => {
    let value: string = inputDate.value.replace(/\D/g, "").substring(0, 4);
    if (value) value = value.match(/.{1,2}/g)?.join("/") as string;
    inputDate.value = value;
    console.log(value);

    if (inputDate.value.length === 5) {
      console.log(inputDate.value.length);
      (document.querySelector(".DateError") as HTMLElement).classList.remove(
        "active"
      );
      inputDate.className = "valid";
    } else if (inputDate.value.length < 5) {
      (document.querySelector(".DateError") as HTMLElement).classList.add(
        "active"
      );
      inputDate.className = "invalid";
    }
    isTrueForm();
  });
}

function trueValueInputCVV() {
  inputCVV.addEventListener("input", () => {
    const value = inputCVV.value;
    if (value.length >= 3) {
      inputCVV.value = value.substring(0, 3);
      (document.querySelector(".CVVError") as HTMLElement).classList.remove(
        "active"
      );
      inputCVV.className = "valid";
    } else {
      (document.querySelector(".CVVError") as HTMLElement).classList.add(
        "active"
      );
      inputCVV.className = "invalid";
    }
    isTrueForm();
  });
}

function isTrueForm() {
  if (
    inputName.className === "valid" &&
    inputPhone.className === "valid" &&
    inputAddress.className === "valid" &&
    inputEmail.className === "valid" &&
    inputNumberCard.className === "valid" &&
    inputDate.className === "valid" &&
    inputCVV.className === "valid"
  ) {
    console.log(true);
    buttonConfirm.classList.add("active");
    headerForm.classList.add("active");
  } else {
    console.log(false);
    buttonConfirm.classList.remove("active");
    headerForm.classList.remove("active");
  }
}

function isTrueforClickButton() {
  buttonConfirm.addEventListener("click", () => {
    if (inputName.className !== "valid")
      (document.querySelector(".nameError") as HTMLElement).classList.add(
        "active"
      );
    if (inputPhone.className !== "valid")
      (document.querySelector(".phoneError") as HTMLElement).classList.add(
        "active"
      );
    if (inputAddress.className !== "valid")
      (document.querySelector(".addressError") as HTMLElement).classList.add(
        "active"
      );
    if (inputEmail.className !== "valid")
      (document.querySelector(".emailError") as HTMLElement).classList.add(
        "active"
      );
    if (inputNumberCard.className !== "valid")
      (document.querySelector(
        ".card-numberError"
      ) as HTMLElement).classList.add("active");
    if (inputDate.className !== "valid")
      (document.querySelector(".DateError") as HTMLElement).classList.add(
        "active"
      );
    if (inputCVV.className !== "valid")
      (document.querySelector(".CVVError") as HTMLElement).classList.add(
        "active"
      );

    if (
      inputName.className === "valid" &&
      inputPhone.className === "valid" &&
      inputAddress.className === "valid" &&
      inputEmail.className === "valid" &&
      inputNumberCard.className === "valid" &&
      inputDate.className === "valid" &&
      inputCVV.className === "valid"
    ) {
      (document.querySelector(".dataCard") as HTMLElement).classList.add(
        "active"
      );
      (document.querySelector(
        ".order-is-processed"
      ) as HTMLElement).classList.add("active");
      let time = 3;
      setInterval(() => {
        time--;
        if (time >= 0) {
          (document.querySelector(
            ".order-is-processed span"
          ) as HTMLElement).innerHTML = `${time}`;
        }
        if (time === 0) {
          document.location.href = "./index.html";
          localStorage.setItem("arr", "");
        }
      }, 1000);
    }
  });
}
