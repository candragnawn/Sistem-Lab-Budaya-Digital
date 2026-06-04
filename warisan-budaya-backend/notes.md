runtutan jebakan yang berhasil kita babat habis dari kode kalian:

Error Extension: Fungsi saving() kalian awalnya nge-crash karena mencoba menganggap URL dari Scopus sebagai file yang di-upload.
Lecturer_ID Missing: Fungsi updateOrCreate kalian awalnya lupa menyematkan ID dosen ke tabel publications.
Bentrok ENUM Category: Elsevier nekat ngirim 'Jurnal Internasional', sedangkan tabelmu ngambek dan hanya mau menerima 'PENELITIAN' atau 'PENGABDIAN'.
Jebakan API Limit Elsevier (Timeout): Ini yang paling bikin pusing! Databasemu sempat kosong berulang kali semata-mata karena firewall Elsevier mem-banned IP-mu karena dianggap spam.
Author Position Missing: Tabel perantara publication_authors mencegat di akhir karena menuntut peran dosen, yang mana sekarang sukses kita atasi dengan 'Belum Ditentukan'.

CARA NGATASIN QUARTILE DAN AUTHOR_POSITION ( ini masih null) : 
1. Kenapa Quartile (Q1-Q4) kosong?
Nilai Quartile jurnal (Q1, Q2, dsb) sebenarnya berasal dari Scimago Journal Rank (SJR). Scopus memiliki metrik tersebut, tapi mereka meletakkannya di endpoint API yang berbeda (Serial Title API). Solusi Terbaik: Biarkan saja kosong dari Scopus! Nanti saat kita menarik API dari SINTA, SINTA sudah merangkum nilai Quartile jurnal tersebut. Jadi datanya akan saling melengkapi secara otomatis!

2. Kenapa Author Position kosong?
Endpoint pencarian Scopus yang kita pakai (/search/scopus) didesain agar sangat ringan, sehingga hanya memberikan data inti (Judul, DOI, Tahun). Untuk mendapatkan daftar penulis, kita harus menarik API detail (Abstract Retrieval) untuk satu per satu paper (yang mana akan sangat menguras kuota API-mu sampai habis). Belum lagi kita harus membuat algoritma rumit untuk menebak apakah nama dosenmu itu berada di urutan pertama atau bukan. Solusi Terbaik: Seperti SISTER dan SINTA, biarkan posisinya default "Belum Ditentukan", lalu biarkan dosen yang bersangkutan melengkapinya sendiri di frontend untuk menghindari salah tebak.

DOKUMENTASI FITUR :

     Dokumentasi Sistem Sinkronisasi Data Dosen Eksternal
        Dokumen ini berisi rangkuman teknis tentang arsitektur fitur sinkronisasi otomatis dari API pihak ketiga (Elsevier/Scopus, SINTA, SISTER) ke dalam basis data Sistem Lab Budaya Digital.

     1. Arsitektur Umum
        Sistem sinkronisasi dirancang menggunakan arsitektur Service-Mapper-Coordinator:

        Service Layer (App\service\ElsevierService, SintaService, dll): Bertanggung jawab mutlak melakukan HTTP Request ke API pihak ketiga, mengelola Auth/API Key, dan menangani error jaringan (seperti Timeout atau Limit Quota).
        Mapper Layer (App\service\ResearchMapper, dll): Menerima data mentah (JSON) dari Service Layer lalu memformatnya untuk dimasukkan ke dalam database menggunakan model Eloquent (khususnya perintah updateOrCreate untuk menghindari duplikasi id).
        Coordinator Layer (App\service\SyncCoordinator): Berperan sebagai konduktor utama yang memanggil semua Service dan Mapper secara berurutan dalam satu pintu (syncAll()).
        
    2. Alur Sinkronisasi Asynchronous (Registrasi)
        Untuk menghindari waktu loading pendaftaran yang sangat panjang, sinkronisasi dijalankan di latar belakang menggunakan mekanisme Laravel Job & Queue.

        Flow Registrasi:
        Dosen melakukan registrasi melalui endpoint di AuthController@register.
        Sistem mencatat profil dasar dosen (termasuk NIDN) ke tabel users dan lecturers dalam satu Database Transaction.
        Sistem secara instan melempar background task melalui perintah: \App\Jobs\SyncLecturerData::dispatch($lecturer).
        API langsung merespons ke frontend (Dosen berhasil masuk), sementara di belakang layar pekerja antrean (php artisan queue:work) mulai menjalankan tugasnya menarik ribuan data publikasi.
        TIP

        Jika sistem ini akan di-deploy ke production, pastikan kamu menggunakan pengelola Queue tangguh seperti Supervisor atau Laravel Horizon (jika didukung dengan Redis) agar worker tetap hidup 24/7.

    3. Menangani Jebakan API Elsevier (Scopus)
        Ada beberapa manuver penting yang ditambahkan khusus pada rute API Elsevier untuk mencegah error:

        Menangani Limit Akses: Saat server terkena Limit (HTTP 429) atau Timeout (cURL error 28), ElsevierService dirancang untuk membatalkan proses dengan tenang (silent null return), sehingga pendaftaran dosen tidak terganggu oleh matinya API pihak ketiga.
        Penyelamatan String File: Kolom URL terkadang ditangkap oleh static::saving sebagai UploadedFile. Kita telah memodifikasi model Publication agar mengecek instanceof UploadedFile terlebih dahulu sebelum melakukan ekstensi file.
        Penyesuaian ENUM Category: Data mentah Elsevier ('Jurnal Internasional') diterjemahkan secara paksa menjadi 'PENELITIAN' di Service layer agar MySQL tidak menolak kueri (Error Truncated Data).
        Default Author Position: Karena Scopus tidak menyediakan info posisi penulis secara praktis (apakah penulis 1, 2, atau korespondensi), Mapper akan otomatis mengisinya dengan 'Belum Ditentukan'. Dosen diharapkan memperbarui profilnya secara manual nanti.

    4. Status Saat Ini & Pengembangan Lanjutan
        Saat ini, tulang punggung integrasi data sudah 100% matang. Namun, ada potensi munculnya data dobel (redudansi) apabila judul publikasi dari SINTA dan Scopus sedikit berbeda (misalnya: karena salah tik atau kapitalisasi).

        Pengembangan Selanjutnya: Sistem membutuhkan implementasi algoritma Fuzzy Matching (seperti Levenshtein Distance) yang diinjeksi ke dalam ResearchMapper. Algoritma ini akan mendeteksi tingkat kemiripan judul; jika kemiripannya di atas 85%, maka sistem akan menggabungkannya sebagai data yang sama.