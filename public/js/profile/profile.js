$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

const card = document.querySelector("#bookCollection");
card.addEventListener("click", function () {
  if (event.target.classList.contains("card-give-img")) {
    let giveImg = event.target;
    let spinner= event.target.parentNode.childNodes[1]
    const id = event.target.dataset.id;
    const csrf = event.target.dataset.csrf;
    let giveBtn = event.target;
    
    giveImg.style.display = "none";
    spinner.style.display = "inline-block";
    fetch("/profile/remove/" + id, {
      method: "delete",
      headers: {
        "X-XSRF-TOKEN": csrf,
      },
    })
      .then((res) => res.json())
      .then((status) => {
        giveBtn.src = status.status == true ? "/box (4).svg" : "/box (3).svg";
        giveImg.style.display = "initial";
        spinner.style.display = "none";
        if (status.status) {
          if ($(".alert-success").css("display") !== "block") {
            let showAlert = setTimeout(function () {
              $(".alert-success").hide();
            }, 7000);
            $(".alert-success").show(); 
            $(".alert-success").removeClass("d-none");
          } else {
            $(".alert-success").hide();
            let closeAlert = setTimeout(function () {
              $(".alert-success").show();
              $(".alert-success").removeClass("d-none");
            }, 100);
          }
        }
      });
  }
});
