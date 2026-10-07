# footwarsgame.com

FootWars oyununun tanıtım sitesi. Şu an çok dilli "çok yakında" sayfası.

- **Canlı:** https://footwarsgame.com
- **Oyun reposu:** ayrı repo (`footwars`, Godot 4)
- **Barındırma:** Vercel (bu repoya bağlı, `main` dalına her push otomatik yayınlanır)
- **DNS:** Cloudflare

## Yapı

Derleme adımı yok, saf statik dosyalar:

```
index.html    Sayfa iskeleti (metinler data-i18n anahtarlarıyla)
styles.css    Stil
app.js        Dil algılama ve çeviri sözlüğü (9 dil)
favicon.svg
vercel.json   Başlıklar, temiz URL'ler
robots.txt, sitemap.xml
```

## Diller

tr, en, de, es, pt, fr, ru, id, vi

Dil seçimi sırası: `?lang=` parametresi → localStorage → tarayıcı dili → en.
Yeni dil eklemek için `app.js` içindeki `I18N` sözlüğüne bir anahtar ekle ve `index.html` ile `sitemap.xml` içindeki dil listelerini güncelle.

## Yerel çalıştırma

Herhangi bir statik sunucu yeterli:

```bash
npx serve .
```
