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

    // 슬라이드 쇼 기능 추가
    if (page === "index.html") {
        const workItems = [
            { src: "assets/vid/Rd.gif", alt: "Romi Drawing", caption: "Drawing Series - Romi" },
            { src: "assets/vid/Ro.gif", alt: "Romi's Outfit", caption: "Romi's Outfit" },
            { src: "assets/vid/Rw.gif", alt: "Romi World", caption: "Romi World" },
            { src: "assets/vid/Ero.gif", alt: "Erotic Garden", caption: "Erotic Garden" },
            { src: "assets/vid/Sa.gif", alt: "Street Angels", caption: "Street Angels" },
            { src: "assets/vid/Cc.gif", alt: "Stalker", caption: "Stalker / Romi" },
            { src: "assets/vid/C1.gif", alt: "2024 씨네꼼 봄 영화제: 단절과 고독", caption: "2024 씨네꼼 봄 영화제: 단절과 고독" },
            { src: "assets/vid/C.gif", alt: "2024 씨네꼼 겨울 영화제: 응답하라 1994", caption: "2024 씨네꼼 겨울 영화제: 응답하라 1994" },
            { src: "assets/vid/Mh.gif", alt: "Movie Redesign", caption: "Movie Redesign" },
            { src: "assets/vid/10.1.gif", alt: "10.1", caption: "10월 1일 국군의 날" },
            { src: "assets/vid/Vd.gif", alt: "Visual Diary", caption: "Visual Diary" },
            { src: "assets/vid/Tr.gif", alt: "Toon Render", caption: "Toon Render" },
            { src: "assets/vid/Bud.gif", alt: "Buddha", caption: "Buddha Series" },
        ];

        const slideshowContainer = document.querySelector(".slideshow-container");

        // 슬라이드 항목 추가
        workItems.forEach((item, index) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            if (index === 0) slide.classList.add("active-slide");

            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt;

            const caption = document.createElement("div");
            caption.classList.add("slideshow-caption");
            caption.textContent = item.caption;

            slide.appendChild(img);
            slide.appendChild(caption);
            slideshowContainer.appendChild(slide);
        });

        let currentSlide = 0;
        const slides = slideshowContainer.querySelectorAll(".slide");

        // 슬라이드 변경 함수
        function showNextSlide() {
            slides[currentSlide].classList.remove("active-slide");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active-slide");
        }

        // 일정 시간마다 슬라이드 변경
        setInterval(showNextSlide, 3000); // 3초마다 슬라이드 변경
    }
});
