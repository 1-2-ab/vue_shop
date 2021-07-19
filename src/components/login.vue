<template>
  <div class="login_bc">
    <div class="login_box">
      <!-- 头像区 -->
        <div class="avstar_box">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- 内容表单区 -->
        <el-form label-width='80px'>
          <el-form-item label="活动名称">
            <el-input></el-input>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {

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

</style>