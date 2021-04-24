<template>
	<view class="all">
		<view class="bg-white bar">
			<view style="position: relative;display: flex;justify-content: space-between;">
				<p><text @click="back" class="cuIcon-back"></text></p>
				<p>详情</p>
				<p></p>
			</view>
		</view>
		<view class="pages">
			<div class="tab-item">
				<view style="float: left;width: 100%;margin: 5px auto;" v-for="(v,i) in data.wastes" :key="i">
					<view style="float: left;width: 81px;height: 81px;">
						<image style="width: 100%;height: 100%;border-radius: 6px;" :src="v.waste_url" mode=""></image>
					</view>
					<view style="float: left;height: 66px;margin-left: 10px;">
						<big><strong>{{v.waste_name}}</strong></big>
						<p>价格： <text>{{v.price}}</text>/个</p>
						<p>数量 X <text>{{v.number}}</text></p>
					</view>
					<view style="float: right;margin-right: 10px;">
						<p>合计：<text class="text-orange" >{{((v.number*v.price)*100).toFixed(2)/100}}</text></p>
					</view>
				</view>
				<view style="float: left;width: 100%;margin-top: 10px;">
					<p style="float: right;margin-right: 10px;">总计：<b class="text-orange" style="font-size: 22px;line-height: 16px;">{{(data.waste_price_all*100).toFixed(2)/100}}</b>元</p>
				</view>
				<form class="form">
					<view class="cu-form-group">
						<view class="title">上门日期</view>
						<input disabled style="color: #39B54A;" name="name" v-model="data.start_time"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">上门截至</view>
						<input disabled style="color: #39B54A;" name="name" v-model="data.end_time"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">地址</view>
						<textarea disabled style="text-align: left;height: 35px;" v-model="address" />
					</view>
					<view class="cu-form-group">
						<view class="title">客户</view>
						<input disabled name="name" v-model="data.belong_name"></input>
					</view>
					<view class="cu-form-group">
						<view class="title" >手机号码</view>
						<input disabled name="name" v-model="data.belong_phone"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">留言</view>
						 <textarea disabled style="text-align: left;height: 21px;" v-model="data.note" />
					</view>
					<view class="cu-form-group">
						<view class="title">完成时间</view>
						<input disabled name="name" style="color: #39B54A;" v-model="data.complete_time"></input>
					</view>
					 <view class="cu-form-group">
						 <view class="title">服务态度</view>
						 <view class="title" style="width: 200px;">
							 <slider disabled style="margin: 0;" :value="data.evaluate_attitude" step="10" block-size="16" block-color="#007aff" show-value/>
						 </view>
					 </view>
					 <view class="cu-form-group">
						 <view class="title">上门速度</view>
						 <view class="title" style="width: 200px;">
							 <slider disabled style="margin: 0;" :value="data.evaluate_speed" step="10" block-size="16" block-color="#007aff" show-value/>
						 </view>
					 </view>
					<view class="cu-form-group">
						<view class="title">评价内容</view>
						<textarea disabled style="text-align: left;height: 21px;" v-model="data.evaluate_content" />
					</view>
					<view class="cu-form-group">
						<view class="title">评价时间</view>
						<input disabled style="color: #39B54A;" name="name" v-model="data.evaluate_time"></input>
					</view>
				</form>
				<p style="height: 30px;"></p>
			</div>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				data:{},
				address:""
			}
		},
		onLoad(opt) {
			uni.request({
				url:this.base + '/order/user/findById/'+opt.id,
				method:"GET",
				success: (res) => {
					if(res.data != undefined){
						this.data = res.data;
					}
					this.address = 	
					this.data.address.province 
					+this.data.address.city 
					+this.data.address.area 
					+this.data.address.town 
					+this.data.address.street 
					+this.data.address.detail;
				},
				fail: (err) => {
					console.log(err);
				}
			})
		},
		methods:{
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.all{
		background-color: #fff;
	}
	.bar{
		position: fixed;
		top: 0;
		z-index: 999;
		/* iphone 6s */
		/* padding-top: 50px; */
		padding-top: 20px;
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
	.pages{
		padding: 15px;
		background-color: #f1f1f1;
		line-height: 30px;
		padding: 0 5vw;
		margin-top: 100px;
		width: 100vw;
		background-color: white;
		position: absolute;
	}
	.pages > .form > .cu-form-group{
		min-height: 42px;
	}
</style>
