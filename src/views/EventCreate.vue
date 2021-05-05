<template>
  <div>
    <h1>Create an Event, {{ userName }}</h1>
  </div>
</template>

<script>
export default {
  name: "EventCreate",

  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
};
</script>

<style scoped></style>
