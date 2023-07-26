import { state, authors } from "./data.js"

/**
 * Attempting to recreate the html object from IWA challenge 18. I
 * found it to be useful and a lot easier than dealing with tons of
 * document.querySelector()'s the whole time.
 */

export const html = {
    list: {
        button: document.querySelector('[data-list-button]'),
        message: document.querySelector('[data-list-message]'),
        overlay: document.querySelector('[data-list-active]'),

        items: document.querySelector('[data-list-items]'),

        image: document.querySelector('[data-list-image]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        description: document.querySelector('[data-list-description]'),
    },
    search: {
        button: document.querySelector('[data-header-search]'),
        overlay: document.querySelector('[data-search-overlay]'),
        cancel: document.querySelector('[data-search-cancel]'),
        form: document.querySelector('[data-search-form]'),

        authors: document.querySelector('[data-search-authors]'),
        genres: document.querySelector('[data-search-genres]'),
        title: document.querySelector('[data-search-title]'),
//        document.querySelector('[]'),
    },
    settings: {
        button: document.querySelector('[data-header-settings]'),
        overlay: document.querySelector('[data-settings-overlay]'),
        cancel: document.querySelector('[data-settings-cancel]'),
        form: document.querySelector('[data-settings-form]'),

        theme: document.querySelector('[data-settings-theme]'),
    },
    other: {},
    authors: {},
    genres: {},
    books: {},
}

/** Creating the options in the list for the books */


/** Creates the HTML from the preview data */
export const createPreviewHtml = (preview) => {
    const { author, id, title, image } = preview

    const element = document.createElement('div')
    element.className = 'preview'
    element.dataset.id = id

    element.innerHTML = /* html */ `
        
    <img class="preview__image" data-preview-image src="${image}"/>
        
    <div class="preview__info">
        <div class="preview__title" data-preview-title>${title}</div>
        
        <div class="preview__author" data-preview-author>${authors[author]}</div>
    </div>
    `

    return element
}