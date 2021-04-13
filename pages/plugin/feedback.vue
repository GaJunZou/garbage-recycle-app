<template>
	<view class="page">
		<view class="bg-white bar">
			<view style="position: relative;display: flex;justify-content: space-between;">
				<p><text @click="back" class="cuIcon-back"></text></p>
				<p style="width: 80px;">问题反馈</p>
				<p></p>
			</view>
		</view>
		<view style="margin-top: 120px;padding: 0 10px;">
			<p style="font-size: 18px;margin-bottom: 20px;">如果你遇到什么问题，可以尽管在这里反馈，我们会根据用户建议不断完善本app。</p>
			<textarea v-model="feedback" placeholder="写点什么吧" style="background-color: #e2e2e2;width: 100%;padding:3px 10px;border-radius: 10px;"/>
		</view>
		<button class="cu-btn bg-blue" style="width: 80%;margin: 10%;" @click="submit">提交</button>
		<view style="margin-top: 100px;">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:'',
				feedback:'',
				system:{}
			}
		},
		onLoad(opt){
			this.user = opt.phone;
			uni.request({
				url:this.base + "/system/getSystemInfo",
				method:"GET",
				success: (res) => {
					this.system = res.data[0];
				},
				fail: (err) => {
					console.log(err);
				}
			});
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			submit(){
				this.system.feedback.push([this.feedback,'']);
				uni.request({
					url:this.base + "/system/updateSystemInfo",
					method:"POST",
					data:this.system,
					success: (res) => {
						if(res.data){
							plus.nativeUI.toast("提交成功！感谢你的宝贵建议，我们会尽快处理。");
						}else{
							plus.nativeUI.toast("提交失败了，建议重试。");
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
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
		padding-bottom: 15px;
	}
</style>
