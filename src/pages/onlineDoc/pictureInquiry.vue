<template>
  <div>
    <top>
      <div class="middle big">图文问诊</div>
      <span slot="right" class="step" @click="submit">下一步</span>
    </top>

    <div class="inquiryPeople">
      <div class="weui-cells__title">选择就诊人</div>
      <div class="detail" @click="selectPeople">
        <div>就诊人</div>
        <div>{{data.patDetail.label}} &nbsp; &nbsp;&nbsp; &nbsp; <span class="arrow">&lt;</span></div>
      </div>
    </div>

    <div class="inquiryPeople">
      <div class="weui-cells__title">请填写病情描述</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" v-model="contain" placeholder="请输入文本" rows="3"></textarea>
          </div>
        </div>
      </div>

      <div class="inquiryPeople">
        <div class="weui-cells__title">
          上传症状照片，病例，检查单

        </div>
        <div class="weui-cells weui-cells_form" id="uploader">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="weui-uploader">
                <div class="weui-uploader__hd">
                  <p class="weui-uploader__title">图片上传</p>
                </div>
                <div class="weui-uploader__bd">
                  <ul class="weui-uploader__files" id="uploaderFiles">
                    <li class="weui-uploader__file" v-for="item of srcList">
                      <img :src="item" alt="" style="width: 70px;height: 60px"><br>
                      <span>{{data.progress+'%'}}</span>
                    </li>
                  </ul>
                  <div class="weui-uploader__input-box">
                    <input @change="upLoad" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>


  </div>


  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/business/app-header.vue'
  import Api from '../../lib/api'
  import Ajax from '../../lib/ajax'
  var token = localStorage.getItem('token')
  let data = {
    progress:null,
    patList:[],
    patDetail:{}
  }
  export default{
    components: {
      top
    },
    data(){
      return {
        src:null,
        srcList:[],
        data:data,
        patId:'',
        peopleList:[],
        contain:'',
        docId:'',
        attaIdList:[],
        index:0
      }
    },
    mounted(){
      var id = this.$route.params.id;
      this.$set(this.$data,'docId',id);
      Api('nethos.pat.compat.list',{
        token:token
      }).then(req=>{
        if(req.succ){
          var list = req.list;
          this.$set(this.$data,'peopleList',req.list)
          this.$set(this.$data,'patId',list[0].patId)
          var arr = [];
          for(var i=0;i<list.length;i++){
            var obj = {};
            obj.label = list[i].compatName;
            obj.value = list[i].compatId;
            arr.push(obj)
          };
          arr.push({
            label:'添加就诊人',
            value:0
          })
          data.patList = arr;
          data.patDetail = arr[0]
        }

      })
    },
    methods:{
      submit(){
        var list = this.peopleList;
        for(var j=0;j<list.length;j++){
          if(list[j].compatId==data.patDetail.value){
            Api('nethos.consult.info.docpic.issue',{
              docId:this.docId,
              consulterName:list[j].compatName,
              consulterIdcard:list[j].compatIdcard,
              consulterMobile:list[j].compatMobile,
              consultContent:this.contain,
              token:token,
              attaIdList:this.attaIdList
            }).then(req=>{
              if(req.succ){
                this.$set(this.$data,'contain','');
               // this.$router.push('submitSucceed');
              }else {
                weui.alert(req.msg)
              }
            })
            break;
          }
        }
      },
      goPayment(){
        this.$router.push({
          name:'payment'
        })
      },
      selectPeople(){
        var self = this;
        weui.picker(data.patList, {
          className: 'detail',
          onConfirm: function (result) {
            if(result[0].value==0){
              self.$router.push({
                name:'addUser',
                params:{
                  patId:self.patId
                }
              })
            }else {
              data.patDetail = result[0];
              console.log(data.patDetail)
            }
          },
        });
      },
      upLoad(e){

        var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
        for (var i = 0, len = files.length; i < len; ++i) {
          var file = files[i];
          if (url) {
            src = url.createObjectURL(file);
            var arr = this.srcList;
            arr.push(src)
            this.$set(this.$data,'srcList',arr);

          } else {
            src = e.target.result;
            var arr = this.srcList;
            arr.push(src)
            this.$set(this.$data,'srcList',arr);
          }
        }
        var file = e.target.files[0]
        Ajax(file,{
          progress:function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = Math.round(evt.loaded * 100 / evt.total);
              data.progress = percentComplete
              console.log('上传中'+percentComplete+"%")
            }else {
              console.log('无法计算')
            }
          }
        }).then(data=>{
          console.log(data,66666)
          if(data.succ){
            this.attaIdList[this.index] = data.obj.attaId;
            this.index++
            console.log(this.attaIdList,798798798)
            //this.$set(this.$data,'attaList',data.obj.attaId)
          }else {
            alert('上传失败')
          }
        })



      }
    }
  }
</script>
<style scoped>
  .step{
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  .inquiryPeople{
    margin-top: 10px;
    box-sizing: border-box;
  }
  .detail{
    background: white;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .selet{
    box-sizing: border-box;
    padding: 0 0 5px 10px;
  }
  .arrow{
    display: inline-block;
    transform:rotate(180deg);
    color: gray;
  }
</style>
