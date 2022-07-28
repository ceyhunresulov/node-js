// header
const headerColor1 = "rgba(30,29,28,.5)";
const headerColor2 = "#302928";
const header = document.querySelector("header");
const dropdownHome = document.querySelector(".catalog__dropdown--home");
const dropdown = document.querySelector(".catalog__dropdown");

window.addEventListener("scroll", getScroll);

function getScroll() {
  if (window.scrollY > 250) {
    changeHeaderStyle();
    console.log(window.scrollY);
  } else {
    header.style.background = headerColor1;
    header.style.height = 100 + "px";
    dropdown.style.top = 60 + "px";
    dropdownHome.style.background = headerColor1;
  }
}
function changeHeaderStyle() {
  header.style.background = headerColor2;
  header.style.height = 80 + "px";
  dropdown.style.top = 40 + "px";
  dropdownHome.style.background = headerColor2;
}
