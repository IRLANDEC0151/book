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

addSocialBtn.addEventListener("click", addSocialLink);
let maxLink = 0;
function addSocialLink() {
  if (maxLink === 3) {
    addSocialBtn.textContent = "Информации достаточно";
    return 0;
  }
  maxLink++;
  console.log(maxLink);
  let socialLinkArr = [
    "https://vk.com/irlanndec",
    "https://www.instagram.com/punkybrain/",
    "https://vk.com/id527353857"
  ];
  document.getElementById("beforeSocial").insertAdjacentHTML(
    "beforeend",
    `
    <div class="form-group" id="socialLinkInput${maxLink}"> 
    <label for="exampleInputPassword1">Укажите ссылку куда вам могут написать</label>
    <input
      type="text"
      class="form-control"
      id="exampleInputPassword1"
      placeholder=" Пример: ${socialLinkArr[maxLink-1]}"
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
      maxLink--;
    }
    addSocialBtn.innerHTML = ` <img src="./add.svg" width="15px"  />Указать
      социальную сеть`;
  };
}
