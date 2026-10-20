# Design System — Website Vendor Hampers Premium

**Versi:** 1.0  
**Tanggal:** 20 Oktober 2026  
**Arah visual:** Sky Blue Corporate Elegance  
**Stack UI:** Bootstrap 5 + CSS murni + JavaScript vanilla

---

## 1. Prinsip Desain

1. **Premium, bukan ramai.** Ruang kosong yang cukup, grid rapi, foto produk besar, dan ornamen minimal.
2. **Hangat dan terpercaya.** Biru langit memberi kesan segar; ivory dan champagne menambah kehangatan tanpa terasa berlebihan.
3. **Produk adalah fokus.** Foto hampers lebih dominan daripada teks dekoratif.
4. **Corporate-friendly.** Cocok untuk procurement, HR, sekretariat, klien bisnis, serta pembeli personal.
5. **Mobile-first.** CTA, kategori, dan informasi pemesanan mudah digunakan dari ponsel.
6. **Konsisten dan mudah dirawat.** Token CSS menjadi sumber warna, jarak, radius, shadow, dan ukuran.

## 2. Palet Warna

| Token | Hex | Kegunaan |
|---|---|---|
| Sky 500 | `#79BFE8` | Warna identitas, elemen dekoratif |
| Sky 600 | `#3E9BD1` | Tombol utama/link dengan teks putih setelah uji kontras |
| Sky 100 | `#EAF6FD` | Latar section lembut |
| Sky 50 | `#F5FBFF` | Latar alternatif |
| Navy 900 | `#16334A` | Heading, footer, teks kontras |
| Ink | `#263746` | Teks utama |
| Muted | `#687987` | Teks sekunder |
| White | `#FFFFFF` | Kartu dan latar |
| Ivory | `#F7F3EC` | Latar hangat |
| Champagne | `#C8A96B` | Aksen tipis, garis, ikon kecil |
| Border | `#DCE7EE` | Border dan divider |
| Success | `#287D57` | Status sukses |
| Danger | `#B42318` | Error/validasi |

**Aturan aksesibilitas:** warna identitas tidak otomatis lolos kontras. Uji kombinasi teks/latar sesuai WCAG 2.2 AA. Untuk tombol, gunakan `#267EAF` atau warna yang lebih gelap jika diperlukan agar teks putih memiliki kontras memadai. Champagne bukan warna untuk teks kecil di atas putih.

## 3. Typography

