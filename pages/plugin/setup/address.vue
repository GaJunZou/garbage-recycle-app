<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">我的地址</span></block>
		</cu-custom>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item" 
			:class="modalName=='move-box-'+ index?'move-cur':''" 
			v-for="(item,index) in address" :key="index"
			 @touchstart="ListTouchStart" 
			 @touchmove="ListTouchMove" 
			 @touchend="ListTouchEnd" 
			 :data-target="'move-box-' + index">
				<!-- <view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view> -->
				<view class="content">
					<view class="text-black text-bold">{{item.name}}</view>
					<view class="text-gray">
						<text>{{item.province}}</text>
						<text>{{item.city}}</text>
						<text>{{item.area}}</text>
						<text>{{item.town}}</text>
						<text>{{item.street}}</text>
						<text>{{item.detail}}</text>
					</view>
				</view>
				<view class="action">
					<view  v-if="item.default" class='text-red text-xs cu-tag line-red'>默认</view>
					<i style="font-size: 24px;font-weight: 700;" data-target="DialogModal1" class="lg text-blue cuIcon-info" @click="showModal($event,'update',item)"></i>
				</view>
				<view class="move">
					<view class="bg-grey" @click="setDefault(item._id)">设为默认</view>
					<view class="bg-red" @click="remove(item._id)">删除</view>
				</view>
				<view></view>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		<view @tap="showModal($event,'add',0)" data-target="DialogModal1" class="cu-bar bg-white">
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
							<input placeholder="名字" name="input" v-model="addressObj.name"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">手机号码</view>
							<input placeholder="常用手机号码" name="input" v-model="addressObj.ads_phone"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">省</view>
							<input placeholder="省份" name="input" @click="openPicker" v-model="addressObj.province"></input>
							<text class='cuIcon-locationfill text-orange'></text>
						</view>
						<view class="cu-form-group">
							<view class="title">市</view>
							<input placeholder="市" name="input" @click="openPicker" v-model="addressObj.city"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">区</view>
							<input placeholder="区" name="input" @click="openPicker" v-model="addressObj.area"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">县/镇</view>
							<input placeholder="县/镇" name="input" @click="openPicker" v-model="addressObj.town"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">街道/村</view>
							<input placeholder="街道" name="input" @click="openPicker" v-model="addressObj.street"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">详细地址</view>
							<input placeholder="门牌信息" name="input" v-model="addressObj.detail"></input>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="close()">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="submit()">确定</button>
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
				visible: false,
				address:[],
				addressObj:{
					name:'',
					ads_phone:'',
					province:'',
					city:'',
					area:'',
					town:'',
					street:'',
					detail:''
				},
				opt:''
			}
		},
		onShow(){
			this.address = this.$store.state.globalUser.user.address;
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
			submit(){
				if(this.opt == 'add'){
					this.updateAddress(this.base + '/account/postUserAddAddress')
				}else if(this.opt == 'update'){
					this.updateAddress(this.base + '/account/postUserUpdateAddress');
				}
				this.hideModal();
			},
			remove(id){
				uni.request({
					url:this.base+"/account/deleteAddress/"+id+'/'+uni.getStorageSync('phone'),
					method:"GET",
					success:(res)=> {
						this.$store.commit("saveUser",res.data);
						this.address = res.data.user.address;
						uni.showToast({
							title:"删除成功！",
							duration:1000
						})
					},
					fail:(res)=> {
						uni.showToast({
							title:"删除失败！",
							duration:1000
						})
					}
					
				})
			},
			setDefault(id){
				uni.request({
					url:this.base+"/account/setDefaultAddress/"+id+'/'+uni.getStorageSync('phone'),
					method:"GET",
					success:(res)=> {
						this.$store.commit("saveUser",res.data);
						this.address = res.data.user.address;
						uni.showToast({
							title:"设置成功！",
							duration:1000
						})
					},
					fail:(res)=> {
						uni.showToast({
							title:"设置失败！",
							duration:1000
						})
					}
				})
			},
			updateAddress(url){
				uni.request({
					url:url,
					method:"POST",
					data:{
						...this.addressObj,
						phone:uni.getStorageSync('phone')
					},
					success:(res)=> {
						this.$store.commit("saveUser",res.data);
						this.address = res.data.user.address;
						uni.showToast({
							title:"设置成功！",
							duration:1000
						})
					},
					fail:(res)=> {
						uni.showToast({
							title:"设置失败！",
							duration:1000
						})
					}
				})
			},
			showModal(e,opt,val) {
				this.modalName = e.currentTarget.dataset.target;
				this.opt = opt;
				if(val != 0){
					this.addressObj = val;
				}
			},
			close(){
				this.hideModal();
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
