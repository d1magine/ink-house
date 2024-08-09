const countryTabs = document.querySelectorAll('.tab');
const catalog = document.querySelector('.catalog__products-list');

const burgerButton = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');

// Загрузить картины из локального JSON'а
async function loadPictures(country) {
  const response = await fetch('data.json');
  const data = await response.json();

  return data.filter((item) => {
    if (item.country === country) {
      return item;
    }
  });
}

function setCatalog(country) {
  loadPictures(country).then((pics) => {
    catalog.innerHTML = '';

    pics.forEach((pic) => {
      catalog.innerHTML += `
        <li class="catalog__products-item">
            <article class="product">
              <img class="product__image" src="${pic.image}" alt="${pic.title}" />
              <span class="product__author">${pic.author}</span>
              <h3 class="product__title">${pic.title}</h3>
              <p class="product__materials">${pic.materials}</p>
              <span class="product__price">${pic.price} руб</span>
              <button class="button button--outline product__button">В корзину</button>
            </article>
          </li>
        `;
    });
  });
}

// Переключение табов
countryTabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    countryTabs.forEach((t) => t.classList.remove('tab--current'));
    e.currentTarget.classList.add('tab--current');
    setCatalog(e.currentTarget.dataset.country);
  });
});

// Открыть мобильное меню
burgerButton.addEventListener('click', () => {
  document.body.classList.toggle('scroll-hidden');
  menu.classList.toggle('header__menu--active');
  burgerButton.classList.toggle('header__burger--active');
});

menu.addEventListener('click', () => {
  document.body.classList.toggle('scroll-hidden');
  menu.classList.toggle('header__menu--active');
  burgerButton.classList.toggle('header__burger--active');
});

setCatalog('France');
