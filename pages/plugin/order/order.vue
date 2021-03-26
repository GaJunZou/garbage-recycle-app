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
						<view style="float: left;width: 100%;margin: 5px auto;" v-for="(ii,vv) in 2" :key="vv">
							<view style="float: left;width: 81px;height: 81px;">
								<image style="width: 100%;height: 100%;border-radius: 6px;" src="../../../static/11.png" mode=""></image>
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
						<view style="float: left;width: 100%;margin-top: 10px;">
							<p v-if="index==0" style="float: left;">
								回收员预计在 <b class="text-orange" style="font-size: 16px;">15:31</b>分到达
							</p>
							<p v-if="index==1" style="float: left;">
								该订单于<b class="text-green" style="font-size: 16px;">15:31</b>完成
							</p>
							<p v-if="index==2" style="float: left;">
								该订单于<b class="text-green" style="font-size: 16px;">15:31</b>评价
							</p>
							<p style="float: right;margin-right: 10px;">总计：<b class="text-orange" style="font-size: 22px;line-height: 16px;">15</b>元</p>
						</view>
						<view style="float: left;width: 100%;margin-top: 10px;font-size: 15px;">
							<p> <text class="cuIcon-locationfill">地址:</text>
								广州市白云区石塘路塘村2街301
							</p>
						</view>
						<view style="float: left;width: 100%;margin-top: 10px;">
							备注信息：
							<textarea value="" style="height: 60px;background-color: #f1f1f1;width: 100%;padding: 5px;" :readonly="i!==0">
							</textarea>
						</view>	
						<view class="btn-group">
							<button v-if="index==2" class="cu-btn round bg-red">删除订单</button>
							<button v-if="index==2" style="float: left;margin: 10px 0;" class="cu-btn round lines-green">查看评价</button>
							<button v-if="index==0" class="cu-btn round bg-orange">确认完成</button>
							<button v-if="index==1" class="cu-btn round bg-green">去评价</button>
							<button v-if="index==0" class="cu-btn round lines-grey">取消订单</button>
							<button v-if="index==0" style="float: left;margin: 10px 0;" class="cu-btn round lines-grey">修改时间</button>
						</view>
					</div>
						<div style="height: 140px;text-align: center;">没有更多了~</div>
					</div>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabTitle:['进行中','待评价','已完成'],
				currentTab:0,
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				},
				swiperList: [{
					title: "环保动态",
					titleList:[1,2,2,2,2,2,2]
				},{
					title: "环保百科",
					titleList:[1,2,,2,2,2,2]
				},{
					title: "生活达人",
					titleList:[1,,2,2,2,2,2]
				}],
			}
		},
		created(){
			uni.getSystemInfo({
				    success: (res)=> {
						this.tabStyle.minHeight = res.screenHeight - res.statusBarHeight - 60 + 'px';
				    }
				});
		},
		methods:{
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.currentTab=index;	
			},
			changeSwiper(e){
				this.currentTab = e.detail.current;
				e.detail.current = 2;
				console.log(e);
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
</style>
