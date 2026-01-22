document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  // ---------------------------
  // 1) 네비게이션 active 표시
  // ---------------------------
  try {
    const homeLink = document.getElementById("home-link");
    const worksLink = document.getElementById("works-link");
    const galleryLink = document.getElementById("gallery-link"); // 없을 수도 있음

    if (page === "index.html" || page === "") {
      if (homeLink) homeLink.classList.add("active-link");
    } else if (page === "works.html") {
      if (worksLink) worksLink.classList.add("active-link");
    } else if (page === "gallery.html") {
      if (galleryLink) galleryLink.classList.add("active-link");
    }
  } catch (e) {
    // console.warn(e);
  }

  // ---------------------------
  // 2) 슬라이드쇼 (index에만 컨테이너가 있으면 동작)
  // ---------------------------
  try {
    const slideshowContainer = document.querySelector(".slideshow-container");
    if (slideshowContainer) {
      const workItems = [
        { src: "assets/vid/romisoutfit.gif", alt: "Romi's Outfit", caption: "ROMI's OUTFIT" },
        { src: "assets/vid/Ero.gif", alt: "Erotic Garden", caption: "EROTIC GARDEN" },
        { src: "assets/vid/StreetAngels.gif", alt: "Street Angels", caption: "STREET ANGELS" },
        { src: "assets/vid/Cc.gif", alt: "Stalker", caption: "STALKER" },
        { src: "assets/vid/C1.gif", alt: "Spring Festival", caption: "2024 씨네꼼 봄 영화제" },
        { src: "assets/vid/C.gif", alt: "Winter Festival", caption: "2024 씨네꼼 겨울 영화제" },
        { src: "assets/vid/10.1.gif", alt: "10.1", caption: "10월 1일 국군의 날" }
      ];

      slideshowContainer.innerHTML = "";

      workItems.forEach((item, index) => {
        const slide = document.createElement("div");
        slide.className = "slide" + (index === 0 ? " active-slide" : "");

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;

        const caption = document.createElement("div");
        caption.className = "slideshow-caption";
        caption.textContent = item.caption;

        slide.appendChild(img);
        slide.appendChild(caption);
        slideshowContainer.appendChild(slide);
      });

      let current = 0;
      const slides = slideshowContainer.querySelectorAll(".slide");

      setInterval(() => {
        if (!slides.length) return;
        slides[current].classList.remove("active-slide");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active-slide");
      }, 3000);
    }
  } catch (e) {
    // console.warn(e);
  }

  // ---------------------------
  // 3) works/gallery 필터 (버튼이 있을 때만)
  // ---------------------------
  try {
    const filters = document.querySelectorAll("#category-filters button");
    if (filters.length) {
      const items =
        page === "gallery.html"
          ? document.querySelectorAll(".gallery-item")
          : document.querySelectorAll(".work-item");

      function applyFilter(filter) {
        items.forEach((item) => {
          const cats = (item.getAttribute("data-categories") || "").split(" ");
          item.style.display = filter === "all" || cats.includes(filter) ? "block" : "none";
        });

        const section =
          page === "gallery.html"
            ? document.getElementById("gallery")
            : document.getElementById("works");

        if (section) section.style.display = "grid";
      }

      filters.forEach((button) => {
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");

          if (button.classList.contains("active")) {
            button.classList.remove("active");
            applyFilter("all");
            return;
          }

          filters.forEach((b) => b.classList.remove("active"));
          button.classList.add("active");
          applyFilter(filter);
        });
      });
    }
  } catch (e) {
    // console.warn(e);
  }

  // ---------------------------
  // 4) 접기/펼치기 (있을 때만)
  // ---------------------------
  try {
    const toggleButton = document.querySelector(".toggle-button");
    const collapsibleContent = document.querySelector(".collapsible-content");

    if (toggleButton && collapsibleContent) {
      toggleButton.addEventListener("click", () => {
        collapsibleContent.classList.toggle("expanded");
        toggleButton.textContent = collapsibleContent.classList.contains("expanded") ? "접기" : "펼치기";
      });
    }
  } catch (e) {
    // console.warn(e);
  }

  // ---------------------------
  // 5) ✅ 프로젝트 탭 (핵심: project 내부로 스코프 고정)
  // ---------------------------
  try {
    const project = document.querySelector("#project-container");
    const tabsWrap = document.querySelector(".project-tabs");

    if (project && tabsWrap) {
      const tabs = tabsWrap.querySelectorAll(".tab");

      // 탭 콘텐츠는 무조건 project 안의 .tab-content만
      // (설명/디바이더 순서가 바뀌어도 절대 안 깨짐)
      const contents = project.querySelectorAll(".tab-content");

      const activate = (tabId) => {
        tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tabId));
        contents.forEach((c) => c.classList.toggle("active", c.dataset.tab === tabId));
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const target = tab.dataset.tab;
          const targetContent = project.querySelector(`.tab-content[data-tab="${target}"]`);
          if (!targetContent) return;
          activate(target);
        });
      });

      const initial = tabsWrap.querySelector(".tab.active")?.dataset.tab || tabs[0]?.dataset.tab;
      if (initial) activate(initial);
    }
  } catch (e) {
    // console.warn(e);
  }

  // ---------------------------
  // 6) (요청) 사운드 토글 제거 + 소리 재생 "시도"
  // ---------------------------
  try {
    document.querySelectorAll("video").forEach((v) => {
      // muted 속성이 있더라도 JS에서 해제 시도
      v.muted = false;

      // autoplay/loop면 재생 시도 (정책으로 막힐 수 있음)
      if (v.hasAttribute("autoplay") || v.hasAttribute("loop")) {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    });
  } catch (e) {
    // console.warn(e);
  }
});