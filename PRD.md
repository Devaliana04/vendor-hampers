# PRD — Website Vendor Hampers Premium

**Versi dokumen:** 1.0  
**Tanggal:** 20 Oktober 2026  
**Status:** Draft untuk validasi dan pengembangan  
**Nama proyek:** Website Vendor Hampers  
**Bahasa utama:** Bahasa Indonesia  
**Stack:** HTML5, Bootstrap 5, CSS murni, JavaScript vanilla seperlunya

> Catatan implementasi: gunakan Bootstrap melalui file lokal atau CDN resmi yang versinya dipatok. Tampilan khusus ditulis dengan CSS buatan sendiri; jangan gunakan Tailwind, jQuery, framework CSS tambahan, atau template builder. JavaScript vanilla boleh digunakan untuk interaksi yang memang dibutuhkan, seperti navbar mobile, filter portofolio, dan validasi formulir.

---

## 1. Ringkasan Produk

Website pemasaran dan katalog untuk vendor hampers yang membantu perusahaan, instansi, organisasi, dan pelanggan individu menemukan paket yang sesuai, memeriksa contoh hasil pekerjaan, memahami alur pemesanan, lalu meminta konsultasi atau quotation melalui WhatsApp.

Website harus terasa profesional, rapi, premium, mudah dipakai pada ponsel, dan berorientasi pada konversi. Warna identitas utama adalah biru langit dengan kombinasi putih, ivory, biru tua, dan aksen champagne secukupnya.

## 2. Tujuan Bisnis

1. Menghasilkan prospek berkualitas melalui WhatsApp dan formulir permintaan penawaran.
2. Menampilkan katalog paket hampers yang mudah dijelajahi.
3. Meningkatkan kepercayaan melalui portofolio nyata, proses kerja, FAQ, dan informasi vendor.
4. Mendapatkan trafik organik dari pencarian terkait hampers, hampers corporate, hampers perusahaan, hampers custom, dan variasi lokal yang memang dilayani.
5. Membangun fondasi konten yang mudah dipahami mesin pencari, sistem jawaban, dan sistem pencarian berbasis AI tanpa menjanjikan posisi atau kutipan tertentu.

## 3. Sasaran Pengguna

- HR, GA, procurement, marketing, dan sekretariat perusahaan.
- Panitia acara, instansi pemerintah, kampus, komunitas, dan organisasi.
- Perusahaan yang membutuhkan hampers untuk hari raya, akhir tahun, onboarding, apresiasi klien, seminar, rapat, atau acara internal.
- Individu yang membutuhkan hampers untuk momen personal.

### Kebutuhan pengguna
- Menemukan paket berdasarkan momen, penerima, anggaran, dan kuantitas.
- Melihat foto, isi paket, opsi kustomisasi, estimasi pengerjaan, serta batas minimum order.
- Mengetahui apakah logo, kartu ucapan, warna, dan kemasan dapat disesuaikan.
- Mendapatkan harga atau quotation berdasarkan spesifikasi dan jumlah.
- Menghubungi vendor tanpa langkah yang rumit.

## 4. Ruang Lingkup

### Termasuk MVP
- Beranda.
- Tentang Kami.
- Halaman indeks Paket.
- Halaman kategori paket dan detail tiap paket.
- Portofolio dengan kategori/filter sederhana.
- Blog indeks dan artikel.
- FAQ.
- Kontak / permintaan quotation.
- CTA WhatsApp dengan pesan awal yang kontekstual.
- SEO teknis dasar, metadata, sitemap, robots.txt, canonical, Open Graph, schema JSON-LD yang sesuai isi.
- Responsive layout, aksesibilitas dasar, optimasi gambar, analitik setelah izin/konfigurasi.
- Halaman kebijakan privasi bila formulir mengumpulkan data.

### Di luar MVP
- Checkout dan pembayaran online.
- Login pelanggan.
- Dashboard vendor/CMS khusus.
- Pelacakan produksi dan pengiriman.
- Kalkulator harga otomatis dengan harga live.
- Multi-bahasa, kecuali diputuskan pada fase berikutnya.

## 5. Informasi yang Masih Harus Dikonfirmasi

