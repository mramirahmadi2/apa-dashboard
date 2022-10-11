<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ $t("Shared") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="myGroups"
                  item-text="name"
                  label="Groups"
                  multiple
                  chips
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="myUsers"
                  item-text="username"
                  label="Users"
                  multiple
                  chips
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="['Delete', 'Share', 'Edit']"
                  label="Possibilities"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false">
            {{ $t("Close") }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            {{ $t("Shared") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      myUsers: [],
      myGroups: [],
    };
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    isAllUser() {
      return this.$store.state.allUsers;
    },
    isGetGroup() {
      return this.$store.state.allGroup;
    },
  },
  watch: {
    isAllUser: {
      handler(value) {
        if (value.length !== 1) {
          console.log('aredege')
          this.intionlaiz();
        }
      },
    },
    isGetGroup:{
      handler(value){
        if (value.length > 0) {
          console.log('aredege2')
          this.intionlaiz();
        }
      }
    }
  },
  created() {
    this.intionlaiz();
  },
  methods: {
    intionlaiz() {
      this.myUsers = this.isAllUser;
      this.myGroups = this.isGetGroup;
    },
  },
};
</script>
