JANGAN LUPA composer install & php artisan migration DULU!
abistu jalanin server :
- php artisan serve

jalanin database di xampp

sama jalanin queue :
- php artisan queue:work


ubah file config php di xampp :
buka xampp -> apache -> config -> php.ini
abistu cari ;extension=gd 
ubah jadi : extension=gd
abis tu restart apache

Notes Kepentingan:
- pastiin ada token dari sister, sinta, sama elsevier
- generate uuid itu karena biar orang dari luar gak tau direktori asli storage kita (yang privat)
- pastiin data nya gak redudansi
- ada 3 role : user (public), lecturer, admin
- menggunakan algoritma fuzzy untuk menyelesaikan kasus redudansi data, dan menggunakan redis sebagai caching


Yang udah :
- buat narik api ke elsevier (udah berhasil) (04/06/2026 16:45)
- narik api ke sister ( kurang api key , username, password, user_id sama token aja)
- narik api ke sinta (kurang api key )
- mapper data ke database
- singkronisasi secara asyncronus (latar belakang)
- pake redis buat nampung cache (06/06/2026 13:27)

yang belum :
- algoritma fuzzy matching buat ngecegah data redudan
- normalisasi string biar fuzzy gampang nyarinya
- singkronisasi data dari api eksternal pas registrasi pake nidn (belum di test, soanya perlu api sinta buat ambil scopus_id)
- install laravel horizon 

yang masih bingung :
- isiin tombol singkronisasi manual / gak (karna takutnya di registrasi gagal singkron)
- adain singkronisasi berkala (takut data nya redudansi (ada data lain dari sumber api external lain))

tutorial redis :
install redis : https://www.youtube.com/watch?v=JhWorLlO3jU

pertama install wsl windows, baru ikutin langkah ini : https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-windows/

baru kalok udah selesai install jalanin redis nya di ubuntu pake perintah : `sudo service redis-server start`
