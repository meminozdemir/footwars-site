# footwarsgame.com

FootWars oyununun tanıtım sitesi. Şu an çok dilli "çok yakında" sayfası.

- **Canlı:** https://footwarsgame.com
- **Oyun reposu:** ayrı repo (`footwars`, Godot 4)
- **Barındırma:** Vercel, proje adı `footwars-site` (hobby takımı). `main` dalına her push otomatik yayınlanır.
- **DNS:** Cloudflare, proxy kapalı (A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com). www → apex 308 yönlendirme Vercel tarafında.

## Yapı

Bağımlılık yok. Sayfalar `node build.mjs` ile üretilir ve `site/` içinde depoya eklenir (Vercel derleme yapmaz, `site/` klasörünü yayınlar).

```
build.mjs       Her dil için statik sayfa + sitemap.xml üretir
src/page.html   Sayfa şablonu (metinler data-i18n / data-i18n-content / data-i18n-alt anahtarlarıyla)
src/i18n.mjs    Çeviri sözlüğü (9 dil)
middleware.js   Ana sayfada sunucu tarafı dil seçimi (çerez → tarayıcı → IP)
site/           Yayınlanan klasör
  index.html, <dil>/index.html, sitemap.xml   (build.mjs çıktısı, elle düzenlemeyin)
  styles.css    Stil (derlemede sayfaya gömülür)
  app.js        Dil menüsü
  fonts/        Inter ve Russo One (Google Fonts, SIL OFL), kendi sunucumuzdan
  hero.svg      Oyun sahnesi görseli
vercel.json     Başlıklar, önbellek, temiz URL'ler
```

Metin, stil ya da görsel değiştirdikten sonra `node build.mjs` çalıştırıp `site/` ile birlikte commit edin.

## Diller ve SEO

tr, en, de, es, pt, fr, ru, id, vi. Varsayılan dil İngilizce ve kökte (`/`); diğerleri `/<kod>` adresinde (`/tr`, `/de` …).

Her dil ayrı bir statik sayfadır: çevrilmiş metin HTML'in içindedir, sayfanın kendini gösteren canonical'ı, tüm diller için hreflang bağlantıları, dile göre başlık/açıklama/görsel alt metni/og:locale ve yapılandırılmış verisi (VideoGame, WebSite, GokTwins Tech yayıncı) vardır. Bu sayede Google her dili ayrı dizine ekler.

Dil seçimi (goktwins.com ile aynı mantık), `middleware.js` (yalnız `/`):

1. Eski `/?lang=<kod>` bağlantıları kalıcı olarak (308) yeni adrese yönlenir
2. Dil menüsünden yapılan seçim (`lang` çerezi, 1 yıl)
3. Botlar yönlendirilmez
4. Tarayıcı dili (`Accept-Language`, q sırasına göre): sitede olan ilk dil
5. IP ülkesinin dili (`x-vercel-ip-country`); yoksa İngilizce

Yeni dil eklemek için: `src/i18n.mjs`'e sözlüğü, `build.mjs` ve `middleware.js` içindeki `LANGS` listelerine kodu, `src/page.html`'deki dil menüsüne seçeneği ekleyin; `node build.mjs`.

## Performans

- Yazı tipleri kendi sunucumuzdan; Latin alt kümeleri `preload` ile erken iner, diğer alt kümeler (`unicode-range`) yalnızca gerektiğinde.
- `styles.css` sayfaya gömülür (ayrı istek yok).
- HTML'deki css/js/svg/webp adreslerine içerik özeti (`?v=`) eklenir; bu dosyalar ve yazı tipleri bir yıl `immutable` önbelleklenir. Yazı tipi dosyası değişirse dosya adını değiştirin.
