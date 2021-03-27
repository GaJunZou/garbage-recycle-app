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
					<view class="text-gray text-overhidden">
						<text>{{item.province}}</text>
						<text>{{item.city}}</text>
						<text>{{item.area}}</text>
						<text>{{item.town}}</text>
						<text>{{item.street}}</text>
						<text>{{item.detail}}</text>
					</view>
					<view class="text-orange">
						<text>联系电话：{{item.ads_phone}}</text>
					</view>
				</view>
				<view class="action">
					<view  v-if="item.default" style="border: 2px;" class='text-xs cu-tag line-blue round'>默认</view>
					<!-- <i style="font-size: 24px;font-weight: 700;"  class="lg text-blue cuIcon-info" @click="setDefault(item._id)></i> -->
				</view>
				<view class="move">
					<view class="bg-grey" data-target="DialogModal1" @click="showModal($event,'update',item)">编辑</view>
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
					<text v-if="opt=='add'" class="content">新增地址</text>
					<text v-if="opt=='update'" class="content">修改地址</text> 
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<form class="text-placeholder">
						<view class="cu-form-group">
							<view class="title">联系人</view>
							<input placeholder="名字" name="name" v-model="form.name"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">手机号码</view>
							<input placeholder="常用手机号码" name="phone" v-model="form.ads_phone"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">省</view>
							<input placeholder="省份" name="province" @click="openPicker" v-model="form.province"></input>
							<text @click="autoLocation" class='cuIcon-locationfill text-orange'></text>
						</view>
						<view class="cu-form-group">
							<view class="title">市</view>
							<input placeholder="市" name="city" @click="openPicker" v-model="form.city"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">区</view>
							<input placeholder="区" name="town" @click="openPicker" v-model="form.area"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">县/镇</view>
							<input placeholder="县/镇" name="street" @click="openPicker" v-model="form.town"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">街道/村</view>
							<input placeholder="街道" name="input" @click="openPicker" v-model="form.street"></input>
							<text class=''></text>
						</view>
						<view class="cu-form-group">
							<view class="title">详细地址</view>
							<input placeholder="门牌信息" name="detail" v-model="form.detail"></input>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button v-if="opt == 'update'" class="cu-btn line-blue text-blue" @tap="setDefault(form.id)">设为默认</button>
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
				form:{
					name:'',
					ads_phone:'',
					province:'',
					city:'',
					area:'',
					town:'',
					street:'',
					detail:'',
					id:null
				},
				opt:''
			}
		},
		onShow(){
			this.address = this.$store.state.role.user.address;
		},
		methods: {
			async openPicker(){
				// console.log(123)
				// await uni.getLocation({
				//     type: 'wgs84',
				// 	geocode: true,
				//     success: function (res) {
				// 		console.log(res) 
				//     },
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
			},
			submit(){
				if(this.opt == 'add'){
					this.updateAddress(this.base + '/account/postUserAddAddress')
				}else if(this.opt == 'update'){
					this.updateAddress(this.base + '/account/postUserUpdateAddress',);
				}
				this.hideModal();
			},
			remove(id){
				console.log(id);
				uni.request({
					url:this.base+"/account/deleteAddress/"+id+'/'+uni.getStorageSync('phone'),
					method:"GET",
					success:(res)=> {
						console.log(res);
						this.$store.commit("save",res.data);
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
			autoLocation(){
				plus.nativeUI.showWaiting("定位中...",{background : "#272822",padlock:true});
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: (res)=> {
						plus.nativeUI.closeWaiting("定位中...");
				        this.form.province = res.address.province == null ? '' : res.address.province;
						this.form.city = res.address.city == null ? '' : res.address.city;
						this.form.area = res.address.district == null ? '' : res.address.district;
						this.form.town = res.address.street == null ? '' : res.address.street;
						this.form.street = res.address.poiName == null ? '' : res.address.poiName;
						this.form.detail = ''; 
						console.log(this.form);
				    },
					fail: (err) => {
						console.log(err);
					}
				});
			},
			setDefault(id){
				uni.request({
					url:this.base+"/account/setDefaultAddress/"+id+'/'+uni.getStorageSync('phone'),
					method:"GET",
					success:(res)=> {
						this.$store.commit("save",res.data);
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
						...this.form,
						phone:uni.getStorageSync('phone')
					},
					success:(res)=> {
						console.log(res.data);
						this.$store.commit("save",res.data);
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
					this.form = JSON.parse(JSON.stringify(val));
					this.form.id = val._id;
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
	.text-overhidden{
		text-overflow: ellipsis;
		overflow: hidden;
		/* 3. 文字溢出的时候用省略号来显示 */
		text-overflow: ellipsis;
		 display: -webkit-box;
		/* 限制在一个块元素显示的文本的行数 */
		-webkit-line-clamp: 1;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
	}
</style>
