# Lampiran Evaluasi Teknis & Validasi Arsitektur RapiLPJ
**Proyek:** RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports  
**Tim:** Tide Ledger (Vincentius Bryan Kwandou, Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio)  
**Kompetisi:** STACK 2026 Hackathon — Case 1: Smarter Campus and Learning  
**Repositori Resmi:** `https://github.com/bryankwandou/rapilpj-v2`  

---

## 1. Validasi Arsitektur melalui Benchmark Sintetis 30 Kohort

Untuk memvalidasi keandalan kernel pra-audit deterministik di tengah keragaman regulasi kampus sebelum implementasi langsung ke loket birokrasi, sistem diuji menggunakan rangkaian pengujian stres sintetis otomatis (*Automated Synthetic Stress-Test Benchmark*):

### Metodologi Benchmark:
- **Cakupan Pengujian:** 30 profil organisasi mahasiswa (BEM Fakultas, Himpunan Mahasiswa Jurusan, dan Unit Kegiatan Mahasiswa) yang dimodelkan berdasarkan 4 kerangka aturan kampus nyata:
  1. `filkom`: SE Mekanisme LPJ Ormawa FILKOM UB 2026 (batas 7 hari kerja, honorarium PPh, checklist wajib).
  2. `ugmfeb`: Prosedur SIPRO FEB UGM (UU No. 10 Tahun 2020 Pasal 3, fotokopi struk termal).
  3. `itshima`: SOP HIMA Interior & Biologi ITS (batas 7-10 hari, entri baris kuitansi tunggal).
  4. `uajm`: Pedoman Portofolio BKAM Universitas Atma Jaya Makassar (studi Siada & Tungadi 2021).
- **Injeksi Cacat:** 112 cacat mekanis disimulasikan pada 30 kohort untuk menguji daya tahan audit terhadap seluruh skenario kegagalan berkas umum.

### Hasil Pengukuran Benchmark Mesin:
| Indikator Evaluasi | Hasil Pengukuran Mesin | Keterangan & Signifikansi |
| :--- | :--- | :--- |
| **Total Kohort Diuji** | 30 berkas dossier sintesis | Representasi 4 aturan universitas mitra |
| **Total Cacat Mekanis Terinjeksi** | 112 cacat (rata-rata 3,7 / berkas) | Pelanggaran meterai, termal, duplikasi, selisih anggaran, presensi |
| **Tingkat Deteksi Cacat** | 100% (112 / 112 terdeteksi) | Dievaluasi deterministik terhadap 17 aturan audit |
| **Tingkat Remediasi Otomatis** | 100% (112 / 112 terselesaikan) | Kuis statutory, pembuatan addendum, dan rekonsiliasi kas |
| **Waktu Eksekusi Total Batch (30 Kohort)** | ~49 ms eksekusi total | Rata-rata **1,63 ms per berkas** di lingkungan JavaScript klien |
| **Waktu Pra-Audit Berkas Tunggal** | ~15,6 ms per berkas | Responsivitas instan tanpa membebani laptop mahasiswa |
| **Validitas Segel Kriptografis** | 100% (30 / 30 SHA-256 cocok) | Menjamin deteksi pemalsuan berkas secara instan di loket |

*Replikasi Mandiri:* Jalankan perintah `node field_trial.js` untuk mereproduksi pengujian 30 kohort dan menghasilkan catatan log di `field_trial_results.json`.

---

## 2. Mitigasi Risiko Multimodal & Prinsip Zero-Trust Aritmetika

Sistem RapiLPJ menggunakan visi multimodal Gemini 2.0 Flash untuk mengubah gambar kuitansi tidak terstruktur menjadi data JSON terstruktur. Karena model visi bersifat probabilistik, RapiLPJ menerapkan arsitektur *Zero-Trust Aritmetika & Human-in-the-Loop*:

### A. Ambang Batas Keyakinan (Confidence Threshold Gating < 0.85)
- Setiap field hasil ekstraksi model (nama toko, tanggal, nomor nota, nominal, stempel) menyertakan confidence score `0.0 - 1.0`.
- Field dengan skor < 0.85 atau ambiguitas visual otomatis ditandai border kuning dan diarahkan ke antrean penelaahan wajib berdampingan (*side-by-side review*) dengan citra kuitansi fisik asli sebelum data diizinkan masuk ke neraca.

