const contentDiv = document.querySelector('.content')
const scrollDiv = document.querySelector('.scroll-div')
const scroll = document.querySelector('.scroll')

// totally self made . not improvised version of tutor.

let dataArr = []

async function fetchData(){
    const response = await fetch("https://dummyjson.com/posts")
    const data = await response.json()

    dataArr = [...data.posts]
    console.log(dataArr);

    makeDataDiv();
}



function makeDataDiv(){

    dataArr.map((post) => {
        
        const postDiv = document.createElement('div')
        postDiv.classList.add('postDiv')
    
        const titlePara = document.createElement('p')
        const bodyPara = document.createElement('p')
        const tags = document.createElement('p')
    
        titlePara.innerText = post.title
        bodyPara.innerText = post.body
        tags.innerText = post.tags.join(',')
    
        postDiv.appendChild(titlePara)
        postDiv.appendChild(bodyPara)
        postDiv.appendChild(tags)
    
    
        contentDiv.appendChild(postDiv)
    })
}

fetchData()


window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    const totalHeight = document.documentElement.scrollHeight
    const visibleHeight = window.innerHeight

    const scrolledPercentage = (scrolled/(totalHeight - visibleHeight))*100

    console.log(scrolledPercentage);

    scroll.style.width = `${scrolledPercentage}%`
})