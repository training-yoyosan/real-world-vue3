export const formFieldMixin = {
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: [String, Number],
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
