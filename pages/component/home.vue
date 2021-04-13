<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			<div class="bg-gradual-red" style="width: 100%;height: 50px;font-size: 25px;line-height: 50px;padding: 40px 20px 0px;font-weight: 700;color: #e2e2e2;">
				<p style="float: left;">探索 <i class="cuIcon-discoverfill" style="color: #EB2;"></i> 发现</p> 
				<!-- <p style="float: right;padding-right: 40px;"><button @click="seedNotify" class="cu-btn round">添加</button></p> -->
			</div>
			<ul class="tab-title">
				<li v-for="(v,i) in tabTitle" :key="i" :data-current="i" @tap="tabChange" :class="currentTab == i ? 'current-tab' : ''">{{v}}</li>
			</ul>
			<swiper :style="tabStyle" class="screen-swiper" :circular="true"
			 interval="5000" duration="500" :current="currentTab" @change="changeSwiper($event)">
				<swiper-item v-for="(item,index) in swiperList" :key="index" style="width: 100%;">
					<div class="tab-item-box">
						<div class="tab-item" v-for="(v,i) in item.titleList"  @click="browseArticle(v._id)" :key="i">
							<div class="content">
								<div class="title">{{v.title}}</div>
								<div class="words">{{v.subtitle}}</div>
								<div style="color: #8799A3;"><text class="cuIcon-time" style="line-height: 30px;margin-right: 5px;"></text>{{v.time}}</div>
							</div>
							<div class="img"><image :src="v.head_img" style="width: 100%;height: 100%;" mode=""></image></div>
						</div>
						<div style="height: 140px;text-align: center;">没有更多了~</div>
					</div>
				</swiper-item>
			</swiper>
<!-- 			<view class="nav-list">
				<navigator hover-class='none' :url="'/pages/component/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'components',
		data() {
			return {
				itemStyle:{
					height:'',
				},
				tabTitle:['环保卫士','生活达人','探索更多'],
				currentTab:0,
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				},
				swiperList: [{
					title: "环保动态",
					titleList:[]
				},{
					title: "环保百科",
					titleList:[]
				},{
					title: "生活达人",
					titleList:[]
				}],
			};
		},
		created(){
			uni.request({
				url:this.base + "/article/getAllArticle",
				method:"GET",
				success: (res) => {
					this.data = res.data;
					this.swiperList[0].titleList = res.data.filter( v => {return v.type == 0});
					this.swiperList[1].titleList = res.data.filter( v => {return v.type == 1});
					this.swiperList[2].titleList = res.data.filter( v => {return v.type == 2});
				},
				fail: (err) => {
					console.log(err);
				}
			});
			uni.getSystemInfo({
				    success: (res)=> {
						this.tabStyle.minHeight = res.screenHeight - res.statusBarHeight - 100 + 'px';
						// this.itemStyle.height = this.tabStyle.minHeight;
				    }
				});
			},
		methods:{
			seedNotify(){
				this.send('test',"测试内容")
			},
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.currentTab=index;	
			},
			changeSwiper(e){
				this.currentTab = e.detail.current;
				e.detail.current = 2;
			},
			browseArticle(id){
				uni.navigateTo({
					url:'/pages/component/article?id='+id,
				})
			},
			// publish(){
			// 	uni.navigateTo({
			// 		url:'/pages/component/article'
			// 	})
			// }
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.tab-title{
		height: 45px;		
		width: 100vw;
		font-size: 20px;
		text-decoration: none;
		list-style: none;
		padding: 0;
	}
	.page .tab-title > li{
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
		border-bottom: 3px #f37b1d solid;
	}
	.tab-item-box{
		width: 100%;
		/* padding: 2vw; */
		height: 100vh;
		overflow: scroll;
	}
	.tab-item{
		overflow: scroll;
		width: 90vw;
		padding:2.5vw 3vw;
		margin: 12px auto;
		height: auto;
		border-radius: 10px;
		background-color: #fdfdfd;
		overflow: hidden;
		/* border-bottom: 12px #eee solid; */
	}
	.content{
		float: left;
		width: 62vw;
		height: 22vw;
		margin-right: 2vw;
	}
	.content .title{
		font-size: 15px;
		font-weight: 700;
		margin-bottom: 1vw;
		overflow: hidden;
		/* 3. 文字溢出的时候用省略号来显示 */
		text-overflow: ellipsis;
		 display: -webkit-box;
		/* 限制在一个块元素显示的文本的行数 */
		-webkit-line-clamp: 1;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
	}
	.content .words{
		float: left;
		font-size: 14px;
		height: 40px;
		width: 62vw;
		overflow: hidden;
		/* 3. 文字溢出的时候用省略号来显示 */
		text-overflow: ellipsis;
		 display: -webkit-box;
		/* 限制在一个块元素显示的文本的行数 */
		-webkit-line-clamp: 2;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
	}
	.img{
		float: right;
		width: 26vw;
		height: 22vw;
	}
	.img > image{
		border-radius: 5px;
	}
</style>
