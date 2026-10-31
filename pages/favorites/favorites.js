const cities = require("../../data/cities");

Page({
  data: { favorites: [] },
  onShow() { this.refresh(); },
  refresh() {
    const saved = wx.getStorageSync("favoriteCities") || [];
    const favorites = saved.map(key => cities.find(c => c.id === key || c.name === key)).filter(Boolean);
    this.setData({ favorites });
  },
  openDetail(e) { wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` }); },
  remove(e) {
    const id = e.currentTarget.dataset.id;
    const city = cities.find(c => c.id === id);
    const favorites = (wx.getStorageSync("favoriteCities") || []).filter(v => v !== id && (!city || v !== city.name));
    wx.setStorageSync("favoriteCities", favorites);
    this.refresh();
  }
});
