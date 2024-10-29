document.addEventListener("DOMContentLoaded", function () {
    // 페이지 경로에 따라 네비게이션 링크 활성화
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const homeLink = document.getElementById("home-link");
    const worksLink = document.getElementById("works-link");
    const galleryLink = document.getElementById("gallery-link");

    if (page === "index.html") {
        homeLink.classList.add("active-link");
    } else if (page === "works.html") {
        worksLink.classList.add("active-link");
    } else if (page === "gallery.html") {
        galleryLink.classList.add("active-link");
    }

    // 슬라이드쇼 기능 구현 (index.html에서만 동작)
    if (page === "index.html") {
        const workItems = [
            { src: "assets/vid/Rd.gif", alt: "Romi Drawing", caption: "Drawing Series - Romi" },
            { src: "assets/vid/Ro.gif", alt: "Romi's Outfit", caption: "Romi's Outfit" },
            { src: "assets/vid/Rw.gif", alt: "Romi World", caption: "Romi World" },
            { src: "assets/vid/Ero.gif", alt: "Erotic Garden", caption: "Erotic Garden" },
            { src: "assets/vid/Sa.gif", alt: "Street Angels", caption: "Street Angels" },
            { src: "assets/vid/Cc.gif", alt: "Stalker", caption: "Stalker / Romi" },
            { src: "assets/vid/C1.gif", alt: "Spring Festival", caption: "2024 씨네꼼 봄 영화제" },
            { src: "assets/vid/C.gif", alt: "Winter Festival", caption: "2024 씨네꼼 겨울 영화제" },
            { src: "assets/vid/Mh.gif", alt: "Movie Redesign", caption: "Movie Redesign" },
            { src: "assets/vid/10.1.gif", alt: "10.1", caption: "10월 1일 국군의 날" },
            { src: "assets/vid/Vd.gif", alt: "Visual Diary", caption: "Visual Diary" },
            { src: "assets/vid/Tr.gif", alt: "Toon Render", caption: "Toon Render" },
            { src: "assets/vid/Bud.gif", alt: "Buddha", caption: "Buddha Series" }
        ];

        const slideshowContainer = document.querySelector(".slideshow-container");

        // 슬라이드 항목 생성
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

        // 3초마다 슬라이드 전환
        setInterval(showNextSlide, 3000);
    }

    // 페이지에 따라 필터 대상 선택 (works 또는 gallery)
    const items = page === "gallery.html"
        ? document.querySelectorAll('.gallery-item')
        : document.querySelectorAll('.work-item');

    const filters = document.querySelectorAll('#category-filters button');
    let activeFilters = new Set(); // 중복 선택을 위한 Set

    // 필터 버튼 클릭 이벤트
    filters.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                button.classList.remove('active');
            } else {
                activeFilters.add(filter);
                button.classList.add('active');
            }

            applyFilters(); // 필터 적용
        });
    });

    // 필터 적용 함수
    function applyFilters() {
        items.forEach(item => {
            const categories = item.getAttribute('data-categories').split(' ');
            const isVisible = [...activeFilters].every(filter => categories.includes(filter));
            item.style.display = isVisible || activeFilters.size === 0 ? 'block' : 'none';
        });

        // 필터 후 Grid 레이아웃 강제 재적용 (works 페이지에만 적용)
        if (page === "works.html") {
            const worksSection = document.getElementById('works');
            worksSection.style.display = 'grid';  // Grid 레이아웃 유지
        }
    }
});