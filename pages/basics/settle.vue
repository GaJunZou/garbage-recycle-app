<template>
	<view class="">
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">下单</span></block>
		</cu-custom>
		<div class="tab-item">
			<view style="float: left;width: 100%;margin: 5px auto;" v-for="(v,i) in order" :key="i">
				<view style="float: left;width: 81px;height: 81px;">
					<image style="width: 100%;height: 100%;border-radius: 6px;" src="../../static/11.png" mode=""></image>
				</view>
				<view style="float: left;height: 66px;margin-left: 10px;">
					<big><strong>{{v.waste_name}}</strong></big>
					<p>价格： <text>{{v.price}}/个</text></p>
					<p>数量 X <text>{{v.number}}</text></p>
				</view>
				<view style="float: right;margin-right: 10px;">
					<p>合计：{{((v.number*v.price)*100).toFixed(2)/100}}</p>
				</view>
			</view>
			<view style="float: left;width: 100%;margin-top: 10px;">
				<p style="float: right;margin-right: 10px;">总计：<b class="text-orange" style="font-size: 22px;line-height: 16px;">{{(price_all*100).toFixed(2)/100}}</b>元</p>
			</view>
			<view class="time">
				<p>预约日期：<text @click="chooseDate">{{getDate}}</text></p>
				<p>
					预约上门：
					<text @click="chooseStart">{{getStartTime}}</text> 
					<text> ~ </text>
					<text @click="chooseEnd">{{getEndTime}}</text>
				</p>
			</view>
			<view style="margin: 10px auto;">
				<p style="height: 25px;">
					<text>地址：</text>
					<text @click="chooseAddress" style="border: 2px;float: right;padding: 0 10px;"class="lines-orange cuIcon-writefill">
						{{JSON.stringify(address) == '{}' ? '添加' : '修改'}}
					</text>
				</p>
				<p style="color: #424242">
					<text v-if="JSON.stringify(address) !== '{}'">
						{{address.province}}{{address.city}}{{address.area}}{{address.town}}{{address.street}}{{address.detail}}
					</text>
					<text v-else>
						暂无地址
					</text>
				</p>
			</view>
			<view class="note">
				<textarea value="" placeholder="添加备注" v-model="note" style="height: 60px;background-color: #f1f1f1;width: 100%;padding: 5px;"/>
			</view>
			<view class="btn-group">
				<button class="cu-btn round bg-orange" @click="submit">确认下单</button>
				<button class="cu-btn round lines-grey">取消订单</button>
			</view>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				date:'',
				startTime:'',
				endTime:'',
				startDate:'',
				order:[],
				price_all:0,
				note:'',
				address:{}
			}
		},
		onShow() {
			this.order = this.$store.state.orderList;
			console.log(this.order);
			this.price_all = 0;
			this.order.forEach((v,i)=>{
				this.price_all = this.price_all + v.price*v.number;
			})
			let id = uni.getStorageSync('choose_id');
			if(id == null){
				this.$store.state.role.user.address.forEach((v)=>{
					if(v.default == true){
						this.address = v;
					}
				});
			} else {
				this.$store.state.role.user.address.forEach((v)=>{
					if(v._id == id){
						this.address = v;
					}
				});
			}
			uni.setStorageSync('choose_id',null);
		},
		created(){
			this.startDate = new Date();
			this.startTime = new Date();
			this.endTime = new Date(new Date().getTime()+60*60*1000);
		},
		computed:{
			getDate(){
				return this.startDate.format('yyyy-MM-dd');
			},
			getStartTime(){
				return this.startTime.format('hh:mm');
			},
			getEndTime(){
				return this.endTime.format('hh:mm');
			}
		},
		methods:{
			chooseDate(){
				var styles = {};
				styles.title = "请选择上门回收日期"
				plus.nativeUI.pickDate((e)=>{
					this.startDate=new Date(e.date);
				}, (e)=>{
					console.log( "未选择时间："+e.message );
				},styles);
			},
			chooseStart(){
				var styles = {};
				styles.title = "请选择开始时间";	//设置标题
				styles.time = new Date();//设置默认显示时间为早上6点
				plus.nativeUI.pickTime((e)=>{
					this.startTime=new Date(e.date);
				}, (e)=>{
					console.log( "未选择时间："+e.message );
				},styles);
			},
			chooseEnd(){
				var styles = {};
				styles.title = "请选择截至时间";	//设置标题
				styles.time = new Date();//设置默认显示时间为早上6点
				plus.nativeUI.pickTime((e)=>{
					this.endTime=new Date(e.date);
				}, (e)=>{
					console.log( "未选择时间："+e.message );
				},styles);
			},
			chooseAddress(){
				uni.navigateTo({
					url: '/pages/plugin/setup/address?choose=choose&id='+this.address._id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			submit(){
				if(new Date(this.endTime) - new Date(this.startTime) < 60*60*1000){
					plus.nativeUI.toast("选择的时间段要在一小时以上！");
					return false;
				}
				uni.request({
					url:this.base+'/order/user/add',
					method:"POST",
					data:{
						    belong_phone: uni.getStorageSync('phone'),
						    belong_name: this.$store.state.role.name,
						    wastes: this.order,
						    waste_price_all: (this.price_all*100).toFixed(2)/100,
						    release_time: new Date().format('yyyy-MM-dd hh:mm:ss'),
						    address:this.address,
						    // address_crood: ".。。。。。。。。。。。",
						    note: this.note,
						    start_time: this.startDate.format('yyyy-MM-dd') + " " + this.startTime.format('hh:mm:ss'),
						    end_time: this.startDate.format('yyyy-MM-dd') + " " + this.endTime.format('hh:mm:ss')
					},
					success: (res) => {
						console.log(res.data);
						uni.navigateTo({
							url: '/pages/basics/success'
						});
					},
					fail: (err) => {
						console.log(err);
					}
				})
				// plus.nativeUI.toast("成功！");
			}
		}
	}
</script>

<style>
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
	.time p{
		font-size: 14px;
		margin: 10px auto;
	}
	.time text{
		font-weight: 700;
		font-size: 16px;
		color: #39B54A;
	}
</style>

