import { authors, genres, books } from "./data"

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
    element.className = 'list__item'
    element.dataset = state.loaded[id]

    element.innerHTML = /* html */ `
        
    
    <div class="item__title" data-item-title>${title}</div>
        
        <dl class="item__details">
            <div class="item__row">
                <dt></dt>
                <dd class="order__value" data-item-table>${table}</dd>
            </div>

            <div class="order__row">
                <dt>Ordered:</dt>
                <dd class="order__value">${hours}:${minutes}</dd>
            </div>
        </dl>
    `

    return element
}