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
     WHATSAPP      : international format, digits only (e.g. 905438477916)
     ---------------------------------------------------------------------- */
  var CONTACT = {
    PHONE_DISPLAY: '+90 543 847 79 16',
    PHONE_TEL: '+905438477916',
    WHATSAPP: '905438477916',
    SOCIAL: {
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/'
    }
  };

  /* ---- i18n (verbatim from the design's ui_kits/website/i18n.js) ---- */
  var I18N = {
    tr: {
      nav_home: 'Ana Sayfa', nav_products: 'Ürünler', nav_about: 'Hakkımızda', nav_blog: 'Blog', nav_contact: 'İletişim',
      btn_order: 'İrtibat', aria_search: 'Ara', aria_account: 'Hesabım', aria_close: 'Kapat',
      top_promo1: 'Doğal, Katkısız ve Güvenilir Ürünler', top_promo2: 'Balıkesir Yaylalarından Doğal Bal', top_whatsapp: 'İrtibat',
      hero_eyebrow: 'Doğanın En Saf Hali,',
      hero_body: 'Doğadan sofranıza gelen şifa kaynağı ürünlerimizle bağışıklığınızı güçlendirin, sağlıklı yaşayın.',
      hero_cta1: 'Ürünleri Keşfet', hero_cta2: 'İrtibat',
      tc_natural_t: '%100 Doğal', tc_natural_s: 'Katkısız & Saf', tc_reliable_t: 'Güvenilir', tc_reliable_s: 'Üretim',
      tc_shipping_t: 'Ödüllü Bal', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Ürünlerimiz', sec_products_title: 'Doğal Ürünlerimiz',
      sec_products_sub: 'Doğadan sofranıza gelen saf lezzetler ve şifa kaynağı arı ürünleri.',
      p_cicek: 'Çiçek Balı', p_cicek_s: 'Doğal ve katkısız çiçek balı',
      p_mese: 'Meşe Balı', p_mese_s: 'Kendine özgü odunsu aromalı meşe balı',
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
      modal_body_cicek: "Balıkesir'in zengin bitki örtüsü ve temiz doğasında, ilkbahar aylarında açan birbirinden farklı kır çiçeklerinden elde edilen bahar balımız, kendine özgü aroması ve doğal lezzetiyle sofralarınıza ulaşır. Arılarımızın özenle topladığı nektarlardan üretilen bu bal, hiçbir katkı maddesi içermez. Doğal yapısı gereği zamanla kristalleşmesi kalite kaybı değil, doğallığının bir göstergesidir. Doğanın en saf lezzetlerinden biri olan Balıkesir Bahar Balı'nı güvenle tüketebilir, sevdiklerinizle paylaşabilirsiniz.",
      modal_body_mese: "Balıkesir'in zengin bitki örtüsü ve temiz doğasında, yaz aylarında meşe ağaçlarının salgıları ile elde edilen meşe balımız, kendine özgü aroması ve doğal lezzetiyle sofralarınıza ulaşır. Arılarımızın özenle topladığı nektarlardan üretilen bu bal, hiçbir katkı maddesi içermez. Balıkesir'in eşsiz doğasından sofralarınıza ulaşan doğal Meşe Balımızı güvenle tüketebilir, gerçek Meşe balının kendine özgü odunsu aromasını keşfedebilirsiniz.",
      modal_body_kestane: "Balıkesir'in Erdek ilçesinde yer alan eşsiz Kapıdağ Yarımadası'nın zengin kestane ormanlarında üretilen kestane balımız, yoğun aroması, koyu rengi ve kendine özgü hafif buruk tadıyla öne çıkar. Arılarımız, kestane çiçeklerinden topladıkları nektarı tamamen doğal yöntemlerle bala dönüştürür. Hiçbir katkı maddesi veya koruyucu içermez. Kapıdağ'ın eşsiz doğasından sofralarınıza ulaşan doğal Kestane Balımızı güvenle tüketebilir, gerçek kestane balının zengin aromasını keşfedebilirsiniz.",
      modal_body_cam: "Balıkesir'in doğal güzellikleriyle ünlü Kozak Yaylası'nda, geniş çam ormanlarının eşsiz ekosisteminde üretilen çam balımız; kendine özgü aroması, akışkan yapısı ve zengin mineral içeriğiyle öne çıkar. Doğal koşullarda üretilen çam balımız hiçbir katkı maddesi içermez. Çiçek balından farklı olarak çam ağaçlarında yaşayan doğal salgı kaynaklarından elde edilir. Geç kristalleşmesi, çam balının doğal özelliklerinden biridir.",
      modal_body_polen: "Balıkesir'in zengin florasında yetişen binlerce çiçekten arılar tarafından özenle toplanan polen, doğanın en değerli arı ürünlerinden biridir. Renk, şekil ve aroma bakımından mevsime ve bitki çeşitliliğine göre doğal farklılıklar gösterebilir. Polenimiz, hasat sonrası hijyenik koşullarda temizlenip kurutularak tazeliği korunacak şekilde ambalajlanır. Hiçbir katkı maddesi veya koruyucu içermez. Bilgilendirme: Polen bir arı ürünüdür. Arı ürünlerine karşı alerjisi bulunan kişilerin kullanmadan önce dikkatli olması önerilir.",
      modal_body_perga: "Balıkesir'in zengin bitki örtüsünden arılar tarafından toplanan polenlerin, kovan içerisinde doğal enzimler ve bal ile fermente edilmesiyle oluşan perga (arı ekmeği), arıların en değerli besin kaynaklarından biridir. Pergamız, doğal yapısını koruyacak şekilde özenle hasat edilip hijyenik koşullarda ambalajlanır. Hiçbir katkı maddesi, koruyucu veya yapay içerik bulundurmaz. Renk, tat ve doku; mevsime ve bölgedeki bitki çeşitliliğine bağlı olarak doğal farklılıklar gösterebilir. Bilgilendirme: Perga bir arı ürünüdür. Arı ürünlerine karşı alerjisi bulunan kişilerin kullanmadan önce dikkatli olması önerilir.",
      modal_image_alt_cicek: 'Balıkesir kır çiçekleri üzerinde bal arısı',
      modal_image_alt_kestane: "Kapıdağ'da kestane çiçekleri ve arı kovanları",
      modal_line: 'İrtibat', modal_whatsapp: "WhatsApp'tan Yaz",
      wa_message_generic: 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.',
      wa_message_product: 'Merhaba, "{product}" hakkında bilgi almak istiyorum.',
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
      stat1_n: '25+', stat1_l: 'Yıl Deneyim',
      stat3_n: '%100', stat3_l: 'Doğal Üretim', stat4_n: '3', stat4_l: 'Kuşak Arıcılık',
      ab_values_title: 'Değerlerimiz', ab_back: 'Ana Sayfaya Dön',
      bl_eyebrow: 'Blog', bl_title: 'Bal Günlüğü', bl_sub: 'Arıcılık, doğal yaşam ve balın faydaları üzerine yazılar.',
      post1_cat: 'Sağlık', post1_title: 'Balın Sağlığa 7 Faydası', post1_excerpt: 'Doğal balın bağışıklıktan cilt sağlığına kadar uzanan faydalarını derledik.', post1_date: '12 Haziran 2026',
      post2_cat: 'Üretim', post2_title: "Kazdağları'nda Bir Gün", post2_excerpt: 'Arılarımızın yaşadığı el değmemiş doğayı ve hasat sürecimizi anlattık.', post2_date: '28 Mayıs 2026',
      post3_cat: 'Tarifler', post3_title: 'Ballı Kahvaltı Tarifleri', post3_excerpt: 'Sofranıza doğallık katacak pratik ve lezzetli ballı kahvaltı önerileri.', post3_date: '9 Mayıs 2026',
      post1_p1: 'Bal; doğal şekerlerin yanı sıra kaynağına göre değişen aroma bileşenleri ve antioksidanlar içeren bir gıdadır. Tek başına bir tedavi değildir; dengeli beslenmenin ölçülü bir parçası olarak değerlendirilmelidir.',
      post1_p2: 'Balın günlük yaşamda öne çıkan yedi yönü; hızlı enerji sağlaması, sıcak içeceklere doğal tat katması, boğazı rahatlatan geleneksel kullanımı, yoğurt ve yulafı lezzetlendirmesi, soslara kıvam vermesi, farklı çiçek kaynaklarından zengin aromalar taşıması ve rafine şekere alternatif olarak ölçülü kullanılabilmesidir.',
      post1_p3: 'Bal da şeker içerdiği için porsiyon kontrolü önemlidir. Bir yaşından küçük bebeklere bal verilmemeli; özel sağlık durumu bulunan kişiler tüketim konusunda sağlık uzmanına danışmalıdır.',
      post2_p1: 'Arılıkta gün, hava koşullarını ve arıların uçuş hareketini gözlemleyerek başlar. Çevredeki çiçeklenme, temiz su kaynakları ve kovan girişlerindeki hareket bize kolonilerin günlük durumu hakkında ilk ipuçlarını verir.',
      post2_p2: 'Kovanları gereksiz yere rahatsız etmeden besin stoğu, yavru gelişimi ve koloni düzeni kontrol edilir. Hasat için yalnızca olgunlaşmış ve büyük ölçüde sırlanmış petekler seçilir; arıların ihtiyacı olan bal kovanda bırakılır.',
      post2_p3: 'Hasat edilen petekler hijyenik koşullarda süzülür, dinlendirilir ve doğal yapısı korunarak ambalajlanır. Her aşamada temizlik, izlenebilirlik ve doğaya saygı üretim yaklaşımımızın temelini oluşturur.',
      post3_p1: 'Pratik bir kahvaltı kâsesi için yoğurt, yulaf, mevsim meyvesi ve cevizi bir araya getirip üzerine bir tatlı kaşığı çiçek balı gezdirebilirsiniz. Bal, malzemeleri bastırmadan doğal bir tatlılık ve çiçeksi aroma katar.',
      post3_p2: 'Kızarmış ekmek üzerinde tahin ve bal ikilisi doyurucu bir seçenek oluşturur. Daha hafif bir tabak için taze peynir, elma veya armut dilimleri, ceviz ve az miktarda kestane balını birlikte servis edebilirsiniz.',
      post3_p3: 'Balın kendine özgü aromasını korumak için çok sıcak yiyecek ve içecekleri biraz soğuttuktan sonra ekleyin. Farklı bal çeşitlerini küçük porsiyonlarla deneyerek kahvaltınıza uygun lezzet dengesini bulabilirsiniz.',
      blog_feature_eyebrow: 'Balıkesir’den Sofralara',
      blog_feature_title: "Balıkesir'in Bereketini, ZYFLORA Güvencesiyle Sofralarınıza Taşıyoruz",
      blog_feature_p1: "Balıkesir; verimli ovaları, zengin bitki örtüsü, temiz havası ve doğal yaşamıyla Türkiye'nin önemli arıcılık bölgelerinden biridir. İlkbaharda rengârenk çiçeklerle bezenen ovalar, yaz aylarında zengin orman ekosistemleriyle buluşarak arılar için eşsiz bir yaşam alanı oluşturur.",
      blog_feature_p2: "ZYFLORA olarak, arılarımızın Balıkesir'in doğal florasında özgürce çalışmasına özen gösteriyor; doğanın sunduğu nektar, polen ve bitkisel kaynakları özenle arı ürünlerine dönüştürüyoruz. Bahar balı, kestane balı, çam balı, polen, perga ve propolis ürünlerimizi doğaya saygılı üretim anlayışıyla, kalite ve güveni ön planda tutarak sizlerle buluşturuyoruz.",
      blog_feature_p3: "Bizim için her kavanoz bal, Balıkesir'in bereketli ovalarının, yemyeşil doğasının ve arılarımızın sabırla verdiği emeğin bir yansımasıdır. Ürünlerimizin doğal yapısını koruyarak, katkı maddesi kullanmadan ve hijyenik koşullarda sizlere ulaştırmayı ilke ediniyoruz.",
      blog_feature_p4: "ZYFLORA, Balıkesir'in doğasından aldığı ilhamla; güvenilir, doğal ve kaliteli arı ürünlerini sofralarınıza ulaştırmanın gururunu yaşamaktadır.",
      blog_feature_image_alt: 'Bal peteği üzerinde çalışan arılar',
      bl_readmore: 'Devamını Oku'
    },
    en: {
      nav_home: 'Home', nav_products: 'Products', nav_about: 'About Us', nav_blog: 'Blog', nav_contact: 'Contact',
      btn_order: 'Contact', aria_search: 'Search', aria_account: 'My Account', aria_close: 'Close',
      top_promo1: 'Natural, Additive-Free & Reliable Products', top_promo2: 'Natural Honey from the Balıkesir Highlands', top_whatsapp: 'Contact',
      hero_eyebrow: "Nature's Purest Form,",
      hero_body: 'Strengthen your immunity and live healthily with our healing products that come from nature to your table.',
      hero_cta1: 'Explore Products', hero_cta2: 'Contact',
      tc_natural_t: '100% Natural', tc_natural_s: 'Additive-Free & Pure', tc_reliable_t: 'Reliable', tc_reliable_s: 'Production',
      tc_shipping_t: 'Award-Winning', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Our Products', sec_products_title: 'Our Natural Products',
      sec_products_sub: 'Pure flavors and healing bee products that come from nature to your table.',
      p_cicek: 'Flower Honey', p_cicek_s: 'Natural, additive-free flower honey',
      p_mese: 'Oak Honey', p_mese_s: 'Oak honey with a unique woody aroma',
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
      modal_body_cicek: "Our spring honey is produced from a variety of wildflowers blooming in Balıkesir's rich flora and clean countryside. It reaches your table with its distinctive aroma and natural flavor. Made from nectar carefully gathered by our bees, it contains no additives. Crystallization over time is not a loss of quality; it is a natural characteristic of pure honey. Enjoy Balıkesir Spring Honey with confidence and share one of nature's purest flavors with those you love.",
      modal_body_mese: "Produced from the secretions of oak trees during summer in the rich flora and clean nature of Balıkesir, our oak honey reaches your tables with its unique aroma and natural flavor. Produced from nectars carefully collected by our bees, this honey contains no additives. You can safely consume our natural Oak Honey, which comes from the unique nature of Balıkesir to your tables, and discover the distinctive woody aroma of real oak honey.",
      modal_body_kestane: "Produced in the rich chestnut forests of the unique Kapıdağ Peninsula located in the Erdek district of Balıkesir, our chestnut honey stands out with its intense aroma, dark color, and characteristic slightly tart taste. Our bees transform the nectar they collect from chestnut flowers into honey using completely natural methods. It contains no additives or preservatives. You can safely consume our natural Chestnut Honey, which comes from the unique nature of Kapıdağ to your tables, and discover the rich aroma of real chestnut honey.",
      modal_body_cam: "Produced in the unique ecosystem of the vast pine forests of Kozak Plateau, one of Balıkesir's renowned natural areas, our pine honey stands out with its characteristic aroma, fluid texture and rich mineral content. It is produced under natural conditions and contains no additives. Unlike flower honey, it comes from natural honeydew sources found on pine trees. Its slow crystallization is one of pine honey's natural characteristics.",
      modal_body_polen: "Carefully gathered by bees from thousands of flowers in Balıkesir's rich flora, pollen is one of nature's most valuable bee products. Its color, shape and aroma may vary naturally with the season and plant diversity. After harvest, our pollen is cleaned and dried under hygienic conditions, then packaged to preserve its freshness. It contains no additives or preservatives. Please note: Pollen is a bee product. People with allergies to bee products should use it with caution.",
      modal_body_perga: "Perga (bee bread) is formed when pollen gathered by bees from Balıkesir's rich flora is naturally fermented inside the hive with enzymes and honey. It is one of the bees' most valuable food sources. Our perga is carefully harvested and hygienically packaged to preserve its natural structure. It contains no additives, preservatives or artificial ingredients. Color, flavor and texture may vary naturally with the season and local plant diversity. Please note: Perga is a bee product. People with allergies to bee products should use it with caution.",
      modal_image_alt_cicek: 'Honey bee on wildflowers in Balıkesir',
      modal_image_alt_kestane: 'Chestnut blossoms and beehives in Kapıdağ',
      modal_line: 'Contact', modal_whatsapp: 'Message on WhatsApp',
      wa_message_generic: 'Hello, I would like to learn more about your products.',
      wa_message_product: 'Hello, I would like to learn more about "{product}".',
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
      stat1_n: '25+', stat1_l: 'Years of Experience',
      stat3_n: '100%', stat3_l: 'Natural Production', stat4_n: '3', stat4_l: 'Generations of Beekeeping',
      ab_values_title: 'Our Values', ab_back: 'Back to Home',
      bl_eyebrow: 'Blog', bl_title: 'Honey Journal', bl_sub: 'Articles on beekeeping, natural living and the benefits of honey.',
      post1_cat: 'Health', post1_title: '7 Health Benefits of Honey', post1_excerpt: 'We rounded up the benefits of natural honey, from immunity to skin health.', post1_date: 'June 12, 2026',
      post2_cat: 'Production', post2_title: 'A Day in the Kaz Mountains', post2_excerpt: 'A look at the untouched nature our bees live in and our harvest process.', post2_date: 'May 28, 2026',
      post3_cat: 'Recipes', post3_title: 'Honey Breakfast Recipes', post3_excerpt: 'Practical and delicious honey breakfast ideas to bring nature to your table.', post3_date: 'May 9, 2026',
      post1_p1: 'Honey is a food containing natural sugars as well as aromatic compounds and antioxidants that vary with its floral source. It is not a treatment on its own and is best enjoyed in moderation as part of a balanced diet.',
      post1_p2: 'Seven everyday qualities often associated with honey are quick energy, natural sweetness in warm drinks, its traditional use for throat comfort, flavor in yogurt and oats, texture in sauces, distinctive aromas from different flowers, and measured use as an alternative to refined sugar.',
      post1_p3: 'Because honey still contains sugar, portion control matters. Honey must not be given to infants under one year old, and people with specific health conditions should consult a qualified health professional about consumption.',
      post2_p1: 'A day at the apiary begins by observing the weather and the bees’ flight activity. Flowering plants, clean water sources and movement at the hive entrances provide the first clues about each colony’s daily condition.',
      post2_p2: 'Without disturbing the hives unnecessarily, we check food stores, brood development and colony organization. Only mature, mostly capped combs are selected for harvest, while the honey the bees need is left in the hive.',
      post2_p3: 'Harvested combs are extracted under hygienic conditions, allowed to rest and packed while preserving the honey’s natural character. Cleanliness, traceability and respect for nature guide every stage of our production.',
      post3_p1: 'For an easy breakfast bowl, combine yogurt, oats, seasonal fruit and walnuts, then drizzle with a teaspoon of flower honey. It adds natural sweetness and a floral aroma without overpowering the other ingredients.',
      post3_p2: 'Tahini and honey on toast make a satisfying option. For a lighter plate, serve fresh cheese with apple or pear slices, walnuts and a small amount of chestnut honey.',
      post3_p3: 'To preserve honey’s distinctive aroma, add it after very hot foods and drinks have cooled slightly. Try different honey varieties in small portions to find the balance that best suits your breakfast.',
      blog_feature_eyebrow: 'From Balıkesir to Your Table',
      blog_feature_title: "Bringing Balıkesir's Abundance to Your Table with ZYFLORA Assurance",
      blog_feature_p1: "With its fertile plains, rich vegetation, clean air and natural environment, Balıkesir is one of Türkiye's important beekeeping regions. Plains covered in colorful spring flowers meet thriving forest ecosystems in summer, creating an exceptional habitat for bees.",
      blog_feature_p2: "At ZYFLORA, we let our bees forage freely across Balıkesir's natural flora and carefully transform nature's nectar, pollen and botanical resources into bee products. We bring you spring, chestnut and pine honeys, pollen, perga and propolis with a production approach that respects nature and prioritizes quality and trust.",
      blog_feature_p3: "For us, every jar of honey reflects Balıkesir's fertile plains, lush landscape and the patient work of our bees. We are committed to preserving the natural structure of our products and delivering them without additives under hygienic conditions.",
      blog_feature_p4: "Inspired by Balıkesir's nature, ZYFLORA is proud to bring reliable, natural and high-quality bee products to your table.",
      blog_feature_image_alt: 'Bees working across natural honeycomb',
      bl_readmore: 'Read More'
    },
    fr: {
      nav_home: 'Accueil', nav_products: 'Produits', nav_about: 'À propos', nav_blog: 'Blog', nav_contact: 'Contact',
      btn_order: 'Contact', aria_search: 'Rechercher', aria_account: 'Mon compte', aria_close: 'Fermer',
      top_promo1: 'Produits naturels, sans additifs et fiables', top_promo2: 'Miel naturel des hauts plateaux de Balıkesir', top_whatsapp: 'Contact',
      hero_eyebrow: 'La forme la plus pure de la nature,',
      hero_body: 'Renforcez votre immunité et vivez sainement avec nos produits curatifs qui viennent de la nature à votre table.',
      hero_cta1: 'Découvrir les produits', hero_cta2: 'Contact',
      tc_natural_t: '100% Naturel', tc_natural_s: 'Sans additifs & pur', tc_reliable_t: 'Fiable', tc_reliable_s: 'Production',
      tc_shipping_t: 'Primé', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Nos produits', sec_products_title: 'Nos produits naturels',
      sec_products_sub: 'Des saveurs pures et des produits de la ruche curatifs qui viennent de la nature à votre table.',
      p_cicek: 'Miel de fleurs', p_cicek_s: 'Miel de fleurs naturel et sans additifs',
      p_mese: 'Miel de Chêne', p_mese_s: 'Miel de chêne à l\'arôme boisé unique',
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
      modal_body_cicek: "Notre miel de printemps provient de différentes fleurs sauvages qui s'épanouissent au printemps dans la flore riche et la nature préservée de Balıkesir. Il arrive sur votre table avec son arôme caractéristique et sa saveur naturelle. Produit à partir du nectar soigneusement récolté par nos abeilles, il ne contient aucun additif. Sa cristallisation naturelle au fil du temps ne traduit pas une perte de qualité, mais témoigne de son authenticité. Savourez en toute confiance le miel de printemps de Balıkesir et partagez cette saveur pure avec vos proches.",
      modal_body_mese: "Produit à partir des sécrétions de chênes en été dans la flore riche et la nature pure de Balıkesir, notre miel de chêne arrive sur vos tables avec son arôme unique et sa saveur naturelle. Produit à partir de nectars soigneusement collectés par nos abeilles, ce miel ne contient aucun additif. Vous pouvez consommer en toute sécurité notre Miel de Chêne naturel, qui vient de la nature unique de Balıkesir à vos tables, et découvrir l'arôme boisé distinctif du véritable miel de chêne.",
      modal_body_kestane: "Produit dans les riches forêts de châtaigniers de la péninsule unique de Kapıdağ, située dans le district d'Erdek à Balıkesir, notre miel de châtaignier se distingue par son arôme intense, sa couleur foncée et son goût légèrement acidulé caractéristique. Nos abeilles transforment le nectar qu'elles récoltent des fleurs de châtaignier en miel en utilisant des méthodes entièrement naturelles. Il ne contient aucun additif ni conservateur. Vous pouvez consommer en toute sécurité notre Miel de Châtaignier naturel, qui vient de la nature unique de Kapıdağ à vos tables, et découvrir le riche arôme du véritable miel de châtaignier.",
      modal_body_cam: "Produit dans l'écosystème unique des vastes forêts de pins du plateau de Kozak, l'un des sites naturels réputés de Balıkesir, notre miel de pin se distingue par son arôme caractéristique, sa texture fluide et sa richesse en minéraux. Élaboré dans des conditions naturelles, il ne contient aucun additif. Contrairement au miel de fleurs, il provient de sources naturelles de miellat présentes sur les pins. Sa cristallisation tardive est l'une des propriétés naturelles du miel de pin.",
      modal_body_polen: "Soigneusement récolté par les abeilles sur des milliers de fleurs de la riche flore de Balıkesir, le pollen est l'un des produits de la ruche les plus précieux de la nature. Sa couleur, sa forme et son arôme peuvent varier naturellement selon la saison et la diversité végétale. Après la récolte, notre pollen est nettoyé et séché dans des conditions hygiéniques, puis conditionné pour préserver sa fraîcheur. Il ne contient aucun additif ni conservateur. Information : le pollen est un produit de la ruche. Les personnes allergiques aux produits apicoles doivent l'utiliser avec prudence.",
      modal_body_perga: "La perga (pain d'abeille) résulte de la fermentation naturelle, dans la ruche, du pollen récolté par les abeilles dans la riche flore de Balıkesir avec des enzymes et du miel. Elle constitue l'une des sources de nourriture les plus précieuses des abeilles. Notre perga est récoltée avec soin et conditionnée dans des conditions hygiéniques afin de préserver sa structure naturelle. Elle ne contient ni additif, ni conservateur, ni ingrédient artificiel. Sa couleur, son goût et sa texture peuvent varier naturellement selon la saison et la diversité végétale locale. Information : la perga est un produit de la ruche. Les personnes allergiques aux produits apicoles doivent l'utiliser avec prudence.",
      modal_image_alt_cicek: 'Abeille sur des fleurs sauvages de Balıkesir',
      modal_image_alt_kestane: 'Fleurs de châtaignier et ruches à Kapıdağ',
      modal_line: 'Contact', modal_whatsapp: 'Écrire sur WhatsApp',
      wa_message_generic: 'Bonjour, je souhaite obtenir des informations sur vos produits.',
      wa_message_product: 'Bonjour, je souhaite obtenir des informations sur « {product} ».',
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
      stat1_n: '25+', stat1_l: "Ans d'expérience",
      stat3_n: '100%', stat3_l: 'Production naturelle', stat4_n: '3', stat4_l: "Générations d'apiculture",
      ab_values_title: 'Nos valeurs', ab_back: "Retour à l'accueil",
      bl_eyebrow: 'Blog', bl_title: 'Journal du miel', bl_sub: "Articles sur l'apiculture, la vie naturelle et les bienfaits du miel.",
      post1_cat: 'Santé', post1_title: '7 bienfaits du miel pour la santé', post1_excerpt: "Nous avons réuni les bienfaits du miel naturel, de l'immunité à la peau.", post1_date: '12 juin 2026',
      post2_cat: 'Production', post2_title: 'Une journée dans les monts Kaz', post2_excerpt: 'Un aperçu de la nature préservée où vivent nos abeilles et de notre récolte.', post2_date: '28 mai 2026',
      post3_cat: 'Recettes', post3_title: 'Recettes de petit-déjeuner au miel', post3_excerpt: 'Des idées de petit-déjeuner au miel pratiques et délicieuses.', post3_date: '9 mai 2026',
      post1_p1: "Le miel est un aliment qui contient des sucres naturels ainsi que des composés aromatiques et des antioxydants variables selon son origine florale. Il ne constitue pas un traitement à lui seul et doit être consommé avec modération dans le cadre d'une alimentation équilibrée.",
      post1_p2: "Parmi les sept qualités souvent associées au miel au quotidien figurent l'apport d'énergie rapide, la douceur naturelle dans les boissons chaudes, son usage traditionnel pour apaiser la gorge, le goût apporté au yaourt et à l'avoine, la texture donnée aux sauces, les arômes propres aux différentes fleurs et son emploi mesuré comme alternative au sucre raffiné.",
      post1_p3: "Le miel contenant toujours du sucre, il est important de contrôler les portions. Il ne doit pas être donné aux enfants de moins d'un an, et les personnes ayant une condition de santé particulière doivent demander conseil à un professionnel de santé.",
      post2_p1: "La journée au rucher commence par l'observation de la météo et de l'activité de vol des abeilles. La floraison environnante, les sources d'eau propre et les mouvements à l'entrée des ruches donnent les premiers indices sur l'état quotidien des colonies.",
      post2_p2: "Sans déranger inutilement les ruches, nous vérifions les réserves, le développement du couvain et l'organisation de la colonie. Seuls les rayons mûrs et majoritairement operculés sont récoltés, tandis que le miel nécessaire aux abeilles reste dans la ruche.",
      post2_p3: "Les rayons récoltés sont extraits dans des conditions hygiéniques, laissés au repos puis conditionnés en préservant le caractère naturel du miel. Propreté, traçabilité et respect de la nature guident chaque étape de notre production.",
      post3_p1: "Pour un bol de petit-déjeuner simple, mélangez du yaourt, de l'avoine, des fruits de saison et des noix, puis ajoutez une cuillère à café de miel de fleurs. Il apporte une douceur naturelle et un arôme floral sans masquer les autres ingrédients.",
      post3_p2: "Le tahini et le miel sur du pain grillé forment une option nourrissante. Pour une assiette plus légère, servez du fromage frais avec des tranches de pomme ou de poire, des noix et une petite quantité de miel de châtaignier.",
      post3_p3: "Pour préserver l'arôme caractéristique du miel, ajoutez-le lorsque les aliments et boissons très chauds ont légèrement refroidi. Essayez différentes variétés en petites portions afin de trouver l'équilibre qui convient à votre petit-déjeuner.",
      blog_feature_eyebrow: 'De Balıkesir à votre table',
      blog_feature_title: "Toute la richesse de Balıkesir à votre table, avec la garantie ZYFLORA",
      blog_feature_p1: "Avec ses plaines fertiles, sa riche végétation, son air pur et sa nature préservée, Balıkesir est l'une des grandes régions apicoles de Türkiye. Au printemps, les plaines couvertes de fleurs multicolores rejoignent les riches écosystèmes forestiers de l'été pour offrir aux abeilles un habitat exceptionnel.",
      blog_feature_p2: "Chez ZYFLORA, nous veillons à ce que nos abeilles butinent librement dans la flore naturelle de Balıkesir et transforment avec soin le nectar, le pollen et les ressources végétales en produits de la ruche. Nous vous proposons des miels de printemps, de châtaignier et de pin, ainsi que du pollen, de la perga et de la propolis, dans le respect de la nature et avec la qualité et la confiance pour priorités.",
      blog_feature_p3: "Pour nous, chaque pot de miel reflète les plaines fertiles de Balıkesir, sa nature verdoyante et le patient travail de nos abeilles. Nous nous engageons à préserver la structure naturelle de nos produits et à vous les livrer sans additifs, dans des conditions hygiéniques.",
      blog_feature_p4: "Inspirée par la nature de Balıkesir, ZYFLORA est fière d'apporter à votre table des produits apicoles fiables, naturels et de grande qualité.",
      blog_feature_image_alt: 'Abeilles travaillant sur des rayons de miel naturels',
      bl_readmore: 'Lire la suite'
    },
    de: {
      nav_home: 'Startseite', nav_products: 'Produkte', nav_about: 'Über uns', nav_blog: 'Blog', nav_contact: 'Kontakt',
      btn_order: 'Kontakt', aria_search: 'Suche', aria_account: 'Mein Konto', aria_close: 'Schließen',
      top_promo1: 'Natürliche, zusatzfreie und zuverlässige Produkte', top_promo2: 'Natürlicher Honig aus dem Hochland von Balıkesir', top_whatsapp: 'Kontakt',
      hero_eyebrow: 'Die reinste Form der Natur,',
      hero_body: 'Stärken Sie Ihre Immunität und leben Sie gesund mit unseren heilenden Produkten, die von der Natur auf Ihren Tisch kommen.',
      hero_cta1: 'Produkte entdecken', hero_cta2: 'Kontakt',
      tc_natural_t: '100% Natürlich', tc_natural_s: 'Zusatzfrei & rein', tc_reliable_t: 'Zuverlässig', tc_reliable_s: 'Produktion',
      tc_shipping_t: 'Preisgekrönt', tc_shipping_s: 'Balıkesir',
      sec_products_eyebrow: 'Unsere Produkte', sec_products_title: 'Unsere Naturprodukte',
      sec_products_sub: 'Reine Aromen und heilende Bienenprodukte, die von der Natur auf Ihren Tisch kommen.',
      p_cicek: 'Blütenhonig', p_cicek_s: 'Natürlicher, zusatzfreier Blütenhonig',
      p_mese: 'Eichenhonig', p_mese_s: 'Eichenhonig mit einzigartigem holzigem Aroma',
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
      modal_body_cicek: "Unser Frühlingshonig stammt von verschiedenen Wildblumen, die im Frühjahr in der reichen Flora und unberührten Natur von Balıkesir blühen. Mit seinem charakteristischen Aroma und natürlichen Geschmack kommt er auf Ihren Tisch. Er wird aus dem von unseren Bienen sorgfältig gesammelten Nektar hergestellt und enthält keine Zusatzstoffe. Dass er mit der Zeit kristallisiert, ist kein Qualitätsverlust, sondern ein Zeichen seiner Natürlichkeit. Genießen Sie den Balıkesir-Frühlingshonig unbesorgt und teilen Sie diesen reinen Geschmack der Natur mit Ihren Liebsten.",
      modal_body_mese: "Unser Eichenhonig wird im Sommer aus den Sekreten von Eichen in der reichen Flora und sauberen Natur von Balıkesir gewonnen und erreicht Ihre Tische mit seinem einzigartigen Aroma und seinem natürlichen Geschmack. Dieser Honig wird aus Nektar hergestellt, der von unseren Bienen sorgfältig gesammelt wird, und enthält keine Zusatzstoffe. Sie können unseren natürlichen Eichenhonig, der aus der einzigartigen Natur von Balıkesir auf Ihre Tische kommt, sicher konsumieren und das unverwechselbare holzige Aroma echten Eichenhonigs entdecken.",
      modal_body_kestane: "Unser Kastanienhonig, der in den reichen Kastanienwäldern der einzigartigen Halbinsel Kapıdağ im Bezirk Erdek von Balıkesir hergestellt wird, zeichnet sich durch sein intensives Aroma, seine dunkle Farbe und seinen charakteristischen leicht herben Geschmack aus. Unsere Bienen verwandeln den Nektar, den sie von Kastanienblüten sammeln, mit völlig natürlichen Methoden in Honig. Er enthält keine Zusatzstoffe oder Konservierungsmittel. Sie können unseren natürlichen Kastanienhonig, der aus der einzigartigen Natur von Kapıdağ auf Ihre Tische kommt, sicher konsumieren und das reiche Aroma echten Kastanienhonigs entdecken.",
      modal_body_cam: "Unser Kiefernhonig wird im einzigartigen Ökosystem der ausgedehnten Kiefernwälder auf der Kozak-Hochebene hergestellt, einer der bekannten Naturlandschaften Balıkesirs. Er zeichnet sich durch sein charakteristisches Aroma, seine flüssige Konsistenz und seinen reichen Mineralstoffgehalt aus. Der unter natürlichen Bedingungen erzeugte Honig enthält keine Zusatzstoffe. Anders als Blütenhonig stammt er aus natürlichen Honigtauquellen auf Kiefern. Seine späte Kristallisation ist eine natürliche Eigenschaft des Kiefernhonigs.",
      modal_body_polen: "Der Pollen wird von Bienen sorgfältig an Tausenden von Blüten in der reichen Flora Balıkesirs gesammelt und zählt zu den wertvollsten Bienenprodukten der Natur. Farbe, Form und Aroma können je nach Jahreszeit und Pflanzenvielfalt natürlich variieren. Nach der Ernte wird unser Pollen unter hygienischen Bedingungen gereinigt und getrocknet und anschließend so verpackt, dass seine Frische erhalten bleibt. Er enthält keine Zusatz- oder Konservierungsstoffe. Hinweis: Pollen ist ein Bienenprodukt. Personen mit Allergien gegen Bienenprodukte sollten ihn mit Vorsicht verwenden.",
      modal_body_perga: "Perga (Bienenbrot) entsteht, wenn der von Bienen in der reichen Flora Balıkesirs gesammelte Pollen im Bienenstock mit natürlichen Enzymen und Honig fermentiert. Sie zählt zu den wertvollsten Nahrungsquellen der Bienen. Unsere Perga wird sorgfältig geerntet und unter hygienischen Bedingungen verpackt, damit ihre natürliche Struktur erhalten bleibt. Sie enthält keine Zusatzstoffe, Konservierungsmittel oder künstlichen Zutaten. Farbe, Geschmack und Textur können je nach Jahreszeit und örtlicher Pflanzenvielfalt natürlich variieren. Hinweis: Perga ist ein Bienenprodukt. Personen mit Allergien gegen Bienenprodukte sollten sie mit Vorsicht verwenden.",
      modal_image_alt_cicek: 'Honigbiene auf Wildblumen in Balıkesir',
      modal_image_alt_kestane: 'Kastanienblüten und Bienenstöcke in Kapıdağ',
      modal_line: 'Kontakt', modal_whatsapp: 'Auf WhatsApp schreiben',
      wa_message_generic: 'Hallo, ich möchte mehr über Ihre Produkte erfahren.',
      wa_message_product: 'Hallo, ich möchte mehr über „{product}“ erfahren.',
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
      stat1_n: '25+', stat1_l: 'Jahre Erfahrung',
      stat3_n: '100%', stat3_l: 'Natürliche Produktion', stat4_n: '3', stat4_l: 'Generationen Imkerei',
      ab_values_title: 'Unsere Werte', ab_back: 'Zurück zur Startseite',
      bl_eyebrow: 'Blog', bl_title: 'Honig-Tagebuch', bl_sub: 'Artikel über Imkerei, natürliches Leben und die Vorteile von Honig.',
      post1_cat: 'Gesundheit', post1_title: '7 gesundheitliche Vorteile von Honig', post1_excerpt: 'Wir haben die Vorteile von natürlichem Honig zusammengestellt – von Immunität bis Haut.', post1_date: '12. Juni 2026',
      post2_cat: 'Produktion', post2_title: 'Ein Tag im Kaz-Gebirge', post2_excerpt: 'Ein Blick auf die unberührte Natur unserer Bienen und unseren Ernteprozess.', post2_date: '28. Mai 2026',
      post3_cat: 'Rezepte', post3_title: 'Honig-Frühstücksrezepte', post3_excerpt: 'Praktische und köstliche Honig-Frühstücksideen für Ihren Tisch.', post3_date: '9. Mai 2026',
      post1_p1: 'Honig ist ein Lebensmittel mit natürlichen Zuckern sowie Aroma- und Antioxidantienverbindungen, die je nach Blütenquelle variieren. Er ist keine eigenständige Behandlung und sollte maßvoll als Teil einer ausgewogenen Ernährung genossen werden.',
      post1_p2: 'Sieben häufig genannte Eigenschaften im Alltag sind schnelle Energie, natürliche Süße in warmen Getränken, die traditionelle Anwendung zur Beruhigung des Halses, Geschmack in Joghurt und Haferflocken, Konsistenz in Soßen, besondere Aromen verschiedener Blüten und der maßvolle Einsatz als Alternative zu raffiniertem Zucker.',
      post1_p3: 'Da Honig weiterhin Zucker enthält, ist die Portionsgröße wichtig. Kinder unter einem Jahr dürfen keinen Honig erhalten; Menschen mit besonderen gesundheitlichen Voraussetzungen sollten den Verzehr mit medizinischem Fachpersonal abstimmen.',
      post2_p1: 'Ein Tag am Bienenstand beginnt mit der Beobachtung des Wetters und der Flugaktivität. Blühende Pflanzen, saubere Wasserquellen und die Bewegung an den Fluglöchern geben erste Hinweise auf den täglichen Zustand der Völker.',
      post2_p2: 'Ohne die Bienen unnötig zu stören, kontrollieren wir Futtervorräte, Brutentwicklung und Volksordnung. Geerntet werden nur reife, weitgehend verdeckelte Waben; der von den Bienen benötigte Honig bleibt im Stock.',
      post2_p3: 'Die geernteten Waben werden unter hygienischen Bedingungen geschleudert, ruhen gelassen und unter Erhalt des natürlichen Charakters abgefüllt. Sauberkeit, Rückverfolgbarkeit und Respekt vor der Natur prägen jede Produktionsstufe.',
      post3_p1: 'Für eine schnelle Frühstücksschale Joghurt, Haferflocken, saisonales Obst und Walnüsse mischen und mit einem Teelöffel Blütenhonig beträufeln. Er gibt natürliche Süße und ein blumiges Aroma, ohne die übrigen Zutaten zu überdecken.',
      post3_p2: 'Tahini und Honig auf geröstetem Brot sind eine sättigende Variante. Für einen leichteren Teller passen Frischkäse, Apfel- oder Birnenscheiben, Walnüsse und eine kleine Menge Kastanienhonig zusammen.',
      post3_p3: 'Damit das charakteristische Honigaroma erhalten bleibt, sollte Honig erst zugegeben werden, wenn sehr heiße Speisen und Getränke etwas abgekühlt sind. Probieren Sie verschiedene Sorten in kleinen Portionen, um die passende Balance zu finden.',
      blog_feature_eyebrow: 'Von Balıkesir auf Ihren Tisch',
      blog_feature_title: "Balıkesirs Fülle – mit der Sicherheit von ZYFLORA auf Ihrem Tisch",
      blog_feature_p1: "Mit seinen fruchtbaren Ebenen, der reichen Pflanzenwelt, der sauberen Luft und der ursprünglichen Natur zählt Balıkesir zu den bedeutenden Imkereiregionen der Türkiye. Im Frühjahr sind die Ebenen mit bunten Blumen bedeckt; im Sommer verbinden sie sich mit vielfältigen Waldökosystemen und schaffen einen außergewöhnlichen Lebensraum für Bienen.",
      blog_feature_p2: "Bei ZYFLORA achten wir darauf, dass unsere Bienen frei in Balıkesirs natürlicher Flora sammeln können und Nektar, Pollen sowie pflanzliche Ressourcen behutsam in Bienenprodukte verwandeln. Frühlings-, Kastanien- und Kiefernhonig, Pollen, Perga und Propolis bringen wir mit einer naturverträglichen Produktionsweise zu Ihnen, bei der Qualität und Vertrauen an erster Stelle stehen.",
      blog_feature_p3: "Für uns spiegelt jedes Honigglas die fruchtbaren Ebenen Balıkesirs, seine grüne Natur und die geduldige Arbeit unserer Bienen wider. Wir verpflichten uns, die natürliche Beschaffenheit unserer Produkte zu bewahren und sie ohne Zusatzstoffe unter hygienischen Bedingungen zu Ihnen zu bringen.",
      blog_feature_p4: "Von Balıkesirs Natur inspiriert, ist ZYFLORA stolz darauf, zuverlässige, natürliche und hochwertige Bienenprodukte auf Ihren Tisch zu bringen.",
      blog_feature_image_alt: 'Bienen bei der Arbeit auf natürlichen Honigwaben',
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
          applyContact();
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
        // bare "#" placeholder link: don't lurch to top
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
  var PRODUCT_MEDIA = {
    cicek: [{
      src: 'assets/img/cicek-detay-1200.jpg',
      webp: 'assets/img/cicek-detay-720.webp 720w, assets/img/cicek-detay-1200.webp 1200w',
      width: 1200,
      height: 900,
      altKey: 'modal_image_alt_cicek'
    }],
    mese: [{ src: 'assets/img/urun-mese-v2.jpg', width: 1000, height: 750 }],
    kestane: [
      {
        src: 'assets/img/kestane-arilik-1200.jpg',
        webp: 'assets/img/kestane-arilik-720.webp 720w, assets/img/kestane-arilik-1200.webp 1200w',
        width: 1200,
        height: 900,
        altKey: 'modal_image_alt_kestane'
      },
      {
        src: 'assets/img/kestane-cicegi-1200.jpg',
        webp: 'assets/img/kestane-cicegi-720.webp 720w, assets/img/kestane-cicegi-1200.webp 1200w',
        width: 1200,
        height: 1600,
        altKey: 'modal_image_alt_kestane'
      },
      {
        src: 'assets/img/kestane-kovanlar-1200.jpg',
        webp: 'assets/img/kestane-kovanlar-720.webp 720w, assets/img/kestane-kovanlar-1200.webp 1200w',
        width: 1200,
        height: 900,
        altKey: 'modal_image_alt_kestane'
      }
    ],
    cam: [{ src: 'assets/img/urun-cam.jpg', width: 1000, height: 750 }],
    aycicek: [{ src: 'assets/img/urun-aycicek.jpg', width: 1000, height: 750 }],
    polen: [{ src: 'assets/img/urun-polen.jpg', width: 1000, height: 750, focusClass: 'zy-img--right-focus' }],
    perga: [{ src: 'assets/img/urun-perga.jpg', width: 1000, height: 750, focusClass: 'zy-img--right-focus' }]
  };
  function renderModalMedia(host, productId, productName) {
    var media = PRODUCT_MEDIA[productId] || [{
      src: 'assets/img/hero-honey.jpg',
      width: 1000,
      height: 544
    }];
    host.replaceChildren();
    host.classList.toggle('zy-modal-img--gallery', media.length > 1);

    media.forEach(function (item, index) {
      var picture = document.createElement('picture');
      if (item.webp) {
        var source = document.createElement('source');
        source.type = 'image/webp';
        source.srcset = item.webp;
        source.sizes = '(max-width: 760px) 100vw, 45vw';
        picture.appendChild(source);
      }

      var image = document.createElement('img');
      image.src = item.src;
      image.width = item.width;
      image.height = item.height;
      image.alt = item.altKey ? t(item.altKey) : productName;
      image.decoding = 'async';
      image.loading = index === 0 ? 'eager' : 'lazy';
      if (item.focusClass) image.classList.add(item.focusClass);
      picture.appendChild(image);
      host.appendChild(picture);
    });
  }
  function whatsappLink(productName) {
    var base = 'https://wa.me/' + CONTACT.WHATSAPP;
    var msg = productName
      ? t('wa_message_product').replace('{product}', productName)
      : t('wa_message_generic');
    return base + '?text=' + encodeURIComponent(msg);
  }
  function openModal(opts) {
    opts = opts || {};
    var overlay = document.getElementById('zy-modal');
    if (!overlay) return;
    var name = opts.id ? t('p_' + opts.id) : t('modal_generic');
    var bodyKey = opts.id ? 'modal_body_' + opts.id : 'modal_body';
    var bodyText = t(bodyKey) !== bodyKey ? t(bodyKey) : t('modal_body');

    renderModalMedia(overlay.querySelector('.zy-modal-img'), opts.id, name);
    overlay.querySelector('.zy-modal-title').textContent = name;

    var modalTextEl = overlay.querySelector('.zy-modal-text');
    if (modalTextEl) {
      modalTextEl.textContent = bodyText;
    }
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
