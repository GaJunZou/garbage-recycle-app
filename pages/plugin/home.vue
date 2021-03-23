<template name="plugin">
	<view>
		 <scroll-view scroll-y="true" class="page">
			 <view style="padding-top: 0px;color: white;" class="padding radius shadow-blur bg">
				 <view class="top-set" >
				 	 <i @click="setup()" class="iconfont icon-setting icon-set" style="color: #FFFFFF;"></i>
				  </view>
				  <view class="header">
				 	 <view class="head">
				 		<image src="F:\毕设\exp_recycle\static\8b5RLQjnLu65hvnLT3W9DnjN.png" mode=""></image>
				 	 </view>
				 	 <view class="text">
				 		<p @click="gotoLogin" style="font-size: 16px;font-weight: 700;margin: 10px 20px;">{{user.name}}</p>
				 		<p style="font-size: 14px;font-weight: 400;margin: 10px 20px;">{{user.phone}}</p>
				 	 </view>
				  </view>
				  <p style="margin: 15px 20px;font-size: 13px;">
				 	{{user.user.sign}}
				  </p>
				  <view class="honor">
					 <view class="score">
						<p style="text-align: center;font-size: 18px;font-weight: 400;margin: 5px 0 0 10px;">我的积分</p>
						<p style="text-align: center;font-size: 22px;font-weight: 700;margin: 5px;">288</p>
					 </view>
					 <view class="title">
						<p style="text-align: center;font-size: 18px;font-weight: 400;margin: 5px 0 0 10px;">我的称号</p>
						<p style="text-align: center;font-size: 18px;font-weight: 700;margin: 5px;">环境卫士</p>
					 </view>
				  </view>
			 </view>
			 <view style="margin-top: 25px;">
			 	<view class="cu-bar bg-white" @click="openOrder">
			 		<view class="action">
			 			<text class="text-black">我的订单</text> 
			 		</view>
			 		<view class="content text-bold">
			 			
			 		</view>
			 		<view class="action">
			 			<text class="text-grey">
			 				<i class="icon-next iconfont icon-right"></i>
			 			</text>
			 		</view>
			 	</view>
				<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
			 	<view class="cu-bar bg-white">
			 		<view class="action">
			 			<text class="text-black">我的礼券</text> 
			 		</view>
			 		<view class="content text-bold">
			 			
			 		</view>
			 		<view class="action">
			 			<text class="text-grey">
			 				<i class="icon-next iconfont icon-right"></i>
			 			</text>
			 		</view>
			 	</view>
				<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
			 	<view class="cu-bar bg-white">
			 		<view class="action">
			 			<text class="text-black">使用帮助</text> 
			 		</view>
			 		<view class="content text-bold">
			 			
			 		</view>
			 		<view class="action">
			 			<text class="text-grey">
			 				<i class="icon-next iconfont icon-right"></i>
			 			</text>
			 		</view>
			 	</view>
				<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
			 	<view class="cu-bar bg-white">
			 		<view class="action">
			 			<text class="text-black">问题反馈</text> 
			 		</view>
			 		<view class="content text-bold">
			 			
			 		</view>
			 		<view class="action">
			 			<text class="text-grey">
			 				<i class="icon-next iconfont icon-right"></i>
			 			</text>
			 		</view>
			 	</view>
				<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
			 	<view class="cu-bar bg-white">
			 		<view class="action">
			 			<text class="text-black">关于易收购</text> 
			 		</view>
			 		<view class="content text-bold">
			 			
			 		</view>
			 		<view class="action">
			 			<text class="text-grey">
			 				<i class="icon-next iconfont icon-right"></i>
			 			</text>
			 		</view>
			 	</view>
			 </view>
		 </scroll-view>
	</view>
</template>

<script>
	export default {
		name: "plugin",
		props:{
			user:{}
		},
		data() {
			return {

			}
		},
		methods: {
			openOrder() {
				console.log(this.user);
				uni.navigateTo({
					url: "/pages/plugin/order/order"
				})
			},
			setup(){
				uni.navigateTo({
					url: "/pages/plugin/setup/setup",
					fail(err) {
						console.log(err)
					}
				})
			},
			gotoLogin(){
				uni.navigateTo({
					url: "/pages/index/login",
					fail(err) {
						console.log(err)
					}
				})
			}
		}
}
</script>

<style>
	*{
		padding:0;
		margin:0;
	}
	.page {
		height: 100vh;
	}
	.bg{
		background-image: url(../../static/sea.png);
		background-size: cover;
		background-repeat: no-repeat;
	}
	.top-set{
		position: relative;
		width: 100vw;
		height: 30px;
		top: 40px;
	}
	.top-set .icon-set{
		color: #333;
		float: right;
		margin: 5px;
		font-weight: 700;
		font-size: 40px;
	}
	.header{
		float: left;
		width: 100vw;
		height: 100px;
	}
	.header .head{
		float: left;
		width: 100px;
		height: 100px;
		padding: 10px;
	}
	.header .head > image{
		width: 100%;
		height: 100%;
		margin-left: 20px;
		border-radius: 50%;
		border:1px #666 solid
	}
	.header .text{
		float: left;
		height: 100px;
		padding: 10px;
	}
	.honor{
		height:70px;
		width: 100vw;
		margin: 0 5px;
		margin-top: 20px;
		position: relative;
		top: 15px;
	}
	.honor .score{
		float: left;
		border-radius: 10px;
		background-image: linear-gradient(45deg, #ffc800, #ff5558);
		/* color: #ffffff; */
		height: 100%;
		width: 41%;
		margin-left: 3%;
	}
	.honor .title{
		float: left;
		border-radius: 10px;
		/* background-color: #ffb205; */
		background-image: linear-gradient(45deg, #0081ff, #1ec7da);
		height: 100%;
		width: 41%;
		margin-left: 3%;
	}
	.icon-right{
		font-weight: 900;
		font-size: 18px;
	}
</style>
