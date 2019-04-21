<template>
  <div class="login">
    <el-form
      :model="loginFrom"
      status-icon
      :rules="rules2"
      ref="loginFrom"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginFrom.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginFrom.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="loginFrom.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginFrom')">提交</el-button>
        <el-button @click="resetForm('loginFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginFrom.checkPass !== "") {
          this.$refs.loginFrom.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginFrom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginFrom: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
        
          this.$axios
            .post("/api/ssmidea/checklogin.do", {
              // params: {
              username: _this.loginFrom.username,
              password: _this.loginFrom.password
              // }
            })
            .then(res => {
              console.log("登录数据：",res.data.id)
              if (res.data.id != null) {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                
               _this.$store.commit("SAVE_USERINFO",res.data)
              


                _this.$router.push('/admin')
              } else {
                this.$message.error('用户名或密码错误，请重新输入');
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
