export const state = () => ({
    movies: [],
    filteredMovies: [],
    favMovies: [],
    popularMovies: [],
    browseMovies: [],
})

// 
export const getters = {
    checkMovieFav: (state) => (id) => {
        return state.favMovies.find(movie => movie.id === id)
    }
}

// syncrhonous action
export const mutations = {
    setFilteredMovies(state, payload) {
        console.log(payload)
        state.filteredMovies = payload
    },

    setMovies(state, payload) {
        if (typeof state.filteredMovies !== 'undefined') {
            if (state.filteredMovies.length === 0) {
                state.filteredMovies = payload
            }
            state.movies = payload
        }
        else{
            state.filteredMovies = state.movies
        }
    },

    editFavoriteMovie(state, payload) {
        const exist = state.favMovies.filter(movie => movie.id === payload.id)
        if (exist.length > 0) {
            console.log('deberia eliminar...');
            state.favMovies = state.favMovies.filter(function (movie) {
                return movie.id !== payload.id
            })
        }
        else {
            console.log('deberia agregar...');
            state.favMovies.push(payload)
        }
        if (process.client) {
            localStorage.setItem('favorites', JSON.stringify(state.favMovies));
            console.log(state.favMovies);
        }
    },
    setPopularMovies(state, payload) {
        state.popularMovies = payload
    },
    setBrowseMovies(state, payload) {
        state.browseMovies = payload
    },
    clearBrowseMovies(state) {
        state.browseMovies = []
    },
    setFavMovies(state, payload) {
        state.favMovies = payload
    }
}

//async function to get the movies from the api
export const actions = {
    async fetchMovies({ commit }) {
        const res = await this.$axios.$get(`api/list_movies.json/?sort_by=date_added&limit=16`);
        const movies = res.data.movies;
        commit('setMovies', movies);
    },

    async fetchFilteredMovies({ commit }, payload) {
        const res = await this.$axios.$get(`api/list_movies.json/?genre=${payload.genero}&query_term=${payload.nombre}&quality=${payload.calidad}&minimum_rating=${payload.score}&sort_by=date_added&limit=16`);
        const movies = res.data.movies;
        commit('setFilteredMovies', movies);
    },
    async fetchPopularMovies({ commit }) {
        const res = await this.$axios.$get(`api/list_movies.json/?sort_by=download_count&limit=4`);
        const movies = res.data.movies;
        commit('setPopularMovies', movies);
    },

    editFavorite({ commit }, payload) {
        commit('editFavoriteMovie', payload)
    },
    async fetchBrowseMovies({ commit }, payload) {
        const res = await this.$axios.$get(`api/list_movies.json/?sort_by=download_count&limit=5&query_term=${payload}`);
        const movies = res.data.movies;
        commit('setBrowseMovies', movies);
    },
    clearBrowseMovies({ commit }) {
        commit('setBrowseMovies')
    },
    getLocalStorageFavoriteMovies({ commit }) {
        const favs = JSON.parse(localStorage.getItem('favorites'))
        console.log(favs)
        commit('setFavMovies', favs)
    }
}