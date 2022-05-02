import $ from 'cash-dom';
import './main.css';

$(() => {
  const $win = $(window);
  const $html = $('html');
  const $doc = $(document);
  const $bod = $(document.body);
  const $mainNav = $('#mainNav');
  const $navBar = $('#navBar');
  const $navBarLinks = $navBar.find('a');
  const $navButton = $('#navButton');
  const $pageScroll = $('.page-scroll');

  const CLASSES = {
    MENU_OPEN: 'open',
  };

  const ARIA = {
    HIDDEN: 'aria-hidden',
    HIDDEN_TRUE: 'true',
  };

  const toggleMenu = (to) => {
    const set = to !== undefined ? to : $navBar.attr(ARIA.HIDDEN) === ARIA.HIDDEN_TRUE;
    $navBar.attr(ARIA.HIDDEN, set ? '' : ARIA.HIDDEN_TRUE);
    $navBarLinks.attr({ tabIndex: set ? 0 : -1 });
  };

  const menuClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
    toggleMenu();
  };

  const navClick = () => toggleMenu(false);

  const updateScroll = () => {
    $mainNav.toggleClass('scrolled', window.scrollY > 0);
  };

  const debouceScroll = () => {
    requestAnimationFrame(updateScroll);
  };

  $navButton.on('click', menuClick);
  $bod.on('a', 'click', navClick);
  if ($bod[0].offsetWidth <= 480) {
    toggleMenu(false);
  }
  updateScroll();
  $pageScroll.on('click', navClick);
  $html.addClass('ready');
  $doc.on('scroll', debouceScroll);
});