Jangan mengarang data berikut. Gunakan placeholder yang mudah diganti sampai pemilik bisnis memberikan data final:
- Nama brand, logo, tagline, domain, email, alamat, jam operasional.
- Wilayah layanan dan kemampuan pengiriman.
- Kategori hampers, SKU, isi paket, opsi personalisasi, MOQ, harga atau rentang harga.
- Lead time produksi dan pengiriman.
- Kebijakan revisi desain, pembayaran, pembatalan, retur, dan garansi.
- Foto produk/portofolio asli serta izin menampilkan nama/logo klien.
- Profil bisnis yang sah untuk schema Organization/LocalBusiness.
- Link media sosial dan akun Google Business Profile bila ada.

Nomor WhatsApp yang ditetapkan:
- Nomor format internasional tanpa tanda `+`: `6282144267826`
- Link utama: `https://wa.me/6282144267826`
- Semua CTA WhatsApp harus mengarah ke nomor tersebut. Isi pesan harus di-URL-encode dan tidak boleh mengandung data sensitif yang tidak diperlukan.

## 6. Navigasi dan Arsitektur Informasi

Navbar desktop:
1. Beranda
2. Tentang
3. Paket (dropdown)
   - Semua Paket
   - Hampers Corporate
   - Hampers Hari Raya
   - Hampers Lebaran
   - Hampers Natal & Tahun Baru
   - Hampers Custom
   - Hampers Premium
   - Paket berdasarkan anggaran (hanya jika harga/rentang harga memang dikelola)
4. Portofolio
5. Blog
6. CTA “Konsultasi WhatsApp”

Kategori dropdown adalah rancangan awal dan harus disesuaikan dengan produk sebenarnya. Hindari membuat kategori tipis tanpa produk yang cukup.

Footer:
- Ringkasan brand.
- Navigasi halaman.
- Kategori paket.
- Kontak/WhatsApp.
- Wilayah layanan yang benar.
- Media sosial resmi.
- Kebijakan privasi dan syarat layanan jika relevan.
- Copyright dan tahun dinamis.

### Usulan URL
- `/`
- `/tentang/`
- `/paket/`
- `/paket/hampers-corporate/`
- `/paket/hampers-hari-raya/`
- `/paket/hampers-custom/`
- `/paket/nama-paket/`
- `/portofolio/`
- `/portofolio/nama-proyek/` bila studi kasus individual memberi nilai unik
- `/blog/`
- `/blog/slug-artikel/`
- `/faq/`
- `/kontak/`
- `/kebijakan-privasi/`

Gunakan slug pendek, deskriptif, lowercase, dan konsisten. Hindari URL dengan parameter untuk halaman utama yang perlu diindeks.

## 7. Persyaratan Isi Halaman

### 7.1 Beranda
1. **Hero section**
   - H1 yang jelas, misalnya “Vendor Hampers Custom untuk Kebutuhan Perusahaan dan Momen Spesial”.
   - Subheadline yang menjelaskan nilai utama: pilihan paket, personalisasi, kemasan, dan dukungan pemesanan.
   - CTA utama “Konsultasi via WhatsApp”.
   - CTA sekunder “Lihat Paket”.
   - Foto hampers terbaik dengan alt text deskriptif.
2. **Trust bar**
   - Tampilkan hanya fakta yang dapat dibuktikan, seperti jumlah proyek, tahun pengalaman, atau cakupan pengiriman.
   - Jika belum ada data, gunakan keunggulan proses yang benar, bukan angka rekaan.
3. **Kategori hampers**
   - Kartu kategori dengan foto, ringkasan, dan link ke halaman kategori.
4. **Paket pilihan**
   - Foto, nama paket, highlight isi, opsi personalisasi, dan CTA detail.
   - Harga hanya jika akurat dan diperbarui; jika harga berdasarkan kuantitas, jelaskan “minta penawaran”.
5. **Mengapa memilih kami**
   - Contoh: opsi custom, bantuan pemilihan paket, kemasan rapi, konsultasi kebutuhan, koordinasi pengiriman—hanya klaim yang benar-benar tersedia.
6. **Cara pemesanan**
   - Konsultasi → pilih paket dan jumlah → konfirmasi spesifikasi/quotation → persetujuan desain/sampel bila tersedia → pembayaran → produksi → QC dan pengiriman.
7. **Portofolio unggulan**
   - Proyek nyata, foto asli, jenis kebutuhan, dan izin publikasi.
