<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card >
      <v-card-title> add a newFile </v-card-title>
      <v-col cols="12">
        <v-text-field
          v-model="NameFile"
          label="Enter the Name File"
          required
        ></v-text-field>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="show=false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click.stop="show=false"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
     value: Boolean
  },
  data: () => ({
    NameFile: "",
   
  }),
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
};
</script>
