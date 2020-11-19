// Call to Dev.to API and use response data to create and render all blog articles as a carousel

// call api data
function loadBlog() {
fetch("https://dev.to/api/articles?username=dhintz89")
  .then(resp => resp.json())
  .then(data => loadBlogCards(data))  // create blogCards
  .then(() => setUpCarousel("blogCard"))  // load carousel functionality on '.blogCard' elements (must wait until blogCards are loaded)
}

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