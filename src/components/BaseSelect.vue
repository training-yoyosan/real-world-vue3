<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select :value="modelValue" @change="updateValue" v-bind="$attrs">
      <option
        v-for="option in options"
        :key="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  name: 'BaseSelect',

  props: {
    options: {
      type: Array,
      required: true,
    },
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
