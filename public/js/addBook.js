
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
                    >Комментарий</label
                  > 
                  <textarea
                    type="text"
                    name="description"
                    rows="3"
                    class="form-control required"
                    id="exampleFormControlTextarea1"
                    placeholder="Расскажите о вашей книге"
                    style="resize: none; font-size: 1.5rem; width: 70%;"
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