# Simpan order website ke Google Sheet

Bila pelanggan tekan **Order via WhatsApp** di `catalogue.html`, satu salinan order akan dihantar ke Google Sheet. WhatsApp tetap terbuka macam biasa.

## Setup (sekali sahaja, lebih kurang 3 minit)

1. Buka https://sheets.new dan namakan Sheet baru tu **Precious Nuha Orders**.
2. Klik menu **Extensions → Apps Script**.
3. Padam semua kod yang ada, kemudian tampal isi fail `Code.gs` dari folder ni. Tekan 💾 **Save**.
4. Klik **Deploy → New deployment**.
   - Tekan ⚙️ di sebelah "Select type", pilih **Web app**
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Tekan **Deploy**, kemudian **Authorize access**. Pilih akaun Google awak. Kalau keluar amaran "Google hasn't verified this app", tekan **Advanced → Go to … (unsafe)**. Amaran ni normal sebab skrip tu awak sendiri yang buat.
5. Salin **Web app URL**. Bentuknya macam `https://script.google.com/macros/s/AKfy…/exec`.
6. Letak URL tu dalam `catalogue.html`, pada baris `const ORDER_HOOK_URL = "…";`.

Selepas tu, setiap order dari website akan masuk sebagai satu baris dalam tab pertama Sheet.

## Dalam app order (Claude)

Pergi ke **Settings** dan isi **Website orders Sheet (link)** dengan link Sheet "Precious Nuha Orders". Lepas tu, di halaman **Orders**, tekan **🌐 Pull website orders**.

## Nota
- Jangan susun semula atau namakan semula lajur pada baris pertama Sheet. App bergantung pada nama lajur tu.
- Kalau awak ubah `Code.gs` selepas ni: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. Dengan cara ni URL tak berubah.
