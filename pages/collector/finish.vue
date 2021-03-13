<template>
	<view>
		<view class="box" v-for="i in 4">
			<view>
				<view style="margin-bottom: 15px;height: 25px;">
					<p style="float: left;">电话:
						<text style="color: #14adff;font-weight: 700;font-size: 15px">19875814656</text>			
					</p>
					<p style="float: right;">订单号：
						<text style="color: #14adff;font-weight: 700;font-size: 15px">4856125487</text>
					</p>
				</view>
				<p style="font-size: 22px;font-weight: 700;margin-bottom: 15px;">白云区石差路潭村86号</p>
				<p style="margin-bottom: 15px;">完成时间：
					<text style="color: #39B54A;font-weight: 700;font-size: 15px">2021-9-19 18:30:26</text>
				</p>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-moneybag" style="color: #faa125;font-weight: 700;margin-right: 10rpx;"></text>收入
						<text style="color: #faa125;font-weight: 700;font-size: 15px">4.92元</text>
					</view>
				</view>
				<view>
					<view style="float: left;width: 100%;margin: 5px auto;" v-for="ii in 2">
						<view style="float: left;width: 81px;height: 81px;">
							<image style="width: 100%;height: 100%;border-radius: 6px;" src="../../static/11.png" mode=""></image>
						</view>
						<view style="float: left;height: 66px;margin-left: 10px;">
							<big><strong>名称</strong></big>
							<p>价格： <text>0.2/个</text></p>
							<p>数量 X <text>7</text></p>
						</view>
						<view style="float: right;margin-right: 10px;">
							<p>合计：10</p>
						</view>
					</view>
					<p>备注：</p>
					<p>这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注这是备注</p>
					<!-- <view @click="hideDetail()" style="font-weight: 700;color: #faa125;text-align: center;margin-bottom: 20px;"  class="action">收起<text class="cuIcon-fold"></text></view> -->
				</view>
			</view>
			<view style="text-align: right;">
				<a style="display: inline;font-weight: 700;background-color: none;color: #faa125;">
				查看评价<text class="cuIcon-right"></text></a>
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
		methods:{

		}
	}
</script>
<style>
	.box{
		width: 100%;
		padding: 10px;
		margin: 20px auto;
		background-color: #fff;
		border-radius: 10px;
	}
</style>

