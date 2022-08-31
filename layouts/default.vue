<template>
<div>
  <Header />
  <div class="pb-5">
    <Nuxt />
  </div>
</div>
</template>

<script>
import Header from '~/components/Header.vue';
export default {
    name: "DefaultLayout",
    data() {
        return {};
    },
    components: { Header }
}
</script>
