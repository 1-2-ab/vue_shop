<template>
  <div class="login_bc">
    <div class="login_box">
      <!-- 头像区 -->
        <div class="avstar_box">
            <img src="../assets/logo.png" alt="">
        </div>
       <div>
          <!-- 内容表单区 -->
          <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
        <el-form label-width='0px' class="login_form" :model="loginForm" :rules="rules" ref="loginFormRef">
          <!-- 用户名 -->
          <el-form-item prop="username" >
            <el-input prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input prefix-icon='el-icon-lock' v-model="loginForm.password"
 placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item>
            <div class="btns">
              <el-button type="primary"  @click="login">登录</el-button>
            <el-button type="info"  @click="resetLoginForm">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // 这是登录表单的数据绑定对象
      loginForm:{
        username:"admin",
        password:"123456"
      },
      // 这是表单的验证是否合法
      rules:{
        username:[
          {required:true,message:"请输入用户账号",trigger:'blur'},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password:[
          {required:true,message:"请输入用户密码",trigger:'blur'},
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ]
      }
    } 
  },
  methods:{
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate(async valid =>{
      // this.$refs.loginFormRef.validate(async valid =>{
        // console.log(valid)
        if(!valid) return;
        // const result =await this.$axios.post("login",this.loginForm)
        // console.log(result)
        const {data:res} = await this.$axios.post('login',this.loginForm)
        console.log(res)
        if(res.meta.status !== 200) return this.$message.error("登录失败") 
        this.$message.success('登录成功')
        // 1.将登陆成功之后的token 保存到客户端sessionStorage 中
        //  1.1 项目中出了登录之外的其他api接口 必须在登录之后才能访问
        //  1.2 token 只应在当前网站打开期间生效 所以将token保存在sessionstorage中
        window.sessionStorage.setItem("token",res.data.token)
        //  通过编程式导航栏跳转到后台主页 路由地址是 /home
        this.$router.push("/home")
      })
    }
  }
}
</script>

<style scoped>
  .login_bc{
    background-color: #00f;
    height: 100%; 
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avstar_box{
   width: 130px;
   height: 130px;
   border: 1px solid #ccc;
   border-radius: 50%;
   padding: 10px;
   box-shadow: 0 0 10px #ddd;
   position: absolute;
   left: 50%;
   transform: translate(-50%,-50%);
   background-color: #fff;
  }
  .avstar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>