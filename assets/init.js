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
      // workItems 옵션:
      // - 일반 슬라이드: { src, alt, href }
      // - 내부 프레임(미니 슬라이드쇼): { frames: ["...", "..."], frameMs: 300, alt, href }
      const workItems = [
         { src: "assets/gif/street-angels.gif", alt: "Street Angels", href: "street-angels.html" },
        { frames: ["assets/img/outfit/Rp.jpg","assets/img/outfit/Rp.jpg","assets/img/outfit/Rp.jpg","assets/img/outfit/1.jpg","assets/img/outfit/2.jpg","assets/img/outfit/3.jpg","assets/img/outfit/4.jpg","assets/img/outfit/5.jpg","assets/img/outfit/6.jpg","assets/img/outfit/dressup.jpg"], 
          frameMs:300, alt: "romi-world", href:"romi-world.html"},

        
         

        { src: "assets/vid/romisoutfit.gif", alt: "Romi's Outfit", href: "romis-outfit.html" },
         { src: "assets/img/terayama.jpg", alt: "terayama", href: "terayama.html" },

         { frames: ["assets/nds/poster.jpg","assets/nds/poster.jpg","assets/nds/poster.jpg","assets/nds/ti1.jpg","assets/nds/ti2.jpg","assets/nds/ti3.jpg","assets/nds/ti4.jpg","assets/nds/ti5.jpg","assets/nds/ti6.jpg","assets/nds/ti7.jpg"], 
          frameMs:300, alt: "nodeulsum", href:"nodeulsum.html"},

          { src: "assets/vid/Cc.gif", alt: "Stalker", href: "stalker.html" },
        { src: "assets/vid/Ero.gif", alt: "Erotic Garden", href: "erotic-garden.html" },
       
       
        { src: "assets/vid/C1.gif", alt: "Spring Festival", href: "cinecom-spring-2024.html" },
        { src: "assets/vid/C.gif", alt: "Winter Festival", href: "cinecom-winter-2024.html" },
        { src: "assets/vid/10.1.gif", alt: "10.1", href: "10-1.html" }
       
      ];

      slideshowContainer.innerHTML = "";

      workItems.forEach((item, index) => {
        const slide = document.createElement("div");
        slide.className = "slide" + (index === 0 ? " active-slide" : "");

        const link = document.createElement("a");
        link.href = item.href || "works.html";
        link.className = "slide-link";
        link.setAttribute("aria-label", item.alt || "Open project");

        const img = document.createElement("img");
        img.alt = item.alt;

        // ✅ 내부 프레임(미니 슬라이드쇼) 지원
        if (Array.isArray(item.frames) && item.frames.length) {
          img.src = item.frames[0];
          img.dataset.frames = JSON.stringify(item.frames);
          img.dataset.frameMs = String(item.frameMs || 300);
        } else {
          img.src = item.src;
        }

        link.appendChild(img);
        slide.appendChild(link);
        slideshowContainer.appendChild(slide);
      });

      let current = 0;
      const slides = slideshowContainer.querySelectorAll(".slide");

      // ✅ 내부 프레임(미니 슬라이드쇼): 활성 슬라이드일 때만 재생
      function startInnerShow(slideEl) {
        if (!slideEl) return;
        const img = slideEl.querySelector("img");
        if (!img || !img.dataset.frames) return;

        let frames;
        try {
          frames = JSON.parse(img.dataset.frames);
        } catch {
          return;
        }
        if (!Array.isArray(frames) || !frames.length) return;

        const ms = Number(img.dataset.frameMs || 300);
        stopInnerShow(slideEl);

        let i = 0;
        slideEl._innerTimer = setInterval(() => {
          i = (i + 1) % frames.length;
          img.src = frames[i];
        }, ms);
      }

      function stopInnerShow(slideEl) {
        if (!slideEl) return;
        if (slideEl._innerTimer) {
          clearInterval(slideEl._innerTimer);
          slideEl._innerTimer = null;
        }

        // 비활성 시 첫 프레임으로 되돌리기(선호하면 유지)
        const img = slideEl.querySelector("img");
        if (img && img.dataset.frames) {
          try {
            const frames = JSON.parse(img.dataset.frames);
            if (Array.isArray(frames) && frames.length) img.src = frames[0];
          } catch {}
        }
      }

      // 첫 슬라이드가 frames를 갖고 있으면 바로 재생
      startInnerShow(slides[current]);

      setInterval(() => {
        if (!slides.length) return;

        stopInnerShow(slides[current]);
        slides[current].classList.remove("active-slide");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active-slide");
        startInnerShow(slides[current]);
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