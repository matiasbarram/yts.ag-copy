<template>
  <div class="">
    <div id="container" class="m-auto py-5">
      <h1 class="text-center">Download YTS YIFY movies: HD smallest size</h1>
      <div class="w-75 m-auto">
        <p class="text-center">
          Welcome to the official yts.torrentbay.to (.LT) website. Here you can browse and download YIFY movies in
          excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.
        </p>
        <div class="">
          <h3 class="text-center">Peliculas populares</h3>
          <div class="row mt-4">
            <div class="col" v-for="popularMovie in popularMovies" :key="popularMovie.id">
              <MovieCardSmall :movie="popularMovie" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-4">
      <div class="justify-content-md-center">
        <h2 class="py-2">Peliculas recientes</h2>
        <div class="row">
          <div class="col-sm-3" v-for="movie in movies" :key="movie.id">
            <MovieCard :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Index",
  computed: {
    ...mapState(["movies", "popularMovies", 'favMovies']),
  },
  created() {
    if (process.client) {
      this.$store.dispatch("getLocalStorageFavoriteMovies");
    }
  },

  async fetch({ store }) {
    await store.dispatch("fetchMovies");
    await store.dispatch("fetchPopularMovies");
  },
}
</script>

<style scoped>
#container {
  background-image: url('~@/assets/img/background.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>