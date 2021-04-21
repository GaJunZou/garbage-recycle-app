<template>
	<view>
		<view class="bar text-white">
			<view style="position: relative;display: flex;justify-content: space-between;">
				<p><text @click="back" class="cuIcon-back"></text></p>
				<p style="width: 80px;">关于app</p>
				<p></p>
			</view>
		</view>
		<view class="box">
			<view class="rows">
				<p class="head"><text class="my-icon">&#xe631;</text>邮箱</p>
				<p>{{version.email}}</p>
			</view>
			<view class="rows">
				<p class="head"><text class="my-icon">&#xe603;</text>电话</p>
				<p style="text-decoration: underline;" @click="call()">{{version.phone}}</p>
			</view>
			<view style="display: flex;justify-content: center;">
				<view class="col">
					<p class="head">版本号<text class="my-icon">&#xe60a;</text></p>
					<p>{{version.number}}</p>

				</view>
				<view class="col">

					<p class="head">作者<text class="my-icon">&#xe67b;</text></p>
					<p>{{version.author}}</p>
				</view>
			</view>
			<view class="rows-plus">
				<p class="head"><text class="my-icon">&#xe63b;</text>联系地址</p>
				<p style="font-size: 16px;">{{version.address}}</p>
			</view>
			<view class="rows-plus-plus">
				<p class="head"><text class="my-icon">&#xe739;</text>app说明</p>
				<p style="line-height: 25px;text-align: left;margin:auto 10px;">{{version.introduction}}</p>
			</view>
		</view>
		<view style="margin-top: 100px;">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				version:{}
			}
		},
		created(){
			uni.request({
				url:this.base + "/system/getSystemInfo",
				method:"GET",
				success: (res) => {
					this.version = res.data[0].version;
				},
				fail: (err) => {
					console.log(err);
				}
			});			
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			call(){
				uni.makePhoneCall({
				    phoneNumber: 19875814656 
				});
			}
		}
	}
</script>

<style>
	.my-icon{
		color: #000;
		font-weight: 400;
		font-size: 20px
	}
	.bar{
		position: fixed;
		top: 0;
		z-index: 999;
		/* iphone 6s */
		/* padding-top: 50px; */
		padding-top: 20px;
		height: 100px;
		line-height: 50px;
		width: 100vw;
	}
	.bar p{
		text-align: center;
		font-weight: 700;
		font-size: 18px;
		width: 40px;
	}
	.item{
		padding-bottom: 15px;
	}
	.box{
		position: fixed;
		top: 0px;
		width: 100%;
		/* iphone 6s */
		/* padding-top: 120px; */
		padding-top: 60px;
		height: 100vh;
		color: #d3d3d3;
		background:url(https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg);
		background-size: cover;
	}
	.rows{
		width: 80%;
		margin:5% 10%;
		text-align: center;
		background-color: #fff;
		height: 60px;
		line-height: 40px;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		backdrop-filter:blur(1rem);
		background: rgba(226, 226, 226, 0.3);
	}
	.rows p{
		margin: auto 20px;
	}
	.col{
		width: 35%;
		background-color: #fff;
		height: 70px;
		margin: 2% 5%;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		backdrop-filter:blur(1rem);
		background: rgba(226, 226, 226, 0.3);
	}
	.col p{
		text-align: center;
	}
	.head{
		font-size: 17px;
		font-weight: 700;
	}
	.rows-plus{
		width: 80%;
		margin:5% 10%;
		text-align: center;
		background-color: #fff;
		height: 120px;
		line-height: 40px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		backdrop-filter:blur(1rem);
		background: rgba(226, 226, 226, 0.3);
	}
	.rows-plus p{
		margin: auto 20px;
	}
	.rows-plus-plus{
		width: 80%;
		padding: auto 5%;
		margin:5% 10%;
		text-align: center;
		background-color: #fff;
		height: 140px;
		line-height: 40px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		backdrop-filter:blur(1rem);
		background: rgba(226, 226, 226, 0.3);
	}
	.rows-plus p{
		margin: auto 20px;
	}
</style>
