
const posts = Array.from(document.getElementsByClassName('.post-fit'));

console.log(posts);
var x = 0;
posts.forEach(post => {
    post.addEventListener('click', function handleClick(event){
    console.log('post clicked', event);
    console.log('x = ' + x );
    res.redirect('/viewPost?postIndex=' + x);
    x += 1;
  });
});