Page({
 data:{cities:[{name:"长沙",desc:"岳麓山、橘子洲与特色美食"},{name:"张家界",desc:"奇峰、山林与自然风光"},{name:"成都",desc:"熊猫、川味美食与街巷"},{name:"重庆",desc:"山城、江景与夜色"}],favorites:[]},
 onShow(){this.setData({favorites:wx.getStorageSync("favoriteCities")||[]})},
 toggle(e){const city=e.currentTarget.dataset.city;let favorites=this.data.favorites.slice();const index=favorites.indexOf(city);if(index>=0){favorites.splice(index,1)}else{favorites.push(city)}wx.setStorageSync("favoriteCities",favorites);this.setData({favorites});wx.showToast({title:index>=0?"已取消收藏":"已收藏",icon:"none"})}
});