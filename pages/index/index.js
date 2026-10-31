const cities = require("../../data/cities");

Page({
  data: { title: "趣游旅行攻略", searchText: "", cities, filteredCities: cities },

  onSearchInput(e) {
    const searchText = e.detail.value || "";
    const keyword = searchText.trim().toLowerCase();
    const filteredCities = keyword
      ? cities.filter(c => `${c.name}${c.tag}${c.desc}`.toLowerCase().includes(keyword))
      : cities;
    this.setData({ searchText, filteredCities });
  },

  openCity(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  goPlanner() { wx.navigateTo({ url: "/pages/planner/planner" }); },
  goDestinations() { wx.navigateTo({ url: "/pages/destinations/destinations" }); },
  goFavorites() { wx.navigateTo({ url: "/pages/favorites/favorites" }); }
});
