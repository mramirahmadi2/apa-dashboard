<template>
  <v-col cols="12" sm="12">
    <v-select
      v-model="themeApa"
      :items="items"
      :menu-props="{ top: true, offsetY: true }"
      label="change theme"
      @change="themeChange()"
    ></v-select>
  </v-col>
</template>
<script>
  
export default {
  data() {
    return {
      themeApa: "bluegrey",
      items: ["bluegrey", "blue", "red", "cyan", "teal"],
    };
  },
  watch: {
    themeApa: {
      handler(value) {
        if (value === "blue") {
          this.$vuetify.theme.themes.light.bluegrey = "#2196F3";
          this.$vuetify.theme.themes.light.CardApa = "#2196F3";
          this.$vuetify.theme.themes.light.whiteMenu = "#BBDEFB";
          this.$vuetify.theme.themes.light.whiteNavebar = "#E3F2FD";
          this.$vuetify.theme.themes.light.primary = "#D81B60";
          this.$vuetify.theme.themes.light.blueSearch = "#FF4081";
        } else if (value === "red") {
          this.$vuetify.theme.themes.light.bluegrey = "#FF8A80";
          this.$vuetify.theme.themes.light.CardApa = "#FF8A80";
          this.$vuetify.theme.themes.light.whiteMenu = "#FFCDD2";
          this.$vuetify.theme.themes.light.whiteNavebar = "#FFEBEE";
          this.$vuetify.theme.themes.light.primary = "#C51162";
          this.$vuetify.theme.themes.light.blueSearch = "#FF4081";
        } else if (value === "cyan") {
          this.$vuetify.theme.themes.light.bluegrey = "#00BCD4";
          this.$vuetify.theme.themes.light.CardApa = "#00BCD4";
          this.$vuetify.theme.themes.light.whiteMenu = "#B2EBF2";
          this.$vuetify.theme.themes.light.whiteNavebar = "#E0F7FA";
          this.$vuetify.theme.themes.light.primary = "#64DD17";
          this.$vuetify.theme.themes.light.blueSearch = "#FDD835";
          this.$vuetify.theme.themes.light.whiteBoxSearch = "#FFFDE7";
        } else if (value === "teal") {
          this.$vuetify.theme.themes.light.bluegrey = "#009688";
          this.$vuetify.theme.themes.light.CardApa = "#009688";
          this.$vuetify.theme.themes.light.whiteMenu = "#B2DFDB";
          this.$vuetify.theme.themes.light.whiteNavebar = "#E0F2F1";
          this.$vuetify.theme.themes.light.primary = "#00E676";
          this.$vuetify.theme.themes.light.blueSearch = "#00C853";
          this.$vuetify.theme.themes.light.whiteBoxSearch = "#F1F8E9";
        }else if(value === "bluegrey"){
          this.$vuetify.theme.themes.light.bluegrey = "#ECEFF1";
          this.$vuetify.theme.themes.light.CardApa = "#ECEFF1";
          this.$vuetify.theme.themes.light.whiteMenu = "#F5F5F5";
          this.$vuetify.theme.themes.light.whiteNavebar = "#EEEEEE";
          this.$vuetify.theme.themes.light.primary = "#448AFF";
          this.$vuetify.theme.themes.light.blueSearch = "#1565C0";
          this.$vuetify.theme.themes.light.whiteBoxSearch = "#fff";
        }
      },
    },
  },
};
</script>
