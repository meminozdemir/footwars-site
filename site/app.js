// Dil menüsü: her dilin kendi sayfası var (build.mjs). Seçilen dil "lang" çerezinde bir yıl hatırlanır;
// middleware.js ana sayfada bu seçimi tarayıcı dilinden ve ülkeden önce dikkate alır.
(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

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