8. **Use case / momen**
   - Apresiasi klien, hari raya, akhir tahun, onboarding, seminar, rapat, penghargaan, dan acara perusahaan.
9. **Testimoni**
   - Kutipan dan identitas hanya dengan izin serta harus autentik.
10. **FAQ ringkas**
    - MOQ, custom logo, lead time, pengiriman, harga, desain, dan pembayaran.
11. **CTA penutup**
    - Ajak pengguna menyampaikan kebutuhan, anggaran, jumlah, dan tenggat waktu.
12. **Footer lengkap**

### 7.2 Tentang
- H1 tentang vendor.
- Cerita dan latar belakang brand.
- Misi/nilai yang nyata.
- Kapabilitas dan jenis layanan.
- Tim/proses kerja bila relevan.
- Foto workshop/tim/produksi yang autentik.
- Prinsip QC dan komunikasi.
- Wilayah layanan yang benar.
- CTA konsultasi.

### 7.3 Indeks Paket
- H1 “Paket Hampers”.
- Intro yang menjelaskan cara memilih.
- Kategori dan filter yang benar-benar berfungsi.
- Kartu paket konsisten.
- Informasi opsi custom, rentang harga atau cara meminta quotation.
- FAQ pemilihan paket.
- CTA konsultasi.
- Pagination atau “muat lainnya” yang dapat diakses dan crawlable bila katalog panjang.

### 7.4 Halaman Kategori
- H1 unik berdasarkan kategori.
- Intro spesifik, bukan paragraf duplikat.
- Paket terkait.
- Panduan memilih berdasarkan penerima, momen, jumlah, dan anggaran.
- FAQ yang benar-benar relevan.
- Internal link ke kategori terkait, portofolio, artikel, dan kontak.
- CTA WhatsApp dengan pesan yang menyebut kategori.

### 7.5 Detail Paket
- Nama dan foto paket asli.
- Ringkasan manfaat/kegunaan.
- Isi paket yang terperinci.
- Material/ukuran/warna jika diketahui.
- Pilihan kemasan.
- Opsi logo, kartu ucapan, sleeve, pita, atau personalisasi lain yang memang tersedia.
- MOQ dan harga/rentang harga bila terverifikasi.
- Lead time dan ketentuan pengiriman.
- Batasan custom dan ketersediaan.
- Foto detail serta foto skala bila berguna.
- FAQ spesifik.
- Paket terkait.
- CTA “Tanyakan Paket Ini” yang mengisi pesan WhatsApp dengan nama/URL paket.
- Jangan menampilkan rating, review, harga, stok, atau klaim yang tidak nyata.

### 7.6 Portofolio
- H1 “Portofolio Hampers”.
- Galeri foto hasil proyek.
- Filter kategori atau momen.
- Untuk studi kasus: konteks kebutuhan, solusi paket, personalisasi, jumlah bila boleh dipublikasikan, dan hasil yang bisa dibuktikan.
- Identitas/logo klien hanya jika memiliki izin.
- Alt text yang menjelaskan objek, bukan menjejalkan kata kunci.
- CTA konsultasi.

### 7.7 Blog
- Indeks dengan kategori, pencarian opsional, tanggal, penulis/editor, dan ringkasan.
- Artikel dengan judul jelas, penulis yang dapat dipertanggungjawabkan, tanggal publikasi dan pembaruan jika benar, daftar isi untuk artikel panjang, heading terstruktur, sumber untuk klaim faktual, gambar berizin, internal link, FAQ jika bermanfaat, dan CTA kontekstual.
- Artikel tidak boleh dibuat hanya untuk mengejar keyword; harus menjawab kebutuhan nyata pembeli.

### 7.8 FAQ
Topik awal:
- Apakah hampers bisa custom logo?
- Apakah bisa menambahkan kartu ucapan?
- Berapa minimum pemesanan?
- Bagaimana cara mendapatkan quotation?
- Berapa lama produksi?
- Apakah dapat memesan untuk banyak penerima/alamat?
- Apakah tersedia sampel?
- Bagaimana aturan pembayaran dan revisi?
- Apakah pengiriman ke luar kota tersedia?
- Apakah isi paket dapat diganti?
Jawaban wajib sesuai kebijakan vendor. Jangan mengisi jawaban yang belum dikonfirmasi.