- Font utama: `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, sans-serif.
- Hindari ketergantungan font eksternal bila performa menjadi masalah; gunakan system fallback.
- Heading: bobot 600–700, line-height 1.15–1.25.
- Body: 16px desktop/mobile, line-height 1.6–1.75.
- Caption/metadata: minimum 12–14px sesuai konteks; jangan gunakan teks kecil untuk informasi penting.
- Maksimum lebar baris artikel: sekitar 65–75 karakter agar nyaman dibaca.

### Skala ukuran
- Display hero desktop: `clamp(2.4rem, 5vw, 4.25rem)`.
- H1 halaman: `clamp(2rem, 4vw, 3.25rem)`.
- H2 section: `clamp(1.6rem, 3vw, 2.4rem)`.
- H3 kartu/subsection: `1.15rem–1.4rem`.
- Body: `1rem`.
- Small: `0.875rem`.

## 4. CSS Design Tokens

Implementasikan di bagian atas `assets/css/style.css`:

```css
:root {
  --color-sky-500: #79bfe8;
  --color-sky-600: #267eaf;
  --color-sky-100: #eaf6fd;
  --color-sky-50: #f5fbff;
  --color-navy-900: #16334a;
  --color-ink: #263746;
  --color-muted: #687987;
  --color-white: #ffffff;
  --color-ivory: #f7f3ec;
  --color-champagne: #c8a96b;
  --color-border: #dce7ee;
  --color-success: #287d57;
  --color-danger: #b42318;

  --font-body: Inter, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  --container-max: 1200px;
  --header-height: 76px;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --section-space: clamp(3.5rem, 7vw, 6.5rem);

  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-pill: 999px;

  --shadow-card: 0 12px 32px rgba(22, 51, 74, 0.08);
  --shadow-hover: 0 18px 40px rgba(22, 51, 74, 0.13);

  --transition-fast: 180ms ease;
}
```

Sesuaikan nilai token bila hasil uji kontras atau foto produk menuntut perubahan. Jangan menyalin deklarasi token ke setiap komponen.

## 5. Grid dan Spacing

- Gunakan `.container` Bootstrap dengan lebar maksimum konsisten.
- Desktop: 12-column grid; jarak antarkolom 24–32px.
- Tablet: 2 kolom untuk kartu katalog.
- Mobile: 1 kolom untuk katalog utama; 2 kolom hanya untuk item ringkas jika tetap terbaca.
- Jarak section vertikal: `var(--section-space)`.
- Gunakan ritme jarak 4/8/12/16/24/32/48/64px.
- Hindari memaksakan tinggi tetap pada kartu yang teksnya dinamis.
- Batasi lebar paragraf hero sekitar 55–65 karakter.

## 6. Header dan Navbar

### Desktop
- Tinggi target 72–80px.
- Logo kiri, navigasi tengah/kanan, tombol CTA di sisi kanan.
- Latar putih, garis bawah tipis `--color-border`.
- Sticky header boleh digunakan bila tidak mengurangi ruang viewport atau mengganggu anchor navigation.
- Dropdown Paket memiliki jarak dan target klik yang cukup, serta focus state jelas.

### Mobile
- Navbar collapse Bootstrap.
- Tombol hamburger memiliki accessible name.
- Menu menutup setelah navigasi jika perilaku JavaScript diimplementasikan.
- CTA WhatsApp dapat tampil di menu atau sebagai tombol yang mudah ditemukan.
- Pastikan dropdown dapat dibuka dengan keyboard dan touch.

### Item navbar
- Beranda
- Tentang
- Paket ▾
- Portofolio
- Blog
- CTA: “Konsultasi”

Gunakan `aria-current="page"` untuk tautan halaman aktif bila sesuai. Jangan menggunakan `href="#"` untuk tautan produksi.

## 7. Beranda — Layout Detail

### 7.1 Hero
**Desktop:** 2 kolom (teks 5/12, visual 7/12).  
**Mobile:** teks lalu gambar atau gambar lalu teks sesuai prioritas konten; CTA tetap mudah terlihat.

Konten:
- Eyebrow: “HAMPERS UNTUK MOMEN BERMAKNA” (opsional).
- H1: “Hampers Custom untuk Apresiasi yang Lebih Berkesan”.
- Body: jelaskan siapa yang dilayani, jenis personalisasi, dan cara memulai—hindari klaim yang belum diverifikasi.
- Primary CTA: “Konsultasi via WhatsApp”.
- Secondary CTA: “Jelajahi Paket”.
- Visual: foto hampers asli dalam pencahayaan natural, latar terang, komposisi premium.
- Latar hero: putih atau `--color-sky-50`; dekorasi berupa bidang sky blue lembut, bukan gradient berlebihan.

### 7.2 Trust strip
- 3–4 poin maksimal.
- Gunakan fakta yang dapat dibuktikan, seperti “Opsi custom logo” jika benar-benar tersedia.
- Jangan membuat angka pelanggan/proyek atau logo klien rekaan.

### 7.3 Kategori
- Grid 3 kolom desktop, 2 tablet, 1–2 mobile.
- Foto rasio 4:3 atau 3:2 konsisten.
- Judul pendek, satu kalimat deskripsi, link “Lihat kategori”.
- Kartu dapat memiliki hover halus; jangan membuat seluruh kartu tidak aksesibel.

### 7.4 Paket pilihan
- Grid 3 kolom desktop.
- Kartu: foto, nama, ringkasan isi, badge kustomisasi hanya jika akurat, CTA.
- Harga opsional. Bila harga bergantung jumlah/isi, gunakan “Minta penawaran” dengan penjelasan.
- Jangan menampilkan label diskon palsu atau countdown.

### 7.5 Proses pemesanan
- 4–5 langkah bernomor.
- Desktop horizontal, mobile vertikal.
- Setiap langkah punya judul dan penjelasan ringkas.
- Jangan menjanjikan sampel, mockup, atau timeline jika layanan tersebut belum tersedia.

### 7.6 Portofolio
- Grid masonry hanya jika implementasinya stabil dan aksesibel; default gunakan grid teratur.
- Foto dominan, metadata singkat.
- Identitas klien hanya jika ada izin.

### 7.7 Testimoni dan FAQ
- Testimoni autentik, dengan izin; tanpa rating dekoratif yang dibuat-buat.
- FAQ memakai accordion Bootstrap yang dapat digunakan keyboard. Jawaban tersedia dalam DOM dan tetap dapat ditemukan tanpa interaksi kompleks.

### 7.8 CTA penutup
- Latar `--color-sky-100` atau navy dengan teks putih.
- Headline yang mengundang konsultasi.
- Tombol WhatsApp dan tautan ke paket.
- Jangan menempatkan terlalu banyak CTA yang saling bersaing.

## 8. Kartu Produk / Paket

Anatomi:
1. Gambar dengan rasio konsisten.
2. Nama paket.
3. Ringkasan isi atau tujuan.
4. Keterangan personalisasi bila tersedia.
5. Harga/rentang harga jika terverifikasi.
6. Link detail dan/atau CTA tanya paket.

Aturan:
- Radius 12–20px.
- Border tipis, shadow lembut.
- Hover: naik 2–4px maksimum dengan transisi pendek; matikan/kurangi jika `prefers-reduced-motion`.
- Gunakan gambar yang telah dioptimasi, dimensi eksplisit, dan `object-fit: cover` hanya bila crop tidak memotong detail produk penting.
- Untuk foto produk dengan tulisan/logo yang penting, gunakan crop yang sudah dikurasi dan hindari memotong kemasan.

## 9. Halaman Detail Paket

Urutan:
1. Breadcrumb.
2. Galeri foto.
3. Nama paket dan ringkasan.
4. Highlight isi/personalization.
5. Informasi spesifikasi.
6. Harga atau cara mendapatkan quotation.
7. MOQ, lead time, dan pengiriman jika telah diverifikasi.
8. FAQ paket.
9. Paket serupa.
10. CTA WhatsApp.

Desktop: galeri 6/12 dan panel ringkasan 6/12; panel tidak perlu sticky bila mengganggu. Mobile: galeri, nama, ringkasan, CTA, lalu detail.

## 10. Portofolio

- Gunakan foto asli yang punya izin.
- Filter berdasarkan kategori/momen dengan tombol nyata dan state aktif yang jelas.
- Jangan hanya mengandalkan warna untuk menandai filter aktif; gunakan teks, border, dan `aria-pressed`.
- Jika ada halaman studi kasus, tampilkan brief, solusi, pilihan kemasan, dan hasil yang dapat dibuktikan.
- Alt text menjelaskan objek, misalnya “Hampers perusahaan dengan kotak biru muda, pita ivory, dan kartu ucapan”; jangan mengulang keyword secara tidak natural.

## 11. Blog dan Artikel

### Indeks
- Judul halaman dan intro.
- Artikel unggulan (opsional).
- Kartu artikel: gambar, kategori, judul, excerpt, tanggal yang valid, penulis/editor bila ada.
- Pagination dengan tautan HTML yang dapat di-crawl.

### Artikel
- Lebar konten 720–780px.
- H1, metadata, gambar hero, daftar isi untuk artikel panjang, heading H2/H3, paragraf pendek, tabel/list bila membantu, sumber dan internal links.
- CTA terkait topik, bukan pop-up agresif.
- Tampilkan tanggal update hanya saat artikel benar-benar diperbarui secara substantif.
- Hindari tanggal otomatis yang tidak mencerminkan proses editorial.

## 12. Tombol, Link, dan CTA

### Primary
- Latar sky yang lolos kontras; teks putih.
- Tinggi target minimal sekitar 44px pada touch.
- Radius 8–12px.
- Focus ring terlihat.
- Hover lebih gelap, bukan sekadar mengubah opacity.

### Secondary
- Latar putih/transparan.
- Border navy/sky yang kontras.
- Teks navy.

### WhatsApp
- CTA utama menggunakan label jelas.
- Link: `https://wa.me/6282144267826`.
- Pesan kontekstual dapat dibuat dengan `encodeURIComponent()`.
- Floating CTA di kanan bawah opsional; ukuran tidak boleh menutupi tombol lain, cookie notice, atau konten mobile.
- Jangan memicu pembukaan WhatsApp tanpa aksi pengguna.

