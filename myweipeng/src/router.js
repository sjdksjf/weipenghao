

import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import news from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import login from './components/login/login.vue';
import getback from './components/login/getback.vue';
import register from './components/login/register.vue';
/*自定义路径*/
import taskCenterlist from './components/taskCenter/taskCenterlist.vue';
import taskCenterlistSub from './components/taskCenter/taskCenterlistSub.vue';
import taskCenterinfo from './components/taskCenter/taskCenterinfo.vue';
import taskCenterSubmit from './components/taskCenter/taskCenterSubmit.vue';
import taskCenterReceive from './components/taskCenter/taskCenterReceive.vue';
import taskCenterRecord from './components/taskCenter/taskCenterRecord.vue';
import taskCenterDetails from './components/taskCenter/taskCenterDetails.vue';
import taskCenterSubmitlist from './components/taskCenter/taskCenterSubmitlist.vue';
import amaid from './components/amaid/maid.vue';
import qrcode from './components/qrcode/qrcode.vue';
import member from './components/member/member.vue';
import releasetask from './components/releasetask/releasetask.vue';
import personalhome from './components/personal/personalhome.vue';
import personalteam from './components/personal/personalteam.vue';
import personalteamdetails from './components/personal/personalteamdetails.vue';
import personalData from './components/personal/personalData.vue';
import personalPhone from './components/personal/personalPhone.vue';
import personalAddress from './components/personal/personalAddress.vue';
import personalAlipay from './components/personal/personalAlipay.vue';
import personalTotalIncome from './components/personal/personalTotalIncome.vue';
import personalTodayIncome from './components/personal/personalTodayIncome.vue';
import personalWithdeawal from './components/personal/personalWithdeawal.vue';
import allies from './components/allies/allies.vue';
import disport from './components/disport/disport.vue';
import cityWide from './components/cityWide/city.vue';
import cheap from './components/cheap/cheap.vue';
import exchange from './components/exchange/exchange.vue';
import fruitArea from './components/fruitArea/fruit.vue';
import advertising from './components/advertising/advertising.vue';
import receiveList from './components/receive/receiveList.vue';
import receiveinfo from './components/receive/receiveinfo.vue';
import activeCenterlist from './components/activeCenter/activeCenterlist.vue';
import activeCenterinfo from './components/activeCenter/activeCenterinfo.vue';
import feedback from './components/feedback/feedback.vue';
import customerService from './components/customerService/customerService.vue';
import joinUs from './components/joinUs/joinUs.vue';



export default[
    {path: '/login',component: login},
	{path: '/home',component: home},
	{path: '/shopcar',component: shopcar},
	{path: '/news/newlist',component: news},
	{path: '/news/newsinfo/:id',component: newsinfo},
	{path: '/photo/photolist',component: photolist},
	{path: '/photo/photoinfo/:id',component: photoinfo},
	{path: '/goods/goodslist',component: goodslist},
	{path: '/goods/goodsinfo/:id',component: goodsinfo},
	{path: '/goods/goodsdesc/:id',component: goodsdesc},
	{path: '/login/getback',component: getback},
	{path: '/login/register',component: register},
	{path: '/taskCenter/taskCenterlist',component: taskCenterlist},
    {path: '/taskCenter/taskCenterlistSub/:id',component: taskCenterlistSub},
	{path: '/taskCenter/taskCenterinfo',component: taskCenterinfo},
	{path: '/taskCenter/taskCenterSubmit/:id',component: taskCenterSubmit},
	{path: '/taskCenter/taskCenterReceive/:id',component: taskCenterReceive},
	{path: '/taskCenter/taskCenterRecord',component: taskCenterRecord},
    {path: '/taskCenter/taskCenterDetails',component: taskCenterDetails},
    {path: '/taskCenter/taskCenterSubmitlist',component: taskCenterSubmitlist},
	{path: '/amaid',component: amaid},
	{path: '/qrcode',component: qrcode},
	{path: '/member',component: member},
	{path: '/releasetask',component: releasetask},
	{path: '/personal/personalhome',component: personalhome},
	{path: '/personal/personalteam',component: personalteam},
    {path: '/personal/personalteamdetails/:id',component: personalteamdetails},
    {path: '/personal/personalData',component: personalData},
    {path: '/personal/personalPhone',component: personalPhone},
    {path: '/personal/personalAddress',component: personalAddress},
    {path: '/personal/personalAlipay',component: personalAlipay},
    {path: '/personal/personalTotalIncome',component: personalTotalIncome},
    {path: '/personal/personalTodayIncome',component: personalTodayIncome},
    {path: '/personal/personalWithdeawal',component: personalWithdeawal},
    {path: '/allies',component: allies},
    {path: '/disport',component: disport},
    {path: '/cityWide',component: cityWide},
    {path: '/cheap',component: cheap},
    {path: '/exchange',component: exchange},
    {path: '/fruitArea',component: fruitArea},
    {path: '/advertising',component: advertising},
    {path: '/receive/receiveList',component: receiveList},
    {path: '/receive/receiveinfo/:id',component: receiveinfo},
    {path: '/activeCenter/activeCenterlist',component: activeCenterlist},
    {path: '/activeCenter/activeCenterinfo',component: activeCenterinfo},
    {path: '/feedback',component: feedback},
    {path: '/customerService',component: customerService},
    {path: '/joinUs',component: joinUs},
  
   
]