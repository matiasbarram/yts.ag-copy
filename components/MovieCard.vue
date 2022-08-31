<template>
    <div class="">
        <div class="card" @mouseover="setActive(true)" @mouseleave="setActive(false)">
            <div class="card-body">
                <div class="image-container">
                    <template v-if="isActive">
                        <nuxt-link class="active-hover" :to="`/movie/${movie.id}`">
                            <div class="hover-info">
                                <i class="fa-solid fa-star fa-2x"></i>
                                <h5 class="card-title text-center">{{ movie.rating }} / 10</h5>
                                <div>
                                    <p class="mb-0 text-center" v-for="(genero, index) in filterGenre(movie.genres)"
                                        :key="index">
                                        {{ genero }}
                                    </p>
                                </div>
                            </div>
                        </nuxt-link>
                    </template>
                    <img class="background-image " :src="movie.large_cover_image" :alt="movie.title"
                        :class="{ 'active': isActive }">
                </div>
            </div>

        </div>
        <div class="info-container">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.year }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        setActive(value) {
            this.isActive = value;
        },
        filterGenre(genres) {
            return genres.filter((genre, index) => index < 2);
        }
    }
}
</script>

<style scoped>
.background-image {
    width: 100%;
    object-fit: cover;
}

.background-image {
    -webkit-filter: brightness(1);
    -moz-filter: brightness(1);
    filter: brightness(1);
    transition: all 0.2s ease;
}

.background-image.active {
    filter: brightness(0.3);
}

.card-body {
    padding: 0 !important;
}

.card {
    border: none !important;
}

.info-container {
    margin-top: 0.5rem
}

.card {
    cursor: pointer;
    -webkit-animation: filter 1s infinite !important;
    width: 200px;
}

.active-hover {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.active-hover {
    color: white;
    text-decoration: unset;
}

.hover-info {
    position: relative;
    top: 25%;
}

.card-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>