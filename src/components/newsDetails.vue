<style scoped>

</style>
<template>
  <div id="newsDetails">
    <header class="bar bar-nav">

      <span class="icon icon-left backto" @click="routeback"></span>

      <h1 class="title">详情</h1>
    </header>
    <div class="article">
      <h3 class="newstitle">{{title}}</h3>
      <span class="timeAuthor">{{createTime}}</span>
      <span class="views">阅读次数：{{hits}}</span>
      <img class="newsimg" v-lazy="img">
      <div class="artContent" v-html="content">

      </div>
      <!--<span class="sourceFrom">来源：{{source}}</span>-->
    </div>
   <!-- <div class="links">
      <ul>
        <li>美媒：多支争冠队有一</li>
        <li>官方：那不勒多斯</li>
        <li>拉式被禁赛三场</li>
        <li>官方：那不勒多斯</li>
        <li>官方：那不勒多斯</li>
      </ul>
    </div>-->
  </div>

</template>

<script>
  import axios from 'axios';

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.timeout = 5000;
  /* axios.defaults.baseURL = "http://localhost:8086";*/
  axios.defaults.baseURL = "https://sports.fcaimao.com";
  export default {

    name: "newsDetails",
      created() {
        this.newCode = this.$route.query.newCode;
        console.log('newCode',this.newCode);
        if (this.newCode) {
          this.getNewconByCode();
        }
      },
    data(){
      return {
        newCode: '',
        content:'',
        source:'',
        title:'',
        createTime:'',
        hits:'',
        img:'',
      };
    },
    methods: {
      routeback() {
        this.$router.go(-1);
      },
      getNewconByCode(){
        var vm = this;

           vm.$jsonp('https://sports.fcaimao.com' + '/interface.do',{
             fn:3002,
             id:vm.newCode,
             callbackQuery:'jsonpcallback',
           }).then(json => {
             vm.content = json.content;
             vm.title = json.title;
             vm.source = json.source;
             vm.createTime = json.createTime;
             vm.hits = json.hits;
             if(json.photos.length > 0){
               vm.img = json.photos[0].src;
             }
             console.log('content',response);
           }).catch(err =>{
             console.log(err)
           });

          /* axios.get("/api/news/getdetail",{
             params:{
               id:vm.newCode,
             }
           }).then(function (response){
                vm.content = response.data.content;
                vm.title = response.data.title;
                vm.source = response.data.source;
                vm.createTime = response.data.createTime;
                vm.hits = response.data.hits;
                if(response.data.photos.length > 0){
                  vm.img = response.data.photos[0].src;
                }
                console.log('content',response);
           })*/


      }
    }
  }

</script>


