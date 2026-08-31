# Brief Portofolio Rudi Heryansyah Rohdiana

## 1. Gambaran Umum

Portofolio ini adalah website statis satu halaman untuk memperkenalkan Rudi Heryansyah Rohdiana sebagai Web Developer. Halaman menggabungkan kemampuan web, UI/UX, backend, desain grafis, video editing, dan Internet of Things (IoT).

Tujuan utama website:

- Memperkenalkan identitas dan latar belakang profesional.
- Menampilkan layanan yang dikuasai.
- Menampilkan proyek yang pernah dibuat.
- Menyediakan jalur komunikasi melalui email dan WhatsApp.
- Mengarahkan pengunjung ke profil sosial dan hasil karya eksternal.

## 2. Struktur Folder Saat Ini

```text
Portofolio_RudiHeryansyahR-main/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
|-- LAPORAN_Rudi_Heryansyah_Rohdiana.pdf
|-- banner.svg
|-- banner2.svg
|-- a1.PNG
|-- a2.PNG
|-- a3.PNG
|-- a4.svg
|-- a5.svg
|-- a6.svg
|-- services/
|   |-- ui-ux.html
|   |-- frontend.html
|   |-- backend.html
|   |-- video-editing.html
|   |-- graphic-design.html
|   |-- iot.html
|   |-- soft-communication.html
|   |-- soft-project.html
|   |-- soft-service.html
|   |-- soft-teamwork.html
|   |-- soft-problem.html
|   `-- soft-adaptability.html
`-- brief/
    `-- agend.md
```

## 3. Struktur Halaman

### Header dan Navigasi

- Logo: `Rudi HR`.
- Navigasi anchor: `Home`, `About`, `Services`, `Experience`, dan `Contact`.
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

Dibagi menjadi dua kategori; tiap kartu berisi ikon, judul, deskripsi, dan tombol yang mengarah ke halaman detail di `services/`.

**Hard Skill** (6 kartu; kotak dokumentasi berisi gambar proyek nyata):
1. UI/UX Design → `services/ui-ux.html`
2. Frontend Development → `services/frontend.html`
3. Backend Development → `services/backend.html`
4. Video Editing → `services/video-editing.html`
5. Graphic Design → `services/graphic-design.html`
6. Internet of Things → `services/iot.html`

**Soft Skill** (6 kartu; tanpa kotak dokumentasi, tombol "Mau tahu caraku bekerja?"):
1. Komunikasi Klien → `services/soft-communication.html`
2. Manajemen Proyek → `services/soft-project.html`
3. Pelayanan Pelanggan → `services/soft-service.html`
4. Kolaborasi Tim → `services/soft-teamwork.html`
5. Pemecahan Masalah → `services/soft-problem.html`
6. Adaptabilitas → `services/soft-adaptability.html`

### Experience & Activities

Satu section tunggal dengan grid kartu kompak (responsif 3/2/1 kolom). Tiap kartu berisi ikon, periode waktu, badge kategori (**Experience** / **Activities**), judul, sub-judul, deskripsi, dan gallery dokumentasi (thumbnail placeholder). Isi:
- **Experience**: D3 Teknik Komputer, Junior Developer, Web Developer & Creative Explorer.
- **Activities**: PKKMB 2023, Juara 2 Lomba Qu i cky Macky, Team Leader LKTI ("Utilizing AI to Build a Smart and Dynamic Future"), Leader UKM Bulutangkis, MSIB Indobot.

### Projects

Section **Projects telah dihapus**. Keenam proyek sebelumnya (Cafféra, Santap.in, Trendora, Brocass, PKKMB 2023, MSIB Indobot) kini direferensikan sebagai gambar dokumentasi pada kartu Hard Skill di Services.

### Contact

- Form berisi Nama Lengkap, Email, Nomor Telepon (opsional), Subjek, dan Pesan.
- Saat dikirim, data biodata digabung menjadi pesan lalu dibuka ke WhatsApp pemilik via `https://wa.me/62895605976398`.
- Status ditampilkan pada elemen `#status` (hijau = mengarahkan, merah = validasi gagal).

### Footer

- Tautan sosial yang sama dengan bagian Home.
- Tautan cepat ke FAQ, Services, Experience, About Me, dan Contact.
- Nama pemilik portofolio sebagai copyright.

## 4. Teknologi dan Integrasi

- HTML5 untuk struktur halaman.
- CSS3 untuk layout, tema gelap, warna aksen oranye-merah, animasi, grid kartu, dan responsif.
- JavaScript vanilla untuk menu mobile dan interaksi Read More.
- Boxicons melalui CDN untuk ikon.
- Halaman detail dokumentasi di folder `services/` (12 file HTML).
- Tautan eksternal ke GitHub Pages, Google Drive, WhatsApp (form & tombol), serta media sosial.

## 5. Alur Interaksi

1. Pengunjung membuka halaman dan menggunakan navigasi anchor.
2. Pada layar kecil, ikon hamburger membuka atau menutup navbar.
3. Saat elemen masuk viewport, class `active` ditambahkan untuk animasi kemunculan.
4. Tombol `Read More` menampilkan atau menyembunyikan teks About.
5. Pengunjung dapat membuka proyek, sosial media, atau menghubungi pemilik.
6. Form Contact dicegat oleh JavaScript lalu membuka WhatsApp dengan pesan dari biodata.
7. Elemen `#status` menampilkan hasil pengiriman form.

