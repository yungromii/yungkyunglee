document.addEventListener("DOMContentLoaded", function () {
    // 페이지 경로에 따라 네비게이션 링크 활성화
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const homeLink = document.getElementById("home-link");
    const worksLink = document.getElementById("works-link");
    const galleryLink = document.getElementById("gallery-link");

    // 초기 로드 시 홈 섹션 활성화 및 슬라이드쇼 실행
    function activateHome() {
        homeLink.classList.add("active-link");
        showSlideshow();
    }

    if (page === "index.html" || page === "") {
        activateHome(); // 페이지 로드 시 자동으로 홈 섹션 활성화
    } else if (page === "works.html") {
        worksLink.classList.add("active-link");
    } else if (page === "gallery.html") {
        galleryLink.classList.add("active-link");
    }

    // 슬라이드쇼 기능 구현 (index.html에서만 동작)
    function showSlideshow() {
        const workItems = [
           
            { src: "assets/vid/romisoutfit.gif", alt: "Romi's Outfit", caption: "ROMI's OUTFIT" },
            { src: "assets/vid/Ero.gif", alt: "Erotic Garden", caption: "EROTIC GARDEN" },
            { src: "assets/vid/StreetAngels.gif", alt: "Street Angels", caption: "STREET ANGELS" },
            { src: "assets/vid/Cc.gif", alt: "Stalker", caption: "STALKER" },
            { src: "assets/vid/C1.gif", alt: "Spring Festival", caption: "2024 씨네꼼 봄 영화제" },
            { src: "assets/vid/C.gif", alt: "Winter Festival", caption: "2024 씨네꼼 겨울 영화제" },
            { src: "assets/vid/10.1.gif", alt: "10.1", caption: "10월 1일 국군의 날" }
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

    // 필터 버튼 클릭 이벤트
    filters.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // 버튼이 이미 활성화되어 있으면 비활성화
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                applyFilter("all"); // "all" 필터로 전환
                return;
            }

            // 다른 버튼 비활성화 및 현재 버튼 활성화
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilter(filter); // 선택된 필터 적용
        });
    });

    // 필터 적용 함수
    function applyFilter(filter) {
        items.forEach(item => {
            const categories = item.getAttribute('data-categories').split(' ');
            item.style.display = categories.includes(filter) || filter === "all" ? 'block' : 'none';
        });

        // 필터 후 Grid 레이아웃 강제 재적용
        const section = page === "gallery.html" ? document.getElementById('gallery') : document.getElementById('works');
        section.style.display = 'grid';
    }

    // 백드롭 비디오 음소거 토글 기능
    const video = document.querySelector("#background-video"); // 비디오 요소 선택
    const toggleSoundButton = document.querySelector("#toggle-sound"); // 음소거 토글 버튼 선택

    if (video && toggleSoundButton) {
        // 초기 음소거 설정
        video.muted = true;

        toggleSoundButton.addEventListener("click", () => {
            // 뮤트 상태를 토글
            video.muted = !video.muted;
            // 버튼 텍스트 업데이트
            toggleSoundButton.textContent = video.muted ? "sound on" : "sound off";
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".toggle-button");
    const collapsibleContent = document.querySelector(".collapsible-content");

    toggleButton.addEventListener("click", () => {
        collapsibleContent.classList.toggle("expanded");
        toggleButton.textContent = 
            collapsibleContent.classList.contains("expanded") ? "접기" : "펼치기";
    });
});

const tabs = document.querySelectorAll('.project-tabs .tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.querySelector(`.tab-content[data-tab="${target}"]`).classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
});