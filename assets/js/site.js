/* =========================================================================
   ZYFLORA — static site behaviour
   - 4-language i18n (TR / EN / FR / DE) persisted in localStorage
   - flag language switcher
   - smooth in-page scrolling with sticky-header offset
   - product "İrtibat" contact modal (phone + WhatsApp)
   - mobile navigation toggle
   No framework, no build step.
   ========================================================================= */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     CONTACT DETAILS  —  EDIT THESE to your real numbers.
     PHONE_DISPLAY : shown on screen
     PHONE_TEL     : used for tel: links (digits only, with country code)
     WHATSAPP      : international format, digits only (e.g. 905551234567)
     EMAIL         : contact e-mail
     ---------------------------------------------------------------------- */
  var CONTACT = {
    PHONE_DISPLAY: '0 555 123 45 67',
    PHONE_TEL: '+905551234567',
    WHATSAPP: '905551234567',
    EMAIL: 'info@zyflora.com',
    SOCIAL: {
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/'
    }
  };

  /* ---- i18n (verbatim from the design's ui_kits/website/i18n.js) ---- */
  var I18N = {
    tr: {
      nav_home: 'Ana Sayfa', nav_products: 'Ürünler', nav_about: 'Hakkımızda', nav_blog: 'Blog', nav_contact: 'İletişim',
      btn_order: 'İrtibat', aria_search: 'Ara', aria_account: 'Hesabım',
      top_promo1: 'Doğal, Katkısız ve Güvenilir Ürünler', top_promo2: 'Balıkesir Yaylalarından Doğal Bal', top_whatsapp: 'İrtibat',
      hero_eyebrow: 'Doğanın En Saf Hali,',
      hero_body: 'Doğadan sofranıza gelen şifa kaynağı ürünlerimizle bağışıklığınızı güçlendirin, sağlıklı yaşayın.',
      hero_cta1: 'Ürünleri Keşfet', hero_cta2: 'İrtibat',
      tc_natural_t: '%100 Doğal', tc_natural_s: 'Katkısız & Saf', tc_reliable_t: 'Güvenilir', tc_reliable_s: 'Üretim',
      tc_shipping_t: 'Ödüllü Bal', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Ürünlerimiz', sec_products_title: 'Doğal Ürünlerimiz',
      sec_products_sub: 'Doğadan sofranıza gelen saf lezzetler ve şifa kaynağı arı ürünleri.',
      p_cicek: 'Çiçek Balı', p_cicek_s: 'Doğal ve katkısız çiçek balı',
      p_kestane: 'Kestane Balı', p_kestane_s: 'Yoğun aromalı kestane balı',
      p_cam: 'Çam Balı', p_cam_s: 'Doğal çam balı',
      p_aycicek: 'Ayçiçek Balı', p_aycicek_s: '%100 doğal ayçiçek balı',
      p_polen: 'Polen', p_polen_s: 'Doğadan gelen enerji',
      p_perga: 'Perga', p_perga_s: 'Doğal arı ekmeği',
      badge_natural: '%100 Doğal', badge_new: 'Yeni', btn_view: 'Ürünü İncele',
      f1_eyebrow: 'Üretim', f1_title: 'Doğal Üretim, Güvenilir Tüketim',
      f1_body: 'ZYFLORA olarak arılarımıza ve doğaya duyduğumuz saygıyla üretim yapıyoruz.', f1_cta: 'Hakkımızda',
      fi_add_t: 'Katkısız', fi_add_s: '%100 Doğal', fi_rel_t: 'Güvenilir', fi_rel_s: 'Üretim',
      fi_lab_t: 'Laboratuvar', fi_lab_s: 'Kontrollü', fi_eco_t: 'Doğa Dostu', fi_eco_s: 'Ambalaj',
      f2_eyebrow: 'Doğanın Hediyesi', f2_title: 'Arıların Emeği, Doğanın Hediyesi',
      f2_body: 'Her bir ürünümüzde doğallığı ve kaliteyi bulacaksınız.', f2_cta: 'İrtibat',
      modal_eyebrow: 'İrtibat', modal_generic: 'İrtibat',
      modal_body: 'Ürünlerimiz hakkında bilgi almak için bizimle iletişime geçin. Telefon veya WhatsApp üzerinden size memnuniyetle yardımcı oluruz.',
      modal_line: 'İrtibat', modal_whatsapp: "WhatsApp'tan Yaz",
      ft_ship_t: 'Ödüllü Üretim', ft_ship_s: 'Balıkesir', ft_return_t: 'Üç Kuşak', ft_return_s: 'Arıcılık',
      ft_support_t: 'İrtibat', ft_support_s: 'Bize Ulaşın',
      ft_col_products: 'Ürünler', ft_p4: 'Polen & Perga', ft_col_corp: 'Kurumsal', corp_process: 'Üretim Süreci',
      ft_col_contact: 'İletişim', ft_address: 'Balıkesir, Türkiye',
      brand_tagline: 'Arılarımıza ve doğaya duyduğumuz saygıyla, doğadan sofranıza saf ve katkısız arı ürünleri.',
      ft_copyright: '© 2026 ZYFLORA — Arı ve Arı Ürünleri. Tüm hakları saklıdır.',
      ab_eyebrow: 'Hakkımızda', ab_title: "Balıkesir'in Ödüllü Balı",
      ab_lead: "ZYFLORA, Balıkesir'in bereketli yaylalarında üç kuşaktır arıcılık yapan bir ailenin emeğidir. Doğaya saygıyla, katkısız ve saf bal üretiyoruz.",
      ab_p2: "Arılarımız Kazdağları'nın çiçekli yamaçlarında özgürce dolaşır. Her kavanoz; sabırla, ustalıkla toplanan ve laboratuvar testlerinden geçmiş %100 doğal balla doldurulur.",
      ab_awards_title: 'Ödüllerimiz', ab_awards_sub: 'Yıllar içinde kazandığımız ulusal ve uluslararası ödüller.',
      award1: 'Altın Arı Ödülü 2024', award2: 'En İyi Doğal Bal 2023', award3: 'Balıkesir Tarım Ödülü 2022', award4: 'Uluslararası Kalite Madalyası',
      stat1_n: '25+', stat1_l: 'Yıl Deneyim', stat2_n: '12', stat2_l: 'Ulusal Ödül',
      stat3_n: '%100', stat3_l: 'Doğal Üretim', stat4_n: '3', stat4_l: 'Kuşak Arıcılık',
      ab_values_title: 'Değerlerimiz', ab_back: 'Ana Sayfaya Dön',
      bl_eyebrow: 'Blog', bl_title: 'Bal Günlüğü', bl_sub: 'Arıcılık, doğal yaşam ve balın faydaları üzerine yazılar.',
      post1_cat: 'Sağlık', post1_title: 'Balın Sağlığa 7 Faydası', post1_excerpt: 'Doğal balın bağışıklıktan cilt sağlığına kadar uzanan faydalarını derledik.', post1_date: '12 Haziran 2026',
      post2_cat: 'Üretim', post2_title: "Kazdağları'nda Bir Gün", post2_excerpt: 'Arılarımızın yaşadığı el değmemiş doğayı ve hasat sürecimizi anlattık.', post2_date: '28 Mayıs 2026',
      post3_cat: 'Tarifler', post3_title: 'Ballı Kahvaltı Tarifleri', post3_excerpt: 'Sofranıza doğallık katacak pratik ve lezzetli ballı kahvaltı önerileri.', post3_date: '9 Mayıs 2026',
      bl_readmore: 'Devamını Oku'
    },
    en: {
      nav_home: 'Home', nav_products: 'Products', nav_about: 'About Us', nav_blog: 'Blog', nav_contact: 'Contact',
      btn_order: 'Contact', aria_search: 'Search', aria_account: 'My Account',
      top_promo1: 'Natural, Additive-Free & Reliable Products', top_promo2: 'Natural Honey from the Balıkesir Highlands', top_whatsapp: 'Contact',
      hero_eyebrow: "Nature's Purest Form,",
      hero_body: 'Strengthen your immunity and live healthily with our healing products that come from nature to your table.',
      hero_cta1: 'Explore Products', hero_cta2: 'Contact',
      tc_natural_t: '100% Natural', tc_natural_s: 'Additive-Free & Pure', tc_reliable_t: 'Reliable', tc_reliable_s: 'Production',
      tc_shipping_t: 'Award-Winning', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Our Products', sec_products_title: 'Our Natural Products',
      sec_products_sub: 'Pure flavors and healing bee products that come from nature to your table.',
      p_cicek: 'Flower Honey', p_cicek_s: 'Natural, additive-free flower honey',
      p_kestane: 'Chestnut Honey', p_kestane_s: 'Intensely aromatic chestnut honey',
      p_cam: 'Pine Honey', p_cam_s: 'Natural pine honey',
      p_aycicek: 'Sunflower Honey', p_aycicek_s: '100% natural sunflower honey',
      p_polen: 'Pollen', p_polen_s: 'Energy from nature',
      p_perga: 'Perga', p_perga_s: 'Natural bee bread',
      badge_natural: '100% Natural', badge_new: 'New', btn_view: 'View Product',
      f1_eyebrow: 'Production', f1_title: 'Natural Production, Reliable Consumption',
      f1_body: 'At ZYFLORA, we produce with respect for our bees and nature.', f1_cta: 'About Us',
      fi_add_t: 'Additive-Free', fi_add_s: '100% Natural', fi_rel_t: 'Reliable', fi_rel_s: 'Production',
      fi_lab_t: 'Laboratory', fi_lab_s: 'Tested', fi_eco_t: 'Eco-Friendly', fi_eco_s: 'Packaging',
      f2_eyebrow: "Nature's Gift", f2_title: "The Bees' Labor, Nature's Gift",
      f2_body: "You'll find naturalness and quality in every one of our products.", f2_cta: 'Contact',
      modal_eyebrow: 'Contact', modal_generic: 'Contact',
      modal_body: "Get in touch to learn more about our products. We're happy to help by phone or WhatsApp.",
      modal_line: 'Contact', modal_whatsapp: 'Message on WhatsApp',
      ft_ship_t: 'Award-Winning', ft_ship_s: 'Balıkesir', ft_return_t: 'Three Generations', ft_return_s: 'of Beekeeping',
      ft_support_t: 'Contact', ft_support_s: 'Get in Touch',
      ft_col_products: 'Products', ft_p4: 'Pollen & Perga', ft_col_corp: 'Corporate', corp_process: 'Production Process',
      ft_col_contact: 'Contact', ft_address: 'Balıkesir, Türkiye',
      brand_tagline: 'With respect for our bees and nature, pure and additive-free bee products from nature to your table.',
      ft_copyright: '© 2026 ZYFLORA — Bee & Bee Products. All rights reserved.',
      ab_eyebrow: 'About Us', ab_title: "Balıkesir's Award-Winning Honey",
      ab_lead: 'ZYFLORA is the work of a family that has practiced beekeeping for three generations in the fertile highlands of Balıkesir. We produce pure, additive-free honey with respect for nature.',
      ab_p2: 'Our bees roam freely on the flowering slopes of the Kaz Mountains. Every jar is filled with 100% natural honey — patiently and skillfully harvested, and laboratory-tested.',
      ab_awards_title: 'Our Awards', ab_awards_sub: 'National and international awards earned over the years.',
      award1: 'Golden Bee Award 2024', award2: 'Best Natural Honey 2023', award3: 'Balıkesir Agriculture Award 2022', award4: 'International Quality Medal',
      stat1_n: '25+', stat1_l: 'Years of Experience', stat2_n: '12', stat2_l: 'National Awards',
      stat3_n: '100%', stat3_l: 'Natural Production', stat4_n: '3', stat4_l: 'Generations of Beekeeping',
      ab_values_title: 'Our Values', ab_back: 'Back to Home',
      bl_eyebrow: 'Blog', bl_title: 'Honey Journal', bl_sub: 'Articles on beekeeping, natural living and the benefits of honey.',
      post1_cat: 'Health', post1_title: '7 Health Benefits of Honey', post1_excerpt: 'We rounded up the benefits of natural honey, from immunity to skin health.', post1_date: 'June 12, 2026',
      post2_cat: 'Production', post2_title: 'A Day in the Kaz Mountains', post2_excerpt: 'A look at the untouched nature our bees live in and our harvest process.', post2_date: 'May 28, 2026',
      post3_cat: 'Recipes', post3_title: 'Honey Breakfast Recipes', post3_excerpt: 'Practical and delicious honey breakfast ideas to bring nature to your table.', post3_date: 'May 9, 2026',
      bl_readmore: 'Read More'
    },
    fr: {
      nav_home: 'Accueil', nav_products: 'Produits', nav_about: 'À propos', nav_blog: 'Blog', nav_contact: 'Contact',
      btn_order: 'Contact', aria_search: 'Rechercher', aria_account: 'Mon compte',
      top_promo1: 'Produits naturels, sans additifs et fiables', top_promo2: 'Miel naturel des hauts plateaux de Balıkesir', top_whatsapp: 'Contact',
      hero_eyebrow: 'La forme la plus pure de la nature,',
      hero_body: 'Renforcez votre immunité et vivez sainement avec nos produits curatifs qui viennent de la nature à votre table.',
      hero_cta1: 'Découvrir les produits', hero_cta2: 'Contact',
      tc_natural_t: '100% Naturel', tc_natural_s: 'Sans additifs & pur', tc_reliable_t: 'Fiable', tc_reliable_s: 'Production',
      tc_shipping_t: 'Primé', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Nos produits', sec_products_title: 'Nos produits naturels',
      sec_products_sub: 'Des saveurs pures et des produits de la ruche curatifs qui viennent de la nature à votre table.',
      p_cicek: 'Miel de fleurs', p_cicek_s: 'Miel de fleurs naturel et sans additifs',
      p_kestane: 'Miel de châtaignier', p_kestane_s: "Miel de châtaignier à l'arôme intense",
      p_cam: 'Miel de pin', p_cam_s: 'Miel de pin naturel',
      p_aycicek: 'Miel de tournesol', p_aycicek_s: 'Miel de tournesol 100% naturel',
      p_polen: 'Pollen', p_polen_s: "L'énergie de la nature",
      p_perga: 'Perga', p_perga_s: "Pain d'abeille naturel",
      badge_natural: '100% Naturel', badge_new: 'Nouveau', btn_view: 'Voir le produit',
      f1_eyebrow: 'Production', f1_title: 'Production naturelle, consommation fiable',
      f1_body: 'Chez ZYFLORA, nous produisons avec respect pour nos abeilles et la nature.', f1_cta: 'À propos',
      fi_add_t: 'Sans additifs', fi_add_s: '100% Naturel', fi_rel_t: 'Fiable', fi_rel_s: 'Production',
      fi_lab_t: 'Laboratoire', fi_lab_s: 'Contrôlé', fi_eco_t: 'Écologique', fi_eco_s: 'Emballage',
      f2_eyebrow: 'Le cadeau de la nature', f2_title: 'Le labeur des abeilles, le cadeau de la nature',
      f2_body: 'Vous trouverez le naturel et la qualité dans chacun de nos produits.', f2_cta: 'Contact',
      modal_eyebrow: 'Contact', modal_generic: 'Contact',
      modal_body: 'Contactez-nous pour en savoir plus sur nos produits. Nous vous aidons volontiers par téléphone ou WhatsApp.',
      modal_line: 'Contact', modal_whatsapp: 'Écrire sur WhatsApp',
      ft_ship_t: 'Primé', ft_ship_s: 'Balıkesir', ft_return_t: 'Trois générations', ft_return_s: "d'apiculture",
      ft_support_t: 'Contact', ft_support_s: 'Contactez-nous',
      ft_col_products: 'Produits', ft_p4: 'Pollen & Perga', ft_col_corp: 'Entreprise', corp_process: 'Processus de production',
      ft_col_contact: 'Contact', ft_address: 'Balıkesir, Turquie',
      brand_tagline: 'Avec respect pour nos abeilles et la nature, des produits apicoles purs et sans additifs de la nature à votre table.',
      ft_copyright: '© 2026 ZYFLORA — Abeilles et produits apicoles. Tous droits réservés.',
      ab_eyebrow: 'À propos', ab_title: 'Le miel primé de Balıkesir',
      ab_lead: "ZYFLORA est l'œuvre d'une famille qui pratique l'apiculture depuis trois générations dans les hauts plateaux fertiles de Balıkesir. Nous produisons un miel pur et sans additifs, dans le respect de la nature.",
      ab_p2: 'Nos abeilles parcourent librement les pentes fleuries des monts Kaz. Chaque pot est rempli de miel 100% naturel, récolté avec patience et savoir-faire et testé en laboratoire.',
      ab_awards_title: 'Nos récompenses', ab_awards_sub: 'Prix nationaux et internationaux remportés au fil des années.',
      award1: "Prix de l'Abeille d'Or 2024", award2: 'Meilleur miel naturel 2023', award3: "Prix de l'agriculture de Balıkesir 2022", award4: 'Médaille internationale de qualité',
      stat1_n: '25+', stat1_l: "Ans d'expérience", stat2_n: '12', stat2_l: 'Prix nationaux',
      stat3_n: '100%', stat3_l: 'Production naturelle', stat4_n: '3', stat4_l: "Générations d'apiculture",
      ab_values_title: 'Nos valeurs', ab_back: "Retour à l'accueil",
      bl_eyebrow: 'Blog', bl_title: 'Journal du miel', bl_sub: "Articles sur l'apiculture, la vie naturelle et les bienfaits du miel.",
      post1_cat: 'Santé', post1_title: '7 bienfaits du miel pour la santé', post1_excerpt: "Nous avons réuni les bienfaits du miel naturel, de l'immunité à la peau.", post1_date: '12 juin 2026',
      post2_cat: 'Production', post2_title: 'Une journée dans les monts Kaz', post2_excerpt: 'Un aperçu de la nature préservée où vivent nos abeilles et de notre récolte.', post2_date: '28 mai 2026',
      post3_cat: 'Recettes', post3_title: 'Recettes de petit-déjeuner au miel', post3_excerpt: 'Des idées de petit-déjeuner au miel pratiques et délicieuses.', post3_date: '9 mai 2026',
      bl_readmore: 'Lire la suite'
    },
    de: {
      nav_home: 'Startseite', nav_products: 'Produkte', nav_about: 'Über uns', nav_blog: 'Blog', nav_contact: 'Kontakt',
      btn_order: 'Kontakt', aria_search: 'Suche', aria_account: 'Mein Konto',
      top_promo1: 'Natürliche, zusatzfreie und zuverlässige Produkte', top_promo2: 'Natürlicher Honig aus dem Hochland von Balıkesir', top_whatsapp: 'Kontakt',
      hero_eyebrow: 'Die reinste Form der Natur,',
      hero_body: 'Stärken Sie Ihre Immunität und leben Sie gesund mit unseren heilenden Produkten, die von der Natur auf Ihren Tisch kommen.',
      hero_cta1: 'Produkte entdecken', hero_cta2: 'Kontakt',
      tc_natural_t: '100% Natürlich', tc_natural_s: 'Zusatzfrei & rein', tc_reliable_t: 'Zuverlässig', tc_reliable_s: 'Produktion',
      tc_shipping_t: 'Preisgekrönt', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Unsere Produkte', sec_products_title: 'Unsere Naturprodukte',
      sec_products_sub: 'Reine Aromen und heilende Bienenprodukte, die von der Natur auf Ihren Tisch kommen.',
      p_cicek: 'Blütenhonig', p_cicek_s: 'Natürlicher, zusatzfreier Blütenhonig',
      p_kestane: 'Kastanienhonig', p_kestane_s: 'Intensiv aromatischer Kastanienhonig',
      p_cam: 'Kiefernhonig', p_cam_s: 'Natürlicher Kiefernhonig',
      p_aycicek: 'Sonnenblumenhonig', p_aycicek_s: '100% natürlicher Sonnenblumenhonig',
      p_polen: 'Pollen', p_polen_s: 'Energie aus der Natur',
      p_perga: 'Perga', p_perga_s: 'Natürliches Bienenbrot',
      badge_natural: '100% Natürlich', badge_new: 'Neu', btn_view: 'Produkt ansehen',
      f1_eyebrow: 'Produktion', f1_title: 'Natürliche Produktion, zuverlässiger Konsum',
      f1_body: 'Bei ZYFLORA produzieren wir mit Respekt für unsere Bienen und die Natur.', f1_cta: 'Über uns',
      fi_add_t: 'Zusatzfrei', fi_add_s: '100% Natürlich', fi_rel_t: 'Zuverlässig', fi_rel_s: 'Produktion',
      fi_lab_t: 'Labor', fi_lab_s: 'Geprüft', fi_eco_t: 'Umweltfreundlich', fi_eco_s: 'Verpackung',
      f2_eyebrow: 'Geschenk der Natur', f2_title: 'Die Arbeit der Bienen, das Geschenk der Natur',
      f2_body: 'In jedem unserer Produkte finden Sie Natürlichkeit und Qualität.', f2_cta: 'Kontakt',
      modal_eyebrow: 'Kontakt', modal_generic: 'Kontakt',
      modal_body: 'Kontaktieren Sie uns, um mehr über unsere Produkte zu erfahren. Wir helfen Ihnen gerne per Telefon oder WhatsApp.',
      modal_line: 'Kontakt', modal_whatsapp: 'Auf WhatsApp schreiben',
      ft_ship_t: 'Preisgekrönt', ft_ship_s: 'Balıkesir', ft_return_t: 'Drei Generationen', ft_return_s: 'Imkerei',
      ft_support_t: 'Kontakt', ft_support_s: 'Kontaktieren Sie uns',
      ft_col_products: 'Produkte', ft_p4: 'Pollen & Perga', ft_col_corp: 'Unternehmen', corp_process: 'Produktionsprozess',
      ft_col_contact: 'Kontakt', ft_address: 'Balıkesir, Türkei',
      brand_tagline: 'Mit Respekt für unsere Bienen und die Natur, reine und zusatzfreie Bienenprodukte von der Natur auf Ihren Tisch.',
      ft_copyright: '© 2026 ZYFLORA — Bienen & Bienenprodukte. Alle Rechte vorbehalten.',
      ab_eyebrow: 'Über uns', ab_title: 'Balıkesirs preisgekrönter Honig',
      ab_lead: 'ZYFLORA ist das Werk einer Familie, die seit drei Generationen im fruchtbaren Hochland von Balıkesir Imkerei betreibt. Wir produzieren reinen, zusatzfreien Honig mit Respekt vor der Natur.',
      ab_p2: 'Unsere Bienen streifen frei über die blühenden Hänge des Kaz-Gebirges. Jedes Glas wird mit 100% natürlichem Honig gefüllt – geduldig und kunstvoll geerntet und im Labor geprüft.',
      ab_awards_title: 'Unsere Auszeichnungen', ab_awards_sub: 'Nationale und internationale Auszeichnungen über die Jahre.',
      award1: 'Goldene-Biene-Preis 2024', award2: 'Bester Naturhonig 2023', award3: 'Balıkesir Landwirtschaftspreis 2022', award4: 'Internationale Qualitätsmedaille',
      stat1_n: '25+', stat1_l: 'Jahre Erfahrung', stat2_n: '12', stat2_l: 'Nationale Preise',
      stat3_n: '100%', stat3_l: 'Natürliche Produktion', stat4_n: '3', stat4_l: 'Generationen Imkerei',
      ab_values_title: 'Unsere Werte', ab_back: 'Zurück zur Startseite',
      bl_eyebrow: 'Blog', bl_title: 'Honig-Tagebuch', bl_sub: 'Artikel über Imkerei, natürliches Leben und die Vorteile von Honig.',
      post1_cat: 'Gesundheit', post1_title: '7 gesundheitliche Vorteile von Honig', post1_excerpt: 'Wir haben die Vorteile von natürlichem Honig zusammengestellt – von Immunität bis Haut.', post1_date: '12. Juni 2026',
      post2_cat: 'Produktion', post2_title: 'Ein Tag im Kaz-Gebirge', post2_excerpt: 'Ein Blick auf die unberührte Natur unserer Bienen und unseren Ernteprozess.', post2_date: '28. Mai 2026',
      post3_cat: 'Rezepte', post3_title: 'Honig-Frühstücksrezepte', post3_excerpt: 'Praktische und köstliche Honig-Frühstücksideen für Ihren Tisch.', post3_date: '9. Mai 2026',
      bl_readmore: 'Weiterlesen'
    }
  };

  /* ---- inline flag SVGs for the language switcher ---- */
  var FLAGS = {
    tr: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#E30A17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.4" cy="10" r="4" fill="#E30A17"/><polygon points="17.20,7.00 17.93,8.99 20.05,9.07 18.39,10.39 18.96,12.43 17.20,11.25 15.44,12.43 16.01,10.39 14.35,9.07 16.47,8.99" fill="#fff"/></svg>',
    gb: '<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg"><clipPath id="ukc"><rect width="60" height="30"/></clipPath><g clip-path="url(#ukc)"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2.5"/><rect x="25" width="10" height="30" fill="#fff"/><rect y="10" width="60" height="10" fill="#fff"/><rect x="27" width="6" height="30" fill="#C8102E"/><rect y="12" width="60" height="6" fill="#C8102E"/></g></svg>',
    fr: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="20" fill="#002395"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ED2939"/></svg>',
    de: '<svg viewBox="0 0 30 18" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="6" fill="#000"/><rect y="6" width="30" height="6" fill="#DD0000"/><rect y="12" width="30" height="6" fill="#FFCE00"/></svg>'
  };
  var LANG_LIST = [
    { code: 'tr', flag: 'tr', label: 'Türkçe' },
    { code: 'en', flag: 'gb', label: 'English' },
    { code: 'fr', flag: 'fr', label: 'Français' },
    { code: 'de', flag: 'de', label: 'Deutsch' }
  ];

  /* ---- language state ---- */
  function getLang() {
    var l;
    try { l = localStorage.getItem('zy_lang'); } catch (e) {}
    return I18N[l] ? l : 'tr';
  }
  function setLang(l) {
    l = I18N[l] ? l : 'tr';
    try { localStorage.setItem('zy_lang', l); } catch (e) {}
    return l;
  }
  var lang = getLang();
  function t(key) {
    var dict = I18N[lang] || I18N.tr;
    if (dict[key] != null) return dict[key];
    if (I18N.tr[key] != null) return I18N.tr[key];
    return key;
  }

  /* ---- apply translations to the DOM ---- */
  function applyI18n() {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      document.title = t(el.getAttribute('data-i18n-title')) + ' — ZYFLORA';
    });
    // update active flag buttons
    document.querySelectorAll('.zy-lang button').forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  /* ---- build the flag switcher into every .zy-lang container ---- */
  function buildLangSwitchers() {
    document.querySelectorAll('.zy-lang').forEach(function (host) {
      if (host.dataset.built) return;
      host.dataset.built = '1';
      host.setAttribute('role', 'group');
      host.setAttribute('aria-label', 'Dil / Language');
      LANG_LIST.forEach(function (L) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('data-lang', L.code);
        b.setAttribute('title', L.label);
        b.setAttribute('aria-label', L.label);
        b.innerHTML = FLAGS[L.flag];
        b.addEventListener('click', function () {
          lang = setLang(L.code);
          applyI18n();
        });
        host.appendChild(b);
      });
    });
  }

  /* ---- smooth scroll with header offset ---- */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  function currentFile() {
    var p = window.location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }
  function wireAnchors() {
    var here = currentFile();
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var hi = href.indexOf('#');
      if (hi < 0) return;
      var id = href.slice(hi + 1);
      if (!id) {
        // bare "#" placeholder link (e.g. blog teaser): don't lurch to top
        if (href === '#') {
          a.addEventListener('click', function (e) { e.preventDefault(); });
        }
        return;
      }
      var path = href.slice(0, hi); // '', 'index.html', 'blog.html', ...
      var samePage = path === '' || path === here;
      if (samePage && document.getElementById(id)) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          closeMobileNav();
          scrollToId(id);
          history.replaceState(null, '', '#' + id);
        });
      }
    });
    // honour an incoming #hash (e.g. arriving from another page) with offset
    if (window.location.hash) {
      var hid = window.location.hash.slice(1);
      window.requestAnimationFrame(function () { setTimeout(function () { scrollToId(hid); }, 60); });
    }
  }

  /* ---- mobile nav ---- */
  function closeMobileNav() {
    var nav = document.querySelector('.zy-nav');
    var burger = document.querySelector('.zy-burger');
    if (nav) nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  function wireMobileNav() {
    var burger = document.querySelector('.zy-burger');
    var nav = document.querySelector('.zy-nav');
    if (!burger || !nav) return;
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- product / generic contact modal ---- */
  var PRODUCT_IMG = {
    cicek: 'assets/img/urun-cicek.jpg', kestane: 'assets/img/urun-kestane.jpg',
    cam: 'assets/img/urun-cam.jpg', aycicek: 'assets/img/urun-aycicek.jpg',
    polen: 'assets/img/urun-polen.jpg', perga: 'assets/img/urun-perga.jpg'
  };
  function whatsappLink(productName) {
    var base = 'https://wa.me/' + CONTACT.WHATSAPP;
    var msg = productName
      ? 'Merhaba, "' + productName + '" hakkında bilgi almak istiyorum.'
      : 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.';
    return base + '?text=' + encodeURIComponent(msg);
  }
  function openModal(opts) {
    opts = opts || {};
    var overlay = document.getElementById('zy-modal');
    if (!overlay) return;
    var name = opts.id ? t('p_' + opts.id) : t('modal_generic');
    var img = opts.id ? PRODUCT_IMG[opts.id] : 'assets/img/hero-honey.jpg';
    overlay.querySelector('.zy-modal-img').style.backgroundImage = 'url("' + img + '")';
    overlay.querySelector('.zy-modal-title').textContent = name;
    var wa = overlay.querySelector('.zy-modal-wa');
    wa.setAttribute('href', whatsappLink(opts.id ? name : ''));
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.zy-modal-close').focus();
  }
  var lastTrigger = null;
  function closeModal() {
    var overlay = document.getElementById('zy-modal');
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    lastTrigger = null;
  }
  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    var overlay = document.getElementById('zy-modal');
    if (!overlay || overlay.hidden) return;
    var f = overlay.querySelectorAll('a[href], button:not([disabled])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  function wireModal() {
    var overlay = document.getElementById('zy-modal');
    if (!overlay) return;
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('.zy-modal-close').addEventListener('click', closeModal);
    document.querySelectorAll('[data-contact]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        lastTrigger = el;
        openModal({ id: el.getAttribute('data-contact') || null });
      });
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'Tab') trapFocus(e);
    });
  }

  /* ---- inject live contact details into the static markup ---- */
  function applyContact() {
    document.querySelectorAll('[data-tel]').forEach(function (a) {
      a.setAttribute('href', 'tel:' + CONTACT.PHONE_TEL.replace(/\s/g, ''));
    });
    document.querySelectorAll('[data-phone-display]').forEach(function (el) {
      el.textContent = CONTACT.PHONE_DISPLAY;
    });
    document.querySelectorAll('[data-mail]').forEach(function (a) {
      a.setAttribute('href', 'mailto:' + CONTACT.EMAIL);
      if (a.hasAttribute('data-mail-text')) a.textContent = CONTACT.EMAIL;
    });
    document.querySelectorAll('[data-wa-generic]').forEach(function (a) {
      a.setAttribute('href', whatsappLink(''));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-social]').forEach(function (a) {
      var key = a.getAttribute('data-social');
      var url = CONTACT.SOCIAL && CONTACT.SOCIAL[key];
      if (url) {
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
    });
  }

  /* ---- boot ---- */
  function init() {
    buildLangSwitchers();
    applyContact();
    applyI18n();
    wireAnchors();
    wireMobileNav();
    wireModal();
    document.body.classList.remove('zy-cloak');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
