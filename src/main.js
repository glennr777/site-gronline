import "./main.css"

const mainNav = document.getElementById('mainNav');
const navBar = document.getElementById('navBar');
const navButton = document.getElementById('navButton');

window.toggleMenu = (to) => {
  let set = to;
  if (to === undefined) {
    set = navBar.ariaHidden === 'true';
  }
  
  navBar.ariaHidden = set ? 'false' : 'true';
  navBar.tabIndex = set ? 0 : -1;
};

const menuClick = (e) => {
  if (e && e.preventDefault) e.preventDefault();
  if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
  toggleMenu();
};

const updateScroll = () => {
  toggleMenu(document.body.offsetWidth > 480);
  mainNav.classList.toggle('scrolled', window.scrollY > 0);
};

const debouceScroll = () => {
  requestAnimationFrame(updateScroll);
};

navButton.addEventListener('click', menuClick);

updateScroll();

document.body.parentNode.classList.add('ready');
window.addEventListener('scroll', debouceScroll);
window.addEventListener('resize', debouceScroll);
