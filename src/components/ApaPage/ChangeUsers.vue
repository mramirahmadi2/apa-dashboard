<template>
  <v-col cols="12" sm="12">
    <v-select
      v-model="ChangeUsers"
      :items="isAllUser"
      :menu-props="{ top: true, offsetY: true }"
      label="change User"
      item-text="username"
      @change="ChangeData()"
    >
      <template v-slot:selection="{ item }">
        <v-chip>
          <span>{{ item.username }}</span>
        </v-chip>
        <span v-if="item.admin === true" class="text-caption"> admin </span>
        <span v-if="item.admin === false" class="text-caption"> user </span>
      </template>
    </v-select>
  </v-col>
</template>
<script>
export default {
  data() {
    return {
      ChangeUsers: "admin",
      items: [],
      defultAdmin:"",
      isUser: true,
    };
  },
  computed: {
    isAllUser() {
      return this.$store.state.allUsers;
    },
  },
  watch: {
    isAllUser: {
      handler(value) {
        if (value.length >= 0 ) {
          this.ChangeData();
        }
      },
    },
  },
  created() {
   
    this.adminDiagnosis;
  },
  methods: {
    adminDiagnosis() {
      this.isAllUser.forEach((Admin) => {
        if (Admin.username === this.ChangeUsers) {
          this.isUser = Admin.admin;
          this.defultAdmin = Admin.username
        }
      });
    },
    ChangeData() {
      //let isUser;
      this.$store.state.nameUser = this.ChangeUsers;
      this.items.forEach((Admin) => {
        if (Admin.username === this.ChangeUsers) {
          this.isUser = Admin.admin;
        }
      });
      this.adminDiagnosis();
      console.log("isUser", this.isUser);
      if (this.isUser === false) {
        this.$store.commit("isUser");
        this.$router.push("/ManageUserFiles");
        console.log(this.$store.state.nameUser);
      }else if(this.defultAdmin === "admin" ){
        this.$store.commit("isAdmin");
        this.$router.push("/");
      } else {
        this.$store.commit("isAdmin");
        console.log(this.$store.state.nameUser);
      }
    },
  
  },
};
</script>
