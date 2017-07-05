<template>
    <div id="onlinepage">
      <top>
        <div class="middle big">网络问诊</div>
        <span slot="right" class="step" @click="goMyInquiry">我的问诊</span>
      </top>
      <div class="header">
        <div class="weui-navbar__item" id="showPicker" @click="allOffices">
          {{administrative}}
        </div>
        <div class="weui-navbar__item" @click="inquiry">
          {{modality}}
        </div>
        <div class="weui-navbar__item" @click="sort">
          {{rank}}
        </div>
      </div>
      <scroller :on-infinite="infinite"  style="top: 100px"  >
        <div class="wrap">
          <div class="contain">
            <div class="list" v-for="item of docList" @click="goDocCard(item.docId)">
              <div class="itemImg">
                <img :src="item.docAvatar" alt="">
              </div>
              <div class="itemContain">
                <ul>
                  <li>{{item.docName}} &nbsp; &nbsp;&nbsp;<span class="fontCol">{{item.docTitle}}</span></li>
                  <li><span class="fontCol">{{item.docDeptName}}</span></li>
                  <li><span class="fontCol">{{item.docPicConsultStatus?'图文问诊':''}} &nbsp; &nbsp;&nbsp;{{item.docVideoConsultStatus?'视频问诊':''}}</span></li>
                </ul>
              </div>
              <div class="itemXing"><span class="fontCol">
              {{item.docScoure}}星&nbsp;&nbsp;&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </scroller>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/business/app-header.vue'
    import Api from '../../lib/api.js'
    let data = {
      officesList:[],
      docList:[],
      num:10,
      administrative:'全部科室',
      modality:'全部问诊形式',
      rank:'默认排序'
    }
    export default{
        components: {
            top
        },
        data(){
            return {
              officesList:[],
              docList:[],
              num:10,
              administrative:'全部科室',
              modality:'全部问诊形式',
              rank:'默认排序'
            }
        },
        mounted(){

          Api('nethos.system.gbdept.list').then(req=>{
            if(req.succ){
              this.$set(this.$data,'officesList',req.list)
            }
          })
        },
      methods:{
        goMyInquiry(){
         this.$router.push('myInquiry')
        },
        goDocCard(id){
          this.$router.push({
            name:'docCard',
            params:{
              id:id
            }
          })
        },
        infinite (done){
          setTimeout(() => {
            console.log(this.num);
            Api('nethos.doc.list',{
              pageNo:1,
              pageSize:this.num
            }).then(req=>{
              console.log(req,8888888)
              if(req.succ){
                if(req.list.length<8){
                  this.$set(this.$data,'docList',req.list);
                  return false
                }else {
                  for(var i=0;i<req.list.length;i++){
                      this.docList.push(req.list[i]);
                  }
                  this.num+=10;
                  done()
                }
              }
            })

          }, 19)
        },
        allOffices(){
          var arr = [];
          for(let i=0;i<this.officesList.length;i++){
            var obj  = {};
            obj.children = []
            obj.value = this.officesList[i].gbDeptCode;
            obj.label = this.officesList[i].gbDeptName;
            var  Arrchildren = [];
            if(this.officesList[i].sonGbDeptList){
              var item = this.officesList[i].sonGbDeptList;
              for(var j=0;j<item.length;j++){
                var objChildren = {};
                objChildren.value = item[j].gbDeptCode;
                objChildren.label = item[j].gbDeptName;
                Arrchildren.push(objChildren)
              }
            }
            obj.children = Arrchildren;
            arr.push(obj);
          }
          var self = this;

          weui.picker(arr,{
            onConfirm: function (result) {
              if(result.length==1){
                self.num = 10;
                self.administrative = result[0].label;
                Api('nethos.doc.list',{
                  gbDeptCode:result[0].value
                }).then(req=>{
                  if(req.succ){
                    self.docList = req.list
                  }
                })
              }else {
                self.num = 10;
                self.administrative = result[1].label;
                Api('nethos.doc.list',{
                  gbDeptCode:result[1].value
                }).then(req=>{
                  if(req.succ){
                    self.docList = req.list
                  }
                })
              }
            },
            id: 'showPicker',
            depth:2
          })
        },
        inquiry(){
          var self = this;
          weui.picker([
            {
              label: '全部问诊形式',
              value: 0
            },
            {
              label: '视频问诊',
              value: 1
            },{
              label: '图文问诊',
              value: 2
            }
          ],{
            onConfirm: function (result) {
              if(result[0]==2){
                self.modality = result[0].label
                Api('nethos.doc.list',{
                  docPicConsultStatus:true
                }).then(req=>{
                  if(req.succ){
                    self.docList = req.list
                  }
                })
              }else if(result[0]==1){
                self.modality = result[0].label
                Api('nethos.doc.list',{
                  docVideoConsultStatus:true
                }).then(req=>{
                  if(req.succ){
                    self.docList = req.list
                  }
                })
              }

            },
            defaultValue: [0],
          })
        },
        sort(){
          var self = this;
          weui.picker([
            {
              label: '默认排序',
              value: 0
            },
            {
              label: '按好评排序',
              value: 'docScoure'
            }
          ],{
            onConfirm: function (result) {
              if(result[0]=='docScoure'){
                self.num = 10;
                self.rank = result[0].label
                Api('nethos.doc.list',{
                  sort:'docScoure.desc'
                }).then(req=>{
                  if(req.succ){
                    self.docList = req.list
                  }
                })
              }else {
                self.num = 10;
                self.rank = result[0].label
                Api('nethos.doc.list',{
                  pageNo:1,
                  pageSize:self.num
                }).then(req=>{
                  if(req.succ){
                    console.log(req.list)
                    self.docList = req.list

                  }
                })
              }
            },
            defaultValue: [0],
          })
        }
      }
    }
</script>
<style scoped>
  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .step{
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  .wrap{
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .contain{
    overflow:auto;
    flex: 1;
  }
  .header{
    display: flex;
    background: white;
    border: 1px solid gainsboro;

  }
  .list{
    border-bottom: 1px solid gainsboro;
    background: white;
    display: flex;
    align-items: center;
    padding: 10px 10px;
    justify-content: space-between;
  }
  .itemImg img{
    width: 50px;
    height: 50px;

  }
  .itemContain{

  }
  .itemXing{

  }
  .fontCol{
    color: gray;
  }
</style>
