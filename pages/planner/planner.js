Page({
  data: { city: "长沙", days: 3, budget: "1500", plan: [] },
  onLoad(options) { if (options.city) this.setData({ city: decodeURIComponent(options.city) }); },
  onCity(e) { this.setData({ city: e.detail.value }); },
  onDays(e) { this.setData({ days: Number(e.detail.value) || 1 }); },
  onBudget(e) { this.setData({ budget: e.detail.value }); },
  generate() {
    const city = (this.data.city || "").trim();
    if (!city) { wx.showToast({ title: "请输入目的地", icon: "none" }); return; }
    const days = Math.min(7, Math.max(1, Number(this.data.days) || 1));
    const ideas = ["抵达目的地、游览市中心、品尝当地美食", "参观当地代表性景点、傍晚休闲散步", "体验特色街区与当地文化", "安排自然风景或郊区一日游", "体验博物馆与特色市集", "自由探索、拍照与美食", "购买伴手礼、整理行李和返程"];
    const plan = ideas.slice(0, days).map((activity, i) => ({ day: i + 1, activity }));
    this.setData({ plan, days });
    wx.setStorageSync("lastTravelPlan", { city, days, budget: this.data.budget, plan, savedAt: Date.now() });
    wx.showToast({ title: "行程已保存", icon: "success" });
  }
});
