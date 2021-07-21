<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 搜索和添加区域 -->
   <el-row :gutter='20'>
     <el-col :span="7" >
       <!-- clearable点击清空输入框的内容 -->
        <el-input 
          placeholder="请输入内容" 
          class="input-with-select"
          v-model='queryinfo.query' 
          clearable
          @clear='getUserList'>
            <template #append>
              <el-button icon="el-icon-search" @click="getUserList" ></el-button>
            </template>
         </el-input>   
     </el-col>
     <el-col :span="4">
       <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
     </el-col>
   </el-row>
   <!-- 用户列表区域 -->
   <el-table :data="userList" border stripe>
     <el-table-column type="index" label="#"></el-table-column>
     <el-table-column label="姓名" prop="username"></el-table-column>
     <el-table-column label="邮箱" prop="email"></el-table-column>
     <el-table-column label='电话' prop="mobile"></el-table-column>
     <el-table-column label='角色' prop="role_name"></el-table-column>
     <el-table-column label='状态' >
       <!-- 开启按钮区 -->
       <template v-slot='scope'>
       <el-switch v-model="scope.row.mg_state" @change="userStatuChange(scope.row)"> {{scope.row}} </el-switch>
       </template>
     </el-table-column>
     <!-- 用户操作区 -->
     <el-table-column label='操作' >
       <template v-slot='{}'>
         <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
         <el-button type="danger" icon="el-icon-share" size="mini"></el-button>
    <el-tooltip effect="dark" content="分配角色" placement="top-end" :enterable='false'>
         <el-button type="warning" icon="el-icon-delete" size="mini"></el-button>
    </el-tooltip>
       </template>
     </el-table-column>
   </el-table>
   <!-- 分页区 -->
    <div>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryinfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</el-card> 
<!-- 文本对话框 -->
<el-dialog
  title="添加用户"
  v-model="addDialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>请添加一个用户</span>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
    </span>
  </template>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryinfo:{
        query:'',
        pagenum:1,
        pagesize:2
      },
      userList:[],
      token:0,
      addDialogVisible:false
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    async getUserList(){
      // const {data:res} = await this.$axios.post('login',this.loginForm)
      const {data:res} = await this.$axios.get('users',{params:this.queryinfo})
      // console.log(res)
      if(res.meta.status !== 200) return this.$message.error('用户失败')
      this.userList =  res.data.users  ;
      this.token = res.data.token  ;
    },
    // 监听pagesize 改变事件
    handleSizeChange(newSize){
      this.queryinfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页面改变事件
    handleCurrentChange(newPages) {
      // console.log(newPages)
      this.queryinfo.pagenum = newPages;
      this.getUserList();
    },
    //  监听switch 开关状态的改变
    async userStatuChange(userinfo) {
        const {data:res} =  await this.$axios.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        // console.log(res)
        if (res.meta.status !== 200){
          res.mg_state = !res.mg_state
          return this.$message.error('改变用户状态失败')
        }
        this.$message.success('改变用户状态成功')
    }
  }
}
</script>

<style>

</style>