
const navbar = document.querySelector('.navbar')
let navTop = navbar.offsetTop



window.addEventListener('scroll', () => {
    if(window.scrollY >= navTop) navbar.classList.add('fix-navbar')
    else navbar.classList.remove('fix-navbar')

    console.log(window.scrollY);
})