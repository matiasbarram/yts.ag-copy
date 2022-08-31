<template>

    <nav class="navbar navbar-dark bg-dark sticky-top navbar-expand-sm ">
        <div class="container-fluid">
            <ul class="navbar-nav">
                <li class="navbar-brand">
                    <nuxt-link class="navbar-brand" to="/"> YTS </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/favorite" class="nav-link">Favoritos</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/movies" class="nav-link">Peliculas</nuxt-link>
                </li>
            </ul>
            <form class="d-flex" role="search" @submit.prevent>
                <input v-model="search" class="form-control me-2" type="search" placeholder="Busca..."
                    aria-label="Search" @keyup="procesarInput">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
        </div>
        <div class="results" v-if="searchresults">
            <nuxt-link v-for="browseMovie in browseMovies" :key="browseMovie.id" :to="`/movie/${browseMovie.id}`">
                {{ browseMovie.title }}
            </nuxt-link>
        </div>
    </nav>



</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            search: "",
        }
    },
    computed: {
        ...mapState(['browseMovies']),
        searchresults() {
            //console.log(this.browseMovies)
            if ( typeof this.browseMovies !== 'undefined') {
                return (Object.keys(this.browseMovies).length > 0 ) ? true : false;
            }
        }
    },
    methods: {
        procesarInput() {
            const s = this.search.toLowerCase();
            (s.length >= 4) ? this.$store.dispatch('fetchBrowseMovies', s) : this.$store.dispatch('clearBrowseMovies');
        }
    },

}
</script>

<style scoped>
.navbar {
    padding: 1rem 1rem;
}

.results {
    position: absolute;
    top: 70px;
    width: 300px;
    right: 28px;
    background-color: white;
    padding: 10px 14px!important;
}

</style>