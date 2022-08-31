<template>
    <div>
        <div class="similar-container">
            <div class="row">
                <div class="movie col-6 my-2" v-for="suggestedMovie in suggestedMovies" :key="suggestedMovie.id">
                    <img style="width:100px; margin:0 auto" :src="suggestedMovie.medium_cover_image"
                        :alt="suggestedMovie.title">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
            suggestedMovies: {
                type: Array,
                required: true
            }
    }

}
</script>

<style lang="scss" scoped>
</style>