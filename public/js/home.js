$(document).ready(function () {
  $(".search-add").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr("href");
    let top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1200);
  });
  $(".addbook-bringbook").on("click", function (event) {
    event.preventDefault();
    let id = $(this).attr("href");
    let top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1200);
  });
});

//добавление социальной сети

let addSocialBtn = document.getElementById("addSocialWebBtn");
let phoneDiv = document.getElementById("beforeSocial");
addSocialBtn.addEventListener("click", addSocialLink);
let maxLink = 0;
let socialLinkExample = [
  "https://vk.com/irlanndec",
  "https://www.instagram.com/punkybrain/",
  "https://vk.com/id527353857",
];
function addSocialLink(event) {
  let countSpan = phoneDiv.getElementsByTagName("span").length;
  if (countSpan === 3) {
    addSocialBtn.textContent = "Информации достаточно";

    return 0;
  }
  maxLink++;
  phoneDiv.insertAdjacentHTML(
    "beforeend",
    `
    <div class="form-group" id="socialLinkInput${maxLink}"> 
    <label for="exampleInputPassword1">Укажите ссылку куда вам могут написать</label>
    <input
      type="text"
      name="userLink${maxLink}"
      class="form-control required"
      id="exampleInputPassword1"
      placeholder=" пример: ${socialLinkExample[countSpan]}"
      style="font-size: 1.5rem"
      required
    /> 
    <span class="removeSocialLink"> <img src="/quit.svg" width="30px" alt="register-img" /></span> 
  </div>`
  );
  document.getElementById(`socialLinkInput${maxLink}`).onclick = function (
    event
  ) {
    if (event.target.tagName == "IMG") {
      addSocialBtn.innerHTML = ` <img src="./add.svg" width="15px"  />Указать
        социальную сеть`;
      this.remove();
    }
  };
}

//добавление описания к книге
let isDescription = false;
let addDescriptionBtn = document.getElementById("addDescriptionBtn");
addDescriptionBtn.addEventListener("click", addDescription);
let descriptionInput = document.getElementsByName("description");

function addDescription() {
  if (isDescription) {
    return 0;
  }
  isDescription = true;
  document.getElementById("beforeDescription").insertAdjacentHTML(
    "beforeend",
    `
                  <div class="form-group" id="descriptionOfBook">
                  <label for="exampleFormControlTextarea1"
                    >Описание книги</label
                  >
                  <textarea
                    type="text"
                    name="description"
                    rows="3"
                    class="form-control required"
                    id="exampleFormControlTextarea1"
                    placeholder="Расскажите о вашей книге"
                    style="resize: none; font-size: 1.5rem; width: 100%;"
                    maxlength="400"
                    required
                  ></textarea>
                  <span class="removeDescription"> <img  src="/quit.svg" width="30px" alt="register-img" /></span>
                </div>`
  );
  document.getElementById("descriptionOfBook").onclick = function (event) {
    if (event.target.tagName == "IMG") {
      descriptionInput[0].value = "";
      this.remove();
      isDescription = false;
    }
  };
}

//переход между шагами

let stepOneBtn = document.getElementById("stepOne");
let stepTwoBtn = document.getElementById("stepTwo");
let stepThreeBtn = document.getElementById("stepThree");

stepOneBtn.addEventListener("click", function () {
  stepOneBtn.setAttribute("data-toggle", "pill");
  document.getElementById("v-pills-home-tab").classList.remove("active");
  document.getElementById("v-pills-profile-tab").classList.add("active");
  stepOneBtn.classList.remove("active");
});
stepTwoBtn.addEventListener("click", function () {
  stepTwoBtn.setAttribute("data-toggle", "pill");
  document.getElementById("v-pills-profile-tab").classList.remove("active");
  document.getElementById("v-pills-phone-tab").classList.add("active");
  stepTwoBtn.classList.remove("active");
});