### 7.9 Kontak / Permintaan Penawaran
- Nomor WhatsApp dan jam operasional yang valid.
- Formulir: nama, perusahaan/organisasi (opsional), email/telepon (opsional sesuai kebutuhan), kategori hampers, estimasi kuantitas, anggaran opsional, tanggal dibutuhkan, wilayah pengiriman, dan detail kebutuhan.
- Persetujuan privasi yang jelas jika data dikumpulkan.
- Validasi sisi klien; validasi server jika nantinya terhubung backend.
- Pesan sukses/gagal yang jelas.
- Jika tanpa backend, jangan menampilkan seolah formulir sudah tersimpan. Alternatif MVP: susun pesan lalu buka WhatsApp setelah pengguna menekan tombol.
- Jangan meminta data pribadi yang tidak diperlukan.

## 8. Alur Konversi dan WhatsApp

### CTA umum
`https://wa.me/6282144267826?text=...`

Contoh pesan awal:
“Halo, saya ingin konsultasi mengenai kebutuhan hampers. Mohon informasi pilihan paket, minimum pemesanan, estimasi pengerjaan, dan penawaran harga. Terima kasih.”

Pesan pada detail paket sebaiknya mencakup nama paket dan tautan halaman. Encode teks menggunakan `encodeURIComponent()` pada JavaScript vanilla.

### Aturan
- Gunakan `target="_blank"` dan `rel="noopener noreferrer"` untuk tautan yang dibuka di tab baru.
- Beri label aksesibel, misalnya “Konsultasi hampers melalui WhatsApp”.
- Tombol WhatsApp mengambang tidak boleh menutupi konten, tombol submit, atau kontrol mobile.
- Jangan otomatis membuka WhatsApp saat halaman dimuat.
- Catat klik CTA melalui analytics hanya setelah konfigurasi consent/privasi yang sesuai.

## 9. Desain dan UI

- Arah visual: premium, bersih, hangat, modern, profesional.
- Warna utama: sky blue; warna pendukung: putih, ivory, navy, champagne.
- Foto produk asli menjadi fokus utama; hindari layout penuh ornamen atau teks dekoratif.
- Typography sans-serif yang mudah dibaca.
- Konsistensi radius, spacing, ukuran tombol, rasio foto, dan hierarchy.
- Responsive: mobile-first; uji pada 320px, 375px, 768px, 1024px, dan desktop lebar.
- Komponen Bootstrap digunakan sebagai fondasi grid, navbar, dropdown, cards, buttons, forms, accordion, dan utilities; override visual ditulis di CSS sendiri.
- Hormati `prefers-reduced-motion`; animasi sederhana dan tidak mengganggu.

## 10. Persyaratan SEO, AEO, GEO, dan Metadata

### 10.1 SEO on-page
- Satu H1 utama yang spesifik per halaman.
- Title unik dan deskriptif; target awal sekitar 50–60 karakter bila sesuai, bukan batas kaku.
- Meta description unik, akurat, dan mengundang klik; sekitar 140–160 karakter sebagai panduan, bukan aturan mesin pencari.
- URL bersih, canonical absolut, breadcrumb visual untuk halaman dalam.
- Heading H2/H3 logis; internal linking kontekstual.
- Konten orisinal, berguna, sesuai intent; hindari keyword stuffing dan halaman doorway.
- Alt text untuk gambar bermakna; gambar dekoratif memakai alt kosong.
- Metadata sosial dan favicon.
- Jangan menjanjikan keyword ranking.

### 10.2 SEO teknis
- HTTPS, satu versi domain kanonis, redirect 301 dari variasi domain/protokol yang tidak dipakai.
- HTML semantik, status HTTP benar, 404 khusus, redirect tidak berantai.
- `robots.txt` tidak memblokir CSS/JS yang dibutuhkan rendering.
- `sitemap.xml` hanya URL kanonis yang boleh diindeks; perbarui `lastmod` secara akurat.
- Canonical bukan pengganti redirect untuk duplikat URL.
- Hindari meta keywords; tidak diperlukan untuk SEO Google modern.
- Jangan menambahkan `noindex` ke halaman penting secara tidak sengaja.
- Gunakan pagination yang crawlable untuk katalog/blog besar.
- Structured data harus sesuai konten yang terlihat dan tidak boleh menyatakan fakta palsu.
- Optimasi Core Web Vitals: LCP ≤ 2,5 detik, INP ≤ 200 ms, CLS ≤ 0,1 pada persentil ke-75 sebagai target pengalaman pengguna.
- Gunakan responsive images (`srcset`, `sizes`), WebP/AVIF bila sesuai, dimensi gambar eksplisit, lazy loading untuk gambar di bawah fold, jangan lazy-load hero/LCP image.
- Minify CSS/JS untuk produksi, caching, compression, dan kurangi script pihak ketiga.
- Sediakan halaman error yang berguna.

