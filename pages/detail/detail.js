const cities = require("../../data/cities");

Page({
  data: { city: null, saved: false },
  onLoad(options) {
    const city = cities.find(c => c.id === options.id || c.name === options.name) || cities[0];
    const saved = (wx.getStorageSync("favoriteCities") || []).some(x => x === city.id || x === city.name);
    this.setData({ city, saved });
    wx.setNavigationBarTitle({ title: `${city.name}攻略` });
  },
  toggleFavorite() {
    const { city, saved } = this.data;
    let list = wx.getStorageSync("favoriteCities") || [];
    list = list.filter(x => x !== city.id && x !== city.name);
    if (!saved) list.push(city.id);
    wx.setStorageSync("favoriteCities", list);
    this.setData({ saved: !saved });
    wx.showToast({ title: saved ? "已取消收藏" : "已收藏", icon: "none" });
  },
  openMap() {
    const { city } = this.data;
    wx.openLocation({ latitude: Number(city.latitude), longitude: Number(city.longitude), name: city.name, address: city.address, scale: 14 });
  },
  goPlanner() { wx.navigateTo({ url: `/pages/planner/planner?city=${encodeURIComponent(this.data.city.name)}` }); }
});
