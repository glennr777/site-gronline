import './main.css';

{
  const mainNav = document.getElementById('mainNav');
  const navBar = document.getElementById('navBar');
  const navButton = document.getElementById('navButton');

  const toggleMenu = (to) => {
    const set = to !== undefined ? to : navBar.ariaHidden === 'true';
    navBar.ariaHidden = set ? '' : 'true';
    navBar.tabIndex = set ? 0 : -1;
  };

  const menuClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
    toggleMenu();
  };

  const updateScroll = () => {
    toggleMenu(false);
    mainNav.classList.toggle('scrolled', window.scrollY > 0);
  };

  const debouceScroll = () => {
    requestAnimationFrame(updateScroll);
  };

  navButton.addEventListener('click', menuClick);
  
  if (document.body.offsetWidth <= 480) {
    toggleMenu(false);
  }
  
  updateScroll();
  document.body.parentNode.classList.add('ready');
  window.addEventListener('scroll', debouceScroll);
};
