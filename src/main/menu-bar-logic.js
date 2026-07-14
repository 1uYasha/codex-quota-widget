const MENU_BAR_QUOTA_SOURCES = Object.freeze(["weekly", "fiveHour"]);
const DEFAULT_MENU_BAR_QUOTA_SOURCE = "weekly";

function normalizeMenuBarQuotaSource(value) {
  return MENU_BAR_QUOTA_SOURCES.includes(value) ? value : DEFAULT_MENU_BAR_QUOTA_SOURCE;
}

function getMenuBarQuotaWindow(quota, source) {
  if (!quota || typeof quota !== "object") return null;
  return quota[normalizeMenuBarQuotaSource(source)] || null;
}

function getRemainingPercent(quota, source) {
  const value = Number(getMenuBarQuotaWindow(quota, source)?.remainingPercent);
  if (!Number.isFinite(value)) return null;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function formatMenuBarTitle(quota, source) {
  const percent = getRemainingPercent(quota, source);
  return ` ${percent === null ? "--" : percent}%`;
}

module.exports = {
  MENU_BAR_QUOTA_SOURCES,
  DEFAULT_MENU_BAR_QUOTA_SOURCE,
  normalizeMenuBarQuotaSource,
  getMenuBarQuotaWindow,
  getRemainingPercent,
  formatMenuBarTitle
};
