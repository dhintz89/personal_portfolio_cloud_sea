// Call to Dev.to API and use response data to create and render all blog articles

// I must use imagesLoaded jquery plugin as it's already included in js folder. reference: https://imagesloaded.desandro.com/

// call api data
$.get("https://dev.to/api/articles?username=dhintz89")
  .done(data => {
    loadBlogCard(data);
  })
  .fail(function(data) {
    alert( "error" );
  });

function loadBlogCard(blogsArray) {
  blogsArray.forEach(blogData => {
    // save relevant data as vars
    const coverimg = blogData.cover_image; // url
    const title = blogData.title;
    const summary = blogData.description;
    const published = blogData.published_at;
    const likes = blogData.positive_reactions_count;
    const url = blogData.canonical_url;
    const tags = blogData.tag_list;
    console.log(title + ": " + summary);

    // create html elements
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
      <span class="tags">Tags: ${tags}</span>
    `

    // add to DOM
    document.querySelector(".blog-carousel").appendChild(card);
  });
  document.querySelector(".blogCard").classList.add("active");
}


    // create html element for container
    // create elements for each piece of content

    // --iiimageiii--
    // --iiimageiii--
    // --tttitlettt--
    // --------------
    // --ssummaryss--
    // --ssummaryss--
    // --ssummaryss--
    // --------------
    // -lks--LINK->-
    // -pub--LINK->-
    // --tag1-tag2--