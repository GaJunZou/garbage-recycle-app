<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			<div class="bg-gradual-red" style="width: 100%;height: 50px;font-size: 25px;line-height: 50px;padding: 0 20px;font-weight: 700;color: #e2e2e2;">
				探索 <i class="cuIcon-discoverfill" style="color: #EB2;"></i> 发现
			</div>
			<swiper :style="tabStyle" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<div class="tab-item-box">
						<div :style="itemStyle" class="tab-item">
							
						</div>
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
				itemStyle:{
					height:''
				},
				tabStyle:{
					minHeight:""
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
			this.tabStyle.minHeight = window.innerHeight-50-42 + 'px';
			this.itemStyle.height = this.tabStyle.minHeight;
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.tab-item-box{
		width: 100%;
		height: 100vh;
		background-color: ##cdcdcd;
	}
	.tab-item{
		overflow: scroll;
		width: 90vw;
		padding: 5vw;
		height: auto;
	}
</style>
