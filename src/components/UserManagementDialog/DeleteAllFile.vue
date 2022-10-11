<template>
  <v-dialog v-model="deleteFile" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">
        Do you want to delete all these files?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="deleteFile = false"
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" text @click="Delete">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    return { 
      items: [
      { id: 1, name: "File #1", type: "folder" },
      { id: 2, name: "File #2", type: "folder" },
      {
        id: 3,
        name: "Child #3",
        type: "file",
        children: [
          { id: 5, name: "Grandchild #1", type: "folder" },
          { id: 6, name: "Grandchild #2", type: "folder" },
        ],
      },
    ],
      deleteItem: "" ,
      editedIndex : -1,
      editedItem: {
      id: "",
      name: "",
      type:"",
      children:[]
    },
    defaultItem: {
      id: "",
      name: "",
      type:"",
      children:[]
    },
    };
  },
  computed: {
    deleteFile: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
 
  methods: {
    Delete() {
      this.$emit("deleteAll");
      
    },
  
  },
};
</script>