## 13. Formulir Inquiry

Field yang disarankan:
- Nama (wajib).
- Nama perusahaan/organisasi (opsional).
- Nomor kontak atau email (pilih yang memang diperlukan).
- Kategori hampers.
- Perkiraan kuantitas.
- Tanggal dibutuhkan.
- Kota/wilayah pengiriman.
- Anggaran (opsional).
- Catatan kebutuhan (opsional).
- Checkbox privasi jika diperlukan.

Aturan UI:
- Label selalu terlihat; jangan hanya mengandalkan placeholder.
- Error dekat field terkait dan bisa dibaca screen reader.
- Beri contoh format yang membantu.
- Tampilkan keterangan bahwa data digunakan untuk menanggapi permintaan.
- Jika belum ada backend, tombol “Lanjutkan ke WhatsApp” menyusun pesan dari input. Jelaskan bahwa pesan akan dibuka di WhatsApp dan belum dikirim otomatis.
- Jangan menyimpan data form ke analytics atau URL.

## 14. Footer

Kolom yang disarankan:
1. Brand + deskripsi singkat.
2. Navigasi.
3. Kategori paket.
4. Kontak dan WhatsApp.
5. Media sosial resmi.

Baris bawah:
- Copyright.
- Kebijakan privasi.
- Syarat layanan bila tersedia.

