<template>
    <div>
        <select class="form-select" :value="value" @input="onInput">
            <option value="" selected>{{title}}</option>
            <option v-for="option in options" :value="option.value">{{option.text}}</option>
        </select>
    </div>
</template>

<script>
export default {

    props: ['title', 'options', 'value'],
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>