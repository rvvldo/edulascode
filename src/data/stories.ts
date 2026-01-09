import { LucideIcon } from "lucide-react";

export interface DialogLine {
    character: string;
    text: string;
    isNarrator?: boolean;
    avatar?: string; // Optional URL or emoji
}

export interface Choice {
    text: string;
    isGood: boolean;
    scoreChange: number; // How much this choice adds to the score
    feedback: string; // Immediate feedback after choice
}

export interface Scene {
    id: number;
    type: "NARRATIVE" | "CHOICE" | "ENDING";
    background: string;
    dialogues?: DialogLine[]; // For NARRATIVE type
    question?: string; // For CHOICE type
    choices?: Choice[]; // For CHOICE type
    endingType?: "GOOD" | "BAD"; // For ENDING type
    advice?: string; // For ENDING type
}

export interface Story {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: "Mudah" | "Sedang" | "Sulit";
    totalPoints: number;
    preparationText: string;
    mascotName: string;
    scenes: Scene[];
}

export const storiesData: Record<number, Story> = {
    1: {
        id: 1,
        title: "Petualangan di Hutan Kalimantan",
        description: "Bantu Raka menyelamatkan orangutan dari pembalakan liar",
        category: "Hutan",
        difficulty: "Mudah",
        totalPoints: 100,
        mascotName: "Lesta",
        preparationText: "Selamat datang, Guardian! Sebelum kita memulai misi penyelamatan di Hutan Kalimantan, ada beberapa hal yang perlu kamu ketahui. Misi ini membutuhkan keberanian dan kebijaksanaan. Kamu akan menghadapi dilema moral yang akan menguji kepedulianmu terhadap lingkungan. Apakah kamu siap menjadi pelindung hutan?",
        scenes: [
            {
                id: 1,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Di jantung Kalimantan, di mana pohon-pohon meranti menjulang tinggi menyentuh langit, hiduplah ekosistem yang damai.", isNarrator: true },
                    { character: "Lesta", text: "Halo teman! Aku Lesta. Hari ini kita akan menemani Raka, seorang penjaga hutan muda." },
                    { character: "Raka", text: "Udara pagi ini sangat segar. Kuharap hari ini akan berjalan damai seperti biasanya." }
                ]
            },
            {
                id: 2,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Saat patroli, Raka menemukan tumpukan sampah plastik di pinggir sungai hutan. Apa yang harus dia lakukan?",
                choices: [
                    { text: "Biarkan saja, itu bukan tugasku.", isGood: false, scoreChange: -10, feedback: "Sayang sekali. Sampah itu bisa terbawa arus dan mencemari lautan." },
                    { text: "Memungutnya dan membawanya keluar hutan.", isGood: true, scoreChange: 10, feedback: "Bagus sekali! Tindakan kecilmu menyelamatkan sungai dari pencemaran." }
                ]
            },
            {
                id: 3,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Raka melanjutkan perjalanan. Tiba-tiba terdengar suara dentuman keras.", isNarrator: true },
                    { character: "Raka", text: "Suara apa itu? Terdengar seperti pohon tumbang, tapi ini bukan musim badai." },
                    { character: "Lesta", text: "Kita harus waspada. Hutan ini sering menjadi target pembalakan liar." }
                ]
            },
            {
                id: 4,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Raka melihat jejak ban truk masuk ke area terlarang. Apa tindakannya?",
                choices: [
                    { text: "Mengikuti jejak tersebut dengan hati-hati.", isGood: true, scoreChange: 10, feedback: "Tepat! Kita perlu mengumpulkan bukti." },
                    { text: "Pura-pura tidak melihat dan pulang.", isGood: false, scoreChange: -10, feedback: "Membiarkan tanda mencurigakan bisa membahayakan hutan." }
                ]
            },
            {
                id: 5,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Di sebuah bukaan hutan, Raka melihat sekelompok orang sedang menebang pohon ulin.", isNarrator: true },
                    { character: "Pembalak 1", text: "Cepat! Sebelum petugas patroli datang!" },
                    { character: "Raka", text: "(Berbisik) Mereka bersenjata alat berat..." }
                ]
            },
            {
                id: 6,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Situasi berbahaya. Apa strategi terbaik Raka?",
                choices: [
                    { text: "Langsung melabrak mereka sendirian.", isGood: false, scoreChange: -5, feedback: "Terlalu berisiko! Keselamatanmu adalah prioritas." },
                    { text: "Mendokumentasikan kejadian dari jauh dan lapor pusat.", isGood: true, scoreChange: 10, feedback: "Cerdas! Bukti visual sangat penting untuk penindakan hukum." }
                ]
            },
            {
                id: 7,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Saat mengamati, Raka melihat seekor anak orangutan terpisah dari induknya karena pohonnya ditebang.", isNarrator: true },
                    { character: "Orangutan", text: "*Suara mencicit ketakutan*" },
                    { character: "Lesta", text: "Kasihan sekali! Dia pasti bingung dan ketakutan." }
                ]
            },
            {
                id: 8,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Anak orangutan itu terlihat akan lari ke arah para pembalak. Raka harus...",
                choices: [
                    { text: "Melempar batu untuk mengalihkan perhatian pembalak.", isGood: true, scoreChange: 10, feedback: "Ide bagus! Perhatian mereka teralihkan." },
                    { text: "Berteriak memanggil orangutan.", isGood: false, scoreChange: -10, feedback: "Teriakanmu malah membuat pembalak sadar keberadaanmu!" }
                ]
            },
            {
                id: 9,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Berhasil! Orangutan itu lari menjauh dari bahaya. Raka mundur perlahan.", isNarrator: true },
                    { character: "Raka", text: "Hampir saja. Sekarang aku harus kembali ke pos untuk meminta bantuan." }
                ]
            },
            {
                id: 10,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Di perjalanan pulang, Raka menemukan jerat hewan yang dipasang pemburu.",
                choices: [
                    { text: "Merusak jerat tersebut.", isGood: true, scoreChange: 10, feedback: "Satu nyawa satwa terselamatkan dari jeratan maut." },
                    { text: "Membiarkannya karena buru-buru.", isGood: false, scoreChange: -5, feedback: "Jerat itu bisa melukai hewan langka kapan saja." }
                ]
            },
            {
                id: 11,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Raka sampai di pos dan bertemu Kepala Polisi Hutan.", isNarrator: true },
                    { character: "Komandan", text: "Laporanmu sangat detail, Raka. Kami akan segera bergerak." },
                    { character: "Lesta", text: "Kerja bagus! Tapi tugas kita belum selesai." }
                ]
            },
            {
                id: 12,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Komandan meminta Raka menunjuk jalan potong. Raka tahu jalan cepat tapi curam, atau jalan datar tapi memutar.",
                choices: [
                    { text: "Pilih jalan cepat meski curam.", isGood: true, scoreChange: 10, feedback: "Waktu adalah kunci! Pilihan berani." },
                    { text: "Pilih jalan datar yang aman.", isGood: false, scoreChange: 0, feedback: "Aman, tapi para pembalak mungkin sudah kabur." }
                ]
            },
            {
                id: 13,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Tim berhasil menyergap para pembalak sebelum mereka pergi.", isNarrator: true },
                    { character: "Pembalak", text: "Sial! Kita terkepung!" },
                    { character: "Polisi", text: "Angkat tangan! Kalian ditangkap atas perusakan hutan lindung." }
                ]
            },
            {
                id: 14,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Salah satu pembalak mencoba menyuap Raka agar memberinya celah kabur.",
                choices: [
                    { text: "Menolak tegas tawaran itu.", isGood: true, scoreChange: 10, feedback: "Integritasmu tak ternilai harganya!" },
                    { text: "Ragu-ragu sejenak.", isGood: false, scoreChange: -10, feedback: "Keraguanmu bisa dimanfaatkan oleh penjahat." }
                ]
            },
            {
                id: 15,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Para pembalak pun diamankan. Namun, kerusakan yang mereka buat cukup parah.", isNarrator: true },
                    { character: "Raka", text: "Butuh puluhan tahun untuk pohon-pohon ini tumbuh kembali..." },
                    { character: "Lesta", text: "Tapi kita bisa mulai memperbaikinya sekarang." }
                ]
            },
            {
                id: 16,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Ada bibit pohon yang tersisa di pos. Apa yang sebaiknya dilakukan di area bekas tebangan?",
                choices: [
                    { text: "Segera menanam bibit baru bersama tim.", isGood: true, scoreChange: 10, feedback: "Reboisasi adalah langkah awal pemulihan." },
                    { text: "Menunggu musim hujan datang.", isGood: false, scoreChange: -5, feedback: "Tanah yang gundul rawan longsor jika dibiarkan terlalu lama." }
                ]
            },
            {
                id: 17,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Beberapa hari kemudian, Raka kembali ke hutan untuk memantau.", isNarrator: true },
                    { character: "Raka", text: "Hei, lihat! Induk orangutan itu kembali mencari anaknya." },
                    { character: "Lesta", text: "Sungguh pemandangan yang mengharukan." }
                ]
            },
            {
                id: 18,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Raka ingin memastikan mereka aman. Dia sebaiknya...",
                choices: [
                    { text: "Mengamati dari jauh menggunakan teropong.", isGood: true, scoreChange: 10, feedback: "Benar, jangan mengganggu interaksi alami mereka." },
                    { text: "Mendekat untuk memberi makan.", isGood: false, scoreChange: -10, feedback: "Memberi makan satwa liar membuat mereka ketergantungan pada manusia." }
                ]
            },
            {
                id: 19,
                type: "NARRATIVE",
                background: "url('/background/kalimantan.jpg')",
                dialogues: [
                    { character: "Narator", text: "Petualangan Raka kali ini memberikan pelajaran berharga.", isNarrator: true },
                    { character: "Lesta", text: "Hutan ini masih butuh pahlawan sepertimu." }
                ]
            },
            {
                id: 20,
                type: "CHOICE",
                background: "url('/background/kalimantan.jpg')",
                question: "Apa komitmenmu setelah melihat kejadian ini?",
                choices: [
                    { text: "Aku akan aktif menyebarkan kesadaran lingkungan.", isGood: true, scoreChange: 10, feedback: "Semangat yang luar biasa!" },
                    { text: "Cukup tahu saja, itu tugas pemerintah.", isGood: false, scoreChange: -5, feedback: "Lingkungan adalah tanggung jawab kita bersama." }
                ]
            }
        ]
    },
    2: {
        id: 2,
        title: "Misteri Terumbu Karang",
        description: "Jelajahi keindahan bawah laut Raja Ampat bersama Maya",
        category: "Laut",
        difficulty: "Sedang",
        totalPoints: 150,
        mascotName: "Lesta",
        preparationText: "Selamat datang di Raja Ampat! Maya membutuhkan bantuanmu untuk mengungkap penyebab rusaknya terumbu karang. Bersiaplah menyelam dan buat keputusan bijak untuk laut kita.",
        scenes: [
            { id: 1, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Maya", text: "Lihat betapa indahnya karang ini!" }, { character: "Lesta", text: "Tapi lihat di sana, ada bagian yang memutih." }] },
            { id: 2, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Seorang turis menginjak karang saat berfoto. Kamu...", choices: [{ text: "Menegurnya dengan sopan.", isGood: true, scoreChange: 10, feedback: "Edukasi sopan lebih efektif." }, { text: "Memarahinya di depan umum.", isGood: false, scoreChange: -5, feedback: "Bisa memicu konflik." }] },
            { id: 3, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Maya", text: "Ada kapal nelayan yang melempar jangkar sembarangan." }] },
            { id: 4, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Jangkar itu bisa menghancurkan karang ratusan tahun. Kamu...", choices: [{ text: "Segera lapor otoritas laut.", isGood: true, scoreChange: 10, feedback: "Pihak berwenang bisa menindak tegas." }, { text: "Berenang memotong tali jangkar.", isGood: false, scoreChange: -10, feedback: "Berbahaya dan merusak properti orang lain." }] },
            { id: 5, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Lesta", text: "Kita menemukan sampah plastik yang melilit penyu." }] },
            { id: 6, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Penyu itu kesulitan bernapas. Kamu...", choices: [{ text: "Mencoba melepaskan plastik perlahan.", isGood: true, scoreChange: 10, feedback: "Penyu itu selamat!" }, { text: "Takut digigit, jadi dibiarkan.", isGood: false, scoreChange: -5, feedback: "Penyu itu bisa mati lemas." }] },
            { id: 7, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Maya", text: "Matahari semakin terik, suhu air terasa lebih hangat." }] },
            { id: 8, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Pemanasan global memicu pemutihan karang. Apa kontribusimu di rumah?", choices: [{ text: "Hemat listrik dan kurangi emisi.", isGood: true, scoreChange: 10, feedback: "Langkah kecil berdampak besar." }, { text: "Pasang AC suhu terendah terus menerus.", isGood: false, scoreChange: -10, feedback: "Boros energi memperparah pemanasan global." }] },
            { id: 9, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Lesta", text: "Ada nelayan menggunakan bom ikan di kejauhan!" }] },
            { id: 10, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Itu ilegal dan destruktif. Tindakanmu?", choices: [{ text: "Rekam diam-diam sebagai bukti.", isGood: true, scoreChange: 10, feedback: "Bukti kuat untuk polisi." }, { text: "Kejar perahu mereka.", isGood: false, scoreChange: -10, feedback: "Sangat berbahaya!" }] },
            { id: 11, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Maya", text: "Mari kita tanam koral buatan untuk restorasi." }] },
            { id: 12, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Metode mana yang lebih baik?", choices: [{ text: "Menggunakan bahan ramah lingkungan.", isGood: true, scoreChange: 10, feedback: "Agar tidak mencemari laut." }, { text: "Pakai ban bekas ban motor.", isGood: false, scoreChange: 0, feedback: "Kurang efektif jangka panjang." }] },
            { id: 13, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Lesta", text: "Hari sudah sore. Ekspedisi hampir selesai." }] },
            { id: 14, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Kamu memiliki sisa bekal makan siang. Bungkusnya...", choices: [{ text: "Bawa pulang sampai ketemu tong sampah.", isGood: true, scoreChange: 10, feedback: "Disiplin sampah itu keren." }, { text: "Selipkan di celah batu di pantai.", isGood: false, scoreChange: -10, feedback: "Akan terbawa ombak ke laut." }] },
            { id: 15, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Maya", text: "Terima kasih sudah membantuku hari ini." }] },
            { id: 16, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Temanmu ingin membeli souvenir dari karang asli. Kamu...", choices: [{ text: "Melarang dan jelaskan alasannya.", isGood: true, scoreChange: 10, feedback: "Perdagangan karang itu ilegal." }, { text: "Biarin aja, kan cantik.", isGood: false, scoreChange: -10, feedback: "Mendukung perusakan alam." }] },
            { id: 17, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Lesta", text: "Kita belajar banyak tentang ekosistem laut." }] },
            { id: 18, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Apa pelajaran terpenting hari ini?", choices: [{ text: "Laut adalah sumber kehidupan yang rapuh.", isGood: true, scoreChange: 10, feedback: "Benar sekali." }, { text: "Menyelam itu seru.", isGood: false, scoreChange: 0, feedback: "Benar, tapi ada makna lebih dalam." }] },
            { id: 19, type: "NARRATIVE", background: "url('/background/laut.jpg')", dialogues: [{ character: "Narator", text: "Perjalanan berakhir dengan matahari terbenam yang indah." }] },
            { id: 20, type: "CHOICE", background: "url('/background/laut.jpg')", question: "Maukah kamu menjadi Duta Laut?", choices: [{ text: "Siap laksanakan!", isGood: true, scoreChange: 10, feedback: "Selamat datang di tim!" }, { text: "Pikir-pikir dulu.", isGood: false, scoreChange: 0, feedback: "Semoga hatimu tergerak." }] }
        ]
    },
    3: {
        id: 3,
        title: "Sang Pelindung Harimau",
        description: "Ikuti perjalanan Dimas melindungi harimau Sumatera",
        category: "Satwa",
        difficulty: "Sulit",
        totalPoints: 200,
        mascotName: "Lesta",
        preparationText: "Selamat datang di Hutan Sumatera. Harimau Sumatera berada di ambang kepunahan. Dimas memerlukan bantuanmu untuk melacak harimau dan menghalau pemburu. Hati-hati, misi ini berisiko tinggi!",
        scenes: [
            { id: 1, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Dimas", text: "Kita menemukan jejak kaki besar. Ini pasti Harimau Sumatera." }] },
            { id: 2, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Kita perlu memasang kamera trap. Di mana lokasi terbaik?", choices: [{ text: "Di jalur lintasan satwa.", isGood: true, scoreChange: 10, feedback: "Peluang terekam lebih besar." }, { text: "Di dekat sungai yang ramai pengunjung.", isGood: false, scoreChange: -5, feedback: "Terlalu banyak gangguan manusia." }] },
            { id: 3, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Ada bau asap... sepertinya ada yang membakar lahan." }] },
            // ... Filling remaining scenes with simplified structure for brevity but functionality
            { id: 4, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Apa yang harus kita lakukan pada api kecil itu?", choices: [{ text: "Padamkan selagi bisa.", isGood: true, scoreChange: 10, feedback: "Mencegah kebakaran besar." }, { text: "Lari menyelamatkan diri.", isGood: false, scoreChange: -5, feedback: "Api bisa menyebar cepat." }] },
            { id: 5, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Dimas", text: "Ditemukan selongsong peluru. Ada pemburu di dekat sini." }] },
            { id: 6, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Kita berpapasan dengan warga yang membawa senapan angin. Kamu...", choices: [{ text: "Tanya baik-baik tujuannya.", isGood: true, scoreChange: 10, feedback: "Pendekatan persuasif." }, { text: "Langsung sita senapannya.", isGood: false, scoreChange: -10, feedback: "Bisa memicu perkelahian." }] },
            { id: 7, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Malam telah tiba di hutan rimba." }] },
            { id: 8, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Saat berkemah, sampah makanan sebaiknya...", choices: [{ text: "Digantung tinggi atau disimpan rapat.", isGood: true, scoreChange: 10, feedback: "Agar tidak mengundang satwa liar." }, { text: "Dibuang di belakang tenda.", isGood: false, scoreChange: -10, feedback: "Berbahaya mengundang predator." }] },
            { id: 9, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Dimas", text: "Kamera trap merekam harimau terluka kakinya." }] },
            { id: 10, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Tindakan medis diperlukan. Kita harus...", choices: [{ text: "Hubungi dokter hewan BKSDA.", isGood: true, scoreChange: 10, feedback: "Prosedur yang benar." }, { text: "Coba tangkap sendiri.", isGood: false, scoreChange: -10, feedback: "Sangat berbahaya tanpa keahlian." }] },
            { id: 11, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Warga desa mengeluh harimau masuk perkebunan." }] },
            { id: 12, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Konflik manusia-satwa. Solusinya?", choices: [{ text: "Buat kandang ternak anti-serangan.", isGood: true, scoreChange: 10, feedback: "Solusi jangka panjang." }, { text: "Racuni harimau itu.", isGood: false, scoreChange: -20, feedback: "Kejam dan melanggar hukum!" }] },
            { id: 13, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Dimas", text: "Habitat mereka semakin sempit karena sawit." }] },
            { id: 14, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Sebagai konsumen, kita bisa...", choices: [{ text: "Pilih produk bersertifikat RSPO/ramah lingkungan.", isGood: true, scoreChange: 10, feedback: "Mendukung sawit berkelanjutan." }, { text: "Boikot semua tanpa riset.", isGood: false, scoreChange: 0, feedback: "Kurang bijak." }] },
            { id: 15, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Kita menemukan pasar gelap online menjual kulit harimau." }] },
            { id: 16, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Apa yang kamu lakukan di media sosial?", choices: [{ text: "Report akun dan lapor cyber crime.", isGood: true, scoreChange: 10, feedback: "Membantu memutus rantai perdagangan." }, { text: "Komen marah-marah saja.", isGood: false, scoreChange: 0, feedback: "Kurang efektif." }] },
            { id: 17, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Dimas", text: "Harimau yang terluka tadi sudah diobati dan akan dilepasliarkan." }] },
            { id: 18, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Saat pelepasan, kita harus...", choices: [{ text: "Tenang dan menjaga jarak.", isGood: true, scoreChange: 10, feedback: "Agar harimau tidak stres." }, { text: "Mendekat untuk selfie.", isGood: false, scoreChange: -10, feedback: "Egois dan berbahaya." }] },
            { id: 19, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Narator", text: "Raja hutan kembali ke tahtanya." }] },
            { id: 20, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Siapkah kamu menjadi suara bagi mereka yang tak bisa bicara?", choices: [{ text: "Selalu siap!", isGood: true, scoreChange: 10, feedback: "Terima kasih, Guardian." }, { text: "Mungkin nanti.", isGood: false, scoreChange: 0, feedback: "Kami menunggu aksimu." }] }
        ]
    },
    4: {
        id: 4,
        title: "Krisis Air Bersih",
        description: "Selamatkan desa dari kelangkaan air bersama Sari",
        category: "Air",
        difficulty: "Sedang",
        totalPoints: 150,
        mascotName: "Lesta",
        preparationText: "Desa Sukamaju mengalami kekeringan. Sumur mengering dan sungai tercemar. Sari butuh bantuanmu mencari solusi agar warga bisa mendapatkan air bersih kembali. Bijaklah dalam setiap tetes air!",
        scenes: [
            { id: 1, type: "NARRATIVE", background: "url('/background/kering.jpeg')", dialogues: [{ character: "Sari", text: "Sumur warga sudah kering kerontang sejak sebulan lalu." }] },
            { id: 2, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Kita perlu sumber air alternatif. Pilihannya...", choices: [{ text: "Cari mata air di bukit.", isGood: true, scoreChange: 10, feedback: "Sumber air alami biasanya ada di dataran tinggi." }, { text: "Gali sumur lebih dalam lagi.", isGood: false, scoreChange: -5, feedback: "Bisa merusak akuifer tanah." }] },
            { id: 3, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Sungai desa berwarna keruh dan berbau." }] },
            { id: 4, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Warga membuang limbah rumah tangga ke sungai. Solusimu?", choices: [{ text: "Sosialisasi dampak dan buat tempat sampah.", isGood: true, scoreChange: 10, feedback: "Ubah perilaku adalah kunci." }, { text: "Marahi warga satu per satu.", isGood: false, scoreChange: -5, feedback: "Tidak efektif." }] },
            { id: 5, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Sari", text: "Kita menemukan mata air, tapi tertutup semak belukar." }] },
            { id: 6, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Cara membersihkannya?", choices: [{ text: "Gotong royong bersihkan manual.", isGood: true, scoreChange: 10, feedback: "Kebersamaan!" }, { text: "Bakar semaknya agar cepat.", isGood: false, scoreChange: -10, feedback: "Bahaya kebakaran!" }] },
            { id: 7, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Hujan akhirnya turun! Tapi airnya terbuang percuma." }] },
            { id: 8, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Saran Sari untuk memanen air hujan?", choices: [{ text: "Buat biopori atau sumur resapan.", isGood: true, scoreChange: 10, feedback: "Menabung air untuk musim kemarau." }, { text: "Tampung di ember terbuka.", isGood: false, scoreChange: 5, feedback: "Rentan jentik nyamuk." }] },
            { id: 9, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Sari", text: "Ada pabrik di hulu yang diduga membuang limbah cair." }] },
            { id: 10, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Apa langkah yang tepat?", choices: [{ text: "Lapor ke Dinas Lingkungan Hidup.", isGood: true, scoreChange: 10, feedback: "Jalur hukum yang benar." }, { text: "Demo anarkis di depan pabrik.", isGood: false, scoreChange: -10, feedback: "Merugikan banyak pihak." }] },
            { id: 11, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Pipa saluran air desa bocor." }] },
            { id: 12, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Tindakan cepatmu?", choices: [{ text: "Tambal sementara dan panggil tukang.", isGood: true, scoreChange: 10, feedback: "Mencegah pemborosan." }, { text: "Tunggu pemerintah perbaiki.", isGood: false, scoreChange: -5, feedback: "Air keburu habis." }] },
            { id: 13, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Sari", text: "Anak-anak sekolah lupa menyalakan kran air." }] },
            { id: 14, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Cara edukasi anak-anak?", choices: [{ text: "Pasang poster lucu & ingatkan ramah.", isGood: true, scoreChange: 10, feedback: "Anak-anak suka visual." }, { text: "Hukum mereka.", isGood: false, scoreChange: -5, feedback: "Membuat trauma." }] },
            { id: 15, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Lesta", text: "Hutan di hulu desa mulai gundul." }] },
            { id: 16, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Hubungan hutan dan air sangat erat. Kita harus...", choices: [{ text: "Ajak warga menanam pohon (penghijauan).", isGood: true, scoreChange: 10, feedback: "Pohon menyimpan cadangan air tanah." }, { text: "Bangun vila di sana.", isGood: false, scoreChange: -10, feedback: "Merusak daerah resapan." }] },
            { id: 17, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Sari", text: "Air bersih mulai mengalir ke rumah-rumah!" }] },
            { id: 18, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Agar berkelanjutan, warga perlu...", choices: [{ text: "Membentuk kelompok pengelola air.", isGood: true, scoreChange: 10, feedback: "Manajemen berbasis komunitas." }, { text: "Berebut air.", isGood: false, scoreChange: -10, feedback: "Memicu konflik." }] },
            { id: 19, type: "NARRATIVE", background: "url('/background/Sumatera.jpg')", dialogues: [{ character: "Narator", text: "Air adalah sumber kehidupan." }] },
            { id: 20, type: "CHOICE", background: "url('/background/Sumatera.jpg')", question: "Janji kita pada air?", choices: [{ text: "Gunakan secukupnya, jangan boros.", isGood: true, scoreChange: 10, feedback: "Bijak!" }, { text: "Pakai sepuasnya selagi ada.", isGood: false, scoreChange: -5, feedback: "Egois." }] }
        ]
    },
    5: {
        id: 5,
        title: "Pertempuran Sampah Plastik",
        description: "Bersihkan pantai dan edukasi masyarakat tentang daur ulang",
        category: "Polusi",
        difficulty: "Mudah",
        totalPoints: 100,
        mascotName: "Lesta",
        preparationText: "Pantai Indah kini penuh sampah kiriman. Plastik di mana-mana mengancam kehidupan laut. Bergabunglah dengan tim bersih-bersih dan pelajari cara memerangi polusi plastik mulai dari diri sendiri!",
        scenes: [
            { id: 1, type: "NARRATIVE", background: "url('/background/Sampah.jpg')", dialogues: [{ character: "Narator", text: "Sejauh mata memandang, pasir putih tertutup botol plastik." }] },
            { id: 2, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Dari mana kita mulai?", choices: [{ text: "Pungut sampah dan pilah sesuai jenis.", isGood: true, scoreChange: 10, feedback: "Memilah memudahkan daur ulang." }, { text: "Bakar semua sampah di pantai.", isGood: false, scoreChange: -10, feedback: "Polusi udara!" }] },
            { id: 3, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Lesta", text: "Lihat, sedotan plastik ini tertancap di pasir." }] },
            { id: 4, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Kebiasaan minum kita perlu diubah. Ganti sedotan plastik dengan...", choices: [{ text: "Sedotan stainless/bambu atau tanpa sedotan.", isGood: true, scoreChange: 10, feedback: "Reusable is best." }, { text: "Sedotan plastik baru.", isGood: false, scoreChange: -5, feedback: "Ga berubah dong." }] },
            { id: 5, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Volunter", text: "Banyak sekali kantong kresek di sini." }] },
            { id: 6, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Saat belanja ke minimarket, kamu sebaiknya...", choices: [{ text: "Bawa tas belanja sendiri (Tote bag).", isGood: true, scoreChange: 10, feedback: "Kurangi penggunaan kresek." }, { text: "Minta double kresek biar kuat.", isGood: false, scoreChange: -5, feedback: "Menambah sampah." }] },
            { id: 7, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Lesta", text: "Sampah botol plastik ini bisa jadi uang lho." }] },
            { id: 8, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Ke mana kita bawa sampah botol ini?", choices: [{ text: "Ke Bank Sampah.", isGood: true, scoreChange: 10, feedback: "Ekonomi sirkular." }, { text: "Ke sungai.", isGood: false, scoreChange: -10, feedback: "Jangan!" }] },
            { id: 9, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Narator", text: "Ombak membawa sampah baru lagi." }] },
            { id: 10, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Masalahnya ada di hulu. Kita perlu...", choices: [{ text: "Edukasi warga bantaran sungai.", isGood: true, scoreChange: 10, feedback: "Cegah sampah masuk sungai." }, { text: "Pasang jaring di laut saja.", isGood: false, scoreChange: 5, feedback: "Hanya menangani gejala, bukan sumber." }] },
            { id: 11, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Lesta", text: "Mikroplastik ditemukan di dalam perut ikan." }] },
            { id: 12, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Bahaya mikroplastik bagi manusia?", choices: [{ text: "Masuk rantai makanan dan ganggu kesehatan.", isGood: true, scoreChange: 10, feedback: "Seram kan?" }, { text: "Jadi vitamin tambahan.", isGood: false, scoreChange: -10, feedback: "Ngaco." }] },
            { id: 13, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Volunter", text: "Ada festival makanan di dekat pantai." }] },
            { id: 14, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Pilih jajanan yang...", choices: [{ text: "Pakai alas daun pisang atau piring cuci ulang.", isGood: true, scoreChange: 10, feedback: "Tradisional dan ramah lingkungan." }, { text: "Styrofoam dan sendok plastik.", isGood: false, scoreChange: -10, feedback: "Sulit terurai." }] },
            { id: 15, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Lesta", text: "Kita bisa mendaur ulang sampah sachet kopi menjadi kerajinan." }] },
            { id: 16, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Kegiatan ini disebut...", choices: [{ text: "Upcycling (Daur ulang kreatif).", isGood: true, scoreChange: 10, feedback: "Menambah nilai guna." }, { text: "Membuang waktu.", isGood: false, scoreChange: 0, feedback: "Salah." }] },
            { id: 17, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Narator", text: "Pantai kini terlihat jauh lebih bersih." }] },
            { id: 18, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Agar tetap bersih, kita pasang papan himbauan. Bunyinya?", choices: [{ text: "Bawa Pulang Sampahmu!", isGood: true, scoreChange: 10, feedback: "Tegas dan jelas." }, { text: "Dilarang Masuk.", isGood: false, scoreChange: 0, feedback: "Pantai milik publik." }] },
            { id: 19, type: "NARRATIVE", background: "url('/background/sampah.jpg')", dialogues: [{ character: "Lesta", text: "Perang melawan plastik belum berakhir." }] },
            { id: 20, type: "CHOICE", background: "url('/background/sampah.jpg')", question: "Komitmen diet plastikmu?", choices: [{ text: "Menolak plastik sekali pakai sebisa mungkin.", isGood: true, scoreChange: 10, feedback: "Mantap!" }, { text: "Susah ah, ribet.", isGood: false, scoreChange: -5, feedback: "Ayo mulai dari hal kecil." }] }
        ]
    },
    6: {
        id: 6,
        title: "Penyelamatan Komodo",
        description: "Lindungi habitat Komodo di Pulau Komodo",
        category: "Satwa",
        difficulty: "Sulit",
        totalPoints: 200,
        mascotName: "Lesta",
        preparationText: "Komodo adalah naga terakhir di bumi dan merupakan satwa endemik Indonesia. Habitat mereka terancam perubahan iklim dan pariwisata massal. Tugasmu adalah menjaga keseimbangan antara konservasi dan ekonomi.",
        scenes: [
            { id: 1, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Ranger", text: "Selamat datang di Pulau Rinca. Hati-hati, Komodo adalah predator puncak." }] },
            { id: 2, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Saat tracking, kamu melihat komodo berjemur di tengah jalan.", choices: [{ text: "Tunggu dia minggir atau cari jalan memutar aman.", isGood: true, scoreChange: 10, feedback: "Dahulukan satwa." }, { text: "Lempar batu biar minggir.", isGood: false, scoreChange: -10, feedback: "Mengganggu satwa dilindungi." }] },
            { id: 3, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Lesta", text: "Komodo betina sedang menjaga sarang telurnya." }] },
            { id: 4, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Ada wisatawan yang ingin mendekat untuk foto telur.", choices: [{ text: "Larang dengan tegas karena berbahaya.", isGood: true, scoreChange: 10, feedback: "Induk komodo sangat agresif." }, { text: "Bolehkan asal bayar tip.", isGood: false, scoreChange: -20, feedback: "Korupsi dan bahaya!" }] },
            { id: 5, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Ranger", text: "Populasi rusa sebagai mangsa utama komodo mulai berkurang." }] },
            { id: 6, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Penyebabnya adalah perburuan liar rusa. Solusinya?", choices: [{ text: "Patroli rutin dan penegakan hukum.", isGood: true, scoreChange: 10, feedback: "Menjaga rantai makanan." }, { text: "Beri makan komodo daging sapi.", isGood: false, scoreChange: -10, feedback: "Merusak insting berburu liar." }] },
            { id: 7, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Lesta", text: "Pembangunan resort mewah direncanakan di area konservasi." }] },
            { id: 8, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Pendapatmu?", choices: [{ text: "Tolak jika merusak habitat asli.", isGood: true, scoreChange: 10, feedback: "Konservasi harga mati." }, { text: "Setuju demi kemajuan ekonomi.", isGood: false, scoreChange: -5, feedback: "Risiko tinggi bagi ekosistem." }] },
            { id: 9, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Narator", text: "Kapal wisata membuang jangkar di area padang lamun (dugong)." }] },
            { id: 10, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Apa dampaknya?", choices: [{ text: "Merusak ekosistem dasar laut.", isGood: true, scoreChange: 10, feedback: "Benar." }, { text: "Tidak ada dampak.", isGood: false, scoreChange: -5, feedback: "Salah besar." }] },
            { id: 11, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Lesta", text: "Air laut naik mengancam pesisir pulau." }] },
            { id: 12, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Untuk mengurangi dampak perubahan iklim, kita harus...", choices: [{ text: "Jaga hutan bakau (mangrove).", isGood: true, scoreChange: 10, feedback: "Benteng alami pesisir." }, { text: "Bangun tembok beton tinggi.", isGood: false, scoreChange: 0, feedback: "Mahal dan merubah bentang alam." }] },
            { id: 13, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Ranger", text: "Anakan komodo hidup di atas pohon untuk menghindari predator." }] },
            { id: 14, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Jika pohon-pohon ditebang...", choices: [{ text: "Anakan komodo terancam dimangsa.", isGood: true, scoreChange: 10, feedback: "Mereka butuh pohon untuk survive." }, { text: "Mereka bisa lari lebih cepat.", isGood: false, scoreChange: -5, feedback: "Salah." }] },
            { id: 15, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Lesta", text: "Banyak sampah plastik dari kapal wisata terdampar." }] },
            { id: 16, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Aturan bagi wisatawan?", choices: [{ text: "Wajib bawa kembali sampah sendiri (Zero Waste).", isGood: true, scoreChange: 10, feedback: "Kebijakan tepat." }, { text: "Bayar denda saja cukup.", isGood: false, scoreChange: -5, feedback: "Uang tidak bisa makan plastik." }] },
            { id: 17, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Narator", text: "Komodo adalah warisan dunia UNESCO." }] },
            { id: 18, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Bagaimana cara mendukungnya dari jauh?", choices: [{ text: "Donasi ke lembaga konservasi terpercaya.", isGood: true, scoreChange: 10, feedback: "Bantuan nyata." }, { text: "Beli kulit komodo palsu.", isGood: false, scoreChange: -5, feedback: "Tidak membantu." }] },
            { id: 19, type: "NARRATIVE", background: "url('/background/kodomo.jpg')", dialogues: [{ character: "Lesta", text: "Masa depan naga purba ini ada di tangan kita." }] },
            { id: 20, type: "CHOICE", background: "url('/background/kodomo.jpg')", question: "Pesanmu untuk dunia?", choices: [{ text: "Lestari alamku, lestari desaku, lestari komodoku.", isGood: true, scoreChange: 10, feedback: "Indah!" }, { text: "Biarkan alam menyeleksi.", isGood: false, scoreChange: -5, feedback: "Apatis." }] }
        ]
    }
};