### 10.3 AEO — Answer Engine Optimization
- Jawab pertanyaan utama secara langsung dalam 1–3 kalimat setelah heading pertanyaan.
- FAQ menggunakan bahasa pelanggan, bukan keyword kaku.
- Definisikan istilah dan proses secara jelas.
- Cantumkan tanggal, penulis/editor, sumber, dan konteks bila relevan.
- Gunakan tabel/list hanya ketika membantu pembaca.
- Pastikan konten penting hadir dalam HTML yang dapat dirender dan tidak tersembunyi hanya dalam gambar.
- FAQ schema tidak menjamin rich result; Google membatasi tampilan FAQ rich results untuk banyak situs.

### 10.4 GEO — Generative Engine Optimization
- Prioritaskan informasi faktual, spesifik, konsisten, dan mudah diverifikasi.
- Jelaskan siapa vendor, layanan, kategori, area layanan, cara pemesanan, dan batasan.
- Tampilkan bukti pengalaman melalui portofolio asli, penulis/editor, sumber, dan kebijakan yang jelas.
- Gunakan heading deskriptif, paragraf ringkas, definisi, daftar, dan tabel yang bermanfaat.
- Konsistensi nama brand, alamat, telepon, profil sosial, dan deskripsi pada website serta profil resmi lain.
- Buat konten yang menjawab intent; jangan menulis teks khusus yang hanya ditujukan untuk memanipulasi AI.
- Tidak ada schema atau file khusus yang menjamin situs dikutip oleh sistem AI. Ikuti kebijakan crawling tiap penyedia bila diperlukan.

### 10.5 Open Graph dan social sharing
Minimal per halaman:
- `og:title`
- `og:description`
- `og:type` (`website` atau `article`)
- `og:url`
- `og:image` dengan URL absolut, resolusi yang memadai, dan gambar yang memiliki izin
- `og:site_name`
- `og:locale` = `id_ID`
- `twitter:card` = `summary_large_image`
- `twitter:title`, `twitter:description`, `twitter:image`
- Metadata harus spesifik per URL; jangan gunakan satu deskripsi yang sama untuk semua artikel.
- Open Graph membantu tampilan preview sosial, bukan faktor ranking langsung yang berdiri sendiri.

### 10.6 Schema.org / JSON-LD
Gunakan JSON-LD valid, diuji dengan Schema Markup Validator dan Google Rich Results Test bila tipe tersebut didukung.

Jenis yang mungkin sesuai:
- `Organization` untuk organisasi/vendor.
- `WebSite` dan `WebPage`.
- `BreadcrumbList` untuk halaman dalam.
- `Product` hanya jika halaman benar-benar menampilkan produk dengan informasi yang memenuhi ketentuan; jangan mengarang `offers`, harga, stok, rating, atau review.
- `Article` atau `BlogPosting` untuk artikel.
- `ImageObject` bila sesuai.
- `LocalBusiness` hanya jika ada bisnis lokal yang nyata dan informasi alamat/jenis bisnisnya akurat. Jangan membuat alamat fiktif.
- `FAQPage` hanya jika FAQ terlihat pada halaman. Jangan berharap rich result FAQ otomatis tampil.
- `Service` dapat menjelaskan layanan secara semantik, tetapi tidak otomatis menghasilkan rich result Google.
- `AggregateRating`/`Review` hanya jika ulasan asli dan sesuai pedoman; jangan membuat review sendiri.

Gunakan `@id` yang stabil, `url` kanonis, nama brand konsisten, `inLanguage: "id-ID"`, dan `sameAs` hanya untuk profil resmi. Jangan menambahkan tipe yang tidak relevan atau data tersembunyi yang berbeda dari konten halaman.