stepThreeBtn.addEventListener("click", function () {
  if (!isInputNull()) {
    isNull = false;
    document.getElementById("errorBook").classList.add("addbook-errorInput");
    document.getElementById("errorBook").textContent = nullInput;
    stepThreeBtn.removeAttribute("data-toggle");
    return 0;
  }
  registerEmailInput[0].value = emailInput[0].value;
  stepThreeBtn.setAttribute("data-toggle", "pill");
  document.getElementById("v-pills-phone-tab").classList.remove("active");
  document.getElementById("v-pills-reg-tab").classList.add("active");
  stepThreeBtn.classList.remove("active");
  createBook();
});

//все input
let bookNameInput = document.getElementsByName("bookName");
let authorInput = document.getElementsByName("author");
let genreInput = document.getElementsByName("genre");
let cityInput = document.getElementsByName("city");
let streetInput = document.getElementsByName("street");
let houseInput = document.getElementsByName("house");
let userNameInput = document.getElementsByName("userName");
let emailInput = document.getElementsByName("email");
let phoneInput = document.getElementsByName("phone");
let registerEmailInput = document.getElementsByName("registerEmail");
let passwordInput = document.getElementsByName("password");
let confirmInput = document.getElementsByName("confirm");

//проверка input
let isNull = false;
let nullInput = "";
let inputValidator = {};
function isInputNull() {
  $("input.required").each(function (i, el) {
    if ($("textarea.required").val() == "") {
      isNull = true;
      nullInput = $("textarea.required").attr("placeholder");
      return false;
    }
    let ell = $(el).attr("name");
    let val = $(el).val();

    if (val == "") {
      nullInput = $(el).attr("placeholder");
      isNull = true;
      return false;
    }
    inputValidator[ell] = val;
  });

  console.log(inputValidator);
  createInputForValidator(inputValidator);
  return isNull == true ? false : true;
}
function createInputForValidator(book) {
  sendBook(book)
    .then((data) => {
      console.log("книга отправлена на сервер");
      console.log(data);
      if (data.hasOwnProperty("error")) {
        document
          .getElementById("errorBook")
          .classList.add("addbook-errorInput");
        document.getElementById("errorBook").textContent = data.error;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
//создаем книгу
function createBook() {
  if (descriptionInput[0] == undefined) {
    let bookSchema = {
      bookName: bookNameInput[0].value,
      author: authorInput[0].value,
      genre: genreInput[0].value,
      address: cityInput[0].value,
    };
  } else {
    let bookSchema = {
      bookName: bookNameInput[0].value,
      description: descriptionInput[0].value,
      author: authorInput[0].value,
      genre: genreInput[0].value,
      address: cityInput[0].value,
    };
  }
}

//создаем аккаунт
let regBtn = document.getElementById("reg");
regBtn.addEventListener("click", register);

function register() {
  let registerForm = document.getElementById("registerForm");
  // validateUser()
  let user = {
    email: registerEmailInput[0].value,
    password: passwordInput[0].value,
    confirm: confirmInput[0].value,
  };
  emailInput[0].value = registerEmailInput[0].value;

  sendRegister(user)
    .then((data) => {
      console.log("регистрация отправлена на сервер");
      if (data.hasOwnProperty("error")) {
        document
          .getElementById("errorRegister")
          .classList.add("addbook-errorInput");
        document.getElementById("errorRegister").textContent = data.error;
        return false;
      }
      document.location.href = "http://localhost:8080/profile";
    })
    .catch((e) => {
      console.log(e);
    });
}
// отправка книги  на сервер
async function sendBook(book) {
  var token = document
    .querySelector('input[name="_csrf"]')
    .getAttribute("value");
  return fetch("/postBook", {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "CSRF-Token": token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
}
// отправка user  на сервер
async function sendRegister(user) {
  var token = document
    .querySelector('input[name="_csrf"]')
    .getAttribute("value");
  return fetch("/", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "CSRF-Token": token,
    },
  })
    .then((res) => {
      if (res.redirected) {
        return true;
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
}
