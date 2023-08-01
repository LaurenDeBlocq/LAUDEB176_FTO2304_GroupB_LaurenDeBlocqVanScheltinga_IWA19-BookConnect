import { state, BOOKS_PER_PAGE, authors, genres, books } from "./data.js";
import { html, createPreviewHtml } from "./view.js";

state.pageNumber = 1;
state.theme = 'light'

if (!books && !Array.isArray(books)) throw new Error('Source required') 

const themeCSS = {
    day :{
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night :{
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}



/* -------------------- Functions which affect the page -------------------- */
/**
 * Fills in the text on the list button.
 */
const listButtonText = (arr) => {
    if (arr.length === 0){
        html.list.button.disabled = true
        html.list.button.innerHTML = `
    Show More <span class="list__remaining">(${0})</span>
    `
    } else {
        html.list.button.disabled = false
        html.list.button.innerHTML = `
        Show More <span class="list__remaining">(${arr.length - Object.keys(state.loaded).length})</span>`
    }
}


/**
 * Creates the load out of new books dependant on what page the user is on and
 * updates the button text.
 */
const createPage = (arr) => {
    const startPosition = (state.pageNumber - 1) * BOOKS_PER_PAGE
    const endPosition = startPosition + BOOKS_PER_PAGE - 1
    
    const fragment = document.createDocumentFragment()
    const extracted = arr.slice(startPosition, endPosition + 1)

    for (let i = 0; i < extracted.length; i++) {
        const { author, image, title, id, description, published } = extracted[i]
        const publish = new Date(published)
        state.loaded[id] = {id, image, author, title, description, publish}
        const preview = createPreviewHtml(state.loaded[id])
        fragment.appendChild(preview)
    }

    state.pageNumber += 1
    html.list.items.appendChild(fragment)
    listButtonText(arr)
}


/**
 * Creates list options for the author drop down in Search.
 */
const createAuthorOptions = () => {
    const fragment = document.createDocumentFragment()
    
    const option1 = document.createElement('option')
    option1.value = 'any'
    option1.innerText = 'All Authors'
    fragment.appendChild(option1)

    let authorID = Object.keys(authors)
    authorID.forEach((id) =>{
        const option = document.createElement('option')
        option.value = `${id}`
        option.innerText = authors[`${id}`]
        fragment.appendChild(option)
    }
    )

    html.search.authors.appendChild(fragment)
}


/**
 * Creates list options for the genres drop down in Search
 */
const createGenreOptions = () => {
    const fragment = document.createDocumentFragment()
    
    const option1 = document.createElement('option')
    option1.value = 'any'
    option1.innerText = 'All Genres'
    fragment.appendChild(option1)

    let genreID = Object.keys(genres)
    genreID.forEach((id) =>{
        const option = document.createElement('option')
        option.value = `${id}`
        option.innerText = genres[`${id}`]
        fragment.appendChild(option)
    }
    )

    html.search.genres.appendChild(fragment)
}


/* -------------------- ON INIT --------------------*/
/* The collection of functions that are required to load up the 
   app. A page must be created, button text  */
createPage(books)
createAuthorOptions()
createGenreOptions()

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    state.theme = 'night'
}



/* ------------------- EVENT HANDLERS ------------------- */
/**
 * When clicked, a new page is loaded and the text on the button updates to
 * the appropriate values.
 */
const handleListButton = (event) =>{
    createPage(state.isSearching ? state.searchResult : books)
}


/**
 * Toggles the search overlay and clears the form values between searches.
 */
const handleSearchToggle = (event) =>{
    html.search.overlay.toggleAttribute('open')
    html.search.title.value = ''
    html.search.authors.value = 'any'
    html.search.genres.value = 'any'
}


/**
 * Takes in search values, creates an array of books that match those 
 * values and then creates the previews for the books.
 */
const handleSearchSubmit = (event) => {
    event.preventDefault()
    const titleValue = event.target[0].value.trim()
    const genreID = event.target[1].value
    const authorID = event.target[2].value
    state.pageNumber = 1
    state.searchResult = []
    state.loaded = {}
    state.isSearching = true

    /** 
     *  searchResults stores all the book results that match the search requirements.
     */
    const searchResults = books.filter(book => {
        const titleCheck = titleValue === '' ? true : book['title'].toLowerCase().includes(titleValue.toLowerCase())
        const genreCheck =  genreID === 'any' ? true: book['genres'].includes(genreID)
        const authorCheck = authorID ==='any' ? true : book['author'] === authorID

        return titleCheck && genreCheck && authorCheck
    })
    
    /* Now we remove the existing previews so we can later replace them with
    previews for the search results */
    while (html.list.items.hasChildNodes()) {
      html.list.items.removeChild(html.list.items.firstChild);
    }

    /* If no search results were returned, then a message is displayed.
    Otherwise, the search results are pushed to the state so that they 
    can be kept track of. */
    if (searchResults.length == 0){
        listButtonText(searchResults)
        handleSearchToggle()
        html.list.message.style.display = 'block'
        return
    } else {
        html.list.message.style.display = 'none'
    for (const element in searchResults){
        state.searchResult.push(searchResults[element])
    }}

   
    createPage(state.searchResult)
    handleSearchToggle()
}

/**
 * Toggles the settings menu and sets the choice on the form
 * to the current theme.
 */
const handleSettingsToggle = (event) =>{
    html.settings.overlay.toggleAttribute('open')
    html.settings.theme = state.theme
}

/**
 * Changes the theme dependent on what the user has chosen.
 * Also stores the choice in the state to be kept track of.
 */
const handleSettingsSubmit = (event) => {
    event.preventDefault()
    const theme = event.target[0].value

    if (theme === 'night'){    
        state.theme = 'dark'
    } else {
        state.theme = 'light'
    }

    document.documentElement.style.setProperty('--color-dark',  themeCSS[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeCSS[theme].light);

    handleSettingsToggle()
}

/**
 * Creates and toggles a more detailed preview of a book if the user wishes
 * to view some extra details. 
 */
const handleItemClick = (event) => {
    event.preventDefault()
    let idValue = null

    if (['preview', 'preview__image', 'preview__info', 'preview__author', 'preview__title'].includes(event.srcElement.classList[0])){
        
        const path = event.path || event.composedPath()
        for (const element of path) {
            const { id } = element.dataset
            if (id) {
                idValue = id
                break;
            }
        }
        //const id = event.srcElement.dataset.id;
    
        html.list.overlay.toggleAttribute('open')
        html.list.blur.setAttribute('src', `${state.loaded[idValue].image}`)
        html.list.image.setAttribute('src', `${state.loaded[idValue].image}`)
        html.list.title.innerText = `${state.loaded[idValue].title}`
        html.list.subtitle.innerText = `${authors[state.loaded[idValue].author]} (${state.loaded[idValue].publish.getFullYear()})`
        html.list.description.innerText = `${state.loaded[idValue].description}`
    } else {
        html.list.overlay.removeAttribute('open')
    }
}


html.list.button.addEventListener('click', handleListButton)
html.list.items.addEventListener('click', handleItemClick)
html.list.close.addEventListener('click', handleItemClick)

html.search.button.addEventListener('click', handleSearchToggle)
html.search.cancel.addEventListener('click', handleSearchToggle)
html.search.form.addEventListener('submit', handleSearchSubmit)

html.settings.button.addEventListener('click', handleSettingsToggle)
html.settings.cancel.addEventListener('click', handleSettingsToggle)
html.settings.form.addEventListener('submit', handleSettingsSubmit)