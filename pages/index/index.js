Page({
 data:{title:"趣游旅行攻略",searchText:"",cities:[{id:1,name:"长沙",desc:"美食与历史文化"},{id:2,name:"张家界",desc:"奇峰云海与自然风光"},{id:3,name:"成都",desc:"熊猫、火锅与慢生活"},{id:4,name:"重庆",desc:"山城夜景与特色美食"}]},
 onSearchInput(e){this.setData({searchText:e.detail.value})},
 openCity(e){const city=e.currentTarget.dataset.city;wx.showToast({title:city+"攻略即将上线",icon:"none"})},
 goPlanner(){wx.navigateTo({url:"/pages/planner/planner"})},
 goDestinations(){wx.navigateTo({url:"/pages/destinations/destinations"})},
 goFavorites(){wx.navigateTo({url:"/pages/favorites/favorites"})}
});