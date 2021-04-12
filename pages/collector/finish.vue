<template>
	<view class="page">
		<view class="box" v-for="(i,v) in list" :key="v">
			<view>
				<view style="margin-bottom: 15px;height: 25px;">
					<p style="float: right;">订单号：
						<text style="color: #14adff;font-weight: 700;font-size: 15px">{{i._id}}</text>
					</p>
				</view>
				<p style="font-size: 22px;font-weight: 700;margin-bottom: 15px;">{{i.address.area}}{{i.address.town}}{{i.address.street}}{{i.address.detail}}</p>
				<p style="margin-bottom: 15px;">完成时间：
					<text style="color: #39B54A;font-weight: 700;font-size: 15px">
						{{i.complete_time}}
					</text>
				</p>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-moneybag" style="color: #faa125;font-weight: 700;margin-right: 10rpx;"></text>收入
						<text style="color: #faa125;font-weight: 700;font-size: 15px">{{i.waste_price_all}}元</text>
					</view>
				</view>
				<view>
					<view style="float: left;width: 100%;margin: 5px auto;" v-for="(ii,vv) in i.wastes" :key="vv">
						<view style="float: left;width: 81px;height: 81px;">
							<image style="width: 100%;height: 100%;border-radius: 6px;" :src="ii.waste_url" mode=""></image>
						</view>
						<view style="float: left;height: 66px;margin-left: 10px;">
							<big><strong>{{ii.waste_name}}</strong></big>
							<p>价格： <text>{{ii.price}}/个</text></p>
							<p>数量 X <text>{{ii.number}}</text></p>
						</view>
						<view style="float: right;margin-right: 10px;">
							<p>合计：{{(ii.price*ii.number*100).toFixed(2)/100}}</p>
						</view>
					</view>
					<p>备注：</p>
					<p>{{i.note || '暂无备注~'}}</p>
					<!-- <view @click="hideDetail()" style="font-weight: 700;color: #faa125;text-align: center;margin-bottom: 20px;"  class="action">收起<text class="cuIcon-fold"></text></view> -->
				</view>
			</view>
			<view style="text-align: right;">
				<a v-if="!!i.evaluate_time" @click="checkEvaluate(v)" style="display: inline;font-weight: 700;background-color: none;color: #faa125;">
				查看评价<text class="cuIcon-right"></text>
				</a>
			</view>
		</view>
		<view style="margin-bottom: 50px;">
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		props:{
			list:{
				default:[]
			}
		},
		methods:{
			checkEvaluate(e){
				this.$emit('checkEvaluate',e);
			}
		}
	}
</script>
<style>
/* 	.page{
		min-height: 70vh;
	} */
	.box{
		width: 100%;
		padding: 10px;
		margin: 20px auto;
		background-color: #fff;
		border-radius: 10px;
	}
</style>

