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
        totalPoints: 100, // This might be calculated dynamically or be a max cap
        mascotName: "Lesta",
        preparationText: "Selamat datang, Guardian! Sebelum kita memulai misi penyelamatan di Hutan Kalimantan, ada beberapa hal yang perlu kamu ketahui. Misi ini membutuhkan keberanian dan kebijaksanaan. Kamu akan menghadapi dilema moral yang akan menguji kepedulianmu terhadap lingkungan. Apakah kamu siap menjadi pelindung hutan?",
        scenes: [
            // Scene 1: Narrative
            {
                id: 1,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                dialogues: [
                    { character: "Narator", text: "Di jantung Kalimantan, di mana pohon-pohon meranti menjulang tinggi menyentuh langit, hiduplah ekosistem yang damai.", isNarrator: true },
                    { character: "Lesta", text: "Halo teman! Aku Lesta. Hari ini kita akan menemani Raka, seorang penjaga hutan muda." },
                    { character: "Raka", text: "Udara pagi ini sangat segar. Kuharap hari ini akan berjalan damai seperti biasanya." },
                ]
            },
            // Scene 2: Choice 1
            {
                id: 2,
                type: "CHOICE",
                background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                question: "Saat patroli, Raka menemukan tumpukan sampah plastik di pinggir sungai hutan. Apa yang harus dia lakukan?",
                choices: [
                    {
                        text: "Biarkan saja, itu bukan tugasku.",
                        isGood: false,
                        scoreChange: -10,
                        feedback: "Sayang sekali. Sampah itu bisa terbawa arus dan mencemari lautan."
                    },
                    {
                        text: "Memungutnya dan membawanya keluar hutan.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Bagus sekali! Tindakan kecilmu menyelamatkan sungai dari pencemaran."
                    }
                ]
            },
            // Scene 3: Narrative
            {
                id: 3,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
                dialogues: [
                    { character: "Narator", text: "Raka melanjutkan perjalanan. Tiba-tiba terdengar suara dentuman keras.", isNarrator: true },
                    { character: "Raka", text: "Suara apa itu? Terdengar seperti pohon tumbang, tapi ini bukan musim badai." },
                    { character: "Lesta", text: "Kita harus waspada. Hutan ini sering menjadi target pembalakan liar." }
                ]
            },
            // Scene 4: Choice 2
            {
                id: 4,
                type: "CHOICE",
                background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
                question: "Raka melihat jejak ban truk masuk ke area terlarang. Apa tindakannya?",
                choices: [
                    {
                        text: "Mengikuti jejak tersebut dengan hati-hati.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Tepat! Kita perlu mengumpulkan bukti."
                    },
                    {
                        text: "Pura-pura tidak melihat dan pulang.",
                        isGood: false,
                        scoreChange: -10,
                        feedback: "Membiarkan tanda mencurigakan bisa membahayakan hutan."
                    }
                ]
            },
            // Scene 5: Narrative
            {
                id: 5,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
                dialogues: [
                    { character: "Narator", text: "Di sebuah bukaan hutan, Raka melihat sekelompok orang sedang menebang pohon ulin.", isNarrator: true },
                    { character: "Pembalak 1", text: "Cepat! Sebelum petugas patroli datang!" },
                    { character: "Raka", text: "(Berbisik) Mereka bersenjata alat berat..." }
                ]
            },
            // Scene 6: Choice 3
            {
                id: 6,
                type: "CHOICE",
                background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
                question: "Situasi berbahaya. Apa strategi terbaik Raka?",
                choices: [
                    {
                        text: "Langsung melabrak mereka sendirian.",
                        isGood: false,
                        scoreChange: -5,
                        feedback: "Terlalu berisiko! Keselamatanmu adalah prioritas."
                    },
                    {
                        text: "Mendokumentasikan kejadian dari jauh dan lapor pusat.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Cerdas! Bukti visual sangat penting untuk penindakan hukum."
                    }
                ]
            },
            // Scene 7: Narrative
            {
                id: 7,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
                dialogues: [
                    { character: "Narator", text: "Saat mengamati, Raka melihat seekor anak orangutan terpisah dari induknya karena pohonnya ditebang.", isNarrator: true },
                    { character: "Orangutan", text: "*Suara mencicit ketakutan*" },
                    { character: "Lesta", text: "Kasihan sekali! Dia pasti bingung dan ketakutan." }
                ]
            },
            // Scene 8: Choice 4
            {
                id: 8,
                type: "CHOICE",
                background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
                question: "Anak orangutan itu terlihat akan lari ke arah para pembalak. Raka harus...",
                choices: [
                    {
                        text: "Melempar batu untuk mengalihkan perhatian pembalak.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Ide bagus! Perhatian mereka teralihkan."
                    },
                    {
                        text: "Berteriak memanggil orangutan.",
                        isGood: false,
                        scoreChange: -10,
                        feedback: "Teriakanmu malah membuat pembalak sadar keberadaanmu!"
                    }
                ]
            },
            // Scene 9: Narrative
            {
                id: 9,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
                dialogues: [
                    { character: "Narator", text: "Berhasil! Orangutan itu lari menjauh dari bahaya. Raka mundur perlahan.", isNarrator: true },
                    { character: "Raka", text: "Hampir saja. Sekarang aku harus kembali ke pos untuk meminta bantuan." }
                ]
            },
            // Scene 10: Choice 5
            {
                id: 10,
                type: "CHOICE",
                background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
                question: "Di perjalanan pulang, Raka menemukan jerat hewan yang dipasang pemburu.",
                choices: [
                    {
                        text: "Merusak jerat tersebut.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Satu nyawa satwa terselamatkan dari jeratan maut."
                    },
                    {
                        text: "Membiarkannya karena buru-buru.",
                        isGood: false,
                        scoreChange: -5,
                        feedback: "Jerat itu bisa melukai hewan langka kapan saja."
                    }
                ]
            },
            // Scene 11: Narrative
            {
                id: 11,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                dialogues: [
                    { character: "Narator", text: "Raka sampai di pos dan bertemu Kepala Polisi Hutan.", isNarrator: true },
                    { character: "Komandan", text: "Laporanmu sangat detail, Raka. Kami akan segera bergerak." },
                    { character: "Lesta", text: "Kerja bagus! Tapi tugas kita belum selesai." }
                ]
            },
            // Scene 12: Choice 6
            {
                id: 12,
                type: "CHOICE",
                background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                question: "Komandan meminta Raka menunjuk jalan potong. Raka tahu jalan cepat tapi curam, atau jalan datar tapi memutar.",
                choices: [
                    {
                        text: "Pilih jalan cepat meski curam.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Waktu adalah kunci! Pilihan berani."
                    },
                    {
                        text: "Pilih jalan datar yang aman.",
                        isGood: false,
                        scoreChange: 0, // Neutral
                        feedback: "Aman, tapi para pembalak mungkin sudah kabur."
                    }
                ]
            },
            // Scene 13: Narrative
            {
                id: 13,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
                dialogues: [
                    { character: "Narator", text: "Tim berhasil menyergap para pembalak sebelum mereka pergi.", isNarrator: true },
                    { character: "Pembalak", text: "Sial! Kita terkepung!" },
                    { character: "Polisi", text: "Angkat tangan! Kalian ditangkap atas perusakan hutan lindung." }
                ]
            },
            // Scene 14: Choice 7
            {
                id: 14,
                type: "CHOICE",
                background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
                question: "Salah satu pembalak mencoba menyuap Raka agar memberinya celah kabur.",
                choices: [
                    {
                        text: "Menolak tegas tawaran itu.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Integritasmu tak ternilai harganya!"
                    },
                    {
                        text: "Ragu-ragu sejenak.",
                        isGood: false,
                        scoreChange: -10,
                        feedback: "Keraguanmu bisa dimanfaatkan oleh penjahat."
                    }
                ]
            },
            // Scene 15: Narrative
            {
                id: 15,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
                dialogues: [
                    { character: "Narator", text: "Para pembalak pun diamankan. Namun, kerusakan yang mereka buat cukup parah.", isNarrator: true },
                    { character: "Raka", text: "Butuh puluhan tahun untuk pohon-pohon ini tumbuh kembali..." },
                    { character: "Lesta", text: "Tapi kita bisa mulai memperbaikinya sekarang." }
                ]
            },
            // Scene 16: Choice 8
            {
                id: 16,
                type: "CHOICE",
                background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
                question: "Ada bibit pohon yang tersisa di pos. Apa yang sebaiknya dilakukan di area bekas tebangan?",
                choices: [
                    {
                        text: "Segera menanam bibit baru bersama tim.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Reboisasi adalah langkah awal pemulihan."
                    },
                    {
                        text: "Menunggu musim hujan datang.",
                        isGood: false,
                        scoreChange: -5,
                        feedback: "Tanah yang gundul rawan longsor jika dibiarkan terlalu lama."
                    }
                ]
            },
            // Scene 17: Narrative
            {
                id: 17,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #1a5c3a 0%, #2d7a4d 50%, #1a4a3a 100%)",
                dialogues: [
                    { character: "Narator", text: "Beberapa hari kemudian, Raka kembali ke hutan untuk memantau.", isNarrator: true },
                    { character: "Raka", text: "Hei, lihat! Induk orangutan itu kembali mencari anaknya." },
                    { character: "Lesta", text: "Sungguh pemandangan yang mengharukan." }
                ]
            },
            // Scene 18: Choice 9
            {
                id: 18,
                type: "CHOICE",
                background: "linear-gradient(180deg, #1a5c3a 0%, #2d7a4d 50%, #1a4a3a 100%)",
                question: "Raka ingin memastikan mereka aman. Dia sebaiknya...",
                choices: [
                    {
                        text: "Mengamati dari jauh menggunakan teropong.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Benar, jangan mengganggu interaksi alami mereka."
                    },
                    {
                        text: "Mendekat untuk memberi makan.",
                        isGood: false,
                        scoreChange: -10,
                        feedback: "Memberi makan satwa liar membuat mereka ketergantungan pada manusia."
                    }
                ]
            },
            // Scene 19: Narrative
            {
                id: 19,
                type: "NARRATIVE",
                background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                dialogues: [
                    { character: "Narator", text: "Petualangan Raka kali ini memberikan pelajaran berharga.", isNarrator: true },
                    { character: "Lesta", text: "Hutan ini masih butuh pahlawan sepertimu." }
                ]
            },
            // Scene 20: Choice 10 (Final Reflection)
            {
                id: 20,
                type: "CHOICE",
                background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
                question: "Apa komitmenmu setelah melihat kejadian ini?",
                choices: [
                    {
                        text: "Aku akan aktif menyebarkan kesadaran lingkungan.",
                        isGood: true,
                        scoreChange: 10,
                        feedback: "Semangat yang luar biasa!"
                    },
                    {
                        text: "Cukup tahu saja, itu tugas pemerintah.",
                        isGood: false,
                        scoreChange: -5,
                        feedback: "Lingkungan adalah tanggung jawab kita bersama."
                    }
                ]
            }
        ]
    }
};
