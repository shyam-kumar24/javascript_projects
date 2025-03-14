const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const githubProfileDetails = document.querySelector('.github-profile-details')
const loader = document.querySelector('.loading-text')
const BASE_URL = "https://api.github.com/users/";


function showLoader(){
    loader.classList.add('show')
    githubProfileDetails.classList.add('hide')
}

function removeLoader(){
    loader.classList.remove('show')
    githubProfileDetails.classList.remove('hide')
}

async function fetchGithubProfileDetails(){

    if(searchInput.value === ''){
        return
    }

    showLoader()
    const response = await fetch(`${BASE_URL}${searchInput.value}`)
    const result = await response.json()

    console.log(result);

    if(result){
        removeLoader()
        displayProfileDetails(result)
        searchInput.value = ''
    }
}

function displayProfileDetails(getProfileDetails){
    const {login, avatar_url, public_repos, followers, following} = getProfileDetails

    githubProfileDetails.innerHTML = `
        <p class="username">${login}</p>
        <img src=${avatar_url}/>
        <p class="repos">Repos: ${public_repos}</p>
        <p class="followers">Followers : ${followers}</p>
        <p class="following">Following: ${following}</p>
    `
}

searchBtn.addEventListener('click', () => {
    fetchGithubProfileDetails()
})