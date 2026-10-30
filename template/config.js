// =====================================================================
//  TETAPAN KEDAI: ubah fail ini sahaja untuk setiap pelanggan.
//  Teks boleh guna <strong>tebal</strong> dan <br> untuk baris baru.
// =====================================================================
window.SHOP = {
  // Bahasa butang & label: "ms" (Bahasa Melayu) atau "en" (English)
  lang: "ms",

  name: "Kedai Contoh",
  tagline: "Hadiah comel untuk setiap majlis",
  logo: "images/logo.svg",

  // Nombor WhatsApp dengan kod negara, tanpa + atau sengkang (013-447 8918 → 60134478918)
  whatsapp: "60123456789",

  // Link Google Sheet (Share → Anyone with the link → Copy link).
  // Kosong = guna products.csv dalam folder ini.
  sheetUrl: "",

  // Tema siap (pakej Basic): "pink" (Pink Lembut), "sage" (Hijau Sage), "cream" (Krim Klasik).
  // "custom" (pakej Pro) = guna colors & fonts di bawah.
  // Pratonton tema tanpa ubah fail: tambah ?theme=sage di hujung link website.
  theme: "pink",

  // Warna kedai (hanya digunakan bila theme: "custom")
  colors: {
    background: "#fff8ea",  // latar belakang
    soft: "#fbe4e6",        // latar kad & butang lembut
    accent: "#c27c88",      // butang utama
    accentDark: "#a05c69",  // tajuk & harga
    text: "#5a4446",
    muted: "#8d7a7b"
  },

  // Font dari Google Fonts: tajuk bergaya, tajuk biasa, teks badan (hanya bila theme: "custom")
  fonts: { script: "Great Vibes", serif: "Cormorant Garamond", body: "Nunito" },

  // Bentuk gambar produk: "9 / 16" (tinggi), "4 / 5", "1 / 1" (segi empat)
  photoRatio: "4 / 5",

  hero: {
    kicker: "Handmade with love ♡",
    lead: "Selamat datang ke kedai kami! ✨",
    text: [
      "Semua produk dibuat dengan penuh kasih sayang, sesuai untuk diri sendiri atau hadiah untuk orang tersayang.",
      "Pilih produk, tekan order, dan kami akan hubungi anda melalui WhatsApp 🫶🏻"
    ],
    button: "Lihat Produk"
  },

  // Bahagian teks sebelum katalog
  before: [
    {
      title: "Kenapa Pilih Kami",
      text: ["Bahan berkualiti 🌿", "Boleh custom ikut citarasa 🎀", "Pos ke seluruh Malaysia 📦"]
    }
  ],

  // Bahagian teks selepas katalog. highlight: true = kotak berwarna.
  // button.whatsapp = mesej yang terus diisi dalam WhatsApp.
  after: [
    {
      title: "Nak Custom?",
      highlight: true,
      text: ["Ada idea sendiri? Beritahu kami warna, tema atau bajet anda, kami cuba buatkan khas untuk anda."],
      button: { label: "WhatsApp Kami", whatsapp: "Hai! Saya nak tanya pasal custom order: " }
    }
  ],

  // Kawasan & kos pos. id digunakan dalam tab "settings" Google Sheet (postage_<id>).
  shipping: [
    { id: "semenanjung", name: "Semenanjung", fee: 10 },
    { id: "sabah_sarawak", name: "Sabah / Sarawak", fee: 20 }
  ],

  // true = kos pos dikira untuk setiap item (contoh RM10 x 3 = RM30). false = sekali untuk satu order.
  shippingPerItem: false,

  // Pre-order: tarikh terima, contoh "2026-12-20". Kosong = tiada pre-order.
  // Tab "settings" dalam Google Sheet boleh tukar ini tanpa ubah kod.
  preorderUntil: "",

  // Pautan media sosial di bawah sekali (kosongkan yang tiada)
  social: {
    instagram: "",
    tiktok: "",
    threads: ""
  },

  signoff: "Terima kasih kerana menyokong bisnes kecil kami 🤍"
};
