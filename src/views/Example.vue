<template>
  <form @submit.prevent="submit">
    <input
      type="text"
      placeholder="What's your email"
      v-model="email"
      style="margin: 12px"
      :class="{ error: v$.email.$error }"
      @blur="v$.$touch"
    />
    <p v-if="v$.email.$error" class="errorMessage">
      {{ v$.email.$errors ? v$.email.$errors[0].$message : '' }}
    </p>
    <button :disabled="v$.$invalid" type="submit">Submit</button>
    <p v-if="v$.$error" class="errorMessage">
      Please fill out the required fields
    </p>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

export default {
  name: 'Example',

  data() {
    return {
      email: null,
    }
  },

  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      email: { required, email },
    }
  },

  methods: {
    submit() {
      this.v$.$touch()
      if (!this.v$.$error) {
        console.log('Form submitted', this.email)
      }
    },
  },
}
</script>

<style scoped></style>
