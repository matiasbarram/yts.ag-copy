<template>
    <div class="w-90 m-auto mb-5 ">
        <div
            :style="{ background: 'url(' + movie.background_image + ') no-repeat center center', backgroundSize: 'cover' }">
            <div class="container">
                <div class="row p-5">
                    <div class="col">
                        <div class="image-container mb-4">
                            <img :src="movie.medium_cover_image" :alt="movie.title">
                        </div>
                        <div class="download-container">
                            <p>
                                <a :href="movie.torrents[0].url" class="btn btn-success btn-block " target="_blank">
                                    Descargar
                                </a>
                            </p>
                            <p>
                                <a class="btn btn-secondary " @click="editFavorite"> {{ isFavorite }} </a>
                            </p>
                        </div>
                    </div>
                    <div class="col">
                        <h1>{{ movie.title }}</h1>
                        <h4>{{ movie.year }}</h4>
                        <span v-for="(genre, index) in movie.genres" :key="genre.id">
                            {{ genre }} /
                        </span>
                        <div class="mt-3 d-flex">
                            <a class="torrent-version" v-for="(torrent, index) in movie.torrents" :key="torrent.id"
                                :href="torrent.url" target="_blank">
                                {{ torrent.quality }}.{{ toMayus(torrent.type) }}
                            </a>
                        </div>
                    </div>
                    <div class="col">
                        <SuggestedList :suggestedMovies="suggestedMovies" />
                    </div>
                </div>
            </div>
        </div>
        <div class="container py-5">
            <div class="info">
                <h3>Resumen de la trama</h3>
                <p>{{ movie.description_full }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, map } from 'vuex'
export default {
    async asyncData({ $axios, route }) {

        const { id } = route.params;
        const res = await $axios.$get(`api/movie_details.json?movie_id=${id}`);
        const movie = res.data.movie;
        console.log(movie);
        const res2 = await $axios.$get(`api/movie_suggestions.json?movie_id=${id}`);
        const suggestedMovies = res2.data.movies;
        console.log(suggestedMovies);
        return { movie, suggestedMovies };
    },
    computed: {
        ...mapGetters(['checkMovieFav']),
        isFavorite() {
            return this.checkMovieFav(this.movie.id) ? 'Quitar de favoritos' : 'Agregar a favoritos';
        }
    },

    methods: {
        toMayus(text) {
            return text.toUpperCase();
        },
        editFavorite() {
            this.$store.dispatch('editFavorite', this.movie);
        },
    },
}
</script>

<style scoped>
.torrent-version {
    cursor: pointer;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 0.2em 0.6em;
    color: #ccc;
    text-decoration: unset;
}
</style>