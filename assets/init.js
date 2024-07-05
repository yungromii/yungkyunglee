// JavaScript 코드 (assets/script.js 또는 <script> 태그 내에 포함)

document.addEventListener("DOMContentLoaded", function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    var homeLink = document.getElementById("home-link");
    var worksLink = document.getElementById("works-link");
    var galleryLink = document.getElementById("gallery-link");
    var aboutLink = document.getElementById("about-link");

    if (page === "index.html") {
        homeLink.classList.add("active-link");
    } else if (page === "works.html") {
        worksLink.classList.add("active-link");
    } else if (page === "gallery.html") {
        galleryLink.classList.add("active-link");
    } else if (page === "about.html") {
        aboutLink.classList.add("active-link");
    }
});
