# Brief Portofolio Rudi Heryansyah Rohdiana

## 1. Gambaran Umum
Portofolio ini adalah website statis satu halaman untuk memperkenalkan Rudi Heryansyah Rohdiana sebagai Web Developer. Halaman menggabungkan kemampuan web, UI/UX, backend, desain grafis, video editing, dan Internet of Things (IoT).

## 2. Struktur Folder Saat Ini
- `index.html` - Halaman utama portofolio
- `style.css` - Styling dan layout
- `script.js` - Logika interaktif (menu, form, animasi)
- `banner.svg` - Ilustrasi utama
- `banner2.svg` - Ilustrasi About
- `a1.PNG` hingga `a6.svg` - Gambar proyek

## 3. Struktur Halaman
### Header dan Navigasi
- Logo: `Rudi HR`.
- Navigasi anchor: `Home`, `About`, `Services`, `Projects`, dan `Contact`.
- Tombol `Contact Me` menuju WhatsApp.
- Menu hamburger aktif pada ukuran layar lebih kecil melalui `script.js`.

### Home
- Headline nama pemilik portofolio.
- Peran utama: Web Developer.
- Deskripsi singkat minat pada web, aplikasi, dan IoT.
- Tautan GitHub, LinkedIn, Instagram, dan Spotify.
- Tombol `Hire Me` menuju email Gmail.
- Tombol `Contact` menuju WhatsApp.
- Ilustrasi utama menggunakan `banner.svg`.

### About Me
- Identitas dan pendidikan: lulusan D3 Teknik Komputer Universitas Harkat Negeri.
- Penjelasan minat pada website, aplikasi mobile, IoT, desain grafis, dan video editing.
- Tombol `Read More` untuk menampilkan atau menyembunyikan deskripsi tambahan.
- Ilustrasi menggunakan `banner2.svg`.

### Services
Enam layanan yang ditampilkan:
1. UI/UX Design.
2. Frontend Development.
3. Backend Development.
4. Video Editing.
5. Graphic Design.
6. Internet of Things.

### Projects
Enam proyek ditampilkan dalam kartu dengan gambar, deskripsi, dan tombol review:
1. **Cafféra**: website profil coffee shop.
2. **Santap.in**: website restoran interaktif.
3. **Trendora**: toko online fashion.
4. **Brocass**: kandang anak ayam pintar berbasis IoT, dengan laporan PDF lokal.
5. **PKKMB 2023**: karya dari divisi kreatif, dengan aset pada Google Drive.
6. **MSIB Indobot 2024**: dokumentasi hasil desain proyek IoT dan digital.

### Contact
- Form berisi nama lengkap, email, nomor telepon, subjek, dan pesan.
- Form dikirim menggunakan EmailJS tanpa backend lokal.
- Status pengiriman ditampilkan pada elemen `#status`.

### Footer
- Tautan sosial yang sama dengan bagian Home.
- Tautan cepat ke FAQ, Services, About Me, Project, dan Contact.
- Nama pemilik portofolio sebagai copyright.

## 4. Teknologi dan Integrasi
- HTML5 untuk struktur halaman.
- CSS3 untuk layout, tema gelap, warna aksen oranye-merah, animasi, dan responsivitas.
- JavaScript vanilla untuk menu mobile dan interaksi Read More.
- Boxicons melalui CDN untuk ikon.
- EmailJS melalui CDN untuk pengiriman form.
- Tautan eksternal ke GitHub Pages, situs Trendora, Google Drive, Gmail, WhatsApp, serta media sosial.

## 5. Alur Interaksi
1. Pengunjung membuka halaman dan menggunakan navigasi anchor.
2. Pada layar kecil, ikon hamburger membuka atau menutup navbar.
3. Saat elemen masuk viewport, class `active` ditambahkan untuk animasi kemunculan.
4. Tombol `Read More` menampilkan atau menyembunyikan teks About.
5. Pengunjung dapat membuka proyek, sosial media, atau menghubungi pemilik.
6. Form Contact dicegat oleh JavaScript lalu dikirim melalui EmailJS.
7. Elemen `#status` menampilkan hasil pengiriman form.

## 6. Catatan Teknis
- Sebagian besar isi masih berada langsung di `index.html`; belum ada pemisahan komponen atau data proyek.
- `style.css` menggunakan font `Poppins`, tetapi stylesheet font tersebut belum dimuat secara eksplisit.
- Beberapa atribut gambar masih menggunakan `alt` kosong sehingga aksesibilitas dapat ditingkatkan.
- Link dengan `target="_blank"` sebaiknya ditambah `rel="noopener noreferrer"`.
- Kredensial EmailJS berada di dalam HTML. Public key memang lazim berada di sisi klien, tetapi konfigurasi dan validasi form tetap perlu diawasi.
- Status error dan sukses sebaiknya diberi gaya visual yang berbeda serta pesan yang lebih informatif.
- Tautan `FAQ` pada footer masih mengarah ke `#` dan belum memiliki section tujuan.
- Nama kelas `service-container` pada media query berbeda dari kelas aktual `services-container`, sehingga aturan tersebut tidak berpengaruh.
- CSS memiliki beberapa deklarasi yang perlu dirapikan, seperti `transition: 0,3s` dan `columns: var(--text-color)`.
- Breakpoint responsif saat ini berfokus pada satu media query `max-width: 1285px`; pengujian pada ponsel kecil dan tablet tetap diperlukan.

## 7. Agenda Pengembangan
### Prioritas Tinggi
- [ ] Memastikan semua gambar memiliki `alt` yang deskriptif.
- [ ] Memperbaiki media query `service-container` menjadi `services-container`.
- [ ] Memperbaiki typo deklarasi CSS dan memvalidasi ulang tampilan.
- [ ] Menguji form EmailJS untuk kondisi berhasil, gagal, dan koneksi tanpa internet.
- [ ] Menambahkan `rel="noopener noreferrer"` pada tautan eksternal yang membuka tab baru.

### Prioritas Menengah
- [ ] Memuat font yang benar atau mengganti deklarasi font dengan font yang tersedia.
- [ ] Menambahkan section FAQ atau menghapus tautan FAQ sementara.
- [ ] Menambahkan validasi dan feedback form yang lebih jelas.
- [ ] Menambahkan metadata SEO, favicon, dan deskripsi halaman.
- [ ] Mengoptimalkan ukuran gambar agar waktu muat lebih cepat.

### Prioritas Lanjutan
- [ ] Memisahkan data proyek dari markup agar lebih mudah dikelola.
- [ ] Menambahkan filter berdasarkan kategori proyek, misalnya Web, Design, dan IoT.
- [ ] Menambahkan halaman detail atau studi kasus untuk proyek unggulan.
- [ ] Menambahkan analitik kunjungan jika dibutuhkan.
- [ ] Menyiapkan deployment dengan struktur aset yang lebih terorganisasi.

## 8. Kriteria Selesai
- Semua menu anchor menuju section yang benar.
- Layout tetap terbaca pada desktop, tablet, dan ponsel.
- Semua gambar lokal tampil tanpa error.
- Tombol proyek dan kontak membuka tujuan yang benar.
- Tombol Read More dapat dibuka dan ditutup berulang kali.
- Form menampilkan status sukses atau gagal dengan jelas.
- Tidak ada error JavaScript atau referensi aset yang rusak pada browser.
