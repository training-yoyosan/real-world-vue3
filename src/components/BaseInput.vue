<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input :value="modelValue" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  name: 'BaseInput',

  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: [String, Number],
  },

  methods: {
    updateValue(event) {
      console.log(event)
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped></style>
