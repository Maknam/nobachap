const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});

const leadForm = document.querySelector('#lead-form');
const message = document.querySelector('.form-message');
leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(leadForm).get('name');
  message.textContent = `Thank you, ${name}. Your request has been added to the pre-order waiting list.`;
  leadForm.reset();
});
