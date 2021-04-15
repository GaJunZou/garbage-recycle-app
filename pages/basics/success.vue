<template>
	<view>
		<view class="tips">
			<p class="cuIcon-roundcheckfill" style="font-size: 200px;color: #39B54A;"></p>
			<p style="font-size: 20px;color: #39B54A;margin: auto 60px;">订单已生成，正在通知回收员接单上门，请耐心等待！</p>
			<p @click="back()" style="font-size: 16px;color: #0da0ef;margin-top: 200px;text-decoration: underline;font-weight: 700;">返回首页>></p>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			back(){
				uni.reLaunch({
					url: '/pages/index/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
	
</script>

<style scoped>
	.tips{
		position: absolute;
		top: calc(50% - 50vw);
		text-align: center;
		width: 100%;
		padding: auto 30px;
	}
</style>
