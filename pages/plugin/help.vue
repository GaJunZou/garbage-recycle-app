<template>
	<view>
		<view class="bg-white bar">
			<view style="position: relative;display: flex;justify-content: space-between;">
				<p><text @click="back" class="cuIcon-back"></text></p>
				<p style="width: 80px;">使用帮助</p>
				<p></p>
			</view>
		</view>
		<view class="cu-chat" style="margin-top: 100px;">
			<view class="" v-for="(v,i) in help" :key="i">
				<view class="cu-item" style="padding-bottom: 5px;">
					<view class="cu-avatar radius"><text class="cuIcon-profile"></text></view>
					<view class="main">
						<view class="content shadow">
							<text>{{v[0]}}</text>
						</view>
					</view>
				</view>
				<view class="cu-item self" style="padding-bottom: 5px;">
					<view class="main">
						<view class="content shadow bg-green text-black">
							{{v[1]}}
						</view>
					</view>
					<view class="cu-avatar radius">
						<image :src="url" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:'',
				help:[]
			}
		},
		onLoad(opt){
			this.url = opt.img;
			uni.request({
				url:this.base + "/system/getSystemInfo",
				method:"GET",
				success: (res) => {
					this.help = res.data[0].help;
				},
				fail: (err) => {
					console.log(err);
				}
			});
		},
		methods:{
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.bar{
		position: fixed;
		top: 0;
		z-index: 999;
		padding-top: 50px;
		height: 100px;
		line-height: 50px;
		width: 100vw;
		background-color: #ffffff;
	}
	.bar p{
		text-align: center;
		font-weight: 700;
		font-size: 18px;
		color: #666;	
		width: 40px;
	}
	.item{
		
	}
</style>
