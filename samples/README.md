# Berkas Sampel Nota Riil (RapiLPJ Test Dataset)

Folder ini berisi berkas gambar struk dan kuitansi fisik nyata yang dirancang untuk menguji validasi kepatuhan administrasi LPJ dan fitur ekstraksi dokumen:

---

## 1. `sample_01_struk_termal_spbu.png`
* **Penyedia:** SPBU Pertamina 74.902.11, Jl. Perintis Kemerdekaan, Makassar.
* **No. Transaksi:** `SPBU-74921`
* **Tanggal:** 01/10/2026
* **Nominal:** Rp250.000 (Dexlite B30 - Transportasi & Bahan Bakar).
* **Karakteristik Dokumen:** Kertas struk termal kasir minimarket/SPBU.
* **Aturan yang Diuji:**
  * FEB UGM Rule: Struk kertas termal mudah pudar wajib segera difotokopi atau dipindai digital agar sah sebagai arsip audit.

---

## 2. `sample_02_kuitansi_katering_meterai.png`
* **Penyedia:** CV Berkah Rasa Catering, Jl. Urip Sumoharjo No. 88, Makassar.
* **No. Kuitansi:** `KTR-8812`
* **Tanggal:** 02/10/2026
* **Nominal:** Rp5.250.000 (150 box nasi kotak @ Rp35.000).
* **Karakteristik Dokumen:** Faktur resmi berstempel basah ungu + meterai tempel Rp10.000.
* **Aturan yang Diuji:**
  * UU No. 10 Tahun 2020 tentang Bea Meterai: Transaksi bernilai $\ge$ Rp5.000.000 wajib dibubuhi meterai tempel Rp10.000.
  * FIB UB Rule: Stempel basah resmi toko/rekanan.

---

## 3. `sample_03_nota_atk_stempel.png`
* **Penyedia:** Toko Buku & Percetakan Sentosa, Jl. Cendrawasih No. 45, Makassar.
* **No. Nota:** `ATK-0924`
* **Tanggal:** 02/10/2026
* **Nominal:** Rp600.000 (Cetak banner frontlite 4x2m + sertifikat linen).
* **Karakteristik Dokumen:** Nota kontan rangkap NCR dengan stempel basah bulat warna ungu.
* **Aturan yang Diuji:**
  * FIB UB & Standar Nasional: Verifikasi cap toko basah asli pada nota belanja barang.
  * Batas Varians Anggaran: Menguji batas toleransi pagu publikasi & perlengkapan pada RAB.

---

## Cara Pengujian di Aplikasi Web
1. Buka aplikasi di peramban atau melalui URL produksi: `https://rapilpj-v2.vercel.app`.
2. Klik tombol **"Masukkan Contoh Sampel Nota"** untuk memuat data terstruktur ketiga nota secara otomatis.
3. Atau, pada baris tabel nota, klik tombol **"Pilih Berkas"** lalu pilih salah satu berkas gambar dari folder `samples/` ini untuk memverifikasi lampiran foto lokal.
