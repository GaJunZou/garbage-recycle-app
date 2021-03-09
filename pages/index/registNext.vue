<template>
	<view>
		<p style="width: 100vw;font-size: 20px;text-align: center;font-weight: 700;margin: 90px auto;">还剩最后一步就可以注册成功了！</p>
		<view class="form-log">
		    <form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
				    <view class="title">你叫什么名字？</view>
				    <input name="input" class="uni-input" maxlength="7" v-model="name"/>
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">你的性别是？</view>
				      <radio-group class="radio-group" name="radio">
						<button @click="chooseGender(1)" :class="gender ==1 ? 'bg-gradual-blue' : ''" class="cu-btn round" style="width: 30vw;height:50px;margin-top: 10px;" >男<text class="cuIcon-male"></text></button>
						<button @click="chooseGender(0)" :class="gender ==0 ? 'bg-gradual-pink' : ''" class="cu-btn round"  style="width: 30vw;height:50px;margin-top: 10px;">女<text class="cuIcon-female"></text></button>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">写下你酷酷的签名吧！</view>
					  <textarea class="uni-input" style="height: 100px;width: 100%;border:1rpx #999 solid;" v-model="sign"/>
				</view>
		        <view class="uni-form-item uni-column">
		            <view class="title">上传一张帅气的图片作为头像！</view>
					<view class="">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length=1">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
		        </view>
		        <view class="uni-btn-v">
		            <button :disabled="!valid" class="cu-btn round bg-gradual-green" style="width: 100%;height: 40px;margin-top:20px;" form-type="submit">进入</button>
		        </view>
		    </form>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:null,
				gender:null,
				sign:null,
				imgList:[]
			}
		},
		methods:{
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
				if(this.valid_1 == this.valid_2 == this.valid_3 == true){
					this.valid = true
				}else{
					this.valid = false
				}
			},
			chooseGender(value){
				this.gender = value
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
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
