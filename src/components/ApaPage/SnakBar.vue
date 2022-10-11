<template>
  <v-snackbar
    v-model="snackbarOk"
    :timeout="timeout"
    v-bind:color="colorSnak"
    right
    top
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbarOk = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    text: String,
    value: Boolean,
    timeout: String,
    colorSnak:String,
    
  },
  computed: {
    snackbarOk: {
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
