<template>
	<view class="">
		<cu-custom :isBack="true">
			<block slot="backText">再看看</block>
			<block slot="content"><span style="font-weight: 900;"></span></block>
		</cu-custom>
		<p style="width: 100vw;font-size: 20px;text-align: center;font-weight: 700;margin-bottom: 100px;">登录</p>
		<view class="form-log">
		    <form @submit="formSubmit">
				<view class="uni-form-item uni-column">
				    <view class="title">手机号</view>
				    <input name="input" class="uni-input" type="number" @input="valid1()" v-model="phoneNumber"/>
					<text :class="valid_1 == false ? 'valid' : 'no-valid'">请输入正确的手机号！</text>
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">密码</view>
				    <input class="uni-input" @input="valid2" type="password" name="input" v-model="password"/>
					<text :class="valid_2 == false ? 'valid' : 'no-valid'">密码由8-16位数字或字母组成!</text>
				</view>
				<view class="role ">
					<view class="title">你是:</view>
					<radio-group class="radio-group" name="radio">
						<button @click="chooseRole(1)" :class="role ==1 ? 'bg-blue' : ''" class="cu-btn round" style="width: 30vw;height:50px;margin-top: 10px;" >
							<text class="my-icon" style="font-size: 25px;line-height: 50px;">&#xe6ed;</text>普通用户
						</button>
						<button @click="chooseRole(0)" :class="role ==0 ? 'bg-orange' : ''" class="cu-btn round"  style="width: 30vw;height:50px;margin-top: 10px;">
							<text class="my-icon" style="font-size: 25px;line-height: 50px;">&#xe655;</text>回收员
						</button>
					</radio-group>
				</view>
		        <view class="uni-btn-v">
		            <button :disabled="!valid" class="cu-btn round bg-gradual-green" style="position: fixed;bottom:100px;left: 15vw;width: 70vw;height: 40px;margin-top: 20px;" form-type="submit">登录</button>
		        </view>
		    </form>
		</view>
		<!-- <button type="default" @click="gotoCollect">go to collector</button> -->
		<button @click="gotoRegist" style="position: fixed;bottom: 0;right: 0;font-size: 18px;margin: 30px 20px;" class="cu-btn">注册<text class="cuIcon-right"></text></button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				phoneNumber:null,
				password:null,
				rePassword:null,
				role:1,
				valid:false,
				valid_1:null,
				valid_2:null
			}
		},
		methods:{
			gotoRegist(value){
				uni.navigateTo({
					url: "/pages/index/regist?phone="+value,
					fail(err) {
						console.log(err)
					}
				})
			},
			gotoCollect(){
				uni.reLaunch({
					url: "/pages/collector/home",
					fail(err) {
						console.log(err)
					}
				})
			},
			formSubmit: function(e) {
				if(this.validForm() == false){
					plus.nativeUI.toast("请填写必填项！");
					return;
				}
				uni.request({
					url:this.base+'/account/postLogin',
					method:'POST',
					data:{
						phone: this.phoneNumber,
						password: this.password,
						role: this.role == 1 ? 'user' : 'collector'
					},
					success: (res) => {
						if(res.data.phone){
							uni.setStorageSync('phone',res.data.phone);
							uni.setStorageSync('role',res.data.role);
							if(res.data.role == 'user'){
								this.$store.commit('save',res.data);
								uni.reLaunch({
									url: "/pages/index/index",
								})
							}else if(res.data.role == 'collector'){
								this.$store.commit('save',res.data);
								this.gotoCollect();
							}
						}else{
							plus.nativeUI.toast("密码错误或账号不存在。");
							return;
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			validForm(){
				if(this.valid_1 == this.valid_2 == true){
					this.valid = true
				}else{
					this.valid = false
				}
			},
			chooseRole(value){
				this.role = value
			},
			valid1(){
				if(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(this.phoneNumber)==true){
					this.valid_1 = true;
					}else{
						this.valid_1 = false;
					}	
					this.validForm();
				},
			valid2(){
				if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password)==true){
					this.valid_2 = true;
				}else{
					this.valid_2 = false;
				}
				this.validForm();
			},
		}
	}
</script>

<style>
	.form-log{
		width: 70vw;
		margin: 20px auto;
	}
	.radio-group{
		color: #c8c8c8;
		display: flex;
		justify-content: space-between;
		font-weight: 400;
	}
	.radio-group  label{
		margin-top: 10px;
		/* display: none; */
	}
	.title{
		color: #999;
		margin-top: 30px;
		
	}
	.uni-btn-v{
		margin-top: 60px;
	}
	.uni-input{
		font-size:18px;
		border-bottom: 1px #999 solid;
	}
	.input-valid{
		color: #39B54A;
		border-bottom: 1px #39B54A solid;
	}
	.valid{
		display: block;
		color: #DD514C;
	}
	.no-valid{
		display: none;
	}
</style>
