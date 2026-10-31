const cities = require("../../data/cities");

Page({
  data: { cities: [] },
  onShow() { this.refresh(); },
  refresh() {
    const saved = wx.getStorageSync("favoriteCities") || [];
    this.setData({ cities: cities.map(c => ({ ...c, saved: saved.includes(c.id) || saved.includes(c.name) })) });
  },
  openDetail(e) { wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` }); },
  toggle(e) {
    const city = e.currentTarget.dataset.city;
    let saved = wx.getStorageSync("favoriteCities") || [];
    const old = cities.find(c => c.id === city || c.name === city);
    const key = old ? old.id : city;
    const wasSaved = saved.includes(key) || saved.includes(old && old.name);
    saved = saved.filter(x => x !== key && (!old || x !== old.name));
    if (!wasSaved) saved.push(key);
    wx.setStorageSync("favoriteCities", saved);
    this.refresh();
    wx.showToast({ title: wasSaved ? "已取消收藏" : "已收藏", icon: "none" });
  }
});
