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
}

function trueValueInputName() {
  const inputName = document.getElementById("name") as HTMLInputElement;

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
  });
}

function trueValueInputPhone() {
  const inputPhone = document.getElementById(
    "phone-number"
  ) as HTMLInputElement;

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
  });
}

function trueValueInputAddress() {
  const inputAddress = document.getElementById("address") as HTMLInputElement;

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
  });
}

function trueValueInputEmail() {
  const inputEmail = document.getElementById("email") as HTMLInputElement;

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
  });
}

function trueValueInputNumberCard() {
  const inputNumberCard = document.getElementById(
    "card-number"
  ) as HTMLInputElement;
  const img = document.querySelector(".imgCard img") as HTMLImageElement;

  inputNumberCard.addEventListener("input", () => {
    const value = inputNumberCard.value.split("").filter((item) => item !== "");
    const valueNamber = value.map((item) => Number(item));
    const isNan = valueNamber.some(isNaN);
    if (valueNamber[0] === 6)
      img.src =
        "https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png";
    if (valueNamber[0] === 5)
      img.src =
        "https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg";
    if (valueNamber[0] === 4)
      img.src =
        "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png";
    if (valueNamber.length === 16 && !isNan) {
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
  });
}
