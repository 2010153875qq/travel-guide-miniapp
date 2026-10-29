Page({
 data:{cities:[{name:"长沙",desc:"岳麓山、橘子洲与特色美食"},{name:"张家界",desc:"奇峰、山林与自然风光"},{name:"成都",desc:"熊猫、川味美食与街巷"},{name:"重庆",desc:"山城、江景与夜色"}]},
 onShow(){this.refresh()},
 refresh(){const saved=wx.getStorageSync("favoriteCities")||[];this.setData({cities:this.data.cities.map(c=>({...c,saved:saved.includes(c.name)}))})},
 toggle(e){const city=e.currentTarget.dataset.city;let saved=wx.getStorageSync("favoriteCities")||[];saved=saved.includes(city)?saved.filter(x=>x!==city):saved.concat(city);wx.setStorageSync("favoriteCities",saved);this.refresh();wx.showToast({title:saved.includes(city)?"已收藏":"已取消收藏",icon:"none"})}
});