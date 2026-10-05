// ============================================================
// 1. LIST DATA PRODUK AWAL (Minimal 5 Produk)
// ============================================================
let daftarProduk = [
    { id: 1, nama: "Laptop",     harga: 7500000, stok: 10 },
    { id: 2, nama: "Smartphone", harga: 5000000, stok: 5  },
    { id: 3, nama: "Tablet",     harga: 3000000, stok: 7  },
    { id: 4, nama: "Headphone",  harga: 250000,  stok: 20 },
    { id: 5, nama: "Mouse",      harga: 150000,  stok: 30 }
];

// ============================================================
// 2. FUNGSI MENAMPILKAN SEMUA PRODUK
//    → Menggunakan DESTRUCTURING untuk mengekstrak property
//      dari setiap objek produk ({ id, nama, harga, stok })
// ============================================================
function tampilkanSemuaProduk() {
    const container = document.getElementById("daftar-produk");

    if (daftarProduk.length === 0) {
        container.innerHTML = '<p class="kosong">Belum ada produk.</p>';
        return;
    }

    // Kosongkan container sebelum render ulang
    container.innerHTML = "";

    // DESTRUCTURING: mengekstrak id, nama, harga, stok
    // langsung dari setiap objek produk dalam loop
    for (const { id, nama, harga, stok } of daftarProduk) {
        const div = document.createElement("div");
        div.className = "produk-item";
        div.innerHTML = `
            <span>
                <strong>${nama}</strong> — 
                Rp ${harga.toLocaleString("id-ID")} — 
                Stok: ${stok}
            </span>
            <button class="btn-hapus" data-id="${id}">Hapus</button>
        `;
        container.appendChild(div);
    }
}

// ============================================================
// 3. FUNGSI MENAMBAHKAN PRODUK
//    → Menggunakan REST PARAMETER (...produkBaru) untuk
//      menerima sejumlah argumen produk baru
//    → Menggunakan SPREAD OPERATOR untuk menggabungkan
//      array lama dengan produk baru
// ============================================================
function tambahProduk(...produkBaru) {
    // SPREAD OPERATOR: menyebarkan elemen array lama
    // dan array produkBaru ke dalam array baru
    daftarProduk = [...daftarProduk, ...produkBaru];
    console.log("Produk berhasil ditambahkan:", produkBaru);
    tampilkanSemuaProduk();
}

// ============================================================
// 4. FUNGSI MENGHAPUS PRODUK
// ============================================================
function hapusProduk(id) {
    daftarProduk = daftarProduk.filter(produk => produk.id !== id);
    console.log(`Produk dengan ID ${id} berhasil dihapus.`);
    tampilkanSemuaProduk();
}

// ============================================================
// 5. FUNGSI MENYALIN / BACKUP DAFTAR PRODUK
//    → Menggunakan SPREAD OPERATOR untuk duplikasi array
// ============================================================
function salinProduk() {
    return [...daftarProduk]; // SPREAD OPERATOR untuk menyalin array
}

// ============================================================
// 6. EVENT LISTENER — Menangani Submit Form
//    → Menggunakan addEventListener (dari modul Event Handler)
//    → Menggunakan event.preventDefault() untuk mencegah
//      perilaku default form (reload halaman)
// ============================================================
const formProduk = document.getElementById("form-produk");

formProduk.addEventListener("submit", function (event) {
    // Mencegah perilaku default form (reload halaman)
    event.preventDefault();

    // Ambil nilai dari input
    const inputNama  = document.getElementById("nama");
    const inputHarga = document.getElementById("harga");
    const inputStok  = document.getElementById("stok");

    // Buat objek produk baru dengan ID unik
    const produkBaru = {
        id: Date.now(), // ID unik berdasarkan timestamp
        nama: inputNama.value,
        harga: parseInt(inputHarga.value),
        stok: parseInt(inputStok.value)
    };

    // Panggil fungsi tambahProduk dengan REST PARAMETER
    tambahProduk(produkBaru);

    // Reset form setelah produk ditambahkan
    formProduk.reset();
});

// ============================================================
// 7. EVENT DELEGATION — Menangani Klik Tombol Hapus
//    → Event listener dipasang pada ELEMEN INDUK (parent)
//      yaitu #daftar-produk, bukan pada setiap tombol hapus
//    → Menggunakan event.target untuk mendeteksi elemen anak
//      yang sebenarnya diklik
//    → Menggunakan DESTRUCTURING pada dataset untuk
//      mengambil data-id dari tombol yang diklik
// ============================================================
const containerProduk = document.getElementById("daftar-produk");

containerProduk.addEventListener("click", function (event) {
    // Cek apakah yang diklik adalah tombol hapus
    if (event.target.matches(".btn-hapus")) {
        // DESTRUCTURING: mengekstrak properti 'id' dari dataset
        const { id } = event.target.dataset;
        hapusProduk(Number(id));
    }
});

// ============================================================
// 8. DEMO REST PARAMETER — Menambahkan beberapa produk sekaligus
// ============================================================
function demoTambahBanyakProduk() {
    const produkTambahan1 = { id: 6, nama: "Keyboard", harga: 350000,  stok: 15 };
    const produkTambahan2 = { id: 7, nama: "Monitor",  harga: 2500000, stok: 8  };
    const produkTambahan3 = { id: 8, nama: "Webcam",   harga: 500000,  stok: 12 };

    // REST PARAMETER: ketiga objek dikumpulkan menjadi array
    // di dalam parameter ...produkBaru pada fungsi tambahProduk
    tambahProduk(produkTambahan1, produkTambahan2, produkTambahan3);
}

// ============================================================
// INISIALISASI: Tampilkan produk awal saat halaman dimuat
// ============================================================
tampilkanSemuaProduk();

// Contoh backup menggunakan spread operator
const produkCadangan = salinProduk();
console.log("Produk Cadangan (Backup):", produkCadangan);