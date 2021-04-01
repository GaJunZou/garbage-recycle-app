<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">个人信息</span></block>
		</cu-custom>
		
		<view @click="hideModal" class="cu-modal" :class="modalName=='setName'?'show':''">
			<view @click.stop="" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改昵称</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
					<input class="uni-input" placeholder="输入新昵称" v-model="newName"/>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="setName">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view @click="hideModal" class="cu-modal" :class="modalName=='setPhone'?'show':''">
			<view @click.stop="" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改手机/ID</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
					<input class="uni-input" placeholder="输入新手机号" v-model="modify_phone"/>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="modifyPhone">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view @click="hideModal" class="cu-modal" :class="modalName=='setGender'?'show':''">
			<view @click.stop="" class="cu-dialog">
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
		<view @click="hideModal" class="cu-modal" :class="modalName=='setSign'?'show':''">
			<view  @click.stop="" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改签名</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
					 <textarea 
					 style="height: 50px;"
					 maxlength="60"
					 placeholder="请输入..." 
					 v-model="newSign"/>
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
				<image style="width: 70px;height: 70px;margin: 8px;border-radius: 5px;" :src="url" mode=""></image>
				<text class="text-grey text-bold">
					<i class="cuIcon-right"></i>
				</text>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		<view class="cu-bar bg-white" @click="showModal" data-target="setName">
			<view class="action">
				<text class="text-black text-bold">昵称</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>{{globalUser.name}}</span>
					<i class="cuIcon-right"></i>
				</text>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		<view class="cu-bar bg-white" @click="showModal" data-target="setGender">
			<view class="action">
				<text class="text-black text-bold">性别</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span v-if="globalUser.user.gender == 1">男</span>
					<span v-if="globalUser.user.gender != 1">女</span>
					<i class="cuIcon-right"></i>
				</text>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		<view class="cu-bar bg-white" @click="showModal" data-target="setPhone">
			<view class="action">
				<text class="text-black text-bold">手机号/ID</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>{{globalUser.phone}}</span>
					<i class="cuIcon-right"></i>
				</text>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		<view class="cu-bar bg-white" @click="showModal" data-target="setSign">
			<view class="action">
				<text class="text-black text-bold">签名</text> 
			</view>
			<view class="action">
				<p class="signture">
					{{globalUser.sign}}
				</p>
				<text class="text-grey text-bold">
					<i class="cuIcon-right"></i>
				</text>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		<view class="cu-bar bg-white"  @click="managerAddress">
			<view class="action">
				<text class="text-black text-bold">我的地址</text> 
			</view>
			<view class="action">
				<text class="text-grey text-bold">
					<span>查看</span>
					<i class="cuIcon-right"></i>
				</text>
			</view>
		</view>
		<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
		
		<view class="quit">
			<view class="cu-bar bg-blue" @click="modifyPassword(globalUser.phone,globalUser.password)">
				<view class="action">
					<text class="text-black text-bold"></text> 
				</view>
				<view class="action">
					<text class="text-white text-bold">修改密码</text> 
				</view>
				<view class="action">
					<text class="text-grey text-bold">
						<span></span>
						<i></i>
					</text>
				</view>
			</view>
			<div style="width: 100%;height: 2rpx;padding: 0;margin: 0;border: 0px;color: #878787;"></div>
			<view class="cu-bar bg-red"  @click="quit()">
				<view class="action">
					<text class="text-black text-bold"></text> 
				</view>
				<view class="action">
					<text class="text-white text-bold">退出登录</text> 
				</view>
				<view class="action">
					<text class="text-grey text-bold">
						<span></span>
						<i></i>
					</text>
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
				visible: false,
				newName: '',
				newSign: '',
				currentGender: 1,
				gender:[
					{key:"男",value:"1"},
					{key:"女",value:"0"}
				],
				modify_phone:'',
				globalUser:this.$store.state.role,
				url:this.$store.state.role.portrait_url
			}
		},
		onShow(){
			this.globalUser = this.$store.state.role;
			this.url = this.$store.state.role.portrait_url;
		},
		methods: {
			bigHead(){
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
				this.updateData();
				this.hideModal();
			},
			setGender(){
				this.updateData();
				this.hideModal()
			},
			setSign(){
				this.updateData();
				this.hideModal()
			},
			updateData(){
				uni.request({
					url:this.base+'/account/postUserUpdateData',
					method:'POST',
					data:{
						phone:uni.getStorageSync("phone"),
						name:this.newName == '' ? null : this.newName,
						gender:this.currentGender,
						sign:this.sign == "" ? null : this.newSign,
					},
					success: (res) => {
						console.log(res);
						this.$store.commit("save",res.data);
						this.globalUser = this.$store.state.role;
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			managerAddress(){
				uni.navigateTo({
					url: "/pages/plugin/setup/address",
					fail(err) {
						console.log(err)
					}
				})
			},
			modifyPhone(){
				uni.request({
					url:this.base + '/account/modifyPhone',
					method:"POST",
					data:{
						phone:uni.getStorageSync("phone"),
						modify_phone:this.modify_phone
					},
					success:(res)=> {
						if(res.data != false){
							this.$store.commit("save",res.data);
							this.globalUser = this.$store.state.role;
						} else {
							plus.nativeUI.alert('该手机号已被注册！');
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
				this.hideModal();
			},
			modifyPassword(phone,password){
				let newPassword = null;
				plus.nativeUI.prompt("请输入您的旧密码。", (e)=>{
						if(e.index == 0){
							if(e.value != password)  {
								plus.nativeUI.toast('密码错误。')
								return;
							}else{
								plus.nativeUI.prompt("请输入您的8位以上的新密码，由数字和至少一个字母组合。", (e)=>{
										if(e.index == 0){
											if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(e.value)==true){
												newPassword = e.value;
												plus.nativeUI.prompt("请在此确认您的密码。", (e)=>{
													if(e.index == 0){
														if(newPassword == e.value){
															uni.request({
																	url:this.base + '/account/postUserUpdateData',
																	method:"POST",
																	data:{
																		phone:phone,
																		password:newPassword
																	},
																	success: (res) => {
																		if(res.data != false){
																			console.log(res.data);
																			this.globalUser = res.data.password;
																			this.$store.commit("save",res.data);
																			plus.nativeUI.toast('修改密码成功。');
																		}
																	}
																})
														}else{
															plus.nativeUI.toast('两次密码不一致，修改密码失败。');
														}
													}
												}, "修改密码", "输入你的新密码...", ["确定","取消"]);
										}else{
											plus.nativeUI.toast('密码格式不正确，请重新操作。');
										}
									}
								}, "修改密码", "输入你的新密码...", ["确定","取消"]);
							}
						}
					}, "修改密码", "输入你的旧密码...", ["确定","取消"]);
			},
			quit(){
				uni.reLaunch({
					url:'../../index/login',
					success() {
						uni.setStorageSync('phone',null);
						uni.setStorageSync('role',null);
						this.$store.commit('clean');
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
.signture{
	width: 250px;
	height: 32px;
	margin: 8px;
	border-radius: 5px;
	line-height: 16px;
	font-size: 15px;
	float: right;
	text-align: right;
	text-overflow: ellipsis;
	overflow: hidden;
	/* 3. 文字溢出的时候用省略号来显示 */
	text-overflow: ellipsis;
	 display: -webkit-box;
	/* 限制在一个块元素显示的文本的行数 */
	-webkit-line-clamp: 2;
	/* 设置或检索伸缩盒对象的子元素的排列方式 */
	-webkit-box-orient: vertical;
}
.quit{
	position: absolute;
	bottom: 50px;
	width: 100%;
}
</style>
