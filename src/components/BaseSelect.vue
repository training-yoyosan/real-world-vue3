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
import { formFieldMixin } from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],

  name: 'BaseSelect',

  props: {
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
