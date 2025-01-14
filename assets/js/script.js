const page = document.querySelector('.page');

// Бегущая строка
const atentionLists = page.querySelectorAll('.atention__list');
const atentionItems = [
  {
    text: 'Дело помощи утопающим&nbsp;&mdash; дело рук самих утопающих!',
  },
  {
    text: 'Шахматы двигают вперёд не&nbsp;только культуру, но&nbsp;и&nbsp;экономику!',
  },
  {
    text: 'Лёд тронулся, господа присяжные заседатели!',
  },
  {
    text: 'Дело помощи утопающим&nbsp;&mdash; дело рук самих утопающих!',
  },
  {
    text: 'Шахматы двигают вперёд не&nbsp;только культуру, но&nbsp;и&nbsp;экономику!',
  },
  {
    text: 'Лёд тронулся, господа присяжные заседатели!',
  }
];
function createAtentionItem (item) {
  const atentionItemTemplate = page.querySelector('[data-id="atentionItemTemplate"]').content;
  const atentionItem = atentionItemTemplate.querySelector('.atention__item').cloneNode(true);
  atentionItem.innerHTML = item.text;
  return atentionItem
};
atentionLists.forEach(function (atentionList) {
  atentionItems.forEach(function (item) {
    atentionList.append(createAtentionItem(item));
  });
});

// Участники турнира
const personList = page.querySelector('.person__list');
const persons = [
  {
    image: './assets/images/person.webp',
    name: 'Хозе-Рауль Капабланка',
    status: 'Чемпион мира по шахматам',
    link: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BF%D0%B0%D0%B1%D0%BB%D0%B0%D0%BD%D0%BA%D0%B0,_%D0%A5%D0%BE%D1%81%D0%B5_%D0%A0%D0%B0%D1%83%D0%BB%D1%8C',
  },
  {
    image: './assets/images/person.webp',
    name: 'Эммануил Ласкер',
    status: 'Чемпион мира по шахматам',
    link: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B0%D1%81%D0%BA%D0%B5%D1%80,_%D0%AD%D0%BC%D0%B0%D0%BD%D1%83%D0%B8%D0%BB',
  },
  {
    image: './assets/images/person.webp',
    name: 'Александр Алехин',
    status: 'Чемпион мира по шахматам',
    link: 'https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B5%D1%85%D0%B8%D0%BD,_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%B8%D1%87',
  },
  {
    image: './assets/images/person.webp',
    name: 'Арон Нимцович',
    status: 'Чемпион мира по шахматам',
    link: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%BC%D1%86%D0%BE%D0%B2%D0%B8%D1%87,_%D0%90%D1%80%D0%BE%D0%BD_%D0%98%D1%81%D0%B0%D0%B5%D0%B2%D0%B8%D1%87',
  },
  {
    image: './assets/images/person.webp',
    name: 'Рихард Рети',
    status: 'Чемпион мира по шахматам',
    link: 'https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D1%82%D0%B8,_%D0%A0%D0%B8%D1%85%D0%B0%D1%80%D0%B4',
  },
  {
    image: './assets/images/person.webp',
    name: 'Остап Бендер',
    status: 'Гроссмейстер',
    link: 'https://ru.wikipedia.org/wiki/%D0%9E%D1%81%D1%82%D0%B0%D0%BF_%D0%91%D0%B5%D0%BD%D0%B4%D0%B5%D1%80',
  },
];

