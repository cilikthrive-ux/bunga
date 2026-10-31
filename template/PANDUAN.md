# Panduan Templat Kedai (Katalog + Order WhatsApp)

Templat ini buat website katalog untuk peniaga kecil:

- Katalog produk dari **Google Sheet** (pelanggan boleh ubah harga, stok dan produk sendiri)
- Pelanggan pilih kuantiti dan kawasan pos, kemudian **order terus ke WhatsApp**
- Label pre-order, sold out, tempoh siap
- Boleh tukar warna, font, logo, ayat dan bahasa (BM atau English)
- Hosting percuma di **Netlify**, cuma domain yang berbayar

## Fail dalam folder ini

| Fail | Fungsi |
|---|---|
| `config.js` | **Satu-satunya fail yang perlu diubah** untuk setiap pelanggan |
| `index.html` | Website. Tak perlu sentuh |
| `products.csv` | Produk contoh. Digunakan kalau Google Sheet belum disambung |
| `images/` | Logo dan gambar produk |

## Langkah setup untuk pelanggan baru

### 1. Salin templat
Salin seluruh folder `template` dan namakan ikut pelanggan (contoh `kedai-ani`). Kalau guna GitHub, letak dalam repo baru (boleh **private**).

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

### 5. Hidupkan website di Netlify (percuma)
Netlify ialah **website** (app.netlify.com), bukan app telefon. Guna komputer, atau Safari dengan **Request Desktop Website**.

**Cara A: Drag & drop** (paling senang, sesuai untuk Basic)
1. Daftar atau log masuk di **app.netlify.com**
2. **Add new project → Deploy manually**, kemudian seret folder kedai ke kotak upload
3. **Project configuration → General → Change project name**, kemudian taip nama kedai. Link jadi `nama-kedai.netlify.app`
4. Bila ada perubahan: buka project, pergi **Deploys**, dan seret folder yang dah dikemaskini

**Cara B: Sambung GitHub** (website update sendiri setiap kali repo berubah)
1. **Add new project → Import an existing project → GitHub**, kemudian pilih repo pelanggan
2. **Build command:** kosong. **Publish directory:** kosong (atau nama folder kalau templat dalam subfolder). Tekan **Deploy**
3. Tukar nama project macam Cara A langkah 3

**Domain sendiri (pakej Pro)**
1. Dalam Netlify: **Domain management → Add a domain**, kemudian masukkan domain pelanggan
2. Dalam DNS di Spaceship (atau tempat domain dibeli), padam rekod parking lama dan tambah:

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `75.2.60.5` |
   | CNAME | `www` | `nama-kedai.netlify.app` |

3. Tunggu sampai domain aktif. HTTPS (🔒) dipasang sendiri oleh Netlify, dan boleh ambil masa sampai 24–48 jam

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
| Link | Percuma (`nama-kedai.netlify.app`) | Domain .com tahun pertama* |
| Pembetulan | 1 kali | 3 kali |
| Bantuan percuma | 7 hari | 30 hari |

**Update (pilihan):** RM20 setiap kali (tukar design, tambah ciri, bantuan). Tiada caj bulanan.
**Promo 5 pelanggan pertama:** Pro RM249, dengan syarat bagi testimoni.

\*Renew domain tahun ke-2 ~RM45/tahun ditanggung pelanggan. Daftar domain dalam akaun pelanggan sendiri, beli .com sahaja, dan catat tarikh renew.