Tampilkan alamat dan jam operasional hanya setelah dikonfirmasi. Hindari peta embed jika belum diperlukan karena menambah beban halaman.

## 15. Komponen Bootstrap yang Dipakai

- `.container`, `.row`, `.col-*` untuk grid.
- Navbar dan collapse untuk navigasi mobile.
- Dropdown untuk menu Paket.
- Card untuk paket, kategori, artikel, dan portofolio.
- Button untuk CTA.
- Accordion untuk FAQ.
- Form controls untuk inquiry.
- Breadcrumb untuk hierarki halaman.
- Pagination untuk indeks panjang.
- Utility classes hanya untuk kebutuhan umum; aturan visual brand utama tetap ada di `style.css`.

**Batasan:** tidak menggunakan Tailwind, Bulma, Foundation, jQuery, atau framework CSS lain. Bootstrap JavaScript boleh digunakan untuk komponen Bootstrap yang memerlukannya. Fitur tambahan ditulis dengan vanilla JS.

## 16. Responsive Breakpoints

Gunakan breakpoint Bootstrap standar kecuali pengujian nyata menunjukkan kebutuhan lain:
- XS: <576px
- SM: ≥576px
- MD: ≥768px
- LG: ≥992px
- XL: ≥1200px
- XXL: ≥1400px

Uji minimal pada lebar 320, 375, 768, 1024, 1280, dan 1440px. Pastikan tidak ada horizontal overflow, teks terpotong, CTA terlalu rapat, atau gambar produk ter-crop secara keliru.

## 17. Motion dan State

