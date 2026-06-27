# ZYFLORA — Statik Tanıtım Sitesi

Balıkesir yaylalarından doğal bal ve arı ürünleri için **statik** tanıtım sitesi.
Tamamen HTML/CSS/JavaScript ile yazılmıştır — derleme (build) adımı yoktur, doğrudan
GitHub Pages, Netlify, Vercel veya herhangi bir statik sunucuda yayınlanabilir.

Tasarım, "Zyflora Design System" handoff paketindeki (React tabanlı) prototipin
piksel sadakatiyle statik HTML'e dönüştürülmüş halidir.

## İçindekiler

```
zyflora-website/
├── index.html          # Ana sayfa (hero, ürünler, üretim, iletişim, ürün modalı)
├── hakkimizda.html     # Hakkımızda (hikâye, istatistikler, ödüller, değerler)
├── blog.html           # Blog (Bal Günlüğü — örnek yazı kartları)
├── 404.html            # Markalı "sayfa bulunamadı" sayfası (GitHub Pages otomatik kullanır)
├── robots.txt          # Arama motorları için (tümüne izin)
├── assets/
│   ├── css/styles.css  # Tüm tasarım token'ları + bileşen stilleri + responsive
│   ├── js/site.js      # Dil (i18n), menü, kaydırma, ürün modalı, iletişim
│   ├── img/            # Marka ve ürün görselleri + og-image.jpg (sosyal paylaşım)
│   └── logo/           # Logo (altıgen rozet) + favicon/apple-touch-icon
├── .nojekyll           # GitHub Pages'in dosyaları olduğu gibi sunması için
└── README.md
```

## ⚙️ İletişim bilgilerini güncelleyin (ÖNEMLİ)

Telefon, WhatsApp, e-posta ve sosyal medya bağlantıları tek bir yerden yönetilir.
`assets/js/site.js` dosyasının en üstündeki `CONTACT` nesnesini kendi bilgilerinizle
değiştirin — tüm sayfalardaki butonlar otomatik olarak güncellenir:

```js
var CONTACT = {
  PHONE_DISPLAY: '0 555 123 45 67',     // ekranda görünen numara
  PHONE_TEL:     '+905551234567',       // tel: bağlantısı (ülke koduyla)
  WHATSAPP:      '905551234567',        // wa.me numarası (yalnızca rakam, ülke koduyla)
  EMAIL:         'info@zyflora.com',     // iletişim e-postası
  SOCIAL: {
    instagram: 'https://www.instagram.com/KULLANICI_ADINIZ',
    facebook:  'https://www.facebook.com/SAYFANIZ'
  }
};
```

Bu değerler değişmeden de site çalışır; ancak yayına almadan önce gerçek
numaranızı ve hesaplarınızı girmeniz önerilir.

## 🔘 Butonlar / bağlantılar — hepsi çalışır

| Buton / bağlantı | Davranış |
|---|---|
| Üst bar / footer telefon | `tel:` ile arama başlatır |
| Hero **Ürünleri Keşfet** | Ürünler bölümüne yumuşak kaydırma |
| Hero / header **İrtibat** | İletişim bölümüne kaydırma |
| Ürün kartı **Ürünü İncele** | İletişim modalını açar (telefon + WhatsApp) |
| Modal **WhatsApp'tan Yaz** | İlgili ürün adıyla `wa.me` sohbeti açar |
| Üretim/Doğa kartları | Hakkımızda sayfası / İletişim |
| **Hakkımızda → Ana Sayfaya Dön** | Ana sayfa |
| Dil bayrakları (TR/EN/FR/DE) | Anında dil değiştirir, tercihi hatırlar |
| Menü (mobil ☰) | Açılır navigasyonu açar/kapatır |
| Footer e-posta | `mailto:` açar |
| Footer Instagram / Facebook / WhatsApp | İlgili hesabı/sohbeti yeni sekmede açar |

> **Not — Blog yazıları:** Blog kartları örnek (placeholder) içeriktir ve gerçek bir
> yazı sayfasına bağlı değildir (`href="#"`). Gerçek yazılarınız olduğunda her kartın
> `href` değerini ilgili yazı adresiyle değiştirin.

## 📤 Sosyal paylaşım & SEO

- Her sayfada **Open Graph / Twitter Card** etiketleri var; bağlantı WhatsApp,
  Facebook veya X'te paylaşıldığında başlık, açıklama ve `assets/img/og-image.jpg`
  önizleme görseliyle güzel görünür.
- Hafif **favicon** (`assets/logo/favicon.png`, 64×64) ve **apple-touch-icon** (180×180)
  eklendi; sayfa içi logo da 256px sürümü kullanır (orijinal 1024px master dosya
  `assets/logo/zyflora-badge.png` olarak durur, sayfalar tarafından yüklenmez).
- `robots.txt` arama motorlarına izin verir, `404.html` markalı hata sayfasıdır.
- **İsteğe bağlı:** Bazı paylaşım botları mutlak (absolute) görsel adresi ister.
  Alan adınız belli olduğunda, her sayfadaki `og:image`/`twitter:image` değerini
  `https://ALANINIZ/assets/img/og-image.jpg` olarak güncelleyebilirsiniz (göreli
  haliyle de çoğu durumda çalışır).

## 🌐 Diller

Site 4 dilde gelir: **Türkçe (varsayılan), İngilizce, Fransızca, Almanca.**
Tüm metinler `assets/js/site.js` içindeki `I18N` nesnesinde tutulur; düzenlemek
veya yeni dil eklemek için orayı güncellemeniz yeterlidir. Seçilen dil tarayıcıda
(`localStorage`) saklanır.

## 🚀 GitHub Pages ile yayınlama

1. Bu klasörün **içeriğini** yeni bir GitHub deposunun köküne koyun
   (yani `index.html` deponun kökünde olmalı).
2. Depoyu GitHub'a gönderin:
   ```bash
   git init
   git add .
   git commit -m "Zyflora tanıtım sitesi"
   git branch -M main
   git remote add origin https://github.com/KULLANICI/DEPO.git
   git push -u origin main
   ```
3. GitHub'da depo → **Settings → Pages** → **Source: Deploy from a branch** →
   **Branch: `main` / `/ (root)`** seçip kaydedin.
4. Birkaç dakika içinde siteniz `https://KULLANICI.github.io/DEPO/` adresinde yayında olur.

Alternatif olarak klasörü olduğu gibi **Netlify** veya **Vercel**'e sürükleyip
bırakarak da yayınlayabilirsiniz.

## 🧪 Yerelde önizleme

Tarayıcı `file://` üzerinden de açılır, ancak en doğru sonuç için basit bir sunucu:

```bash
cd zyflora-website
python3 -m http.server 8080
# tarayıcıda: http://localhost:8080
```

## Bağımlılıklar

- **Yazı tipleri:** Google Fonts (Cormorant Garamond, Montserrat, Nunito Sans) — `<link>` ile.
- **İkonlar:** Lucide ikon seti, her sayfaya **gömülü SVG sprite** olarak dahil (harici istek yok).
- **Bayraklar:** satır içi SVG (harici istek yok).
- React, build aracı veya paket yöneticisi **gerekmez**.

---

© 2026 ZYFLORA — Arı ve Arı Ürünleri. Tasarım: Zyflora Design System handoff paketi.
