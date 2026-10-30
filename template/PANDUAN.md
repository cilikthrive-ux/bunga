# Panduan Templat Kedai (Katalog + Order WhatsApp)

Templat ini buat website katalog untuk peniaga kecil:

- Katalog produk dari **Google Sheet** (pelanggan boleh ubah harga, stok dan produk sendiri)
- Pelanggan pilih kuantiti dan kawasan pos, kemudian **order terus ke WhatsApp**
- Label pre-order, sold out, tempoh siap
- Boleh tukar warna, font, logo, ayat dan bahasa (BM atau English)
- Hosting percuma (GitHub Pages atau Netlify), cuma domain yang berbayar

## Fail dalam folder ini

| Fail | Fungsi |
|---|---|
| `config.js` | **Satu-satunya fail yang perlu diubah** untuk setiap pelanggan |
| `index.html` | Website. Tak perlu sentuh |
| `products.csv` | Produk contoh. Digunakan kalau Google Sheet belum disambung |
| `images/` | Logo dan gambar produk |

## Langkah setup untuk pelanggan baru

### 1. Salin templat
Salin seluruh folder `template` ke repo baru di GitHub (contoh `kedai-ani`).

### 2. Isi `config.js`
Buka `config.js` dan tukar:

- `name`, `tagline`: nama kedai dan slogan
- `logo`: letak logo dalam `images/` (contoh `images/logo.png`)
- `whatsapp`: nombor dengan kod negara, tanpa `+` atau sengkang. `013-447 8918` jadi `60134478918`
- `theme`: **Basic** pilih `"pink"`, `"sage"` atau `"cream"`. **Pro** guna `"custom"` dan isi `colors` & `fonts` ikut jenama pelanggan
- `hero`, `before`, `after`: ayat-ayat di website
- `shipping`: kawasan dan kos pos
- `lang`: `"ms"` atau `"en"`
- `photoRatio`: bentuk gambar produk. `"1 / 1"` untuk gambar segi empat, `"9 / 16"` untuk gambar tinggi (story)

### 3. Buat Google Sheet untuk pelanggan
1. Buat Google Sheet baru **dalam akaun Google pelanggan** supaya mereka yang pegang data.
2. Dalam cell **A1**, tampal `=IMPORTDATA("https://LINK-WEBSITE/products.csv")`. Ganti `LINK-WEBSITE` dengan link website yang dah live. Contoh produk akan masuk.
3. Pilih semua, **Copy**, kemudian **Paste special → Values only**. Data jadi teks biasa yang boleh diedit.
4. **Share → General access → Anyone with the link → Viewer**, kemudian **Copy link**.
5. Tampal link tu dalam `sheetUrl` di `config.js`.

Lajur dalam Sheet:

| Lajur | Contoh | Nota |
|---|---|---|
| `id` | *(boleh kosong)* | Jangan ubah untuk produk sedia ada |
| `name` | `Hamper Mini` | Wajib |
| `category` | `Hamper` | Produk dengan kategori sama dikumpul bersama |
| `price` | `45` | |
| `ready_in` | `5-7` | Nombor sahaja, kemudian jadi "Siap dalam 5-7 hari" |
| `stock` | `available` / `sold out` / `habis` | |
| `show` | `yes` / `no` | `no` = sorok produk |
| `badge` | `NEW` | Label kecil |
| `description` | Ayat pendek | |
| `image` | Link Google Drive (Anyone with the link) | Kosong = `images/<id>.jpg`, atau logo |

### 4. (Pilihan) Tab `settings` dalam Sheet
Untuk pelanggan ubah tarikh pre-order dan kos pos sendiri, tambah tab bernama `settings`:

| preorder_until | postage_semenanjung | postage_sabah_sarawak |
|---|---|---|
| 20 December 2026 | 10 | 20 |

- Nama `postage_...` mesti sama dengan `id` dalam `shipping` di `config.js`
- Kosongkan tarikh untuk buang pre-order. Lepas tarikh tu, pre-order hilang sendiri

### 5. Hidupkan website
- **GitHub Pages:** repo, kemudian **Settings → Pages → Deploy from a branch → `main` / root**
- **Domain sendiri:** dalam DNS, tambah 4 rekod A untuk `@` (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) dan CNAME `www` ke `NAMA-AKAUN.github.io`. Kemudian isi **Custom domain** dalam Settings → Pages dan tandakan **Enforce HTTPS**

### 6. Semak sebelum serah
- [ ] Logo, nama dan warna betul
- [ ] Nombor WhatsApp betul (cuba order sekali)
- [ ] Produk dari Sheet keluar
- [ ] Kos pos betul
- [ ] Buka di telefon, semua kemas

## Tunjuk tema kepada pelanggan

Buka demo dengan `?theme=` di hujung link:

- Pink Lembut: `preciousnuha.com/template/?theme=pink`
- Hijau Sage: `preciousnuha.com/template/?theme=sage`
- Krim Klasik: `preciousnuha.com/template/?theme=cream`

## Pakej & harga

| | Basic RM149 | Pro RM299 |
|---|---|---|
| Katalog + order WhatsApp, kos pos automatik | ✓ | ✓ |
| Bilangan produk | Sampai 10 | Sampai 50 |
| Design | 1 dari 3 tema (`theme`) | Warna, font & logo jenama (`theme: "custom"`) |
| Update harga & stok | Melalui awak (RM20/update): edit `products.csv`, `sheetUrl` kosong | Sendiri guna Google Sheet (`sheetUrl`) |
| Pre-order, sold out, siap dalam X hari | ✕ (biar lajur kosong, jangan buat tab `settings`) | ✓ |
| Ayat promosi & cerita jenama (`hero`, `before`, `after`) | Ayat ringkas | ✓ ditulis khas |
| Link | Percuma (Netlify / github.io) | Domain .com tahun pertama* |
| Pembetulan | 1 kali | 3 kali |
| Bantuan percuma | 7 hari | 30 hari |

**Jagaan:** RM30/bulan (update design, tambah ciri, bantuan) atau RM20 setiap kali update.
**Promo 5 pelanggan pertama:** Pro RM249, dengan syarat bagi testimoni.

\*Renew domain tahun ke-2 ~RM45/tahun ditanggung pelanggan. Daftar domain dalam akaun pelanggan sendiri, beli .com sahaja, dan catat tarikh renew.
