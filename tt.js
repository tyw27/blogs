const nav = document.querySelector('.nav');

const slider = function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");
    const tabs = document.querySelectorAll(".operations__tab");
    const tabsContainer = document.querySelector(".operations__tab-container");
    const tabsContent = document.querySelectorAll(".operations__content");
    const btn = document.querySelector(".btn");

    tabsContainer.addEventListener("click", function (e) {
        const clicked = e.target.closest(".operations__tab");
        if (!clicked) return;
        tabs.forEach((t) => t.classList.remove("operations__tab--active"));
        tabsContent.forEach((c) =>
            c.classList.remove("operations__content--active")
        );
        clicked.classList.add("operations__tab--active");
        document
            .querySelector(`.operations__content--${clicked.dataset.tab}`)
            .classList.add("operations__content--active");
    });

    const btnScrollTo = document.querySelector(".btn--scroll-to");
    let curSlide = 0;
    const maxSlide = slides.length;

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                "beforeend",
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };
    const activateDot = function (slide) {
        document
            .querySelectorAll(".dots__dot")
            .forEach((dot) => dot.classList.remove("dots__dot--active"));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
        if (slide == 3) {
            slider.style.transition = "none";
            slide = 0;
            slider.style.transform = `translateX(${-0}%)`;
        } else {
            slider.style.transition = ".5s";
            slider.style.transform = `translateX(${slide * -100}%)`;
        }
    };

    // const goToSlide = function (slide) {
    //   slides.forEach(
    //     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    //   );
    // };
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") prevSlide();
        e.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dots__dot")) {
            const {slide} = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();

window.onscroll = function () {
    const height = document.documentElement.scrollTop
    console.log(height)
    if (height >= 90) {
        nav.classList.add('sticky')
    } else {
        nav.classList.remove('sticky')
    }
}
console.log(window.innerWidth)


