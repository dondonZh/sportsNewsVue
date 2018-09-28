<style scoped>
</style>

<template>
  <div id="matches">
    <header class="bar bar-nav barre">

      <img class="filter" id="filterButton" src="../assets/imgs/filter.png" @click="filterMc()">

      <h1 class="title">推荐</h1>
    </header>
    <div :class="{secNav:isSec,showitem:isShow,cur:isCur}" id="secNav">
      <ul class="clearfix">
        <li v-for="(type,index) in matchTypes" :class="{active:type.isSelected}" @click="choose(index)">
          {{type.name}}
        </li>
      </ul>
    </div>
    <!--  <div class="buttons-tab">
        <div class="matches-btns">
          <a href="#tab1" class="tab-link active  button">已完场</a>
          <a href="#tab2" class="tab-link  button">进行中</a>
          <a href="#tab3" class="tab-link  button">未开赛</a></div>
      </div>-->


    <div class="content content-match">
      <!--<div class="dateBar">
        <div class="matDate">
          <span class="datetime">周一</span>
          <span class="datetime">09-03(36)</span>
        </div>
        <div class="matDate">
          <span class="datetime">周二</span>
          <span class="datetime">09-03(36)</span>
        </div>
        <div class="matDate">
          <span class="datetime">周三</span>
          <span class="datetime">09-03(36)</span>
        </div>
        <div class="matDate">
          <span class="datetime">周四</span>
          <span class="datetime">09-03(36)</span>
        </div>
        &lt;!&ndash;  <div class="matDate">
            <span class="datetime">周五</span>
            <span class="datetime">09-03(36)</span>
          </div>&ndash;&gt;
      </div>-->


      <div class="content-padded grid-demo content-mt">
        <scroller style="top:2.1rem;position: fixed"
                  :on-refresh="refresh"
                  :on-infinite="infinite"
                  :snapping="true"
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
          <div class="matchCtBox" v-for="(match,index) in matList">

            <span class="chooseTime" v-if="index == 0">奖期 : {{match.issueNo}}</span><span  class="chooseTime" v-else-if="matList[index].issueNo != matList[index - 1].issueNo">奖期{{match.issueNo}}</span>

            <div class="shadow">
              <div class="row rowout">
                <div class="col-20" id="mathed">

                 <span class="mtcoutry">
                   {{match.lname}}
                 </span>
                  <span class="mtcoutry">
                  {{startTime(match)}}开赛
                 </span>
                  <span class="mtcoutry">{{matchCodeCounted(match)}}</span>

                </div>
                <div class="col-20">

                  <img :src="match.hostLogo">
                  <span class="mtcoutry"> {{match.hostName}}</span>


                </div>
                <div class="col-40 scorecell">

                  <span class="score" v-if="match.hostGoal != -1">
                   {{match.hostGoal}} : {{match.guestGoal}}
                 </span><span class="score" v-else>- : -</span>
                  <span class="mtcoutry">半场 {{match.midBifen}}</span>

                </div>
                <div class="col-20">

                  <img :src="match.guestLogo">
                  <span class="mtcoutry">{{match.guestName}}</span>
                </div>

              </div>
              <div class="row rowse">
                <div class="col-20 matchesre">
                  <span>赛果</span>
                </div>
                <div class=" smodel">
              <span class="mtcoutry" v-if="match.hostGoal != -1">
                胜平负：<span v-if="match.hostGoal > match.guestGoal">主胜</span>
                 <span v-else-if="match.hostGoal < match.guestGoal">主负</span>
                 <span v-else>平</span>
              </span>
                  <span class="mtcoutry" v-else>
                胜平负：--
                </span>
                  <span class="mtcoutry" v-if="match.hostGoal != -1">半全场：<span>{{halfScore(match)}}<span
                    v-if="match.hostGoal > match.guestGoal">胜</span>
                 <span v-else-if="match.hostGoal < match.guestGoal">负</span>
                 <span v-else>平</span></span></span>
                  <span class="mtcoutry" v-else>
                半全场：--
                </span>
                </div>
                <div class=" dmodel">
                  <span class="mtcoutry">总进球数：{{totalGoal(match)}}</span>
                  <!-- <span class="mtcoutry">让球胜平负：({{match.rq}})：<span v-if="match.hostGoal - match.rq > match.guestGoal">主胜</span>
                    <span v-else-if="match.hostGoal - match.rq < match.guestGoal">主负</span>
                    <span v-else>平</span>
                   </span>-->
                </div>
              </div>
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

    </div>
    <nav class="bar bar-tab">

      <router-link to="/" class="tab-item external">
        <img class="icon" src="../assets/imgs/news-off.png">
        <!-- <span class="icon icon-home"></span>-->
        <span class="tab-label">首页</span>
      </router-link>
      <router-link to="/matches" class="tab-item external active">
        <img class="icon" src="../assets/imgs/matches.png">
        <!-- <span class="icon icon-star"></span>-->
        <span class="tab-label">赛事</span>
      </router-link>
      <!-- <router-link to="/user" class="tab-item external">
         <img class="icon" src="../assets/imgs/user-off.png">
         &lt;!&ndash; <span class="icon icon-star"></span>&ndash;&gt;
         <span class="tab-label">用户</span>
       </router-link>-->
    </nav>
  </div>
