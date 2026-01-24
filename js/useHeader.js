let menu = document.querySelector(".menu");
let header = document.querySelector("header");

function toggleHeader() {
    header.classList.toggle("active");
}

menu.addEventListener("click", toggleHeader);
