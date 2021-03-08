<template>
	<view class="">
		<cu-custom :isBack="true">
			<block slot="backText">再看看</block>
			<block slot="content"><span style="font-weight: 900;"></span></block>
		</cu-custom>
		<p style="width: 100vw;font-size: 20px;text-align: center;font-weight: 700;">登录</p>
		<view class="form-log">
		    <form @submit="formSubmit" @reset="formReset">
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
		        <view class="uni-btn-v">
		            <button :disabled="!valid" class="cu-btn round bg-gradual-green" style="width: 100%;height: 40px;margin-top: 20px;" form-type="submit">注册</button>
		        </view>
		    </form>
		</view>
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
				valid:false,
				valid_1:null,
				valid_2:null
			}
		},
		methods:{
			gotoRegist(){
				uni.navigateTo({
					url: "/pages/index/regist",
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
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			validForm(){
				if(this.valid_1 == this.valid_2 == true){
					this.valid = true
				}else{
					this.valid = false
				}
			},
			chooseGender(value){
				this.gender = value
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
