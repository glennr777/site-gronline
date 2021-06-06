import './main.css';

(($) => {
  const $win = $(window);
  const $html = $('html');
  const $doc = $(document);
  const $bod = $(document.body);
  const $mainNav = $('#mainNav');
  const $navBar = $('#navBar');
  const $navButton = $('#navButton');
  const $pageScroll = $('.page-scroll');
  const $modal = $('<div aria-hidden="true" id="modal"><img /></div>');

  const CLASSES = {
    MENU_OPEN: 'open',
  };

  const ARIA = {
    HIDDEN: 'aria-hidden',
    HIDDEN_TRUE: 'hidden',
  };

  const toggleMenu = (to) => {
    const set = to !== undefined ? to : $navBar.attr(ARIA.HIDDEN) === ARIA.HIDDEN_TRUE;
    $navBar.attr(ARIA.HIDDEN, set ? '' : ARIA.HIDDEN_TRUE);
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
    $modal.attr({ 'aria-hidden': '' });
    $bod.append($modal);
    return false;
  };

  const hideModal = () => $modal.remove();

  const onReady = () => {
    $navButton.on('click', menuClick);
    $bod.on('a', 'click', navClick);
    if (screen.availWidth <= 480) $navBar.attr(ARIA.HIDDEN, ARIA.HIDDEN_TRUE);
    updateScroll();
    $bod
      .on('.portfolio-box', 'click', showModal)
      .on($modal, 'click', hideModal);
    $pageScroll.on('click', navClick);
    $html.addClass('ready');
  };

  $doc
    .on('ready', onReady())
    .on('scroll', debouceScroll);
})(window.$);
