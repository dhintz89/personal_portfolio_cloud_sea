// functions for switching slides (contained in wrapper function to permit waiting until imported resources are loaded)
function setUpCarousel(classToApplyCarousel) {
  const cards = document.getElementsByClassName(classToApplyCarousel);
  let slide = 0;
  let moving = true;

  // Assigns class identifiers to previous, current, and next cards
  function setInitialClasses() {
    cards[cards.length - 1].classList.add("prev");
    cards[0].classList.add("active");
    cards[1].classList.add("next");
  }

  function setEventListeners() {
    let next = document.getElementsByClassName('next-arrow')[0];
    let prev = document.getElementsByClassName('prev-arrow')[0];
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  // Change active slide to next
  function moveNext() {
    // Prevent changing slides during transitioning (can only move 1 at a time)
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === (cards.length - 1)) {
        slide = 0;
      } else {
        slide++;
      }
      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Change active slide to prev
  function movePrev() {
    // Prevent changing slides during transitioning (can only move 1 at a time)
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = (cards.length - 1);
      } else {
        slide--;
      }
      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Set 'moving' to true for duration of transition (0.5s) to prevent changing slides until transition completes.
  function disableInteraction() {
    moving = true;
    setTimeout(function(){
      moving = false
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if(!moving) {
      // temporarily disable interactivity
      disableInteraction();
      // Update the "old" adjacent slides with "new" ones
      let newPrevious = slide - 1;
      let newNext = slide + 1;
      let oldPrevious = slide - 2;
      let oldNext = slide + 2;
      // Test if carousel has more than three items
      if ((cards.length - 1) > 3) {
        // Checks and updates if the new slides are out of bounds
        if (newPrevious <= 0) {
          oldPrevious = (cards.length - 1);
        } else if (newNext >= (cards.length - 1)){
          oldNext = 0;
        }
        // Checks and updates if slide is at the beginning/end
        if (slide === 0) {
          newPrevious = (cards.length - 1);
          oldPrevious = (cards.length - 2);
          oldNext = (slide + 1);
        } else if (slide === (cards.length -1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }

        // by add/remove classes to trigger the transitions.
        // Reset old next/prev elements to default classes
            // need to account for multiple classnames
        cards[oldPrevious].className = classToApplyCarousel + " slide";
        cards[oldNext].className = classToApplyCarousel + " slide";
        // Add new classes
        cards[newPrevious].className = classToApplyCarousel + " slide prev";
        cards[slide].className = classToApplyCarousel + " slide active";
        cards[newNext].className = classToApplyCarousel + " slide next";
      }
    }
  }

  function initCarousel() {
    setInitialClasses();
    setEventListeners();
    // Set moving to false so that the carousel becomes interactive
    moving = false;
  }

  initCarousel();
};