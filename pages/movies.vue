<template>
    <div>
        <div class="container">
            <div class="my-5  mx-auto">
                <h4 class="text-left my-4">Términos de busqueda</h4>
                <div>
                    <form @submit.prevent="filterMovies">
                        <div class="row g-2">
                            <div clas="col-sm">
                                <input class="form-control" type="text" placeholder="Nombre de la pelicula..."
                                    aria-label="default input example" v-model="filters.nombre">
                            </div>
                            <div class="col-sm">
                            </div>
                        </div>
                        <div class="row g-6">
                            <SearchSelect class="col-auto" title="Genero" :options=filterOpts.generos
                                v-model="filters.genero">
                            </SearchSelect>
                            <SearchSelect class="col-auto" title="Calidad" :options=filterOpts.calidad
                                v-model="filters.calidad">
                            </SearchSelect>
                            <SearchSelect class="col-auto" title="Calificación" :options=filterOpts.score
                                v-model="filters.score">
                            </SearchSelect>
                            <SearchSelect class="col-auto" title="Año" :options=filterOpts.year v-model="filters.year">
                            </SearchSelect>
                        </div>
                        <div class="form-group mt-2">
                            <button type="submit" class="btn btn-primary mb-3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-3 my-2" v-for="movie in filteredMovies" :key="movie.id">
                    <MovieCard :movie="movie" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import filterOpts from '@/static/filterOpts.json';
import { mapState } from 'vuex'

export default {
    data() {
        return {
            filters: {
                nombre: '',
                genero: '',
                calidad: '',
                score: '',
                year: ''
            },
            filterOpts: filterOpts

        };
    },
    computed: {
        ...mapState(['filteredMovies'])
    },
    methods: {
        filterMovies() {
            this.$store.dispatch('fetchFilteredMovies', this.filters);
        }
    },
    async fetch({ store }) {
        if (store.state.movies.length === 0) {
            await store.dispatch('fetchMovies');
        }
    }
}
</script>

<style  scoped>
</style>