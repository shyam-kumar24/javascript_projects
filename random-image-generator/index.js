
const imagesWrapper = document.querySelector('.images-wrapper')
const loadNextBtn = document.querySelector('.load-more-images')


function fetchImages(getCount){

    for(let i = 0; i <  getCount ; i++){
        
        let image = document.createElement('img')
        
        image.src = `https://picsum.photos/300?random=${Math.random()}`;

        imagesWrapper.appendChild(image)
    }
    
}

fetchImages(5)

loadNextBtn.addEventListener('click', () => {
    
    fetchImages(5)
     
})