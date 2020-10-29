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
    const card = document.createElement("li");
    card.classList.add('blogCard');
    card.innerHTML = `
      <img src=${coverimg} />
      <span class="title"><h3>${title}</h3></span>
      <p class="summary">${summary}</p>
      <span class="likes">Likes: ${likes}</span>
      <span class="tags">${tags}</span>
    `

    // add to DOM
    document.querySelector(".tm-blog-container .slides").appendChild(card);
  })
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