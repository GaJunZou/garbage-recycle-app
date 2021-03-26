<template>
	<view style="width: 100%;height: 100vh;background-color: #111;color: #ddd;">
		<cu-custom :isBack="true">
			<block slot="content"><span style="font-weight: 900;">个人头像</span></block>
			<block slot="right">
				<text class="cuIcon-more" @tap="showModal" data-target="bottomModal" style="font-size: 20px;margin: 0 10px;"></text>
			</block>
		</cu-custom>
		<view class="img-box">
			<image :src="require('F://毕设//img//' + img)" mode="" class="img"></image>
		</view>
		<view @click="closeByMask" class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog" @click.stop="">
				<view class="bg-white" style="color: #222;">
					<view class="padding" @click="ChooseImage()">
						从相册中选择
					</view>
					<view class="padding" @click="saveImg()">
						保存图片
					</view>
					<div class="hr" style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
					<view @tap="hideModal" class="padding">
						取消
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				imgList:[],
				img:this.$store.state.globalUser.portrait_url
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			closeByMask(e){
				this.hideModal(e);
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = res.tempFilePaths;
						this.saveImg();
					}
				});
			},
			saveImg(){
				let phone = uni.getStorageSync('phone');
				uni.uploadFile({
					url:this.base+'/account/uploadImg/'+ phone,
					filePath:this.imgList[0],
					name:'portrait_url',
					'content-type':"multipart/form-data",
					success:(res)=> {
						console.log(res);
						this.$store.commit('saveImg',res.data);
						this.img = res.data;
						uni.showToast({
							title:"上传成功！",
							duration:1000
						});
					},
					fail:(err)=>{
						console.log(err);
						uni.showToast({
							title:"上传失败！",
							duration:1000
						})
					},
					complete: () => {
						this.hideModal();
					}
				});
				
			}
		}
	}
</script>

<style>
	.img-box{
		position: absolute;
		top: calc(50% - 50vw);
	}
	.img{
		width: 100vw;
		height: 100vw;
	}
	.hr{
		background-color: #eee;
		height: 5px;
		border: 0;
	}
</style>
