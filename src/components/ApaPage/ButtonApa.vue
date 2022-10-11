<template>
  <div>
    <v-btn 
    color="primary"
    style="border-radius:7px ;"
    class="ml-5"
    height="40px"
    >
      {{ $t(btnText) }}
    </v-btn>
  </div>
</template>
<script>
export default {
  props: ["btnText"],
};
</script>
<style>
.Button {
  margin-left: 30px;
  border-radius: 5px;
  width: 80px;
  height: 40px;
  background-color: #8a2be2;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
