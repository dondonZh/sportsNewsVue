<template>
  <div id="news">


    <header class="bar bar-nav barre">

      <img class="searchicon" src="../assets/imgs/Searchicon.png" @click='inOut'>


        <div :class="{searchbar:sbar,animated:animated,fadeInRight:barIn,fadeOutRight:barOut}" :style="{display:isShow}">
          <a class="searchbar-cancel" @click="inOut">取消</a>
          <div class="search-input">
            <!--<label class="icon icon-search" for="search"></label>-->
            <input type="search" id='search' placeholder='输入关键字...'/>
          </div>
        </div>
        <!--<input  class="searchInput" type="text" value="12"/>-->

      <span class="title">推荐</span>
    </header>

    <div class="content">

      <div class="content-block">

        <div class="tabs">

          <div id="tab1" class="tab active">

            <scroller style="top:2rem;position: fixed"
                      :on-refresh="refresh"
                      :on-infinite="infinite"
                      ref="my_scroller"
            >
              <svg class="spinner" style="stroke: #17b03b;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round">
                  <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                    <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                             repeatCount="indefinite"></animate>
                  </line>
                  <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                    <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                             repeatCount="indefinite"></animate>
                  </line>
                  <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                    <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                             repeatCount="indefinite"></animate>
                  </line>
                  <line x1="52" x2="52" y1="16" y2="48">
                    <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                             repeatCount="indefinite"></animate>
                  </line>
                </g>
              </svg>
              <div class="news">

                <div class="new" v-for="newitem in list">
                  <router-link :to="{path:'/newsDetails',query: {newCode:newitem.id}}">
                    <div class="wrapper">
                      <div class="left-span">

                        <span class="new-title">{{newitem.title}}</span>
                        <span class="new-source">{{newitem.source}}</span>
                      </div>

                      <img class="" :src="newitem.thumbs">
                    </div>
                  </router-link>
                </div>
              </div>
              <svg class="spinner" style="fill: #17b03b;" slot="infinite-spinner" viewBox="0 0 64 64">
                <g>
                  <circle cx="16" cy="32" stroke-width="0" r="3">
                    <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
                  </circle>
                  <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                    <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
                  </circle>
                  <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                    <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
                  </circle>
                </g>
              </svg>
            </scroller>
          </div>
          <div id="tab2" class="tab">

          </div>
        </div>
      </div>
    </div>
    <nav class="bar bar-tab">

      <router-link to="/" class="tab-item external active">
        <img class="icon" src="../assets/imgs/news-on.png">
        <!-- <span class="icon icon-home"></span>-->
        <span class="tab-label">首页</span>
      </router-link>
      <router-link to="/matches" class="tab-item external">
        <img class="icon" src="../assets/imgs/matches-off.png">
        <!-- <span class="icon icon-star"></span>-->
        <span class="tab-label">推荐</span>
      </router-link>
      <!--<router-link to="/user" class="tab-item external">
        <img class="icon" src="../assets/imgs/user-off.png">
        &lt;!&ndash; <span class="icon icon-star"></span>&ndash;&gt;
        <span class="tab-label">用户</span>
      </router-link>-->
    </nav>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "news",
    created() {

      console.log('i am cr')
    },
    data() {
      return {
        newList: [],
        lastTime: (Date.parse(new Date())) / 1000,
        /* maxId: '',*/
        animated:true,
        barIn:false,
        barOut:true,
        sbar:true,
        isShow:'none',
      }
    },
    computed: {
      ...mapGetters({
        list: 'backlist',
        maxId: 'backmaxId'
      })
    },
    beforeRouteEnter(to, from, next) {
      if (!sessionStorage.askPositon) {//当前页面刷新不需要切换位置
        sessionStorage.askPositon = '';
        next();
      } else {
        next(vm => {
          vm.isShow = 'none';
          vm.barIn = false;
          vm.barOut = true;
          if (vm && vm.$refs.my_scroller) {//通过vm实例访问this
            setTimeout(function () {
              console.log('next_vm', vm.$refs.my_scroller.getPosition().top);
              vm.$refs.my_scroller.scrollTo(0, sessionStorage.askPositon, false);
            }, 0)//同步转异步操作
          }
        })
      }
    },
    beforeRouteLeave(to, from, next) {//记录离开时的位置
      sessionStorage.askPositon = this.$refs.my_scroller && this.$refs.my_scroller.getPosition() && this.$refs.my_scroller.getPosition().top;
      next()
    },
    methods: {

      inOut(){
        this.isShow = 'block';
        this.barIn = !this.barIn;
        this.barOut = !this.barOut;
      },
      infinite(done) {
        console.log(this.$refs.my_scroller.getPosition());
        var vm = this;
        setTimeout(() => {
          /*  axios.get('/api/news/getall', {*/

          /* axios.get('/interface.do?fn=3001&sortId=23', {
             params: {
               maxId: vm.maxId,
             }
           }).then(function (response) {
             if (response.data.data.length > 0) {

               console.log('res', response);
               vm.newList.push(...response.data.data);
               /!* vm.maxId = response.data.maxId;*!/
               vm.$store.dispatch('saveMaxId', response.data.maxId);
               vm.$store.dispatch('saveList', response.data.data);
               done(true);
             }
           });*/

          vm.$jsonp('https://sports.fcaimao.com' + '/interface.do',
            {
              fn: 3001,
              parentSortId: '3',
              maxId: vm.maxId,
              callbackQuery: 'jsonpcallback'
            }).then(json => {
            vm.newList.push(...json.data);
            vm.$store.dispatch('saveMaxId', json.maxId);
            vm.$store.dispatch('saveList', json.data);
            done(true);
          }).catch(err => {
            console.log(err)
          });

        }, 1500);
        console.log('infiniteNew')


      },
      refresh(done) {
        var vm = this;
        vm.$store.dispatch('saveMaxId', '');

        setTimeout(() => {
          /*  axios.get('/api/news/getall', {*/

          /* axios.get('/interface.do?fn=3001&sortId=23', {
             params: {
               maxId: vm.maxId,
             }
           }).then(function (response) {
             if (response.data.data.length > 0) {

               console.log('res', response);
               vm.newList.push(...response.data.data);
               /!* vm.maxId = response.data.maxId;*!/
               vm.$store.dispatch('saveMaxId', response.data.maxId);
               vm.$store.dispatch('saveList', response.data.data);
               done(true);
             }
           });*/

          vm.$jsonp('https://sports.fcaimao.com' + '/interface.do',
            {
              fn: 3001,
              parentSortId: '3',
              maxId: vm.maxId,
              callbackQuery: 'jsonpcallback'
            }).then(json => {
            vm.newList.push(...json.data);
            vm.$store.dispatch('resetList');
            vm.$store.dispatch('saveMaxId', json.maxId);
            vm.$store.dispatch('saveList', json.data);
            done(true);
          }).catch(err => {
            console.log(err)
          });

        }, 1500);
        console.log('refreshNew')

      },
    }
  }

</script>

<style scoped>

</style>
