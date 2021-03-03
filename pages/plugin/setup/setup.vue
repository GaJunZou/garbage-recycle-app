<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">个人信息</span></block>
		</cu-custom>
		
		<view class="cu-modal" :class="modalName=='setName'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改昵称</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
					<input class="uni-input" focus placeholder="输入新昵称" v-model="newName"/>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="setName">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='setGender'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改性别</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in gender" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.key}}</view>
								<radio class="round" 
								:checked="currentGender == index?false:true"
								:value="item.value"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="setGender">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='setSign'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改签名</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
					 <textarea 
					 style="height: 50px;"
					 maxlength="30" 
					 focus="true" 
					 placeholder="请输入..." 
					 v-model="newSigh"/>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="setSign">确定</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white" @click="bigHead">
			<view class="action">
				<text class="text-black text-bold">头像</text> 
			</view>
			<view class="action">
				<image style="width: 70px;height: 70px;margin: 8px;border-radius: 5px;" src="../../../static/11.png" mode=""></image>
				<text class="text-grey text-bold">
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<hr>
		<view class="cu-bar bg-white" @click="showModal" data-target="setName">
			<view class="action">
				<text class="text-black text-bold">昵称</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>天才少年1984</span>
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<hr>
		<view class="cu-bar bg-white" @click="showModal" data-target="setGender">
			<view class="action">
				<text class="text-black text-bold">性别</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>男</span>
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<hr>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="text-black text-bold">ID</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>30624700</span>
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<hr>
		<view class="cu-bar bg-white" @click="showModal" data-target="setSign">
			<view class="action">
				<text class="text-black text-bold">签名</text> 
			</view>
			<view class="content">
				<p style="text-overflow: ellipsis;">
					无人生哲理能急救你唯独这歌赠你，月光有人捞起有人瞧不起
				</p>
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<hr>
		<view class="cu-bar bg-white"  @click="managerAddress">
			<view class="action">
				<text class="text-black text-bold">我的地址</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>查看</span>
					<i class="icon-next iconfont icon-right"></i>
				</text>
			</view>
		</view>
		<hr>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				visible: false,
				newName: '',
				newSigh: '',
				currentGender: 1,
				gender:[
					{key:"男",value:"1"},
					{key:"女",value:"0"}
				],
				
			}
		},
		methods: {
			bigHead(){
				console.log(123);
				uni.navigateTo({
					url: "/pages/plugin/setup/bigHead",
					fail(err) {
						console.log(err)
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal() {
				this.modalName = null
			},
			RadioChange(e) {
				this.currentGender = e.detail.value
				console.log(this.currentGender)
			},
			setName(){
				this.hideModal()
			},
			setGender(){
				this.hideModal()
			},
			setSign(){
				this.hideModal()
			},
			managerAddress(){
				uni.navigateTo({
					url: "/pages/plugin/setup/address",
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
.choose-box{
	display: inline-block;
	float: left;
}
</style>
