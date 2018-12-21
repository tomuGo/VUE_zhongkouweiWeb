<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <el-table :data="faces1"  style="width: 100%" :show-header="false" :highlight-current-row="true">
        <el-table-column prop="colum1" label="第一列头像" >
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.colum1.flag">
              <img :src="scope.row.colum1.url"  class="avatar"/>
            </el-radio>

          </template>
        </el-table-column>
        <el-table-column prop="colum2" label="第二列头像" >
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.colum2.flag">
            <img :src="scope.row.colum2.url"  class="avatar"/>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="colum3" label="第三列头像" >
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.colum3.flag">
            <img :src="scope.row.colum3.url"  class="avatar"/>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="colum4" label="第四列头像" >
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.colum4.flag">
            <img :src="scope.row.colum4.url"  class="avatar"/>
            </el-radio>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="updateFace">确认头像</el-button>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import ls from '@/utils/localStorage'
import {mapState} from 'vuex'
export default {
  name: 'EditAvatar',
  data() {
    return {
      faces1:[
        {"colum1":{"flag":"1",url:require("@/assets/face/1.png")},
          "colum2":{"flag":"2",url:require("@/assets/face/2.png")},
          "colum3":{"flag":"3",url:require("@/assets/face/3.png")},
          "colum4":{"flag":"4",url:require("@/assets/face/4.png")},
        },
        {"colum1":{"flag":"5",url:require("@/assets/face/5.png")},
          "colum2":{"flag":"6",url:require("@/assets/face/6.png")},
          "colum3":{"flag":"7",url:require("@/assets/face/7.png")},
          "colum4":{"flag":"8",url:require("@/assets/face/8.png")},
        },
        {"colum1":{"flag":"9",url:require("@/assets/face/9.png")},
          "colum2":{"flag":"10",url:require("@/assets/face/10.png")},
          "colum3":{"flag":"11",url:require("@/assets/face/11.png")},
          "colum4":{"flag":"12",url:require("@/assets/face/12.png")},
        },
        {"colum1":{"flag":"13",url:require("@/assets/face/13.png")},
          "colum2":{"flag":"14",url:require("@/assets/face/14.png")},
          "colum3":{"flag":"15",url:require("@/assets/face/15.png")},
          "colum4":{"flag":"16",url:require("@/assets/face/16.png")},
        },
      ],

      radio:"1",
      userInfo:'',
    };
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    updateFace(){
      let userInfo={userId:this.user.userId,
        picUrl:this.radio
      }
      axios.put('/api/users/'+this.user.userId,userInfo).then((res)=>{
        // 跳转到个人中心
        if(res.status===200){
          this.user.picUrl=this.radio;
          ls.setItem('user',this.user);
          this.$router.push({ path:'/'+this.user.userId});
        }
      });

    },
  }


}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
    float: left;
  }
  .qwe{
    float:left;display:inline;
  }
</style>
.avatar-preview-img { min-width: 200px; min-height: 200px; max-width: 50%;}
</style>
