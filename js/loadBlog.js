// Call to Dev.to API and use response data to create and render all blog articles as a carousel

// call api data
fetch("https://dev.to/api/articles?username=dhintz89")
  .then(resp => resp.json())
  .then(data => loadBlogCards(data))  // create blogCards
  .then(() => wrapper())  // load carousel functionality (must wait until blogCards are loaded)


// create blogCards
function loadBlogCards(blogsArray) {
  blogsArray.forEach(blogData => {
    // save relevant data as vars
    let coverimg
    blogData.cover_image != null ? coverimg = blogData.cover_image : coverimg = '../img/cantfind.webp';
    const title = blogData.title;
    const summary = blogData.description;
    const published = blogData.published_at;
    const likes = blogData.positive_reactions_count;
    const url = blogData.canonical_url;
    const tags = blogData.tag_list;
    console.log(title + ": " + summary);

    // create html elements
    const link = document.createElement("a");
    link.href = url;
    const card = document.createElement("div");
    card.classList.add('blogCard');
    card.innerHTML = `
        <img src=${coverimg} />
        <span class="title"><h3>${title}</h3></span>
        <p class="summary">${summary}</p>
        <span class="likes">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="18" height="18" viewBox="0 0 20 20" stroke-width="1.5" stroke="#E91E63" fill="#E91E63" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg> ${likes}
        </span>
        <span class="tags">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag" width="18" height="18" viewBox="0 0 20 20" stroke-width="1.5" stroke="#9E9E9E" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M11 3l9 9a1.5 1.5 0 0 1 0 2l-6 6a1.5 1.5 0 0 1 -2 0l-9 -9v-4a4 4 0 0 1 4 -4h4" />
            <circle cx="9" cy="9" r="2" />
          </svg> ${tags}
        </span>
    `;

    // add to DOM
    link.appendChild(card);
    document.querySelector(".blog-carousel").appendChild(link);
  });
  document.querySelector(".blogCard").classList.add("active");
}


// functions for switching slides (contained in wrapper function to permit waiting until blogCards are loaded)
function wrapper() {
  const cards = document.getElementsByClassName("blogCard");
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
        cards[oldPrevious].className = "blogCard";
        cards[oldNext].className = "blogCard";
        // Add new classes
        cards[newPrevious].className = "blogCard" + " prev";
        cards[slide].className = "blogCard" + " active";
        cards[newNext].className = "blogCard" + " next";
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