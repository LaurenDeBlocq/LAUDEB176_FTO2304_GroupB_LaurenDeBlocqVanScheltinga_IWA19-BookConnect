import { authors, genres, books } from "./data"

/**
 * Attempting to recreate the html object from IWA challenge 18. I
 * found it to be useful and a lot easier than dealing with tons of
 * document.querySelector()'s the whole time.
 */

export const html = {
    list: {},
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

