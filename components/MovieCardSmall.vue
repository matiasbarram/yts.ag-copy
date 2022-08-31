<template>
    <div>
            <div class="card m-auto text-center">
                <nuxt-link :to="`movie/${movie.id}`">
                    <img class="img " :src="movie.medium_cover_image" alt="">
                </nuxt-link>
            </div>
        <h5 class="card-title text-center">{{ movie.title }}</h5>
    </div>

</template>

<script>
export default {
    props: ['movie'],

}
</script>

<style scoped>
.card-body {
    overflow: hidden;
    background-color: #1d1d1d !important;
}

.card {
    border: unset !important;
    background-color: transparent!important;
}

.img {
    width: 120px;
}
</style>