<template>
    <el-container class="home_container">
      <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/img/OIP-C.jpg" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 内容区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px': '200px'">
        <div class="toggle-button" @click="toggleCollapse" >|||</div>
    <el-menu
      :uniqueOpened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      >
      <!-- 一级菜单 unique-opened规定一次只能打开一个菜单-->
      <el-submenu :index="item.id +'' " v-for="item in menulist" :key="item.id" >
        <!-- 一级菜单的内容区 -->
        <template #title>
          <!-- 图片 -->
          <i :class="iconsList[item.id]" class="iconfont"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>
      <!-- 二级菜单 -->
      <el-menu-item :index=" '' + subitem.path" v-for="subitem in item.children" :key="subitem.id">
        <template #title>
          <!-- 图片 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{subitem.authName}}</span>
        </template>
      </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <!-- 右侧内容  -->
        <el-main>
          <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      // 左侧菜单数据
      menulist:[],
      iconsList:{
        '125':'el-icon-user',
        '103':'el-icon-key',
        '101':'el-icon-shopping-cart-1',
        '102':'el-icon-document',
        '145':'el-icon-s-platform'
        },
      isCollapse:false,
    }
  },
  // 生命周期函数
  created(){
    this.getMenuList()
  },
  methods:{
    logout(){
      // 点击清除window会话存储，在跳转到登录页面
      window.sessionStorage.clear();
      this.$router.push("/login"); 
    },
    async getMenuList(){
      // 解析赋值
      const {data:res} =  await this.$axios.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    toggleCollapse(){
      this.isCollapse = ! this.isCollapse
    }
  }
}
</script>

<style>
.home_container{
  height: 100%;
}
.el-menu{
  border: 0;
}

.el-header{
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header img{
  /* 垂直对齐一幅图像 */
  vertical-align: middle;
}
.el-aside{
  /* border: 0; */
  background-color: #333744;
}
.el-main{
  background-color: #edeaf1;
}
.iconfont{
  padding: 5px;
}
.toggle-button{
  width: 100%;
  background-color: #4a5064;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}


</style>