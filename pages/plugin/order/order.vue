<template>
	<view class="">
<!-- 		<div style="width: 100%;height: 40px;position: fixed;top: 0;background-color: #f1f1f1;">
		</div> -->
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">我的订单</span></block>
		</cu-custom>
		<ul class="tab-title">
			<li v-for="(v,i) in tabTitle" :key="i" :data-current="i" @tap="tabChange" :class="currentTab == i ? 'current-tab' : ''">{{v}}</li>
		</ul>
		<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 interval="5000" duration="500"  indicator-active-color="orange" :current="currentTab" @change="changeSwiper($event)">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<div class="tab-item-box">
					<div class="tab-item" v-for="(v,i) in item.titleList" :key="i">
						<view style="float: left;width: 100%;margin: 5px auto;" v-for="(vv,ii) in v.wastes" :key="ii">
							<view style="float: left;width: 81px;height: 81px;">
								<image style="width: 100%;height: 100%;border-radius: 6px;" src="../../../static/11.png" mode=""></image>
							</view>
							<view style="float: left;height: 66px;margin-left: 10px;">
								<big><strong>{{vv.waste_name}}</strong></big>
								<p>价格： <text>{{vv.price}}/个</text></p>
								<p>数量 X <text>{{vv.number}}</text></p>
							</view>
							<view style="float: right;margin-right: 10px;">
								<p>合计：{{(vv.price*vv.number*100).toFixed(2)/100}}</p>
							</view>
						</view>
						<view style="float: left;width: 100%;margin-top: 10px;">
							<p v-if="index==0" style="float: left;">
								回收员预计在 <b class="text-orange" style="font-size: 16px;">15:31</b>分到达
							</p>
							<p v-if="index==1" style="float: left;">
								该订单于<b class="text-green" style="font-size: 16px;">{{v.complete_time}}</b>完成
							</p>
							<p v-if="index==2" style="float: left;">
								该订单于<b class="text-green" style="font-size: 16px;">{{v.evaluate_time}}</b>评价
							</p>
							<p style="float: right;margin-right: 10px;">总计：<b class="text-orange" style="font-size: 22px;line-height: 16px;">{{v.waste_price_all}}</b>元</p>
						</view>
						<view style="float: left;width: 100%;margin-top: 10px;font-size: 15px;">
							<p> <text class="cuIcon-locationfill">地址：</text>
								{{v.address.province}}{{v.address.city}}{{v.address.area}}{{v.address.town}}{{v.address.street}}{{v.address.detail}}
							</p>
						</view>
						<view class="btn-group">
							<button v-if="index==2" @click="removeOrder(v)" class="cu-btn round bg-red">删除订单</button>
							<button v-if="index==0" @click="sureComplete(v)" class="cu-btn round bg-green">确认完成</button>
							<button v-if="index==1" @click="toEvaluate(v)" class="cu-btn round bg-green">去评价</button>
							<button v-if="index==0 && v.collector_phone == ''" @click="cancelOrder(v)" class="cu-btn round lines-red">取消订单</button>
							<button @click="moreInfo(v,index)" style="float: left;margin: 10px 0;" class="cu-btn round lines-grey">更多信息</button>
						</view>
					</div>
						<div style="height: 140px;text-align: center;">没有更多了~</div>
					</div>
			</swiper-item>
		</swiper>
		
		<view @click="hideModal()" class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view @click.stop="" class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">
						<text v-if="more.status == 0">
							<text v-if="more.collector_name == ''">未接单</text>
							<text v-if="more.collector_name != ''">已接单</text>
						</text>
						<text v-if="more.status == 1">待评价</text>
						<text v-if="more.status == 2">已完成</text>
					</view>
					<view class="action text-blue" @tap="hideModal"><text class="cuIcon-close text-red text-blod"></text></view>
				</view>
				<view class="padding-sm">
					<form class="form">
						<view class="cu-form-group">
							<view class="title">订单ID</view>
							<input disabled="true" name="name" v-model="more._id"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">上门时间</view>
							<input style="color: #39B54A;" name="name" v-model="more.start_time"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">截止时间</view>
							<input style="color: #39B54A;" name="name" v-model="more.end_time"></input>
						</view>
						<view v-if="more.collector_name != ''" class="cu-form-group">
							<view class="title">接单人</view>
							<input disabled name="name" v-model="more.collector_name"></input>
						</view>
						<view v-if="more.collector_name != ''" class="cu-form-group">
							<view class="title" >手机号码</view>
							<input disabled name="name" v-model="more.collector_phone"></input>
							<text @click="autoLocation" class='cuIcon-dianhua text-green'></text>
						</view>
						<view v-if="more.collector_name != ''" class="cu-form-group">
							<view class="title">留言</view>
							 <textarea style="text-align: left;height: 50px;" v-model="more.note" />
						</view>
						<view v-if="more.status==2 || more.status==1" class="cu-form-group">
							<view class="title" >完成时间</view>
							<input disabled name="name" v-model="more.complete_time"></input>
						</view>
						 <view v-if="more.status==2" class="cu-form-group">
							 <view class="title">服务态度</view>
							 <view class="title" style="width: 200px;">
								 <slider style="margin: 0;" :value="more.evaluate_attitude" step="1" block-size="16" block-color="#007aff" show-value/>
							 </view>
						 </view>
						 <view v-if="more.status==2" class="cu-form-group">
							 <view class="title">上门速度</view>
							 <view class="title" style="width: 200px;">
								 <slider style="margin: 0;" :value="more.evaluate_speed" step="1" block-size="16" block-color="#007aff" show-value/>
							 </view>
						 </view>
						<view v-if="more.status==2" class="cu-form-group">
							<view class="title">评价内容</view>
							<textarea style="text-align: left;height: 50px;" v-model="more.evaluate_content" />
						</view>
						<view v-if="more.status==2" class="cu-form-group">
							<view class="title">评价时间</view>
							<input style="color: #39B54A;" name="name" v-model="more.evaluate_time"></input>
						</view>
					</form>
					
					<p style="height: 30px;"></p>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='evaluate'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<form>
						<view class="cu-form-group">
							 <view class="title">服务态度</view>
							 <view class="title" style="width: 200px;">
								 <slider style="margin: 0;" @change="sliderChange($event,0)" step="1" value="80" block-size="16" block-color="#007aff" show-value/>
							 </view>
						 </view>
						 <view class="cu-form-group">
							 <view class="title">上门速度</view>
							 <view class="title" style="width: 200px;">
								 <slider style="margin: 0;" @change="sliderChange($event,1)" step="1" value="80" block-size="16" block-color="#007aff" show-value/>
							 </view>
						 </view>
						<view class="cu-form-group">
							<view class="title">评价</view>
							<textarea v-model="evaluate.evaluate_content" style="text-align: left;height: 50px;" />
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="sureEvaluate">确定</button>
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
				modalName:'',
				tabTitle:['进行中','待评价','已完成'],
				currentTab:0,
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				},
				swiperList: [{
					titleList:[]
				},{
					titleList:[]
				},{
					titleList:[]
				}],
				more:{},
				evaluate:{
					order_id:'',
					evaluate_attitude:'80',
					evaluate_speed:'80',
					evaluate_content:'',
					evaluate_time:'',
					status:2
				}
			}
		},
		computed:{
			start(){
				return new Date(this.more.start_time).format('MM-dd  hh:mm')
			},
			end(){
				return new Date(this.more.end_time).format('MM-dd  hh:mm')
			}
		},
		created(){
			this.getData();
			uni.getSystemInfo({
				    success: (res)=> {
						this.tabStyle.minHeight = res.screenHeight - res.statusBarHeight - 60 + 'px';
				    }
				});
		},
		methods:{
			getData(){
				this.swiperList=[{
					titleList:[]
				},{
					titleList:[]
				},{
					titleList:[]
				}],
				uni.request({
					url: this.base+'/order/user/getUserOrder/'+uni.getStorageSync('phone'),
					method: 'GET',
					success: res => {
						res.data[0].order_info.forEach((v,i)=>{
							if(v.status == 0){
								this.swiperList[0].titleList.push(v)
							}						
							else if(v.status == 1){
								this.swiperList[1].titleList.push(v)
							}						
							else if(v.status == 2){
								this.swiperList[2].titleList.push(v)
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.currentTab=index;	
			},
			changeSwiper(e){
				this.currentTab = e.detail.current;
				e.detail.current = 2;
				console.log(e);
			},
			moreInfo(item,index){
				this.modalName='bottomModal';
				this.more = item;
				console.log(this.more);
				if(index == 0){
					
				}
			},
			removeOrder(v){
				this.cancelOrder(v);
			},
			cancelOrder(v){
				uni.request({
					url:this.base+"/order/user/delete",
					method:"POST",
					data:{
						belong_phone:uni.getStorageSync('phone'),
						id:v._id
					},
					success: (res) => {
						this.getData()
					}
				})
			},
			toEvaluate(v){
				this.modalName = 'evaluate';
				this.evaluate = {
					order_id:'',
					evaluate_attitude:'80',
					evaluate_speed:'80',
					evaluate_content:'',
					evaluate_time:'',
					status:2
				};	
				this.evaluate.order_id = v._id;
			},
			async sureEvaluate(){
				console.log(this.evaluate);
				this.evaluate.evaluate_time = new Date();
				await this.updateOrder(this.evaluate);
				uni.showToast({
					title:"评论成功！",
					duration:1000,
					success: () => {
						this.hideModal();
					}
				})
			},
			async sureComplete(v){
				await this.updateOrder({
					order_id:v._id,
					status:1,
					complete_time:new Date()
				})
				uni.showToast({
					title:"已流转！",
					duration:1000,
				})
			},
			sliderChange(e,i){
				if(i == 0){
					this.evaluate.evaluate_attitude = e.detail.value
				} else if(i == 1){
					this.evaluate.evaluate_speed = e.detail.value
				}
				console.log(this.evaluate);
			},
			updateOrder(order){
				uni.request({
					url:this.base+"/order/user/update",
					method:"POST",
					data:{
						belong_phone:uni.getStorageSync('phone'),
						...order
					},
					success: (res) => {
						this.getData();
					}
				})
			},
			hideModal(){
				this.modalName = ''
			}
		}
	}
</script>

<style>
	.tab-title{
		height: 30px;		
		width: 100vw;
		font-size: 20px;
		text-decoration: none;
		list-style: none;
		padding: 0;
		margin-bottom: 10px;
	}
	.tab-title > li{
		float: left;
		text-align: center;
		width: 30vw;
		height: 40px;
		line-height: 40px;
		padding: 0;
		margin-left:2.5vw;
	}
	.current-tab{
		font-weight: 700;
		color: #f37b1d;
	}
	.tab-item-box{
		width: 100%;
		height: 100vh;
		overflow: scroll;
	}
	.tab-item{
		overflow: scroll;
		width: 90vw;
		padding:1vw 3vw;
		margin: 12px auto;
		height: auto;
		border-radius: 10px;
		background-color: #fdfdfd;
		/* border-bottom: 12px #eee solid; */
	}
	.btn-group{
		width: 100%;
	}
	.btn-group>button{
		float: right;
		margin: 10px 0;
		margin-left: 10px;
	}
	
	.form>.cu-form-group{
		min-height: 42px;
	}
</style>
