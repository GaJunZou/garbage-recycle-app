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
				PageCur: 'basics'
			}
		},
		created() {
			uni.request({
				url:"http://127.0.0.1:8081/b",
				method:"POST",
			  success: (res) => {
					console.log(res);
				}
			})
		},
		methods: {
			NavChange: function(e) {
				console.log(e)
				this.PageCur = e.currentTarget.dataset.cur
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
