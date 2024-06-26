import {
  require_dayjs_min
} from "./chunk-CCPUJRHH.js";
import {
  __commonJS
} from "./chunk-CEQRFMJQ.js";

// node_modules/dayjs/locale/en-gb.js
var require_en_gb = __commonJS({
  "node_modules/dayjs/locale/en-gb.js"(exports, module) {
    !function(e, a) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = a(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], a) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_en_gb = a(e.dayjs);
    }(exports, function(e) {
      "use strict";
      function a(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var t = a(e), _ = { name: "en-gb", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(e2) {
        var a2 = ["th", "st", "nd", "rd"], t2 = e2 % 100;
        return "[" + e2 + (a2[(t2 - 20) % 10] || a2[t2] || a2[0]) + "]";
      } };
      return t.default.locale(_, null, true), _;
    });
  }
});
export default require_en_gb();
//# sourceMappingURL=dayjs_locale_en-gb.js.map
