<template>
  <v-row justify="center">
    <v-dialog v-model="detialApa" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ name }}</span>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="username"
          class="elevation-1"
        ></v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="detialApa = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    name: String,
    value: Boolean,
    users: Array
  },
  data() {
    return {
      headers: [
        { text: "username", value: "username" },
        { text: "firstName", value: "firstName" },
        { text: "lastName", value: "lastName" },
      ],
      
    };
  },
  computed: {
    detialApa: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
