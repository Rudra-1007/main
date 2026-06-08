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

// close menu

const modal =
document.querySelector('.member-modal');

const modalName =
document.getElementById('modalName');

const modalRole =
document.getElementById('modalRole');

const modalDesc =
document.getElementById('modalDesc');

document
.querySelectorAll('.learn-more')
.forEach(btn=>{

    btn.addEventListener('click',(e)=>{

        e.preventDefault();

        modalName.textContent =
        btn.dataset.name;

        modalRole.innerHTML = `
            ${btn.dataset.role}
            <a href="${btn.dataset.linkedin}"
               target="_blank"
               class="linkedin-icon">
               <i class="fab fa-linkedin"></i>
            </a>
        `;

        modal.classList.add('show');

        typeWriter(
            modalDesc,
            btn.dataset.desc,
            35
        );
    });

});

document
.querySelector('.close-modal')
.addEventListener('click',()=>{

    modal.classList.remove('show');
});

modal.addEventListener('click',(e)=>{

    if(e.target === modal){

        modal.classList.remove('show');
    }

});

function typeWriter(element, text) {

    element.textContent = "";

    let i = 0;

    function type() {

        if(i < text.length){

            element.textContent += text.charAt(i);

            i++;

            const randomSpeed =
            Math.random() * 40 + 20;

            setTimeout(type, randomSpeed);

        }

    }

    type();
}

// Toggle mobile navigation screen
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

//auth

const flareBtn = document.querySelector('.flare');
const authScreen = document.getElementById('authScreen');
const mainContent = document.getElementById('mainContent');

flareBtn.addEventListener('click', () => {

    authScreen.classList.add('show');

    // hide homepage sections
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.information').style.display = 'none';
    document.querySelector('.stats').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.querySelector('.cta').style.display = 'none';

});

document.querySelector('.back-home').addEventListener('click', (e) => {
    e.preventDefault();

    authScreen.classList.remove('show');

    document.querySelector('.hero').style.display = '';
    document.querySelector('.information').style.display = '';
    document.querySelector('.stats').style.display = '';
    document.querySelector('.features').style.display = '';
    document.querySelector('.cta').style.display = '';
});

// Typewriter Effect
function typeWriter(element, text, speed = 40) {
    element.textContent = "";
    let i = 0;

    const typing = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;

        if (i >= text.length) {
            clearInterval(typing);
        }
    }, speed);
}
