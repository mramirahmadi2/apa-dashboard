<template>
  <v-app id="inspire">
    <v-navigation-drawer class="whiteMenu" v-model="drawer" :right="isRtl" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item to="/" link v-if="isUser === false">
          <v-list-item-icon id="item1">
            <v-icon> mdi-account </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("Users-Management") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/ManageUserFiles" link>
          <v-list-item-icon id="item3">
            <v-icon> mdi-file-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("User-file-management")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/ManageUserGroups" link v-if="isUser === false">
          <v-list-item-icon id="item4">
            <v-icon> mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("Manage-user-groups")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <SelectTheme />
      </v-list>
      <v-list>
        <ChangeUsers />
      </v-list>
      <!-- <v-list-item>
        <OkData />
      </v-list-item> -->
    </v-navigation-drawer>

    <v-app-bar app class="whiteNavebar">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="titleApa">{{ $t("Apa") }}</v-toolbar-title>

      <translationVue class="translaton" id="translaton" />
    </v-app-bar>

    <v-main class="bluegrey">
      <router-view class="ltr-seting"></router-view>
    </v-main>
  </v-app>
</template>
<script>
import translationVue from "@/components/ApaPage/TranslationVue.vue";
import "@/assets/Style/ltrStyle.css";
import SelectTheme from "./components/ApaPage/SelectTheme.vue";
import ChangeUsers from "./components/ApaPage/ChangeUsers.vue";
// import OkData from "./components/ApaPage/OkData.vue";
export default {
  name: "app",
  components: {
    translationVue,
    SelectTheme,
    ChangeUsers,
    // OkData,
  },
  data: () => ({
    drawer: null,
    OkShow: false,
  }),
  computed: {
    isRtl() {
      return this.$store.getters.isRtl;
    },
    isUser() {
      return this.$store.state.userOrAdmin;
    },
  },
  mounted() {
    if (this.isRtl === true) {
      import("@/assets/Style/rtlStyle.css").then(
        () =>
          document.querySelector(".ltr-seting").classList.toggle("rtl-seting"),
        document.querySelector("#translaton").classList.add("rtl-translaton"),
        document.querySelector("#translaton").classList.remove("translaton"),
        document.querySelector(".titleApa").classList.add("a-rtl-mr-1")
      );
    }
  },
  methods: {
    changeRTL() {
      this.$vuetify.rtl = true;
    },
    OkShowBtn() {
      this.OkShow = true;
      // const ApaShow = localStorage.getItem();
      // localStorage.setItem(ApaShow);
    },
  },
};
</script>
