<template>
  <div>
    <div class="SearchBox whiteBoxSearch">
        <input class="search" type="text" :placeholder="$t('find')" v-model="find" /> 
        <div class="IconSearch blueSearch">
         <v-icon large color="white">
           mdi-magnify
         </v-icon>

        </div>
      </div>
  </div>
</template>
<script>

 export default {
    data() {
        return{
         find:"",
         
        }
    },
    mounted(){
     const lang = localStorage.getItem('lang') || 'en';
     if(lang==='pe'){
      document.querySelector('.SearchBox').classList.add('per-search');
      document.querySelector('.IconSearch').classList.add('per-icon');
     }
    }
 }
</script>
<style>
.search {
  padding-left: 10px;
  width: 650px;
  height: 30px;
  border: none;
}
.per-search{
 margin-left: 35px;
 padding-right: 10px;
}
.search:focus {
  outline: none;
}

.flex-apa {
  display: flex;
}

.SearchBox {
  border-radius: 5px;
  
  width: 700px;
  height: 40px;
  display: flex;
  align-items: center;

}

.IconSearch {
  display: flex;
  margin-left: 10px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  
  align-items: center;
  border-radius: 0px 5px 5px 0px;
}
.per-icon{
  border-radius: 5px 0px 0px 5px;
  margin-left: 0px;
}
.per-icon>svg{
  margin-right: 7px;
}
.IconSearch>svg {
  margin-left: 7px;

}

</style>