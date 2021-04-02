<template>
	<view  class="page">
		<view class="box" v-for="(i,v) in list" :key="v">
			<view :class="show == i ? 'show-detail' : 'hide-detail'">
				<view style="margin-bottom: 15px;height: 25px;">
					<p style="float: right;">订单号：
						<text style="color: #14adff;font-weight: 700;font-size: 15px">{{i._id}}</text>
					</p>
				</view>
				<p style="font-size: 22px;font-weight: 700;margin-bottom: 15px;">{{i.address.area}}{{i.address.town}}{{i.address.street}}{{i.address.detail}}</p>
				<view class="cu-bar bg-white">
					<view class="action">
						距离现在位置约<text style="color: #DD514C;font-weight: 700;font-size: 22px;">
						{{getMesure(i.address.address_crood) > 1000 ? (getMesure(i.address.address_crood)/1000).toFixed(1)+'km' : getMesure(i.address.address_crood)+'m'}}</text>
					</view>
					<view class="action"><text style="font-size: 20px;font-weight: 700;color: #DD514C;" class="my-icon">&#xe61a;</text></view>
				</view>
				<p style="margin-bottom: 15px;">
					可上门时间段：
					<text style="color: #39B54A;font-weight: 700;font-size: 15px">
						{{i.start_time.time()}} - {{i.end_time.time()}}
					</text>
					，请在此时间段内到达目的地并联系客人。
				</p>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-moneybag" style="color: #faa125;font-weight: 700;margin-right: 10rpx;"></text>预估总金额
						<text style="color: #faa125;font-weight: 700;font-size: 15px">{{i.waste_price_all}}元</text>
					</view>
					<view @click="showDetail(i)" style="font-weight: 700;color: #faa125;"  class="action">详情<text class="cuIcon-unfold"></text></view>
				</view>
				<view :class="detailBox == i ? 'show-detail-box' : 'hide-detail-box'">
					<view style="float: left;width: 100%;margin: 5px auto;" v-for="(ii,vv) in i.wastes" :key="vv">
						<view style="float: left;width: 81px;height: 81px;">
							<image style="width: 100%;height: 100%;border-radius: 6px;" src="../../static/11.png" mode=""></image>
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
					<view>
						<p>备注：</p>
						<p>{{i.note || '暂无备注~'}}</p>
					</view>
					<view @click="hideDetail()" style="font-weight: 700;color: #faa125;text-align: center;"  class="action">收起<text class="cuIcon-fold"></text></view>
				</view>
			</view>
			<button @click="arrive(v)" class="cuIcon bg-gradual-green round" style="width: 250px;font-weight: 700;margin-top: 20px;">已到达</button>
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
				detailBox:null,
				modalName:''
			}
		},
		props:{
			list:{
				default:[]
			},
			crood:{
				default:[]
			}
		},
		created() {
			// this.list = this.$store.state.ongoingList;
		},
		methods:{
			getMesure(str){
				let mesure;
				let arr = str.split('/');
				mesure = this.GetDistance(this.crood[0],this.crood[1],+arr[0],+arr[1]);
				console.log(mesure);
				return (mesure*1000).toFixed(1);
			},
			showDetail(index){
				this.show = index;
				this.detailBox = index;
			},
			hideDetail(){
				this.show = null;
				this.detailBox = null;
			},
			arrive(e){
				this.$emit('showOperate',e);
			}
		}
	}
</script>
<style>
/* 	.page{
		min-height: 700px;
	} */
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
		max-height: 280px;
		overflow: hidden;
		animation: showDetail .5s cubic-bezier(0.4, 0, 1, 1) forwards;
	}
	.hide-detail{
		max-height: 280px;
		overflow: hidden;
		animation: hideetail .5s ease forwards;
	}
	@keyframes showDetail{
		from{
			max-height: 280px;
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
			max-height: 280px;
		}
	}
</style>