### 10.7 Search Console dan pengukuran
- Verifikasi Google Search Console.
- Kirim sitemap XML.
- Pantau indexing, canonical, enhancement, dan Core Web Vitals.
- Gunakan Bing Webmaster Tools bila relevan.
- Analytics harus dikonfigurasi sesuai kebijakan privasi dan persetujuan yang berlaku.
- Ukur organic landing pages, klik WhatsApp, submit inquiry, CTR, engaged sessions, dan kualitas lead.
- Gunakan UTM untuk kampanye yang sesuai; jangan memasukkan data pribadi ke URL.

## 11. Strategi Konten dan Keyword

Keyword adalah hipotesis yang harus divalidasi dengan riset pencarian dan data pelanggan, bukan daftar yang ditanam berulang-ulang.

### Cluster awal
- Utama: vendor hampers, vendor hampers custom, hampers perusahaan, hampers corporate.
- Produk: hampers premium, hampers custom logo, hampers eksklusif, paket hampers perusahaan.
- Momen: hampers Lebaran, hampers Natal, hampers akhir tahun, hampers apresiasi klien.
- Panduan: cara memilih hampers perusahaan, ide isi hampers corporate, cara menentukan anggaran hampers, tips memesan hampers custom.
- Lokal: `vendor hampers [kota]` hanya jika benar-benar melayani kota tersebut dan halaman memiliki informasi lokal yang bermanfaat.

### Prinsip editorial
- Satu halaman memiliki satu intent utama.
- Hindari membuat banyak halaman kota yang hanya mengganti nama kota.
- Blog perlu membantu keputusan pembelian dan menautkan pembaca ke kategori/paket terkait.
- Artikel harus ditinjau akurasinya, terutama harga, tren, ketentuan pengiriman, dan tenggat musiman.
- Gunakan kalender konten mengikuti musim dan waktu produksi aktual.

## 12. Kebutuhan Teknis dan Struktur File

```text
hampers-website/
├── index.html
├── tentang.html
├── paket/
│   ├── index.html
│   ├── hampers-corporate.html
│   └── nama-paket.html
├── portofolio/
│   └── index.html
├── blog/
│   ├── index.html
│   └── artikel-contoh.html
├── kontak.html
├── faq.html
├── kebijakan-privasi.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── img/
│   └── icons/
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── 404.html
├── PRD.md
└── design.md
```

Struktur URL di produksi dapat memakai rewrite/server routing agar URL lebih rapi. Jangan membuat folder/URL yang tidak diperlukan hanya untuk meniru struktur contoh.

### Standar implementasi
- Bootstrap 5.x dipatok ke versi stabil yang dipilih saat development; cek release/security notes saat implementasi.
- HTML5 valid dan semantik.
- CSS khusus terpisah dalam `assets/css/style.css`.
- JavaScript vanilla dalam `assets/js/main.js`; tidak menambah library tanpa alasan.
- Semua gambar memakai nama file deskriptif, dimensi jelas, dan lisensi/izin penggunaan yang benar.
- Hindari inline style berulang; gunakan design tokens CSS.
- Link internal relatif atau absolut kanonis secara konsisten.
- External links aman.
- Semua tombol punya aksi nyata; tidak ada link `#` kosong sebagai placeholder produksi.

## 13. Aksesibilitas dan Kualitas

- Target WCAG 2.2 AA sebagai standar desain/pengujian.
- Kontras teks memadai; jangan mengandalkan warna saja untuk menyampaikan status.
- Navigasi keyboard dan focus state terlihat.
- Label formulir terhubung ke input; error dijelaskan secara tekstual.
- Alt text relevan; heading tidak melompat secara acak.
- Dropdown navbar dapat digunakan dengan keyboard/touch.
- Hormati reduced motion.
- Uji zoom 200%, mobile portrait, dan perangkat tanpa hover.
- Sediakan skip link ke konten utama.

## 14. Keamanan dan Privasi

- HTTPS wajib di produksi.
- Jangan menaruh API secret atau kredensial di frontend.
- Validasi input di server bila memakai backend.
- Lindungi formulir dari spam bila terhubung backend.
- Jelaskan tujuan pengumpulan data, retensi, dan cara menghubungi pengelola.
- Jangan mengumpulkan data yang tidak dibutuhkan.
- Jika memakai cookie/analytics non-esensial, implementasikan persetujuan sesuai ketentuan yang berlaku.
- Hindari memasukkan data pribadi ke analytics, URL, atau pesan otomatis.

