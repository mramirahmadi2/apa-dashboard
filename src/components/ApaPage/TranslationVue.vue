<template>
    <v-card class="translate light-blue accent-2">
        <span>{{$t("Change-Language")}}</span>
        <select @change="handelChange()" v-model="lang" name="" id="" class="blue lighten-4">
            <option value="en">{{$t("English")}}</option>
            <option value="pe">{{$t("Persian")}}</option>
        </select>
    </v-card>
</template>
<script>
export default {
    data:function(){
      const lang = localStorage.getItem('lang') || 'en';
      return{
        lang : lang
      }
    },
    mounted()
    {  
            if (this.lang === 'pe') {
                 document.querySelector('html').classList.add('is-rtl');
             }else{
                document.querySelector('html').classList.remove('is-rtl');
              }
    },
    methods:{
        handelChange(){
            localStorage.setItem('lang',this.lang);
            window.location.reload();
        },
    }
};
</script>
<style>
.translate{
    display: flex;
    width: 15rem;
    height: 40px;
    text-align: center;
    border-radius: 7px;
    box-shadow: 4px 4px 16px rgb(118, 113, 113);
    align-items: center;
    justify-content: space-between;
}
.translate>span{
    margin-left: 5px;
    margin-right: 5px;
}
select{
    width: 80px;
    height: 25px;
    margin-left: 5px;
    margin-right: 5px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
    background-color: antiquewhite;
    border-radius: 7px;

}
</style>
<style >
html.is-rtl * {
    direction: rtl;
}
</style>