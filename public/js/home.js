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

//все bookOrAuthorSearch
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
    <label for="exampleInputPassword1">Укажите ссылку, куда вам могут написать</label>
    <input
      type="text"
      name="userLink${maxLink}"
      class="form-control required data-contact"
      id="exampleInputPassword1"
      placeholder=" пример: ${socialLinkExample[countSpan]}"
      style="font-size: 1.5rem"
      data-type='userLink'

      required
    />  
    <span class="removeSocialLink"> <img src="/delete.svg" width="30px" alt="register-img" /></span> 
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
                    >Комментарий к книге</label
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
                    data-type='book'

                    required
                  ></textarea>
                  <span class="removeDescription"> <img  src="/delete.svg" width="30px" alt="register-img" /></span>
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
stepThreeBtn.addEventListener("click", async function () {
  isUserContactNull();
  isInputNull();
  if (isNull) {
    isNull = false;
    document.getElementById("errorBook").classList.add("addbook-errorInput");
    document.getElementById("errorBook").textContent = errorInput;
    stepThreeBtn.removeAttribute("data-toggle");
    return 0;
  }
  registerEmailInput[0].value = emailInput[0].value;
  stepThreeBtn.setAttribute("data-toggle", "pill");
  document.getElementById("v-pills-phone-tab").classList.remove("active");
  document.getElementById("v-pills-reg-tab").classList.add("active");
  stepThreeBtn.classList.remove("active");
});

//проверка bookOrAuthorSearch
let isNull = false;
let errorInput = "";
let inputValidator = {};
let book = {};
function isInputNull() {
  $("input.required").each(function (i, el) {
    let ell = $(el).attr("name");
    let val = $(el).val();
    if ($("textarea.required").val() !== undefined) {
      if ($("textarea.required").val() !== "") {
        inputValidator[$("textarea.required").attr("name")] = $(
          "textarea.required"
        ).val();
      } else {
        isNull = true;
        errorInput = $("textarea.required").attr("placeholder");
      }
    }
    if (val == "") {
      errorInput = $(el).attr("placeholder");
      isNull = true;
      return false;
    }
    inputValidator[ell] = val;
  });
}
function isUserContactNull() {
  let userContact = [];
  $("input.data-contact").each(function (i, el) {
    let ell = $(el).attr("name");
    let val = $(el).val();
    if (val !== "") {
      userContact.push(val);
    }
  });
  console.log(userContact);
  if (!userContact.length) {
    errorInput = "Вы не указали ни одного контакта";
    isNull = true;
  }
}
function findDataTypeUser(user) {
  user.userLink = [];
  let address = {};
  $("input").each(function (i, el) {
    switch ($(el).attr("data-type")) {
      case "user":
        user[$(el).attr("name")] = $(el).val();
        break;
      case "place":
        address[$(el).attr("name")] = $(el).val();
        break;
      case "userLink":
        user.userLink.push($(el).val());
        break;
    }
  });
  user.place = address;
  console.log(user);
  return user;
}
//создаем аккаунт
let regBtn = document.getElementById("reg");
regBtn.addEventListener("click", register);

function register() {
  let user = {
    email: registerEmailInput[0].value,
    password: passwordInput[0].value,
    confirm: confirmInput[0].value,
  };
  let fullUser = findDataTypeUser(user);

  sendRegister(fullUser)
    .then((data) => {
      console.log("регистрация отправлена на сервер");
      console.log(data);
      if (data.hasOwnProperty("error")) {
        document
          .getElementById("errorRegister")
          .classList.add("addbook-errorInput");
        document.getElementById("errorRegister").textContent = data.error;
        return false;
      }
      document.location.href = "http://localhost:8080/complete";
      sendBook(inputValidator);
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

// отправка книги  на сервер
let token = document.querySelector('input[name="_csrf"]').getAttribute("value");
async function sendBook(book) {
  await fetch("/postBook", {
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
    .then((data) => {
      console.log("книга отправлена на сервер");
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

//поиск книги
let bookOrAuthorList = document.getElementById("bookOrAuthorList");
let bookOrAuthorSearch = document.getElementById("bookOrAuthorSearch");
$("html").on("click", function (e) {
  if (
    event.target.id != bookOrAuthorSearch.id &&
    event.target.parentNode.tagName != "LI" &&
    (event.target.parentNode.tagName || event.target.tagName) != "UL"
  ) {
    bookOrAuthorList.style.display = "none";
  }
});
$(function () {
  bookOrAuthorSearch.onclick = function () {
    bookOrAuthorList.style.display = "initial";
  };
  bookOrAuthorSearch.oninput = function () {
    searchCheck();
  };
  async function searchCheck() {
    if (bookOrAuthorSearch.value.length >= 2) {
      bookOrAuthorList.style.display = "initial";

      await fetch("/search", {
        method: "POST",
        body: JSON.stringify({
          text: bookOrAuthorSearch.value.replace(/\s+/g, " ").trim(),
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "CSRF-Token": token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          outputSearch(data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      $("#bookOrAuthorList ul").empty();
      bookOrAuthorList.style.display = "none";
    }
  }
});

//вывод результатов поиска с сервера
function outputSearch(data) {
  $("#bookOrAuthorList ul").empty();
  let articleArray = data.result;
  if (!articleArray.length) {
    document
      .querySelector("#bookOrAuthorList ul")
      .insertAdjacentHTML(
        "beforeend",
        `<p id="search-p" class="noResults">Нет результатов</p>`
      );
  }
  for (let i = 0; i < articleArray.length; i++) {
    if (typeof articleArray[i] == "string") {
      console.log(typeof articleArray[i]);

      document.querySelector("#bookOrAuthorList ul").insertAdjacentHTML(
        "beforeend",
        `<li> <img src="/authorBlack.svg" alt="">
          <span class="onlyAuthor">${articleArray[i]}</span>
          </li>`
      );
      continue;
    }
    document.querySelector("#bookOrAuthorList ul").insertAdjacentHTML(
      "beforeend",
      `<li>
        <span class="resultBook">${articleArray[i].bookName}</span>
        <span class="resultAuthor">${articleArray[i].author}</span>
        </li>`
    );
  }
}
