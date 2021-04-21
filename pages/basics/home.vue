<template name="basics">
	<view id="basics">
		<view class="page">
			<scroll-view :class="isScroll == true ? '' : 'isScroll'">
				<!-- 搜索 -->
				<!-- iphone 6s -->
				<!-- <view class="cu-bar bg-gradual-blue search" style="position: fixed;top: 0;z-index: 2000;padding-top: 40px;padding-bottom:10px;width: 100vw;"> -->
				<view class="cu-bar bg-gradual-blue search" style="position: fixed;top: 0;z-index: 2000;padding-top: 20px;padding-bottom:10px;width: 100vw;">
					<view class="action" style="width: 70px;">
						<text @click="getLocation()">{{site}}</text>
						<text class="cuIcon-triangledownfill"></text>
					</view>
					<view class="search-form radius" style="border-radius: 20px;margin-left: 0;">
						<text class="cuIcon-search"></text>
						<input 
							@click="showBackUp()"
							v-model="searchValue"
							:adjust-position="false" 
							type="text" 
							placeholder="搜索图片、文章、视频" 
							confirm-type="search"></input>
					</view>
					<view class="action">
						<text @click="getRublishData()">搜索</text>
					</view>
				</view>
				<!-- 轮播图 -->
				<!-- <swiper class="screen-swiper square-dot" style="margin-top: 83px;" :indicator-dots="true" :circular="true" -->
				<swiper class="screen-swiper square-dot" style="margin-top: 60px;" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<p style="width: 100%;height: 40px;text-align: center;line-height: 60px;font-size: 20px;">
					<text style="color: orange;font-size: 40px;font-weight: 700;">·.</text>
					<text>可回收物品列表</text>
					<text style="color: orange;font-size: 40px;font-weight: 700;">.·</text>
				</p>
				<!-- 商品 -->
				<view class="flex justify-around box-content">
					<view class="bg-white item radius" v-for="(v,i) in data" :key="i">
						<view>
							<image :src="v.waste_url" mode="" style="width: 45vw;height: 45vw;border-radius: 8px;"></image>
						</view>
						<p style="text-align: center;font-size: 16px;">{{v.waste_name}}</p>
						<view>
							<text style="float: left;margin:5px 10px;">{{v.price}}元/{{''+computed_mode(v.compute_mode)+''}}</text>
							<text style="float: right;margin:0 10px;font-size: 20px;font-weight: 900; color: #39B54A;">
								<span class="cuIcon-add" @click="addList(v)"></span>
							</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 搜索页 -->
			<view class="search-backup" :class="isShowBackUp == true ? 'show-backup' : 'hide-backup'" @click.stop="hideBackUp()">
				<view style="width: 100vw;min-height: 100%;">
					<p style="font-size: 18px;margin: 15px 10px;color: #ffffff;">热门搜索：</p>
					<!-- 备选 -->
					<view class="padding">
						<view class="col-4 padding-sm">
								<button v-for="(item,index) in backup" :key="index" 
								@click.stop="searchBackup(item)" class="cu-btn round margin-tb-sm btn">{{item}}</button>
						</view>
					</view>
					<view style="position: absolute;width: 100%;">
							<!-- 垃圾分类知识区 -->
							<view class="knownledge" :class="load == 1 ? 'show-more' : 'hide-more'" @click.stop="" v-if="rublishData">
								<view style="width: 22vw;height: 22vw;float: left;">
									<image src="../../static/logo.jpg" mode="" style="width: 100%;height: 100%;border-radius: 10px;"></image>
								</view>
								<view style="width: 55vw;height: 22vw;float: left;margin: 0 2vw;font-size: 15px;line-height: 11vw;"> 
									<p><strong>名称：</strong>{{rublishData.name}}</p>
									<p>
										<strong>分类：</strong>
										<span v-if="rublishData.type==0">可回收垃圾</span>
										<span v-else-if="rublishData.type==1">有害垃圾</span>
										<span v-else-if="rublishData.type==2">厨余垃圾(湿垃圾)</span>
										<span v-else-if="rublishData.type==3">其他垃圾(干垃圾)</span>
									</p>
								</view>
								<view>
									<view>
										<view style="width: 82vw;height: auto;font-size: 15px;color:#fff" v-if="load==1">
											<p>解释：{{rublishData.explain}}</p>
											<p>详细：{{rublishData.contain}}</p>
											<p>建议：{{rublishData.tip}}</p>
										</view>
										<p class="load-more" @click="loadAndHide()">{{text}}<span class="cuIcon" :class="load == 1 ? 'cuIcon-fold load-more' : 'cuIcon-unfold hide-more'" style="font-size: 15px;"></span></p>
									</view>
								</view>
							</view>
							<view @click.stop="" class="flex justify-around box-content">
								
							<view class="bg-white item radius" v-for="(v,i) in searchResult" :key="i">
								<view>
									<image :src="v.waste_url" mode="" style="width: 45vw;height: 45vw;border-radius: 8px;"></image>
								</view>
								<p style="text-align: center;font-size: 16px;">{{v.waste_name}}</p>
								<view>
									<text style="float: left;margin:5px 10px;">{{v.price}}元/{{''+computed_mode(v.compute_mode)+''}}</text>
									<text style="float: right;margin:0 10px;font-size: 20px;font-weight: 900; color: #39B54A;">
										<span @click="addList(v)" class="cuIcon-add"></span>
									</text>
								</view>
							</view>
								
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- cart -->
			<div class="cart my-bg-gradual-blue">
				<div @tap="showModal($event)" data-target="bottomModal" style="width: 60px;height: 42px;border-radius: 50%;position: absolute;z-index: 1;">
					<view class="cu-tag badge" style="background-color: #f9484b;">{{orderList.length}}</view>
					<image style="
					width: 60px;
					height: 60px;
					margin-top:-10px;border-radius: 50%;" 
					src="../../static/cart.png"></image>
				</div>
				<p @tap.stop="showModal($event)" data-target="bottomModal" style="float: left;margin-left: 100px;line-height: 42px;font-size: 16px;color: #000;">已选{{orderList.length}}件回收物</p>
				<p @click="settle" style="float: right;margin-right: 10px;line-height: 42px;font-size: 14px;color: #fff;font-weight: 700;">去结算</p>
			</div>
			<!-- cart-modal -->
			<view @click="hideModal($event)" class="cu-modal bottom-modal my-bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view @click.stop="" class="cu-dialog" style="max-height: 500px;overflow: scroll;border-radius: 5px;">
					<view class="cu-bar bg-white" style="position: sticky;top: 0;z-index: 10;">
						<view class="action text-blue" @tap="hideModal">
							<strong style="float: left;font-size: 14px;color: #ff5500;line-height: 40px;">取消</strong>
						</view>
					</view>
					<view  @touchmove.stop="" class="padding" style="text-align: left;overflow: hidden;">
						<div v-for="v in orderList" style="padding: 5px 10px;height: 40px;">
							<i class="cuIcon-close" @click="remove(v._id)" style="float: left;font-size: 20px;color: red;line-height: 40px;"></i>
							<div style="float: left;width: 40px;height: 40px;margin-right: 10px;margin-left: 5px;">
								<image style="width: 100%;height: 100%;" :src="v.waste_url" mode=""></image>
							</div>
							<p style="float: left;line-height: 20px;">
								<strong style="font-size: 14px;">{{v.waste_name}}</strong><br>
								{{v.price}}元/{{''+computed_mode(v.compute_mode)+''}}
							</p>
							<div style="float: right;line-height: 40px;font-size: 16px;font-weight: 700;text-align: center;">
								<i class="cuIcon-move" style="color:  #fe0707;" @click="sub(v._id)"></i>
								<span style="margin: 0 10px;">{{v.number}}</span>
								<i class="cuIcon-add" style="color:  #32ce7d;" @click="add(v._id)"></i>
							</div>
						</div>
						<div style="height: 120px;"></div>
					</view>
				</view>
			</view>
			<view >
			</view>
			<view class="cu-tabbar-height"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				isShowBackUp:false,
				searchValue:'',
				site:'未定位',
				rublishData:'',
				isScroll:true,
				modalName: null,
				data:[],
				searchResult:[],
				orderList:[],
				load:2, //不显示
				text:"更多",
				backup:'',
				swiperList: ['https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg']
			};
		},
		onShow() {

		},
		created(){
			uni.request({
				url:this.base + "/waste/getAllWaste",
				method:"GET",
				success: (res) => {
					this.data = res.data;
					this.backup = this.data.map(v=>{return v.waste_name});
					this.backup.length = 6;
				}
			})
			uni.request({
				url:this.base + "/system/getSystemInfo",
				method:"GET",
				success: (res) => {
					this.swiperList = res.data[0].swiper_img
				}
			})
			
			if(JSON.stringify(this.$store.state.role)=='{}'){
				if(uni.getStorageSync('phone') != null) {
					uni.request({
						url:this.base+"/account/getAllInfomation/"+uni.getStorageSync('phone'),
						method:"GET",
						success: (res) => {
							this.$store.commit('save',res.data);
						}
					})
				}
			}
			if(uni.getStorageSync('role') == 'collector'){
				uni.redirectTo({
					url:'/pages/collector/home',
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		},
		methods: {
			computed_mode(val){
				console.log(val);
				if(val == "by_weight"){
					return '斤'
				}else if(val == "by_quantity"){
					return "个"
				}else if(val == "by_material"){
					return "件"
				}
			},
			searchBackup(val){
				this.searchValue = val;
				this.getRublishData();
			},
			getLocation(){
				let value = null;
				plus.nativeUI.showWaiting("定位中...",{background : "#272822",padlock:true});
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: (res) => {
						this.site = res.address.street;
						plus.nativeUI.closeWaiting("定位中...");
				    }
				});
			},
			addList(item){
				let flag = false;
				for(let i=0;i<this.orderList.length;i++){
					if(this.orderList[i]._id == item._id){
						this.orderList[i].number++;
						flag = true;
						break;
					}
				}
				if(flag == false){
					this.orderList.push({
						...item,
						number:1
					})
				}
				console.log(this.orderList);
			},
			remove(id){
				this.orderList.forEach((v,i) => {
					if(v._id == id){
						this.orderList.splice(i,1);
					}
				})
				if(this.orderList.length == 0){
					this.hideModal();
				}
			},
			add(id){
				this.orderList.forEach((v,i)=>{
					if(v._id == id){
						v.number++;
					}
				})
			},
			sub(id){
				this.orderList.forEach((v,i)=>{
					if(v._id == id){
						v.number--;
						if(v.number==0){
							this.orderList.splice(i,1);
						}
					}
				})
				if(this.orderList.length == 0){
					this.hideModal();
				}
			},
			showModal(e) {
				this.isScroll=false;
				this.modalName = e.currentTarget.dataset.target;
				console.log(this.modalName);
			},
			hideModal(e) {
				this.isScroll=true;
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
			},
			showBackUp(){
				this.isScroll=false;
				this.isShowBackUp = true;
			},
			hideBackUp(){
				this.isScroll=true;
				this.isShowBackUp = false;
			},
			getRublishData(){
				uni.request({
					url:"http://api.tianapi.com/txapi/lajifenlei/index?key=576ee9214b7242ea2e385dfbebbd85d9&mode=1&word="+this.searchValue,
					success: (res) => {
						if(res.data.newslist){
							res.data.newslist.forEach((v)=>{
								if(v.name.trim() == this.searchValue.trim()){
									this.rublishData = v;
									console.log(this.rublishData);
								}
							})
						}
						else{
							this.rublishData = '';
						}
						
					}
				});
				uni.request({
					url:this.base + '/waste/find/'+this.searchValue,
					method:"GET",
					success:(res)=> {
						this.searchResult = res.data;
					}
				})
			},
			loadAndHide(){
				if(this.load==2){
					this.text="收起";
					this.load=1;
				}
				else if(this.load==1){
					this.text="更多";
					this.load=2;
				}
			},
			settle(){
				// 未登录跳转，提示登录
				this.$store.commit("seedOrderList",this.orderList);
				uni.navigateTo({
					url: "/pages/basics/settle"
				})
			}
		},
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	.page {
		height: auto;
	}
	.isScroll{
		overflow: hidden;
		height: 100%;
	}
	.item{
		width: 45vw;
		height: calc(45vw + 60px);
		padding: 0;
		margin: 8px 2vw;
	}
	.btn{
		text-align: text-center;
		margin: 2px !important;
		background-color: #000000;
		color: #ffffff;
		padding: 0px 15px;
		/* width: 70px; */
		opacity: .5;
		font-size: 14px;
		margin: 10px 0;
	}
	.box-content{
		width:100%;
		padding: 1%;
		display: flex;
		padding-bottom: 70px;
		align-content:space-between;
		flex-wrap: wrap;
		border-radius: 10px;
		overflow: hidden;
	}
	.search-backup{
		position: fixed;
		overflow: scroll;
		top: 80px;
		width: 100%;
		min-height: 92vh;
		backdrop-filter:blur(1rem);
		background: rgba(97, 97, 97, 0.7);
		opacity: 0;
		z-index: -1;
	}
	.show-backup{
		display: block;
		animation: showBackUp .5s forwards;
	}
	.hide-backup{
		display: none;
		animation: hideBackUp .5s forwards;
	}
	.show-more{
		animation:showMore .5s forwards;
	}
	.hide-more{
		animation: hideMore .5s forwards;
	}
	.knownledge{
		position: relative;
		/* left: calc(50vw - 42.5vw); */
		color: #ffffff;
		width: 85vw;
		max-height: 33vw;
		background-color: white;
		margin: 20px auto 10px;
		border-radius: 10px;
		padding: 2vw;
		overflow: hidden;
		backdrop-filter:blur(1rem);
		background: rgba(35, 35, 35, 0.1);
	}
	.load-more{
/* 		position: relative;
		bottom: 0; */
		
		margin: 2vw auto;
		text-align: center;
		font-size: 14px;
		font-weight: 700;
		color: #07bdff;
	}
	.cart{
		position: fixed;
		/* bottom: 42px; */
		left: 5vw;
		bottom: 60px;
		width: 90vw;
		border-radius: 30px;
		height: 42px;
		z-index: 1024;
/* 		backdrop-filter:blur(1rem);
		background: rgba(49, 49, 49, 0.3); */
	}
	.my-bottom-modal{
		z-index: 1020;
	}
	@keyframes showBackUp{
		from{
			opacity: 0;
			z-index: 1040;
		}
		to{
			opacity: 1;
			z-index: 1050;
		}
	}
	@keyframes hideBackUp{
		from{
			opacity: 1;
			z-index: 1050;
		}
		to{
			opacity: 0;
			z-index: 1040;
		}
	}
	@keyframes showMore{
		from{
			max-height: 33vw;
		}
		to{
			max-height: 105vw;
		}
	}
	@keyframes hideMore{
		from{
			max-height: 105vw;
		}
		to{
			max-height: 33vw;
		}
	}
</style>
