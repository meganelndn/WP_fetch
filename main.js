window.addEventListener("DOMContentLoaded", getData);

function getData() {
    console.log("getData")
    fetch("http://meganelndn.com/wp_test/wp_json/wp/v2/posts")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //console.log(myData);

    //1. loop
    myData.forEach(showPost)
}

function showPost(post) {
    //console.log(post)
    const imgPath = post._embedded["wp:featuresmedia"][0].media_details.sizes.thumbnail.source_url;


    //2. cloning a template
    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    //3. textContent & innerHTML
    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.title.rendered;

    const img = postCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Cover of the book " + post.title.rendered)

    const a = postCopy.querySelector("a");
    a.href = "sub.html?greeting="
    const content = postCopy.querySelector("section");
    content.innerHTML = post.content.rendered;

    const publisher = postCopy.querySelector(".publisher");
    publisher.innerHTML = post.publisher;

    //4. append
    document.querySelector("#posts").appendChild(postCopy)
}
