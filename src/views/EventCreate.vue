<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
        :class="{ error: v$.event.category.$error }"
        @blur="v$.event.category.$touch"
      />
      <p v-if="v$.event.category.$error" class="errorMessage">
        Category is required
      </p>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        placeholder="Add an event title"
        type="text"
        v-model="event.title"
        class="field"
        :class="{ error: v$.event.title.$error }"
        @blur="v$.event.title.$touch"
      />
      <p v-if="v$.event.title.$error" class="errorMessage">Title is required</p>

      <BaseInput
        label="Description"
        placeholder="Add an description"
        type="text"
        v-model="event.description"
        class="field"
        :class="{ error: v$.event.description.$error }"
        @blur="v$.event.description.$touch"
      />
      <p v-if="v$.event.description.$error" class="errorMessage">
        Description is required
      </p>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        placeholder="Add a location"
        type="text"
        v-model="event.location"
        class="field"
        :class="{ error: v$.event.location.$error }"
        @blur="v$.event.location.$touch"
      />
      <p v-if="v$.event.location.$error" class="errorMessage">
        Location is required
      </p>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          inputFormat="yyyy-MM-dd"
          :class="{ error: v$.event.date.$error }"
          @opened="v$.event.date.$touch"
        />
      </div>
      <p v-if="v$.event.date.$error" class="errorMessage">Date is required</p>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        :class="{ error: v$.event.time.$error }"
        @blur="v$.event.time.$touch"
      />
      <p v-if="v$.event.time.$error" class="errorMessage">Time is required</p>
      <BaseButton type="submit" class="-fill-gradient" :disabled="v$.$error"
        >Submit
      </BaseButton>
      <p v-if="v$.$error" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Datepicker from 'vuejs3-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import BaseButton from '@/components/BaseButton'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'EventCreate',

  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton,
  },

  setup: () => ({ v$: useVuelidate() }),

  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      ...mapState(['user']),
      event: this.createFreshEventObject(),
      times,
    }
  },

  validations() {
    return {
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required },
      },
    }
  },

  computed: {
    userName() {
      return this.$store.state.user.user.name
    },
    catLength() {
      return this.$store.getters.catLength
    },
    ...mapState({
      userID: (state) => state.user.user.id,
      // can be used for top level state
      categs: 'categories',
    }),
    ...mapState(['categories']),
    getEvent() {
      return this.$store.getters.getEventById
    },
    ...mapGetters(['getEventById']),
  },

  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user
      // Why is this.user undefined? Because it doesn't exist yet
      // console.log(this.user);
      const id = Math.floor(Math.random() * 10000000)

      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: new Date(),
        time: '',
        attendees: [],
      }
    },
    createEvent() {
      this.v$.$touch()

      if (!this.v$.$invalid) {
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            NProgress.start()

            this.$router.push({
              name: 'EventDetails',
              params: { id: this.event.id },
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            console.log('There was a problem creating your event')
            NProgress.done()
          })
      }
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
