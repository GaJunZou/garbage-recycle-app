<template>
	<view>
		<basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<i class="iconfont icon-home bar-icon" :class="PageCur=='basics'?'text-green':'text-gray'"></i>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">主页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<i class="iconfont icon-eye_protection bar-icon" :class="PageCur=='component'?'text-green':'text-gray'"></i>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">探索</view>
			 </view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<i class="iconfont icon-nickname bar-icon" :class="PageCur=='plugin'?'text-green':'text-gray'"></i>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">
					我的
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
		return {
				phone: 0,
				PageCur: 'basics',
				user:null,
				article:null,
				main:null
			}
		},
		created() {	
			this.phone = uni.getStorageSync('phone');
			this.goEasy.subscribe({
				channel: this.phone,
				onMessage: (message)=> {
					let content = JSON.parse(message.content);
					if(content.key == "app_notice"){
						console.log("app_notice");
						plus.nativeUI.actionSheet(
								{title:"到达通知："+content.data.msg,
								cancel:"好的",
								buttons:[{
											title:"拨打电话",
										}],
								},(e)=>{
									if(e.index == 1){
										uni.makePhoneCall({
										    phoneNumber: content.data.phone
										});
									}
								}
							);
					}
				},
				onSuccess: function () {
					console.log("Channel订阅成功。");
				},
				onFailed: function (error) {
					console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
				}
			});
		},
		onShow() {
			this.phone = uni.getStorageSync('phone');
		},
		methods: {
			NavChange: function(e) {
				console.log(e)
				this.PageCur = e.currentTarget.dataset.cur;
				if(this.PageCur == 'plugin' && this.user == null){
					uni.request({
						url:this.base+"/account/getAllInfomation/"+this.phone,
						method:"GET",
						success: (res) => {
							this.$store.commit('save',res.data)
						}
					})
				}
			}
		}
	}
</script>

<style>
	@import url("https://at.alicdn.com/t/font_2362772_fpj74x24ek.css");
	.bar-icon{
		font-size: 30px;
		font-weight: 700;
	}
</style>
