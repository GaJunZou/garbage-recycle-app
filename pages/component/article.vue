<template>
	<view >
		<view class="bg-white bar">
			<view style="position: relative;display: flex;justify-content: space-between;">
				<p><text @click="back" class="cuIcon-back"></text></p>
				<p>文章</p>
				<p></p>
			</view>
		</view>
		<view class="content">
			<p style="text-align: left;font-weight: 700;font-size: 22px;margin:20px auto;">{{article.title}}</p>
			<p style="text-align: left;font-weight: 400;font-size: 14px;margin-bottom:20px;color: #999;" >{{article.subtitle}}</p>
			<image style="width: 100%;margin-bottom:20px;" :src="article.head_img" mode=""></image>
			<p  style="margin-bottom: 20px;">{{article.content}}</p>
			<view>
				<p style="float: left;color: #39B54A;font-weight: 700;">{{article.time}}</p>
				<p style="float: right;font-weight: 700;">作者：{{article.author}}</p>
			</view>
			<p style="height: 60px;"></p>
		</view>
	</view>
</template>

<script>
export default{
  data() {
        return {
			article:{},
		}
    },	
	onLoad(opt) {
		uni.request({
			url:this.base + "/article/getOneArticle/"+opt.id,
			method:"GET",
			success: (res) => {
				this.article = res.data;
			}
		})
		
	},
	methods:{
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
		padding-top: 50px;
		height: 100px;
		line-height: 50px;
		width: 100vw;
		background-color: #ffffff;
	}
	.bar p{
		text-align: center;
		font-weight: 700;
		font-size: 18px;
		color: #666;	
		width: 40px;
	}
	.content{
		background-color: #f1f1f1;
		line-height: 30px;
		padding: 0 5vw;
		margin-top: 100px;
		width: 100vw;
		background-color: white;
		position: absolute;
	}
</style>
