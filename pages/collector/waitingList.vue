<template>
	<view>
		<view class="box" v-for="i in 4">
			<view :class="show == i ? 'show-detail' : 'hide-detail'">
				<view style="margin-bottom: 15px;height: 25px;">
					<p style="float: right;">上门时间:
					<text style="color: #39B54A;font-weight: 700;font-size: 15px">18:00 - 19:00</text>
				
					</p>
					<p style="float: left;">
						<text class="cuIcon-time" style="color: #39B54A;font-weight: 700;margin-right: 10rpx;"></text>预计
						<text style="color: #39B54A;font-weight: 700;font-size: 15px">12分钟</text>
						内到达
					</p>
					
				</view>
				<p style="font-size: 22px;font-weight: 700;margin-bottom: 15px;">白云区石差路潭村86号</p>
				<view class="cu-bar bg-white">
					<view class="action">
						距离现在位置约<text style="color: #DD514C;font-weight: 700;font-size: 22px;">1.5km</text>
					</view>
					<view class="action"><text style="font-size: 20px;font-weight: 700;color: #DD514C;" class="my-icon">&#xe61a;</text></view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-moneybag" style="color: #faa125;font-weight: 700;margin-right: 10rpx;"></text>预估总金额
						<text style="color: #faa125;font-weight: 700;font-size: 15px">4.92元</text>
					</view>
					<view @click="showDetail(i)" style="font-weight: 700;color: #faa125;"  class="action">详情<text class="cuIcon-unfold"></text></view>
				</view>
				<view :class="detailBox == i ? 'show-detail-box' : 'hide-detail-box'">
					<!-- <div style="width: 100%;height: 1rpx;padding: 0;margin:3px auto;border: 0px;background-color: #a5a5a5;"></div> -->
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
					<view @click="hideDetail()" style="font-weight: 700;color: #faa125;text-align: center;"  class="action">收起<text class="cuIcon-fold"></text></view>
				</view>
			</view>
			<button class="cuIcon bg-gradual-blue round" style="width: 250px;font-weight: 700;margin-top: 20px;">接单</button>
		</view>
		<view style="margin-bottom: 50px;">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:null,
				detailBox:null
			}
		},
		methods:{
			showDetail(index){
				this.show = index;
				this.detailBox = index;
			},
			hideDetail(){
				this.show = null;
				this.detailBox = null;
			}
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
	.show-detail-box{
		display: block;
	}
	.hide-detail-box{
		display: none;
	}
	.show-detail{
		max-height: 183px;
		overflow: hidden;
		animation: showDetail .5s cubic-bezier(0.4, 0, 1, 1) forwards;
	}
	.hide-detail{
		max-height: 183px;
		overflow: hidden;
		animation: hideetail .5s ease forwards;
	}
	@keyframes showDetail{
		from{
			max-height: 183px;
		}
		to{
			max-height: 1000px;
		}
	}
	@keyframes hideDetail{
		from{
			max-height: 1000px;
		}
		to{
			max-height: 183px;
		}
	}
</style>
