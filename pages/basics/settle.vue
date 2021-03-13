<template>
	<view class="">
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content"><span style="font-weight: 900;">下单</span></block>
		</cu-custom>
		<div class="tab-item">
			<view style="float: left;width: 100%;margin: 5px auto;" v-for="i in 2">
				<view style="float: left;width: 81px;height: 81px;">
					<image style="width: 100%;height: 100%;border-radius: 6px;" src="../../static/11.png" mode=""></image>
				</view>
				<view style="float: left;height: 66px;margin-left: 10px;">
					<big><strong>名称</strong></big>
					<p>价格： <text>0.2/个</text></p>
					<p>数量 X <text>7</text></p>
				</view>
				<view style="float: right;margin-right: 10px;">
					<p>合计：10</p>
				</view>
			</view>
			<view style="float: left;width: 100%;margin-top: 10px;">
				<p style="float: right;margin-right: 10px;">总计：<b class="text-orange" style="font-size: 22px;line-height: 16px;">15</b>元</p>
			</view>
			<view class="time">
				<p>预约日期：<text @click="chooseDate">{{getDate}}</text></p>
				<p>
					预约时间：
					<text @click="chooseStart">{{getStartTime}}</text> 
					<text> ~ </text>
					<text @click="chooseEnd">{{getEndTime}}</text>
				</p>
			</view>
			<view class="note">
				<textarea value="" placeholder="添加备注" style="height: 60px;background-color: #f1f1f1;width: 100%;padding: 5px;"/>
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
				endTime:''
			}
		},
		created(){
			this.startTime = new Date();
			this.endTime = new Date(new Date().getTime()+60*60*1000);
			
		},
		computed:{
			getDate(){
				return this.startTime.format('yyyy-MM-dd');
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
					this.startTime=new Date(e.date);
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
			submit(){
				if(new Date(this.endTime) - new Date(this.startTime) < 60*60*1000){
					plus.nativeUI.toast("选择的时间段要在一小时以上！");
					return false;
				}
				plus.nativeUI.toast("成功！");
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
