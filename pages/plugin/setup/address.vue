<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">我的地址</span></block>
		</cu-custom>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item" 
			:class="modalName=='move-box-'+ index?'move-cur':''" 
			v-for="(item,index) in 4" :key="index"
			 @touchstart="ListTouchStart" 
			 @touchmove="ListTouchMove" 
			 @touchend="ListTouchEnd" 
			 :data-target="'move-box-' + index">
				<!-- <view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view> -->
				<view class="content">
					<view class="text-black text-bold">文晓港</view>
					<view class="text-gray">
						<text>广东省佛山市高明区荷城街道泰和路纪念中学168号</text>
					</view>
				</view>
				<view class="action">
					<i style="font-size: 24px;font-weight: 700;" class="lg text-blue cuIcon-info"></i>
				</view>
				<view class="move">
					<view class="bg-grey">设为默认</view>
					<view class="bg-red">删除</view>
				</view>
			</view>
		</view>
		<hr>
		<view @tap="showModal" data-target="DialogModal1" class="cu-bar bg-white">
			<view class="action">
				<i style="font-size: 18px;font-weight: 400;margin-right: 10px;" 
				class="lg text-green cuIcon-roundadd"></i>
				<text class="text-black">新增地址</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加地址</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<form>
						<view class="cu-form-group">
							<view class="title">联系人</view>
							<input placeholder="名字" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">手机号码</view>
							<input placeholder="常用手机号码" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">地区</view>
							<input placeholder="地区信息" name="input" @click="openPicker"></input>
							<text class='cuIcon-locationfill text-orange'></text>
						</view>
						<view class="cu-form-group">
							<view class="title">详细地址</view>
							<input placeholder="街道门牌信息" name="input"></input>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				visible: false
			}
		},
		methods: {
			async openPicker(){
				console.log(123)
				await uni.getLocation({
				    type: 'wgs84',
					geocode: true,
				    success: function (res) {
						console.log(res) 
				    },
					fail(err) {
						console.log(err)
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
	 .picker-view {
		 
	        width: 750rpx;
	        height: 600rpx;
	        margin-top: 20rpx;
	    }
	    .item {
	        height: 50px;
	        align-items: center;
	        justify-content: center;
	        text-align: center;
	    }
</style>
