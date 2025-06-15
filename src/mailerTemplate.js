const logotext = "Avenue J";

const contactManagement = {
    bodyemailatas: `Halo, {avenueMember}\n
                    Kamu mendapatkan Fan Letter dari fan kamu berikut detail fan letternya, semoga dapat membuat kamu lebih semangat untuk kedepannya.\n
                    Harap perhatikan isi dari Fan Letter, jika ada kata-kata yang kurang pantas atau ujaran kebencian.\n
                    Kamu diharapkan untuk melapor ke pihak management. Semangat terus untuk performa selanjutnya !! \n
                    Berikut Adalah Fan Letter dari Fansmu:`,
    bodyemailtengah: `{message}`,
    bodyemailbawah: `   From         : {From} \n
                        Mail         : {Email}\n
                        Phone Number : {Phone}\n
                        Social Media : {Social}\n
                        Organization : {Organization}`,
    footer_akhir: `Dukungan dan cinta dari penggemar adalah hasil dari kerja keras Anda, dan kami sangat bangga akan pencapaian Anda.Teruslah menginspirasi dan menghibur dengan bakat serta karisma Anda yang luar biasa.Kami berada di belakang Anda setiap langkah, siap mendukung dan membantu dalam perjalanan karier yang cemerlang ini.`,

};

const contactStaffManagement = {
    bodyemailatas: `Halo, Management\n
                   Ada yang menghubungi anda melalui email website \n
                   berikut adalah detail dari beliau
`,
    bodyemailtengah: `{message}`,
    bodyemailbawah: `   From         : {From} \n
                        Mail         : {Email}\n`,


};


const photofc = {
    photo: ["/fc/1.jpg",
        "/fc/2.jpg",
        "/fc/3.jpg",
        "/fc/4.jpg"],
};


const documentationPhotos = {
    photo: ["/fc/1.jpg",
        "/fc/2.jpg",
        "/fc/3.jpg",
        "/fc/4.jpg"],
};


export { contactManagement, contactStaffManagement };