</template>

<script>
  export default {
    name: "matches",
    created() {
      var time = new Date();
      var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var day = time.getDay();
      this.currentDateStr = month + '月' + date + '日' + show_day[day];
    },
    data() {
      return {
        matchList: [],
        currentDateStr: '',
        filterName: '全部',
        isSec: true,
        isShow: false,
        isCur: false,
        matchTypes: [
          {name: "全部", isSelected: true},
        ],
      }
    },
    computed: {
      matList: function () {
        if (this.filterName === "全部") {
          return this.matchList;
        } else {
          return this.matchList.filter(i => i.lname == this.filterName);
        }
      }
    },
    methods: {
      totalGoal(match) {
        if (match.hostGoal == -1) {
          return '--';
        } else {
          return match.hostGoal + match.guestGoal;
        }

      },
      choose(index) {
        var vm = this;
        vm.matchTypes.forEach((item, index) => {
          item.isSelected = false;
        });

        vm.matchTypes[index].isSelected = true;
        /*vm.matchList = vm.matchAllList.filter(i => i.lname == this.matchTypes[index].name);*/
        vm.filterName = this.matchTypes[index].name;
        vm.filterMc();
      },
      filterMc() {
        this.isCur ? (this.isShow = false) : (this.isShow = true);
        this.isCur = !this.isCur;
      }
      ,
      matchCodeCounted(match) {
        return match.matchCode.substr(match.matchCode.length - 3);
      }
      ,
      startTime(match) {
        return match.matchTime.substring(match.matchTime.indexOf(' '), match.matchTime.length - 3);
      }
      ,
      halfScore(match) {
        var hostSocre = match.midBifen.substr(0, 1);
        var guestSocre = match.midBifen.substr(match.midBifen.length - 1, 1);
        if (hostSocre > guestSocre) {
          return '胜';
        } else if (hostSocre < guestSocre) {
          return '负';
        } else {
          return '平';
        }

      }
      ,
      infinite(done) {
        if (this.matchList.length == 0) {
          var vm = this;
          setTimeout(() => {

            vm.$jsonp('https://sports.fcaimao.com' + '/interface.do',
              {
                fn: 3103,
                callbackQuery: 'jsonpcallback'
              }).then(json => {
              /*   vm.matchList.push(...(response.data.list.filter(i=>i.hostGoal!='-1')));*/
              vm.matchList.push(...(json.list));
              var types = [];
              vm.matchList.forEach((item, index) => {
                types.push(item.lname);
              });
              var afterTypes = Array.from(new Set(types));

              afterTypes.forEach((typeItem) => {
                let type = {name: '', isSelected: false};
                type.name = typeItem;
                vm.matchTypes.push(type);
              });

              done(true);
            }).catch(err => {
              console.log(err)
            });

          }, 1500);
        } else {
          done(true);
        }

      }
      ,
      refresh(done) {
        var vm = this;

        setTimeout(() => {

          vm.$jsonp('https://sports.fcaimao.com' + '/interface.do',
            {
              fn: 3103,
              callbackQuery: 'jsonpcallback'
            }).then(json => {

            vm.matchList = [];
            vm.matchTypes.splice(1, vm.matchTypes.length - 1);

            vm.matchList.push(...(json.list));
            var types = [];
            vm.matchList.forEach((item, index) => {
              types.push(item.lname);
            });
            var afterTypes = Array.from(new Set(types));

            afterTypes.forEach((typeItem) => {
              let type = {name: '', isSelected: false};
              type.name = typeItem;
              vm.matchTypes.push(type);
            });

            done(true);
          }).catch(err => {
            console.log(err)
          });

        }, 1500);

        /*  setTimeout(() => {
            axios.get('/api/news/getmatches').then(function (response) {
              if (response.data.list.length > 0) {

                vm.matchList = [];
             /!*   vm.matchList.push(...(response.data.list.filter(i=>i.hostGoal!='-1')));*!/
                vm.matchList.push(...(response.data.list));
                done(true);

              }
            })
          }, 1500);*/
      }
      ,
    }
  }
</script>

