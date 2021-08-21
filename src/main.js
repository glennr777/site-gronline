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
  const $modal = $('<div aria-hidden="true" id="modal"><img /></div>');

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

  const showModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    $modal.find('img').attr({ src: e.currentTarget.href });
    $modal.attr({ [ARIA.HIDDEN]: '' });
    $bod.append($modal);
    return false;
  };

  const hideModal = () => $modal.remove();

  $navButton.on('click', menuClick);
  $bod.on('a', 'click', navClick);
  if ($bod[0].offsetWidth <= 480) {
    toggleMenu(false);
  }
  updateScroll();
  $bod
    .on('.portfolio-box', 'click', showModal)
    .on($modal, 'click', hideModal);
  $pageScroll.on('click', navClick);
  $html.addClass('ready');
  $doc.on('scroll', debouceScroll);
});
