// panggil fungsi readline
const readline = require("./readline");
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require("./storage");

// buat object kosong untuk menampung inputan
let objectKontak = {
  nama: "",
  nomorHp: "",
};

function viewMenu() {
  //fungsi untuk menampilkan halaman menu
  console.log("Selamat Datang Di Aplikasi Kontak !");
  console.log("====================================\n");
  console.log("Main Menu :\n");
  console.log("1.Tambah Data \n");
  console.log("2.Lihat Data \n");
  console.log("3.Reset Data \n");
  console.log("4.Pencarian Data \n");
  console.log("5.Hapus Satu Data \n");
  readline.question(`Silahkan Masukan Pilihan Anda  :`, (input) => {
    mainMenu(Number(input));
  });
}

function mainMenu(pilihan) {
  // fungsi untuk mengatur pilihan menu
  switch (pilihan) {
    case 1:
      simpan();
      break;
    case 2:
      lihatData();
      break;
    // lanjutkan menu pilihanya disini secara urut
    case 3:
      resetData();
      break;
    case 4:
      pencarianData();
      break;
    case 5:
      hapusData();
      break;
    default:
      console.log("Pilihan Tidak Valid !");
      readline.close();
      break;
  }
}

function simpan() {
  // fungsi untuk menyimpan data
  console.log("Silahkan Masukan Data ! : ");
  readline.question("Nama :", (nama) => {
    //validasi untuk nama harus berupa string
    let validasi = /^[^\d]+$/;
    if (validasi.test(nama)) {
      objectKontak.nama = nama;
      console.log(`Input data berhasil ! :${nama}`);
      ambilInputanNomor();
    }
    else{
        console.log("Nama harus berupa string");
        kembali()
    }
  });
}
const ambilInputanNomor = () => {
  // fungsi untuk mengambil inputan nomor
  readline.question("Nomor :", (nomor) => {
    const ubahTipedata = parseInt(nomor);
    //validasi inputan nomor harus berupa angka
    if (!isNaN(ubahTipedata)) {
      objectKontak.nomorHp = ubahTipedata;
      databaseKontak.push(Object.assign({}, objectKontak)); // insert data kedalam array databseKOntak
    } else {
      console.log("Nomor harus berupa angka");
    }
    kembali();
  });
};

const kembali = () => {
  // fungsi untuk navigasi kembali
  readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
    if (pilihan === "y") {
      viewMenu();
    } else {
      readline.close();
    }
  });
};

function lihatData() {
  // fungsi untuk melihat list data
  console.table(databaseKontak);
  kembali();
}

function resetData() {
  // tambahkan fungsi reset  data disini
  readline.question(
    "Apakah anda yakin ingin mereset data ? (y/n) :",
    (reset) => {
      if (reset === "y") {
        databaseKontak.splice(0, databaseKontak.length);
        console.log("Data berhasil direset");
      } else {
        console.log("batal mereset");
      }
      kembali();
    }
  );
}

function pencarianData() {
  // tambahkan fungsi pencarian data disini
  readline.question("Silahkan cari data : ", (cari) => {
    const hasil = databaseKontak.filter((data) => {
      return data.nama.includes(cari);
    });
    console.table(hasil);
    kembali();
  });
}

function hapusData() {
  // tambahkan fungsi hapus data data disini
  console.table(databaseKontak);
  readline.question("Sialahkan pilih data yang ingin dihapus :", (hapus) => {
    const indexHapus = parseInt(hapus);
    if (
      isNaN(indexHapus) ||
      indexHapus < 0 ||
      indexHapus >= databaseKontak.length
    ) {
      console.log("Data tidak ada");
    } else {
      databaseKontak.splice(indexHapus, 1);
      console.log("Data berhasil dihapus");
    }
    kembali();
  });
}

viewMenu(); // panggil fungsi view menu untuk pertama kali
