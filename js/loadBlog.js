// Call to Dev.to API and use response data to create and render all blog articles

// I must use imagesLoaded jquery plugin as it's already included in js folder. reference: https://imagesloaded.desandro.com/

// call api data
    $.get("https://dev.to/api/articles?username=dhintz89")
      .done(function(data) {
        alert( "load successful" );
        loadBlogCard(data[0])
      })
      .fail(function(data) {
        alert( "error" );
      });

function loadBlogCard(blogData) {
    const coverimg = blogData.cover_image; // url
    const title = blogData.title;
    const summary = blogData.description;
    const published = blogData.published_at;
    const likes = blogData.positive_reactions_count;
    const url = blogData.canonical_url;
    const tags = blogData.tag_list;
    console.log(title + ": " + content);
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
}