const API_KEY = '11uRPVGu4oAZjorIwgsInuiok4hYZsFC'
const searchEl = document.querySelector('.search-input')
const hintEl = document.querySelector('.search-hint')
const videosEl = document.querySelector('.videos')
const clearEl = document.querySelector('.search-clear')
const introText = document.querySelector('.intro-text')
const giphyDev = document.querySelector(".giphydev")
const proTip = document.querySelector(".protip")
const clearSearchTag = document.querySelector(".clear-search")
const clearSearchIcon = document.querySelector(".close-icon")
const searchButton = document.querySelector('button.search-icon')
const main = document.querySelector('.main')
const searchMessageError = document.querySelector(".error")



// from stack overflow
const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length)
    return arr[randIndex]
}

function createVideo(src) {
    // Create element = let's us create elemetns inside of Javascript


    const video = document.createElement('video')
    // Here we can set attributes onto our created element using the . notation
    video.src = src
    video.autoplay = true
    video.loop = true
    video.muted = true
    // This is how we set classnames using javascript
    video.className = 'video'
    // When we use return, we tell the function to give us something back
    return video
}

// 1. When we search, show the loading spinnger (by adding a class to the body)
// 2. When successful, change the loading hing to say 'see more'
// 3. On fail, let the user know there was an error

const toggleLoading = state => {

    // In here we toggle the page loading state between loading and not-loading
    // if our state is true, we add a loading class to body
    if (state) {
        document.body.classList.add('loading')
        proTip.style.animation = 'fadedown 0.2s ease-out 0s 1 normal forwards'
        clearSearchTag.style.animation = 'fadedown 0.2s ease-out 0s 1 normal forwards'
    } else {
        document.body.classList.remove('loading')
        clearSearchTag.style.animation = 'fadeup 0.2s ease-out 0s 1 normal forwards'
    }

}

//  Here we wrap up all of our fetch functionality into its own function
const searchGiphy = searchTerm => {

    // Here we toggle the loading screen so our user knows something is happening
    toggleLoading(true)
    introText.classList.add('fadeout')

    // Here we put our URL into fetch
    // we use backticks for our strings so that we can embedd our API_KEY and searchTerm variables
    // searchTerm part will be different for every varying search we make
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=pg-13&lang=en`).then(response => {
        // Convert to JSON
        return response.json();
    }).then(json => {
        // Here we call our random choice function to give us back
        // A rando result of images

        const gif = randomChoice(json.data)
        // Here we look inside the first result and grab the MP4 source

        const src = gif.images.original.mp4

        // Here we us our createVideo function which we give the src attribute to
        // and it gives us back a video element with that attribute
        const video = createVideo(src)

        videosEl.appendChild(video)

        // Here we listen out for the video loaded event to fire
        // when it's loaded we'll display it on the page using a CSS class
        video.addEventListener('loadeddata', event => {

            // This toggles the fading effect in our videos
            video.classList.add('visible')

            toggleLoading(false)

            // here we had the 'has-results' class
            document.body.classList.add('has-results')
            // change the hint text to see more results
            hintEl.innerHTML = `Hit enter to search more ${searchTerm}`

        })


    }).catch(error => {
        //  Here fetch shows the error states
        // Here we toggle the loading state so it's disabled
        toggleLoading(false)
        // Here we tell the user that nothing was found
        hintEl.innerHTML = `Nothing found for ${searchTerm}`
    })
}

// Here we seperatre out our keyup function and we can call to it in various places in our code
const doSearch = event => {
    // we only want to run our search when we have a
    // search term that is longer than 2 charecters
    // and when they press the event key
    const searchTerm = searchEl.value

    // here we set the search hint to show when we have a searchTerm
    // longer than 2 charecters
    if (searchTerm.length > 2) {
        //  here we set the text to embed our vairble as the hint suggestion
        hintEl.innerHTML = `Hit enter to search ${searchTerm}`
        document.body.classList.add('show-hint')
    } else {
        // Otherwise we remove it again
        document.body.classList.remove('show-hint')
    }

    if (event.key === 'Enter' && searchTerm.length > 2) {
        // here we call to our searchGiphy function and pass along the
        //  searchTerm with it
        searchGiphy(searchTerm)
        document.body.classList.remove('show-hint')

    }

    if (event.key === 'Enter' && searchTerm.length <= 2) {
        searchMessageError.style.opacity = "1"
    } else {
        searchMessageError.style.opacity = "0"
    }
}

const doSearchButton = event => {
    // we only want to run our search when we have a
    // search term that is longer than 2 charecters
    // and when they press the event key
    const searchTerm = searchEl.value

    // here we set the search hint to show when we have a searchTerm
    // longer than 2 charecters
    if (searchTerm.length > 2) {
        //  here we set the text to embed our vairble as the hint suggestion
        hintEl.innerHTML = `Hit enter to search ${searchTerm}`
        document.body.classList.add('show-hint')
        searchMessageError.style.opacity = "0"

    } else {
        // Otherwise we remove it again
        document.body.classList.remove('show-hint')
    }

    if (searchTerm.length <= 2) {
        searchMessageError.style.opacity = "1"
    } else {
        searchMessageError.style.opacity = "0"
    }

    if (searchTerm.length > 2) {
        // here we call to our searchGiphy function and pass along the
        //  searchTerm with it
        searchGiphy(searchTerm)
    }
}

// Here we add a function to clear the search element
const clearSearch = event => {
    // This toggles the results state off again
    document.body.classList.remove('has-results')
    // Here we reset out all of the content of the videos and hint elements
    videosEl.innerHTML = ''
    hintEl.innerHTML = 'Hit enter to search'
    searchEl.value = ''
    // Here we focus the inpit cursor back onto our input
    searchEl.blur()
    // Here we add in back the intro text
    introText.classList.remove('fadeout')
    giphyDev.style.animation = 'fadeup 0.2s ease-out 0s 1 normal forwards'
    proTip.style.animation = 'fadedown 0.2s ease-out 0s 1 normal forwards'
    clearSearchTag.style.animation = 'fadedown 0.2s ease-out 0s 1 normal forwards'
    searchMessageError.style.opacity = "0"

}

const animate = event => {
    giphyDev.style.animation = 'fadedown 0.2s ease-out 0s 1 normal forwards'
    proTip.style.animation = 'fadeup 0.2s ease-out 0s 1 normal forwards'
    clearSearchTag.style.animation = 'fadedown 0.2s ease-out 0s 1 normal forwards'

}

// Listen out for the key-up event on the search input
searchEl.addEventListener('focus', animate)
searchEl.addEventListener('input', animate)
searchEl.addEventListener('keyup', doSearch)
searchButton.addEventListener('click', doSearchButton)
clearSearchTag.addEventListener('click', clearSearch)


// Here we listen for a global keup event 
// Using the document keyword and attach an addEventlistener
document.addEventListener('keyup', event => {

    // if we press the escape key. fire the clearSearch function

    if (event.key === 'Escape') {
        clearSearch()
    }
})

const infoPanel = document.querySelector('.info-panel')
const moreTag = document.querySelector('.more')
const lessTag = document.querySelector('.less')
const menuItemTag = document.querySelector('.menu-item')

const menuOpen = function () {
    infoPanel.style.animation = "menuOverlay 0.4s ease-out forwards"
}
const menuClose = function () {
    infoPanel.style.animation = "menuOverlayClose 0.2s ease-in forwards"
}

moreTag.addEventListener("click", menuOpen)
lessTag.addEventListener("click", menuClose)

console.log(moreTag)
console.log(lessTag)