- Durasi transisi: 150–220ms.
- Hindari parallax, autoplay carousel, dan animasi berlebihan.
- `prefers-reduced-motion: reduce` mengurangi/mematikan gerakan non-esensial.
- Semua state interaktif harus terlihat: hover, focus, active, disabled, error, success, empty state.
- Carousel tidak wajib; bila digunakan, sediakan kontrol yang jelas dan tidak memaksa autoplay.

## 18. Foto dan Asset

- Prioritaskan foto asli dengan izin penggunaan.
- Gaya: pencahayaan natural lembut, bayangan realistis, latar bersih, komposisi premium.
- Warna properti dan detail produk jangan diubah secara menyesatkan.
- Gunakan WebP/AVIF bila didukung dan sediakan fallback yang sesuai.
- Tentukan `width`/`height` atau `aspect-ratio` untuk mencegah layout shift.
- Hero image: prioritaskan pemuatan jika menjadi LCP; jangan gunakan lazy loading pada gambar utama yang terlihat pertama.
- Gambar bawah fold: `loading="lazy"` dan `decoding="async"` bila sesuai.
- Nama file deskriptif, misalnya `hampers-corporate-kotak-biru.jpg`.
- Alt text informatif; untuk gambar dekoratif gunakan `alt=""`.
- Siapkan social share image 1200×630px sebagai default yang umum, lalu uji tampilan platform tujuan.

## 19. SEO Visual dan Metadata per Template

Setiap template halaman harus menyediakan:
- `title` unik.
- `meta name="description"` unik.
- `link rel="canonical"` absolut.
- Open Graph: title, description, type, url, image, site name, locale.
- Twitter/X card metadata.
- JSON-LD yang relevan dengan tipe halaman dan konten yang terlihat.
- Breadcrumb visual dan schema pada halaman dalam.
- H1 unik dan heading hierarchy yang logis.

Jangan hardcode canonical ke URL contoh pada semua halaman. Jangan membuat `Product` schema untuk halaman kategori umum. Jangan menambahkan harga, review, stok, alamat, atau rating yang tidak benar.

## 20. Struktur File Frontend

```text
assets/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   ├── hero/
│   ├── packages/
│   ├── portfolio/
│   └── blog/
└── icons/
```

Urutan CSS:
1. Bootstrap CSS.
2. `style.css` untuk token dan override.
3. Hindari penggunaan `!important` berlebihan.

Urutan JS:
1. Bootstrap bundle versi yang dipatok.
2. `main.js` untuk interaksi khusus.
3. Gunakan `defer` untuk script yang tidak perlu blocking rendering.

## 21. Checklist Visual QA

- [ ] Warna sky blue konsisten, tidak terlalu neon.
- [ ] Ivory/champagne hanya sebagai aksen.
- [ ] Foto produk menjadi fokus, bukan ornamen.
- [ ] Ukuran heading dan jarak antar-section konsisten.
- [ ] Navbar mobile mudah dipakai.
- [ ] Dropdown dapat diakses keyboard dan touch.
- [ ] Kartu tidak melompat tinggi karena konten tidak konsisten.
- [ ] CTA memiliki label yang jelas dan fokus terlihat.
- [ ] Kontras diuji; teks champagne tidak digunakan pada putih untuk body text.
- [ ] Formulir memiliki label dan error state.
- [ ] Reduced motion dihormati.
- [ ] Tidak ada overflow horizontal pada 320px.
- [ ] Tombol WhatsApp tidak menutupi konten.
- [ ] Foto/logo klien ditampilkan dengan izin.
- [ ] Tidak ada klaim bisnis, harga, atau testimoni rekaan.

## 22. Catatan Pengembangan

Dokumen ini mendefinisikan sistem visual dan pola komponen, bukan menjamin hasil SEO atau kutipan AI. Implementasi harus divalidasi berdasarkan konten bisnis nyata, hasil pengujian aksesibilitas, performa, rendering lintas perangkat, serta pedoman mesin pencari yang berlaku saat website diluncurkan.
