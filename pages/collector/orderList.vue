<template>
	<view class="">
		<view class="bg-blue bar">
			<view style="position: relative;display: flex;justify-content: space-between;">
				<p><text @click="back" class="cuIcon-back"></text></p>
				<p class="center">订单</p>
				<p></p>
			</view>
		</view>
		<p v-if="list.length == 0" style="width: 100vw;	text-align: center;margin-top: 200px;">这里空空如也~</p>
		<!-- iphone 6s -->
		<!-- <view class="cu-bar bg-blue search" style="position: fixed;top: 100px;z-index: 2000;padding-top: 10px;padding-bottom:10px;padding-left: 10px;width: 100vw;"> -->
		<view class="cu-bar bg-blue search" style="position: fixed;top: 60px;z-index: 2000;padding-top: 10px;padding-bottom:10px;padding-left: 10px;width: 100vw;">
			<view class="search-form radius" style="border-radius: 20px;margin-left: 0;">
				<text class="cuIcon-search"></text>
				<input 
					:adjust-position="false" 
					v-model="value"
					type="text" 
					placeholder="通过订单id检索" 
					confirm-type="search"></input>
				<text v-if="value != ''" @click="clean" style="font-size: 16px;" class="cuIcon-roundclose"></text>
			</view>
			<view @click="search" class="action">
				<text>搜索</text>
			</view>
		</view>
		<!-- iphone 6s -->
		<!-- <p style="margin-top: 160px;"></p> -->
		<p style="margin-top: 120px;"></p>
		<view v-for="(v,i) in list" @click="orderDetail(v)" class="cu-bar bg-white">
			<view class="action">订单id:{{v}}</view>
			<view class="action"><text class="cuIcon-right"></text></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				list:[],
				backup:[],
				value:''
			}
		},
		onLoad(opt) {
			if(opt.list == ''){
				uni.request({
					url:this.base+'/order/user/getCompleteOrder/'+uni.getStorageSync('phone'),
					method:"GET",
					success: (res) => {
						this.list = res.data.map((v)=>{
							return v._id;
						});
						this.backup = JSON.parse(JSON.stringify(this.list));
						console.log(this.backup);
					}
				})
			}else{
				this.list = opt.list || [];
				this.list = this.list.split(',');
			}
		},
		methods:{
			orderDetail(id){
				console.log(id);
				uni.navigateTo({
					url:"/pages/collector/orderDetail?id="+id
				});
			},
			search(){
				let arr = [];
				this.list.forEach(v=>{
					if(v.includes(this.value)){
						arr.push(v);
					}
				})
				this.list = arr
			},
			clean(){
				this.value = '';
				this.list = this.backup;
			},
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
		/* iphone 6s */
		/* padding-top: 50px; */
		/* height: 100px; */
		padding-top: 20px;
		line-height: 50px;
		width: 100vw;
	}
	.bar p{
		color: #FFFDEF;
		text-align: center;
		font-weight: 700;
		font-size: 18px;
		width: 40px;
	}
	.bar .center{
		font-size: 20px;
		width: 400px;
	}
</style>