### B. Jejak Audit Ganda (Dual-Record Audit Trail)
- Jika bendahara melakukan koreksi manual, sistem tidak menimpa data begitu saja. Sistem mencatat objek audit ganda:
  ```json
  {
    "rawExtracted": { "amount": 650000, "date": "2026-10-02" },
    "treasurerInput": { "amount": 490000, "date": "2026-10-02" },
    "manualOverride": true
  }
  ```
- Di loket verifikator, nota bertanda `manualOverride` langsung disorot agar verifikator hanya perlu memeriksa fisik nota yang mengalami koreksi manual, tanpa harus menyisir manual puluhan nota lain yang telah lolos validasi otomatis.

### C. Isolasi Mesin Aritmetika Deterministik
- Model AI **tidak pernah dipercaya** untuk menghitung penjumlahan, menghitung sisa pagu, menghitung pajak honorarium, atau membandingkan neraca kas. Seluruh operasi matematika dieksekusi oleh mesin JavaScript deterministik murni.

### D. Arsitektur Privasi Data Klien
- Berkas citra dan data JSON tersimpan murni di memori volatil peramban dan berkas lokal `.lpj`. Sistem tidak menggunakan database penyimpanan awan eksternal. Pemrosesan citra oleh Vertex AI tunduk pada ketentuan pemrosesan data Google Cloud tanpa pelatihan data.

---

## 3. Rencana Implementasi Pilot Lapangan 1 Semester (20 Ormawa)

Sebagai tahapan pengembangan pasca-prototipe, tim merancang uji coba percontohan lapangan (*field pilot*) selama 1 semester penuh yang melibatkan 20 organisasi kemahasiswaan:
- **Subjek Uji:** 20 organisasi kemahasiswaan lintas fakultas (Himpunan Jurusan, BEM Fakultas, dan UKM).
- **Metode Pelacakan:** Memantau buku log resmi penyerahan dan catatan revisi loket kemahasiswaan dekanat untuk mengukur secara obyektif apakah pra-audit mandiri menurunkan siklus revisi dari baseline 3–5 siklus menjadi maksimal satu siklus (*at most one cycle*).
- **Tata Kelola Aturan Kampus:** Kartu aturan dikompilasi dari Surat Edaran Dekanat resmi, divalidasi pembina kemahasiswaan, dan dikunci dengan hash SHA-256 out-of-band.
- **Batas Kewenangan:** RapiLPJ adalah alat bantu kepatuhan administratif dan tidak menggantikan diskresi dekanat, wewenang audit resmi universitas, maupun penetapan legal fiskal.

---

## 4. Diagram Alur Pipeline 5 Tahap

```
[1. Unggah Kuitansi Mentah]
  - Struk kasir, nota tulis tangan, voucher kas bilyet masuk ke memori volatil browser.
  - Zero cloud database, privasi lokal penuh.
       |
       v
[2. Visi Multimodal Gemini 2.0 Flash + Confidence Gating]
  - Ekstraksi ke JSON terstruktur (nominal, tanggal, vendor, nomor invoice, stempel).
  - Skor keyakinan < 0.85 otomatis memicu border kuning dan review wajib.
       |
       v
[3. Konfirmasi Berdampingan & Dual-Record Audit Trail]
  - Bendahara meninjau citra vs JSON side-by-side.
  - Koreksi manual dicatat transparan di log audit (tag manualOverride).
       |
       v
[4. Kernel Deterministik Klien 100% Offline (<20 ms)]
  - Evaluasi 17 aturan deterministik tanpa toleransi halusinasi:
    * Batas meterai Rp10.000 di atas Rp5.000.000 (UU No. 10 Tahun 2020 Pasal 3).
    * Deteksi kuitansi/faktur ganda.
    * Validasi masa persiapan kegiatan (tanggal nota sebelum kegiatan).
    * Sinkronisasi daftar hadir per sesi makan.
    * Ambang toleransi pergeseran anggaran >10%.
       |
       v
[5. Penguncian Segel Kriptografis SHA-256 & Verifikasi Meja Instan]
  - Berkas dossier dikunci hash SHA-256.
  - Verifikator loket dekanat memeriksa keaslian berkas dan anchor hash aturan resmi dalam 1 detik.
```
*Arsip grafis visual beresolusi tinggi tersedia pada berkas:* `abstract/flowchart_pipeline.png`.
