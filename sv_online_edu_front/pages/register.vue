<template>
  <div class="main">
    <div class="title">
      <a href="/login">Login</a>
      <span>·</span>
      <a class="active"
         href="/register">Register</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm"
               :model="params">
        <el-form-item class="input-prepend restyle"
                      prop="nickname"
                      :rules="[{ required: true, message: 'Please type your nickname', trigger: 'blur' }]">
          <div>
            <el-input type="text"
                      placeholder="Nickname"
                      v-model="params.nickname" />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend restyle no-radius"
                      prop="mobile"
                      :rules="[{ required: true, message: 'Please type your mobile', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text"
                      placeholder="Phone Number"
                      v-model="params.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend restyle no-radius"
                      prop="code"
                      :rules="[{ required: true, message: 'Please type your verification code', trigger: 'blur' },{validator: checkCode, trigger: 'blur'}]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text"
                      placeholder="Verification Code"
                      v-model="params.code" />
            <i class="iconfont icon-phone" />
          </div>
          <div class="btn"
               style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:"
               type="button"
               @click="getCodeFun()"
               :value="codeTest"
               style="border: none;background-color: none">{{codeTest}}</a>
          </div>
        </el-form-item>
        <el-form-item class="input-prepend"
                      prop="password"
                      :rules="[{ required: true, message: 'Please type your password', trigger: 'blur' },{validator: checkPassword, trigger: 'blur'}]">
          <div>
            <el-input type="password"
                      placeholder="Password"
                      v-model="params.password" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button"
                 class="sign-up-button"
                 value="Register"
                 @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          Click "Register" means I agree to SvEdu's Terms of Ser-vice and Privacy Policy.
          <br>
          <a target="_blank"
             href="http://www.jianshu.com/p/c44d171298ce">Terms of Service</a>
          and
          <a target="_blank"
             href="http://www.jianshu.com/p/2ov8x3">Privacy Policy</a> 。
        </p>
      </el-form>
      <!-- More way to register -->
      <div class="more-sign">
        <h6>Other account to register</h6>
        <ul>
          <li><a id="weixin"
               class="weixin"
               target="_blank"
               href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i class="iconfont icon-weixin" /></a></li>
          <li><a id="qq"
               class="qq"
               target="_blank"
               href="#"><i class="iconfont icon-qq" /></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import registerApi from '@/api/register'

export default {
  layout: 'sign',
  data() {
    return {
      params: {
        mobile: '',
        code: '',
        nickname: '',
        password: ''
      },
      sending: true,      // The user can send a verification code if it is true.
      second: 60,        // time count down
      codeTest: 'Verification code'  // text to show in verification code 
    }
  },
  methods: {
    
    // Register
    submitRegister() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          registerApi.registerMember(this.params)
            .then(response => {
              // Notice success to register 
              this.$message({
                type: 'success',
                message: "Success to register your account!"
              })
              // Go to login
              this.$router.push({ path: '/login' })
            })
        }
      })
    },
    // Send verification code to mobile 
    getCodeFun() {
      if (!this.sending){return}
      this.$refs.userForm.validateField('mobile', (errMsg) => {
        if (errMsg == '') {
          registerApi.sendCode(this.params.mobile)
            .then(response => {
              this.sending = false
              // Time count down
              this.timeDown()
            })
        }
      })
    },
    // Time count down
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "Verification code"
        }
      }, 1000);
    },
    // Check mobile format
    checkPhone(rule, value, callback) {
      //debugger
      if (!(/^0\d{9}$/.test(value))) {
        return callback(new Error('Please type a Australian phone number start with "0"!'))
      }
      return callback()
    },
    // Check verification code format
    checkCode(rule, value, callback) {
      //debugger
      if (!(/^\d{6}$/.test(value))) {
        return callback(new Error('Please type a 6 digit number!'))
      }
      return callback()
    },
    // Check password format
    checkPassword(rule, value, callback) {
      //debugger
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value))) {
        return callback(new Error('Please type least 6-10 digit password include number and letter!'))
      }
      return callback()
    }

  }
}
</script>