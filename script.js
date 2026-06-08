window.addEventListener("load", () => {

    const loader      = document.getElementById("loader");
    const skeleton    = document.getElementById("contentSkeleton");
    const mainContent = document.getElementById("mainContent");
    const loaderLogo  = document.getElementById("loaderLogo");

    const LOADER_INTERVAL = 10 * 60 * 1000;

    const lastLoaderTime = localStorage.getItem("flareonixLastLoader");
    const now            = Date.now();

    const shouldShowLogoLoader =
        !lastLoaderTime ||
        (now - parseInt(lastLoaderTime)) > LOADER_INTERVAL;

    if (shouldShowLogoLoader) {

        localStorage.setItem("flareonixLastLoader", now);

        if (skeleton) skeleton.remove();

        setTimeout(() => {

            loaderLogo.style.animation = "none";
            loaderLogo.style.top       = "70px";
            loaderLogo.style.left      = "130px";
            loaderLogo.style.width     = "120px";

            mainContent.style.opacity = "1";
            loader.style.opacity      = "0";

            setTimeout(() => {
                loader.remove();
            }, 1000);

        }, 2500);

    } else {

    loader.remove();

    if (skeleton) {

        mainContent.style.opacity = "0";

        loaderLogo.style.display = "block";
        loaderLogo.style.opacity = "0";

        /* show logo after 3 sec */

        setTimeout(() => {
            loaderLogo.style.opacity = "1";

            loaderLogo.style.transition =
                "all 1.8s cubic-bezier(0.65,0,0.35,1)";
                loaderLogo.style.animation = "none";
            loaderLogo.style.top = "50%";
            loaderLogo.style.left = "50%";
            loaderLogo.style.width = "260px";

            setTimeout(() => {

                /* move logo to header */

                loaderLogo.style.top = "70px";
                loaderLogo.style.left = "130px";
                loaderLogo.style.width = "120px";

                skeleton.style.opacity = "0";

                setTimeout(() => {

                    skeleton.remove();

                    mainContent.style.opacity = "1";

                },1800);

            },500);

        },3000);

    } else {

        mainContent.style.opacity = "1";

    }

}
});

const particles = document.getElementById("particles");

setInterval(() => {

    const p = document.createElement("div");
    p.className = "fire-particle";

    p.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 10 + 4;
    p.style.width  = size + "px";
    p.style.height = size + "px";

    const duration = Math.random() * 4 + 3;
    p.style.animationDuration = duration + "s";

    particles.appendChild(p);

    setTimeout(() => p.remove(), duration * 1000);

}, 200);

const menuToggle  = document.querySelector(".menu-toggle");
const mobileMenu  = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

});

// Close menu when any mobile nav link is clicked
document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});

// Active link highlight — sync both navs
const allNavLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");

allNavLinks.forEach(link => {
    link.addEventListener("click", function () {
        // Remove active from same nav
        const nav = this.closest("nav");
        nav.querySelectorAll("a").forEach(a => a.classList.remove("active"));
        this.classList.add("active");
        // Mirror to the other nav
        const href = this.getAttribute("href");
        allNavLinks.forEach(other => {
            if (other !== this && other.getAttribute("href") === href) {
                other.closest("nav").querySelectorAll("a").forEach(a => a.classList.remove("active"));
                other.classList.add("active");
            }
        });
    });
});

const mainContent = document.getElementById("mainContent");
const authScreen  = document.getElementById("authScreen");

const sections = [".hero", ".information", ".stats", ".features", ".cta"];

// Both desktop and mobile "Enter The Fire" buttons
document.querySelectorAll(".flare").forEach(btn => {
    btn.addEventListener("click", () => {

        // Close mobile menu if open
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");

        authScreen.classList.add("show");

        sections.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.display = "none";
        });

    });
});

document.querySelector(".back-home").addEventListener("click", (e) => {

    e.preventDefault();
    authScreen.classList.remove("show");

    sections.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.style.display = "";
    });

});