Page({
  data: { city: "长沙", days: 3, budget: "1500", plan: [] },
  onLoad(options = {}) {
    const saved = wx.getStorageSync("lastTravelPlan");
    if (saved && typeof saved === "object" && Array.isArray(saved.plan)) {
      this.setData({
        city: typeof saved.city === "string" ? saved.city : "长沙",
        days: Math.min(7, Math.max(1, Math.floor(Number(saved.days) || 1))),
        budget: saved.budget == null ? "" : String(saved.budget),
        plan: saved.plan
      });
    }
    if (options.city) {
      let requestedCity = options.city;
      try { requestedCity = decodeURIComponent(requestedCity); } catch (_) {}
      if (requestedCity !== this.data.city) this.setData({ city: requestedCity, plan: [] });
    }
  },
  onCity(e) { this.setData({ city: e.detail.value }); },
  onDays(e) { this.setData({ days: e.detail.value }); },
  onBudget(e) { this.setData({ budget: e.detail.value }); },
  generate() {
    const city = (this.data.city || "").trim();
    if (!city) { wx.showToast({ title: "请输入目的地", icon: "none" }); return; }
    const days = Math.min(7, Math.max(1, Math.floor(Number(this.data.days) || 1)));
    const ideas = ["抵达目的地、游览市中心、品尝当地美食", "参观当地代表性景点、傍晚休闲散步", "体验特色街区与当地文化", "安排自然风景或郊区一日游", "体验博物馆与特色市集", "自由探索、拍照与美食", "购买伴手礼、整理行李和返程"];
    const plan = ideas.slice(0, days).map((activity, i) => ({ day: i + 1, activity }));
    this.setData({ city, plan, days });
    wx.setStorageSync("lastTravelPlan", { city, days, budget: this.data.budget, plan, savedAt: Date.now() });
    wx.showToast({ title: "行程已保存", icon: "success" });
  }
});
