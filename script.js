const pop = document.querySelector(".Features--popup");
const nav = document.querySelector(".popup--navbar");
// 11th component
// answer popup onclick effect
ans_pop = (Ques) => {
  let down_arrow = Ques.querySelector("#Q--down-arrow");
  let ans = Ques.nextElementSibling;

  let activeQuestion = document.getElementById("on-c-Q");
  if (activeQuestion) {
    activeQuestion.removeAttribute("id");
  }

  Ques.setAttribute("id", "on-c-Q");

  ans.style.display =
    ans.style.display === "none" || ans.style.display === "" ? "block" : "none";
  down_arrow.style.transform =
    ans.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";

  Ques.setAttribute("id", "on-c-Q");
};

//Modifying or removing elements by clicking body
document.body.addEventListener("click", (event) => {
  let activeQuestion = document.getElementById("on-c-Q");

  // Check if the click was outside the active question
  if (activeQuestion && !activeQuestion.contains(event.target)) {
    activeQuestion.removeAttribute("id");
  }
});

// Footer Navbar toggler
footer_Nav_pop = (lis_) => {
  let right_arrow = lis_.querySelector(".footer-menu-nav--chevron");
  let a = lis_.querySelectorAll(".footer-nav--ul li ul li");
  for (i = 0; i < a.length; i++) {
    a[i].style.display =
      a[i].style.display === "none" || a[i].style.display === ""
        ? "block"
        : "none";

    right_arrow.style.transform =
      a[i].style.display === "block" ? "rotate(90deg)" : "rotate(0deg)";
  }
};

popups_ = (e) => {
  switch (e.id) {
    case "Features":
      pop.style.display =
        pop.style.display == "none" || pop.style.display == ""
          ? "block"
          : "none";
      break;

    case "popup-back--btn":
      pop.style.display = "none";
      break;

    case "li--popup--cancel":
      pop.style.display = "none";
      nav.style.right = "-100%";
      break;

    case "toggle":
      nav.style.right = "0";
      break;

    case "nav--cancel":
      nav.style.right = "-100%";
      break;
    default:
      break;
  }
};

//
const carousel_card = document.querySelector("._10th-comp-card");
const cards = document.querySelector("._10th-comp--cards");

if (window.matchMedia("(max-width: 600px)").matches) {
  carousel_card.classList.add("owl-carousel");
  carousel_card.classList.add("owl-theme");
  cards.classList.add("item");
  console.log("hello");
} else {
  carousel_card.classList.remove("owl-carousel");
  carousel_card.classList.remove("owl-theme");
  cards.classList.remove("item");
}
