<template>
  <v-col cols="10" sm="12" >
    <v-btn
      color="primary"
      dark
      block
      class="mb-2"
      @click="GoToTable"
      >Show</v-btn
    >
  </v-col>
</template>

<script>
export default {
  methods: {
    GoToTable() {
      this.$store.commit("GoToTable");
    },
  },
};
</script>
