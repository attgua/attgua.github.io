// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `echo "Welcome to my website!"
            Welcome to my website! Drop me a message here: attilio.gualandi@gmail.com or on Linkedin if you need something! ;)
            `;
  var speed = 60;

  function typeItOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}

// toggle tabs on codeblock
window.addEventListener("load", function() {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(i, event) {
  var element = sections[i];
  lockedIndex = i;
  updateActiveSection();

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
  for (var i = 0; i<btns.length; i++) {
    btns[i].addEventListener('click', smoothScrollTo.bind(this,i));
  }
}

// highlight the menu item of the section currently in view (scroll spy)
// lockedIndex: set when the user clicks a menu item, so the clicked item stays
// selected even if its section is too short to reach the top of the page.
var lockedIndex = null;

function updateActiveSection() {
  if (!(btns.length && sections.length > 0)) return;

  var current = 0;

  if (lockedIndex !== null) {
    current = lockedIndex;
  } else {
    // The reference line moves from the top of the viewport (page top) to the
    // bottom of the viewport (page bottom) while scrolling, so that even short
    // sections at the end of the page get selected at some point.
    var maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(Math.max(window.pageYOffset / maxScroll, 0), 1);
    var line = window.pageYOffset + window.innerHeight * progress;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop - 20 <= line) {
        current = i;
      }
    }
  }

  for (var j = 0; j < btns.length; j++) {
    btns[j].classList.toggle('selected', j === current);
  }
}

// manual scrolling releases the lock
['wheel', 'touchmove', 'keydown'].forEach(function (evt) {
  window.addEventListener(evt, function () { lockedIndex = null; }, { passive: true });
});

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if( docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});

