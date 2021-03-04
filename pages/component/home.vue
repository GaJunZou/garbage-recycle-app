<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			<div class="bg-gradual-red" style="width: 100%;height: 50px;font-size: 25px;line-height: 50px;padding: 40px 20px 0px;font-weight: 700;color: #e2e2e2;">
				探索 <i class="cuIcon-discoverfill" style="color: #EB2;"></i> 发现
			</div>
			<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<div class="tab-item-box">
						<div class="tab-item" v-for="(item,index) in titleList" :key="index">
							<div class="content">
								<div class="title">这款小程序UI太漂亮了</div>
								<div class="words">大家好大家好大家好大家好，我是为广大程序员兄弟操碎了心的小编，每天推荐一个小工具，希望大家喜欢</div>
							</div>
							<div class="img"><image src="../../static/11.png" style="width: 100%;height: 100%;" mode=""></image></div>
						</div>
						<div style="height: 140px;text-align: center;">没有更多了~</div>
					</div>
				</swiper-item>
			</swiper>
			<view class="nav-list">
				<navigator hover-class='none' :url="'/pages/component/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleList:[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				itemStyle:{
					height:'',
				},
				tabStyle:{
					position:'fixed',
					width:'100%',
					minHeight:"",
					overflow:"hidden"
				},
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}],
				elements: [{
						title: '操作条',
						name: 'bar',
						color: 'purple',
						cuIcon: 'vipcard'
					},
					{
						title: '导航栏 ',
						name: 'nav',
						color: 'mauve',
						cuIcon: 'formfill'
					},
					{
						title: '列表',
						name: 'list',
						color: 'pink',
						cuIcon: 'list'
					},
					{
						title: '卡片',
						name: 'card',
						color: 'brown',
						cuIcon: 'newsfill'
					},
					{
						title: '表单',
						name: 'form',
						color: 'red',
						cuIcon: 'formfill'
					},
					{
						title: '时间轴',
						name: 'timeline',
						color: 'orange',
						cuIcon: 'timefill'
					},
					{
						title: '聊天',
						name: 'chat',
						color: 'green',
						cuIcon: 'messagefill'
					},
					{
						title: '轮播',
						name: 'swiper',
						color: 'olive',
						cuIcon: 'album'
					},
					{
						title: '模态框',
						name: 'modal',
						color: 'grey',
						cuIcon: 'squarecheckfill'
					},
					{
						title: '步骤条',
						name: 'steps',
						color: 'cyan',
						cuIcon: 'roundcheckfill'
					}
				],
			};
		},
		created(){
			uni.getSystemInfo({
				    success: (res)=> {
						this.tabStyle.minHeight = res.screenHeight - res.statusBarHeight - 100 + 'px';
						// this.itemStyle.height = this.tabStyle.minHeight;
				    }
				});
			},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.tab-item-box{
		width: 100%;
		height: 100vh;
		overflow: scroll;
		background-color: #fdfdfd;
	}
	.tab-item{
		overflow: scroll;
		width: 90vw;
		padding:1vw 5vw;
		height: auto;
		border-bottom: 12px #eee solid;
	}
	.content{
		float: left;
		width: 58vw;
		height: 22vw;
		margin-right: 2vw;
	}
	.content .title{
		font-size: 15px;
		font-weight: 700;
		margin-bottom: 1vw;
	}
	.content .words{
		float: left;
		font-size: 14px;
		height: 60px;
		width: 58vw;
		overflow: hidden;
		/* 3. 文字溢出的时候用省略号来显示 */
		text-overflow: ellipsis;
		 display: -webkit-box;
		/* 限制在一个块元素显示的文本的行数 */
		-webkit-line-clamp: 3;
		/* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-box-orient: vertical;
	}
	.img{
		float: right;
		width: 30vw;
		height: 22vw;
	}
	.img > image{
		border-radius: 5px;
	}
</style>
