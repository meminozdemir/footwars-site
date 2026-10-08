// Dil menüsü: her dilin kendi sayfası var (build.mjs). Seçilen dil "lang" çerezinde bir yıl hatırlanır;
// middleware.js ana sayfada bu seçimi tarayıcı dilinden ve ülkeden önce dikkate alır.
(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // 404 sayfası (build.mjs): metinleri ziyaretçinin diline çevirir. Sıra: adresteki dil klasörü (/de/...),
  // "lang" çerezi, tarayıcı dili; hiçbiri yoksa sayfa varsayılan dilde kalır.
  var nf = document.body.getAttribute("data-nf");
  if (nf) {
    var texts = JSON.parse(nf);
    var saved = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
    var candidates = [location.pathname.split("/")[1], saved && saved[1]].concat(navigator.languages || [navigator.language]);
    for (var c = 0; c < candidates.length; c++) {
      var code = String(candidates[c] || "").toLowerCase().split("-")[0];
      if (!texts[code]) continue;
      var t = texts[code];
      document.documentElement.lang = code;
      document.title = "404 – " + t.title + document.title.slice(document.title.lastIndexOf(" | "));
      document.getElementById("nf-title").textContent = t.title;
      document.getElementById("nf-lead").textContent = t.lead;
      var back = document.getElementById("nf-back");
      back.textContent = t.back;
      back.setAttribute("href", t.path);
      var keyed = document.querySelectorAll("[data-k]");
      for (var e = 0; e < keyed.length; e++) {
        var value = t.k[keyed[e].getAttribute("data-k")];
        if (value !== undefined) keyed[e].textContent = value;
      }
      var sel = document.getElementById("lang");
      if (sel) sel.value = code;
      break;
    }
  }

  var select = document.getElementById("lang");
  if (!select) return;
  select.addEventListener("change", function () {
    var option = select.options[select.selectedIndex];
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = "lang=" + encodeURIComponent(select.value) + "; Path=/; Max-Age=31536000; SameSite=Lax" + secure;
    location.href = option.getAttribute("data-path") || "/";
  });

  // Eski sürüm dil seçimini localStorage'da tutuyordu; artık çerezde.
  try { localStorage.removeItem("footwars.lang"); } catch (e) { /* özel pencere vb. */ }
})();
