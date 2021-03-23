<template>
	<view>
		<p style="width: 100vw;font-size: 20px;text-align: center;font-weight: 700;margin: 60px auto;">还剩最后一步就可以注册成功了！</p>
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
					  <textarea 
					  maxlength="30"
					  class="uni-input" 
					  style="height: 70px;width: 100%;line-height: 25px;font-size: 15px;padding:10px 5px;background-color: #fff;" 
					  v-model="sign"/>
				</view>
		        <view class="uni-form-item uni-column">
		            <view class="title">上传一张帅气的图片作为头像！</view>
					<view class="choose-img" @tap="ChooseImage(1)">
						<text v-if="imgList.length==0" class='cuIcon-cameraadd'></text>
						<image v-else style="width: 100%;height: 100%;" @tap="ViewImage" :data-url="imgList[0]" :src="imgList[0]" mode="aspectFill"></image>
					</view>
					<p style="text-align: center;color: #0091ff;font-weight: 700;" v-if="imgList.length==1" @tap.stop="DelImg" :data-index="index">换一张</p>
		        </view>
		        <view class="uni-btn-v">
		            <button class="cu-btn round bg-gradual-green" style="width: 100%;height: 40px;margin-top:20px" form-type="submit">进入</button>
		        </view>
		    </form>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'淘气的皮蛋',
				gender:1,
				sign:"无人生哲理能急救你唯独这歌赠你无人生哲理能急救你唯独这歌赠你",
				imgList:[],
				phone:0
			}
		},
		created() {
			this.phone = uni.getStorageSync('phone');
			console.log(this.phone);
		},
		methods:{
			formSubmit: function(e) {
					// plus.nativeUI.toast("请填写必填项！");
				uni.request({
					url:this.base+'/account/postDetailData',
					method:'POST',
					data:{
						phone:this.phone,
						name:this.name,
						gender:this.gender,
						sign:this.sign,
					},
					success: (res) => {
						uni.navigateTo({
							url: "/pages/index/index"
						})
					},
					fail: (err) => {
						console.log(err);
					}
				});
				uni.uploadFile({
					url:this.base+'/account/uploadImg/'+this.phone,
					filePath:this.imgList[0],
					name:'portrait_url',
					'content-type':"multipart/form-data",
					success:(res)=> {
						console.log(res);
					},
					fail:(err)=>{
						console.log(err);
					}
				})
			},
			chooseGender(value){
				this.gender = value
			},
			DelImg(e) {
				this.ChooseImage();
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = res.tempFilePaths;
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
		margin-top: 30px;
	}
	.uni-input{
		font-size:18px;
		border-bottom: 1px #999 solid;
	}
	.choose-img{
		position: static;
		margin:30px auto;
		margin-bottom: 5px;
		width: 100px;
		height: 100px;
		font-size: 30px;
		line-height: 100px;
		text-align: center;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.choose-img .p{
		width: 100%;
		height: 20px;
		font-size: 14px;
		line-height: 20px;
	}
</style>
