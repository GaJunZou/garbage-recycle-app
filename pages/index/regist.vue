<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">登录</block>
			<block slot="content"><span style="font-weight: 900;"></span></block>
		</cu-custom>
		<p style="width: 100vw;font-size: 20px;text-align: center;font-weight: 700;margin-bottom: 100px;">注册</p>
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
				<view class="uni-form-item uni-column">
				    <view class="title">确认密码</view>
				    <input class="uni-input" @input="valid3" type="password" name="input" v-model="rePassword"/>
					<text :class="valid_3 == false ? 'valid' : 'no-valid'">两次密码不一致，请重新输入!</text>
				</view>
                <view class="uni-form-item uni-column">
                    <view class="title">性别</view>
					<radio-group class="radio-group" name="radio">
						<button @click="chooseRole(1)" :class="role ==1 ? 'bg-blue' : ''" class="cu-btn round" style="width: 30vw;height:50px;margin-top: 10px;" >
							<text style="font-size: 25px;line-height: 50px;" class="my-icon">&#xe6ed;</text>普通用户</button>
						<button @click="chooseRole(0)" :class="role ==0 ? 'bg-orange' : ''" class="cu-btn round"  style="width: 30vw;height:50px;margin-top: 10px;">
							<text style="font-size: 25px;line-height: 50px;" class="my-icon">&#xe655;</text>回收员</button>
					</radio-group>
                </view>
                <view class="uni-btn-v">
                    <button :disabled="!valid" class="cu-btn round bg-gradual-green" 
					style="position: fixed;bottom:100px;left: 15vw;width: 70vw;height: 40px;margin-top: 20px;" 
					form-type="submit">注册</button>
                </view>
            </form>
        </view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				phoneNumber:null,
				role:1,
				password:null,
				rePassword:null,
				valid:false,
				valid_1:null,
				valid_2:null,
				valid_3:null
			}
		},
		methods:{
			 formSubmit: function(e) {
				if(this.validForm() == false){
					plus.nativeUI.toast("请填写必填项！");
					return;
				}
				uni.showToast({
					title:"正在注册，请稍等~"
				})
				uni.request({
					url:this.base+'/account/postRegist',
					method:'POST',
					data:{
						phone: +this.phoneNumber,
						password: this.password,
						role: this.role == 1 ? 'user' : 'collector'
					},
					success: (res) => {
						if(res.data.role == 'user'){
							this.toNext(res.data.phone);
						}else if(res.data.role == 'collector'){
						uni.setStorageSync('phone',res.data.phone);
							uni.navigateTo({
								url: "/pages/collector/home?phone="+res.data.phone,
							})
						}
						
					},
					fail: (err) => {
						console.log(err);
						uni.hideToast();
						uni.showToast({
							title:"注册失败~",
							duration:1000
						})
					}
				})
			},
			validForm(){
				if(this.valid_1 == this.valid_2 == this.valid_3 == true){
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
			valid3(){
				if(this.password == this.rePassword){
					this.valid_3 = true;
				}else{
					this.valid_3 = false;
				}
				this.validForm();
			},
			toNext(value){
				uni.navigateTo({
					url: "/pages/index/registNext?phone="+value,
					fail(err) {
						console.log(err)
					}
				})
			}
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
		font-weight: 700;
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
