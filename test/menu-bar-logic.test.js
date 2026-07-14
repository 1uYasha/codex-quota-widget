const test = require("node:test");
const assert = require("node:assert/strict");
const {
  DEFAULT_MENU_BAR_QUOTA_SOURCE,
  normalizeMenuBarQuotaSource,
  getRemainingPercent,
  formatMenuBarTitle
} = require("../src/main/menu-bar-logic");

const quota = {
  fiveHour: { remainingPercent: 88 },
  weekly: { remainingPercent: 76 }
};

test("menu bar quota source defaults to weekly", () => {
  assert.equal(normalizeMenuBarQuotaSource(undefined), DEFAULT_MENU_BAR_QUOTA_SOURCE);
  assert.equal(normalizeMenuBarQuotaSource("unexpected"), "weekly");
});

test("menu bar quota source preserves the five-hour selection", () => {
  assert.equal(normalizeMenuBarQuotaSource("fiveHour"), "fiveHour");
  assert.equal(getRemainingPercent(quota, "fiveHour"), 88);
  assert.equal(getRemainingPercent(quota, "weekly"), 76);
});

test("menu bar title contains the selected remaining percentage", () => {
  assert.equal(formatMenuBarTitle(quota, "weekly"), " 76%");
  assert.equal(formatMenuBarTitle(quota, "fiveHour"), " 88%");
  assert.equal(formatMenuBarTitle(null, "weekly"), " --%");
});

test("menu bar percentage is rounded and clamped", () => {
  assert.equal(getRemainingPercent({ weekly: { remainingPercent: 72.6 } }, "weekly"), 73);
  assert.equal(getRemainingPercent({ weekly: { remainingPercent: 140 } }, "weekly"), 100);
  assert.equal(getRemainingPercent({ weekly: { remainingPercent: -4 } }, "weekly"), 0);
});