## 6. Catatan Teknis

- `style.css` menggunakan font `DM Sans` & `Space Grotesk` yang dimuat via Google Fonts.
- Navigasi diperbarui: anchor `Projects` dihapus, diganti `Experience`; section `Projects` ikut dihapus.
- Services dibagi Hard Skill (6 kartu ber-gambar proyek) & Soft Skill (6 kartu), masing-masing mengarah ke halaman detail `services/`.
- Experience & Activities menggunakan grid kartu kompak dengan badge kategori dan gallery dokumentasi.
- Form Contact tidak lagi memakai EmailJS; diarahkan ke WhatsApp via `wa.me` (CDN EmailJS sudah dicabut).
- Link eksternal (`target="_blank"`) menggunakan `rel="noopener noreferrer"`.
- CSS lama `service-container` sudah diperbaiki menjadi `services-container`; deklarasi `transition: 0,3s` & `columns: var(--text-color)` sudah dibersihkan.
- Beberapa gambar masih menggunakan `alt` kosong (perlu diperbaiki untuk aksesibilitas).
- Tautan `FAQ` di footer masih mengarah ke `#` (belum ada section tujuan).
- Breakpoint responsif sudah ditambah (1285px & 700px); pengujian ponsel kecil & tablet tetap diperlukan.

## 7. Agenda Pengembangan

### Prioritas Tinggi

- [x] Memperbaiki media query `service-container` menjadi `services-container`.
- [x] Memperbaiki typo deklarasi CSS (`transition: 0,3s`, `columns: var(--text-color)`) dan memvalidasi ulang tampilan.
- [x] Menambahkan `rel="noopener noreferrer"` pada tautan eksternal yang membuka tab baru.
- [x] Mengubah form Contact dari EmailJS menjadi pengiriman pesan via WhatsApp.
- [x] Menghapus section Projects & tautannya; proyek dipindahkan sebagai gambar dokumentasi Hard Skill.
- [ ] Memastikan semua gambar memiliki `alt` yang deskriptif.

### Prioritas Menengah

- [x] Memuat font yang benar (DM Sans & Space Grotesk via Google Fonts).
- [x] Membagi Services menjadi Hard Skill & Soft Skill dengan halaman dokumentasi detail (`services/`).
- [x] Menambahkan validasi & feedback form (status `#status`).
- [ ] Menambahkan section FAQ atau menghapus tautan FAQ sementara.
- [ ] Menambahkan metadata SEO, favicon, dan deskripsi halaman.
- [ ] Mengoptimalkan ukuran gambar agar waktu muat lebih cepat.

### Prioritas Lanjutan

- [ ] Menambahkan filter berdasarkan kategori proyek (Web, Design, IoT) pada kartu Hard Skill.
- [ ] Memisahkan data dokumentasi dari markup agar lebih mudah dikelola.
- [ ] Menambahkan halaman detail atau studi kasus untuk proyek unggulan.
- [ ] Mengganti thumbnail gallery placeholder dengan foto dokumentasi asli.
- [ ] Menambahkan analitik kunjungan jika dibutuhkan.
- [ ] Menyiapkan deployment dengan struktur aset yang lebih terorganisasi.

## 8. Log Perubahan (Update Terbaru)

- **Services**: dibagi Hard Skill (6 kartu, tiap kartu menampilkan gambar proyek nyata + tombol "Lihat Dokumentasi Lengkap" → `services/*.html`) dan Soft Skill (6 kartu, tombol "Mau tahu caraku bekerja?" → `services/soft-*.html`). Dibuat 12 halaman dokumentasi detail (konten dummy).
- **Experience & Activities**: digabung menjadi satu section dengan grid kartu kompak (bukan timeline vertikal); tiap kartu memiliki badge kategori (Experience/Activities), periode waktu, dan gallery dokumentasi. Ukuran kartu diseragamkan (`grid-auto-rows: 1fr` + gallery di bawah).
- **Projects**: section dihapus; 6 proyek direferensikan sebagai gambar pada kartu Hard Skill.
- **Contact**: form biodata (nama, email, telepon, subjek, pesan) kini mengirim pesan ke WhatsApp (`wa.me/62895605976398`); EmailJS dicabut.
- **Navigasi**: anchor `Projects` diganti `Experience`; tautan footer disesuaikan.
- **Aksesibilitas/Keamanan**: link `target="_blank"` ditambah `rel="noopener noreferrer"`; font dimuat eksplisit.

## 9. Kriteria Selesai

- Semua menu anchor menuju section yang benar.
- Layout tetap terbaca pada desktop, tablet, dan ponsel.
- Semua gambar lokal tampil tanpa error.
- Tombol proyek dan kontak membuka tujuan yang benar.
- Tombol Read More dapat dibuka dan ditutup berulang kali.
- Form menampilkan status sukses atau gagal dengan jelas.
- Tidak ada error JavaScript atau referensi aset yang rusak pada browser.
