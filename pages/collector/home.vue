<template>
	<view>
		<view class="flex justify-between top-bar">
			<view><text style="font-size: 22px;font-weight: 700;" class="cuIcon-apps"></text></view>
			<view>between</view>
			<view>between
			</view>
		</view>
		<ul class="tab-title">
			<li v-for="(v,i) in tabTitle" :key="i" :data-current="i" @tap="tabChange" :class="currentTab == i ? 'current-tab' : ''">{{v}}</li>
		</ul>
		<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 interval="5000" duration="500"  indicator-active-color="orange" :current="currentTab" @change="changeSwiper($event)">
			<swiper-item v-for="(item,index) in 3" :key="index">
				<div class="tab-item-box">
					<waitingList v-if="currentTab==0"></waitingList>
					<ongoing v-if="currentTab==1"></ongoing>
					<finish v-if="currentTab==2"></finish>
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
				tabTitle:['待接单','进行中','已完成'],
				currentTab:0,
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				}
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
.top-bar{
	width: 100%;
	padding: 0 10px;
	padding-top:60px;
	padding-bottom:20px;
	margin: 0;
	border: 0;
	color: #eee;
	background-color: #272822;
	border: 0;
}
.tab-title{
	height: 30px;		
	width: 100%;
	font-size: 18px;
	text-decoration: none;
	list-style: none;
	padding: 10px 0;
	background-color: #272822;
}
.tab-title > li{
	color: #eee;
	float: left;
	text-align: center;
	width: 30vw;
	height: 40px;
	line-height: 40px;
	padding: 0;
	margin-left:2.5vw;
}
.current-tab{
	color: #F4584C !important;  
	font-weight: 700;	
}
.tab-item-box{
	width: 96vw;
	margin: 2vw;
	height: 100vh;
	overflow: scroll;
}
.tab-item{
	overflow: scroll;
	width: 90vw;
	padding:1vw 5vw;
	margin: 12px 0;
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
