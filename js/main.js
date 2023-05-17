'use strict';

{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  const dots = [];
  let currentIndex = 0;

  function updateButtons() {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    if (currentIndex === 0) {
      prev.classList.add('hidden');
    }
    if (currentIndex === slides.length - 1) {
      next.classList.add('hidden');
    }
  }

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }

  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');
      document.querySelector('nav').appendChild(button);
      button.addEventListener('click', () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });
      dots.push(button);
    }

    dots[0].classList.add('current');
  }

  function updateDots() {
    dots.forEach(dot => {
      dot.classList.remove('current');
    });
    dots[currentIndex].classList.add('current');
  }

  updateButtons();
  setupDots();
  imageChange();

  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
  });

  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    updateDots();
    moveSlides();
  });

  function imageChange() {

    // カウントが最大になれば配列を初期値に戻すため「0」を指定する
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    // 画像選択
    updateButtons();
    updateDots();
    moveSlides();

    currentIndex++;

    // 10秒ごとに実行
    var intervalTime = 10000;

    var windowWidth = window.innerWidth;
  
  if (windowWidth >= 1280) {
    intervalTime = 10000;
  } else if (windowWidth >= 768, windowWidth <= 1280) {
    intervalTime = 10000;
  } else {
    intervalTime = 10000;
  }

  setTimeout(imageChange,intervalTime);
  }

  // Intersection Observer API

  function inViewCallback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
  
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }
  
  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (window.scrollY >= 100) {
        toTop.classList.add('scrolled');
      } else {
        toTop.classList.remove('scrolled');
      }
    });
  }
  
  const toTop = document.getElementById('to_top');
  
  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.2,
  });
  
  document.querySelectorAll('.animate').forEach(el => {
    inViewObserver.observe(el);
  });
  
  const onScrollObserver = new IntersectionObserver(onScrollCallback);
  onScrollObserver.observe(document.body);

  toTop.addEventListener('click', e => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 100) {
      toTop.classList.add('scrolled');
    }else {
      toTop.classList.remove('scrolled');
    }
  });
}