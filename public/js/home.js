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

//добавление input для социальной сети

let addSocialBtn = document.querySelector(".addbook-addSocialWebBtn");
let phoneInput = document.getElementById("beforeSocial");
addSocialBtn.addEventListener("click", addSocialLink);
let maxLink = 0;
let socialLinkExample = [
  "https://vk.com/irlanndec",
  "https://www.instagram.com/punkybrain/",
  "https://vk.com/id527353857",
];
function addSocialLink() {
  let countSpan = phoneInput.getElementsByTagName("span").length;
  if (countSpan === 3) {
    addSocialBtn.textContent = "Информации достаточно";
    return 0;
  }
  maxLink++;
  phoneInput.insertAdjacentHTML(
    "beforeend",
    `
    <div class="form-group" id="socialLinkInput${maxLink}"> 
    <label for="exampleInputPassword1">Укажите ссылку куда вам могут написать</label>
    <input
      type="text"
      class="form-control"
      id="exampleInputPassword1"
      placeholder=" Пример: ${socialLinkExample[countSpan]}"
      style="font-size: 1.5rem"
      required
    />
    <span> <img  id="removeSocialLink" src="/quit.svg" width="30px" alt="register-img" /></span> 
  </div>`
  );
  document.getElementById(`socialLinkInput${maxLink}`).onclick = function (
    event
  ) {
    if (event.target.tagName == "IMG") {
      this.remove();
    }
    addSocialBtn.innerHTML = ` <img src="./add.svg" width="15px"  />Указать
      социальную сеть`;
  };
}