// Слайдеры
function createPerson (item) {
  const personTemplate = page.querySelector('[data-id="personTemplate"]').content;
  const personElement = personTemplate.querySelector('.person-card').cloneNode(true);
  const personImage = personElement.querySelector('.person-card__image');
  const personName = personElement.querySelector('.person-card__name');
  const personStatus = personElement.querySelector('.person-card__status');
  const personLink = personElement.querySelector('.person-card__link');
  personImage.src = item.image;
  personImage.alt = `Фото ${item.name}`;
  personName.textContent = item.name;
  personStatus.innerHTML = item.status;
  personLink.href = item.link;
  return personElement
};
persons.forEach(function (item) {
  personList.append(createPerson(item));
});
class Slider {
  constructor({ container, slides, controlContainer, dots = false, counter = false, autoScroll = false }) {
    this.container = document.querySelector(container);
    this.slides = document.querySelectorAll(slides);
    this.controlContainer = document.querySelector(controlContainer);
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.currentIndex = 0;
    this.slideWidth = this.slides[0].offsetWidth + 20;
    this.itemsPerSlide = window.innerWidth <= 1365 ? 1 : 3;
    this.dots = dots;
    this.counter = counter;
    this.autoScroll = autoScroll;
    this.scrollDirection = 'next';
    this.autoScrollInterval = null;
    this.init();
  }
  init() {
    this.createControls();
    this.updateCarousel();
    this.addEventListeners();
    if (this.autoScroll) {
      this.startAutoScroll();
      this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
      this.container.addEventListener('mouseleave', () => this.startAutoScroll());
    }
    window.addEventListener('resize', () => {
      this.itemsPerSlide = window.innerWidth <= 1365 ? 1 : 3;
      this.slideWidth = this.slides[0].offsetWidth + 20;
      this.updateCarousel();
    });
  }
  createControls() {
    const prevSvg = '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="slider__arrow" cx="22" cy="22" r="22" transform="rotate(-180 22 22)" fill="#313131" /><path d="M24.5382 30.4615L16.0767 21.9999L24.5382 13.5384" stroke="white" stroke-width="2" stroke-linecap="square" /></svg>';
    this.prevBtn.innerHTML = prevSvg;
    this.nextBtn.innerHTML = prevSvg;
    this.prevBtn.classList.add('slider__button', 'slider__button_prev');
    this.nextBtn.classList.add('slider__button', 'slider__button_next');
    this.controlContainer.append(this.prevBtn);
    if (this.dots) {
      this.createDots();
    } else if (this.counter) {
      this.counterElement = document.createElement('div');
      this.counterElement.classList.add('slider__counter');
      this.controlContainer.append(this.counterElement);
      this.updateCounter();
    }
    this.controlContainer.append(this.nextBtn);
  }
  updateCarousel() {
    this.container.style.transition = 'transform 0.5s ease-in-out';
    this.container.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
    this.updateButtons();
    if (this.dots) {
      this.updateDots();
    }
    if (this.counter) {
      this.updateCounter();
    }
  }
  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.slides.length - this.itemsPerSlide;
  }
  updateCounter() {
    const totalSlides = this.slides.length;
    const currentPage = this.currentIndex + this.itemsPerSlide;
    const step = this.itemsPerSlide;
    this.counterElement.innerHTML = `${Math.min(currentPage, totalSlides)} <span class="slider__counter_opacity">/ ${totalSlides}</span>`;
  }
  createDots() {
    this.dotsContainer = document.createElement('div');
    this.dotsContainer.classList.add('slider__dots');
    this.controlContainer.append(this.dotsContainer);
    for (let i = 0; i < this.slides.length; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider__dot');
      if (i === 0) dot.classList.add('slider__dot_active');
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateCarousel();
      });
      this.dotsContainer.appendChild(dot);
    }
  }
  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.slider__dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('slider__dot_active', index === this.currentIndex);
    });
  }
  slide(direction) {
    if (direction === 'next') {
      this.currentIndex += this.itemsPerSlide;
      if (this.currentIndex >= this.slides.length - this.itemsPerSlide) {
        this.currentIndex = this.slides.length - this.itemsPerSlide;
      }
    } else {
      this.currentIndex -= this.itemsPerSlide;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
    }
    this.updateCarousel();
  }
  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.slide(this.scrollDirection);
      if (this.currentIndex >= this.slides.length - this.itemsPerSlide) {
        this.scrollDirection = 'prev';
      } else if (this.currentIndex <= 0) {
        this.scrollDirection = 'next';
      }
    }, 4000);
  }
  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
  }
  addEventListeners() {
    this.prevBtn.addEventListener('click', () => this.slide('prev'));
    this.nextBtn.addEventListener('click', () => this.slide('next'));
  }
}
new Slider({
  container: '.slider_type_person',
  slides: '.person-card',
  controlContainer: '.person__slider-control',
  counter: true,
  autoScroll: true,
});
if (screen.width <= 1365) {
  new Slider({
    container: '.stage__carousel',
    slides: '.stage__item',
    controlContainer: '.stage__slider-control',
    dots: true,
    autoScroll: false,
  });  
}