## 15. Kriteria Penerimaan (Acceptance Criteria)

### Fungsi
- [ ] Navbar desktop dan mobile bekerja.
- [ ] Dropdown Paket dapat diakses mouse, keyboard, dan touch.
- [ ] Semua CTA WhatsApp menuju `6282144267826`.
- [ ] CTA pada detail paket membawa konteks nama paket.
- [ ] Formulir memberi validasi dan tidak mengklaim menyimpan data tanpa backend.
- [ ] Kartu paket, artikel, portofolio, dan internal links menuju URL yang benar.
- [ ] Tidak ada tombol/link mati.

### Konten
- [ ] Semua halaman memiliki tujuan, CTA, dan konten unik.
- [ ] Informasi bisnis yang belum dikonfirmasi tetap ditandai placeholder dan tidak dipublikasikan sebagai fakta.
- [ ] Foto memiliki hak penggunaan dan alt text yang sesuai.
- [ ] Testimoni, logo klien, harga, MOQ, lead time, serta klaim jumlah proyek terverifikasi.

### SEO dan teknis
- [ ] Title, description, canonical, OG, dan heading unik per halaman.
- [ ] JSON-LD valid dan cocok dengan konten yang terlihat.
- [ ] Sitemap berisi URL kanonis yang ingin diindeks.
- [ ] robots.txt tidak memblokir aset penting.
- [ ] Halaman penting mengembalikan status HTTP benar.
- [ ] Tidak ada broken links, gambar tanpa dimensi, atau console error yang diketahui.
- [ ] Lighthouse dan Core Web Vitals diperiksa; target performa ditetapkan dan masalah besar ditangani.
- [ ] Search Console siap diverifikasi setelah domain aktif.

### UX
- [ ] Tidak ada horizontal overflow pada viewport mobile.
- [ ] Focus keyboard terlihat.
- [ ] Kontras dan label form diperiksa.
- [ ] CTA tidak menutupi konten.
- [ ] Gambar hero tidak lazy-load jika menjadi elemen LCP.

## 16. Rencana Pelaksanaan

1. Discovery: validasi brand, wilayah, paket, harga, MOQ, lead time, foto, kebijakan.
2. Content inventory: siapkan konten tiap halaman dan keyword intent.
3. Design: bangun token warna, komponen, responsive layout, dan state.
4. Development: markup Bootstrap + CSS murni + JavaScript vanilla.
5. Content integration: masukkan paket, foto, artikel, dan data bisnis terverifikasi.
6. SEO setup: metadata, canonical, JSON-LD, sitemap, robots, OG, redirects.
7. QA: perangkat, aksesibilitas, tautan, form, performa, schema.
8. Launch: domain/HTTPS, Search Console, analytics yang sesuai.
9. Iterasi: evaluasi query, landing page, klik WhatsApp, dan kualitas lead.

## 17. Risiko dan Mitigasi

- **Data bisnis belum lengkap:** gunakan placeholder internal, jangan tayangkan fakta rekaan.
- **Harga berubah:** tampilkan “minta quotation” atau tanggal pembaruan harga.
- **Konten duplikat:** buat halaman kategori berdasarkan kebutuhan yang berbeda.
- **Gambar berat:** gunakan WebP/AVIF, ukuran responsif, dan kompresi.
- **Ekspektasi rich results:** jelaskan bahwa schema meningkatkan pemahaman mesin, bukan jaminan rich result.
- **GEO disalahartikan sebagai trik ranking:** fokus pada fakta, bukti, struktur, dan aksesibilitas konten.
- **Bootstrap dianggap “CSS murni” tanpa framework:** sepakati bahwa Bootstrap adalah framework CSS utama dan semua styling tambahan ditulis dengan CSS biasa; tidak menggunakan framework CSS lain.

## 18. Definisi Selesai

Website dianggap siap rilis ketika semua halaman MVP selesai, data bisnis telah diverifikasi, seluruh CTA dan navigasi berfungsi, metadata/schema diuji, halaman mobile dan desktop lolos QA, tidak ada masalah aksesibilitas/performa kritis yang diketahui, dan pemilik bisnis menyetujui konten serta foto yang dipublikasikan.
