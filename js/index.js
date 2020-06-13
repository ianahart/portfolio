const navbar = document.querySelector('#navbar');
const items = document.querySelectorAll('.tech-list');
const navLinks = document.querySelectorAll('.nav-link');
const aboutImage = document.querySelector('.about-image');
const menuIcon = document.querySelector('.hamburger-menu');
const projectsContainer = document.querySelector('.projects-container');
const projectImages = document.querySelectorAll('.image-container img');
const projectOverlays = document.querySelectorAll('.project-overlay');
// Tech List slide in //
const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () =>
  items.forEach((item) => {
    if (isInViewport(item)) {
      item.classList.add('slide-in');
      item.classList.remove('hide-slide-in');
    }
  });

// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);
// END Tech List slide in //

// Projects Overlay //

if (window.innerWidth < 768) {
  projectOverlays.forEach((projectOverlay) => {
    projectOverlay.style.display = 'block';
  });
} else {
  projectsContainer.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'IMG') {
      const imgOverlay = e.target.nextElementSibling;
      imgOverlay.classList.remove('hide');
    }
  });
  projectOverlays.forEach((project) => {
    project.addEventListener('mouseleave', (e) => {
      project.classList.add('hide');
    });
  });
}
// END Projects Overlay //

// Smooth Scroll //
$(document).ready(function () {
  $('a').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// END Smooth Scroll //

// Navigation Menu //

menuIcon.addEventListener('click', (e) => {
  navbar.classList.toggle('change');
});

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', (e) => {
    navbar.classList.toggle('change');
  });
});

// END Navigation Menu //

// About Image Slide//
const images = ['0', '1', '2', '3'];
let imageIncrementer = 0;
const changeAboutImage = (photos) => {
  if (imageIncrementer < photos.length) {
    imageIncrementer = imageIncrementer + 1;
    aboutImage.setAttribute('src', `img/ian-${photos[imageIncrementer]}.jpg`);
  }
  if (imageIncrementer === photos.length) {
    imageIncrementer = 0;
    aboutImage.setAttribute('src', `img/ian-${photos[imageIncrementer]}.jpg`);
  }
};

setInterval(() => {
  changeAboutImage(images);
}, 3500);
// END Image Slide //

// Typewriter effect //
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// End Typewriter effect //
