<template>
    <div>
        <div class="container my-5">
            <div class="row justify-content-md-center w-75 m-auto">
                <h2>Peliculas favoritas</h2>
                <div class="col-3 my-2" v-for="movie in favMovies" :key="movie.id">
                    <MovieCard :movie="movie" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['favMovies']),
    },
}
</script>

<style scoped>
</style>