// src/pages/VoucherPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import "./mystyle.css";

const VoucherPage = () => {
    const { member } = useParams();
    const [voucher, setVoucher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasClicked, setHasClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (hasClicked) {
            fetch(
                `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=getKodeValid&Member=${member}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setVoucher(data?.data?.Code || null);
                    setLoading(false);
                    console.log(setVoucher);
                    console.log(data);
                })
                .catch(() => {
                    setVoucher(null);
                    setLoading(false);
                });
        }
    }, [hasClicked, member]);

    const handleSubmit = async () => {
        if (!email || !voucher) return;

        const targetUrl = `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=assignKodeToUser&Code=${encodeURIComponent(voucher)}&AssignTo=${encodeURIComponent(email)}`;

        const formData = new URLSearchParams(); // <-- penting: kirim sebagai x-www-form-urlencoded
        formData.append("dummy", "data"); // karena Apps Script perlu body, meski isinya tidak dipakai

        try {
            const response = await fetch(targetUrl, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: formData.toString(),
            });

            const result = await response.json();
            console.log("Submit success:", result);
            setSubmitted(true);
            console.log(voucher);
            console.log(email);
        } catch (err) {
            console.error("Submit failed:", err);
            alert("Gagal menyimpan email. Silakan coba lagi.");
        }
    };


    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Portfolio | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <div className="voucher-container">
                    {hasClicked ? (
                        loading ? (
                            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                                <h2>Loading Gacha...</h2>
                            </motion.div>
                        ) : voucher ? (
                            <div className="voucher-result">
                                <Confetti />
                                <motion.div
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <h2 className="win-text">
                                        🎉 Selamat! Kamu mendapatkan voucher cheki bersama {member}: <br /><br />


                                    </h2>

                                </motion.div>

                                {!submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="email-form"
                                    >
                                        <input
                                            type="email"
                                            placeholder="Masukkan email kamu"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button onClick={handleSubmit} disabled={!email}>
                                            📩 Claim Voucher
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        animate={{ scale: [0.9, 1.1, 1] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <strong><b>{voucher}</b></strong>

                                        <br />
                                        <p style={{ fontSize: "16px", color: "#333" }}>
                                            <br /><br />🎊 Terima kasih! Email kamu berhasil disimpan.
                                            <br /><br /> * Harap salin kode voucher di atas untuk pembelian cheki, yang dapat kamu tukarkan untuk mengabadikan momen bersama <strong>{member}</strong>.
                                        </p>
                                    </motion.p>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="lose-text"
                            >
                                😢 Maaf, voucher untuk member <strong>{member}</strong> sudah habis.
                            </motion.div>
                        )
                    ) : (
                        <motion.div
                            className="gacha-box"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <h1>🎁 Gacha Voucher</h1>
                            <p>Klik tombol di bawah untuk mencoba keberuntunganmu!</p>
                            <button onClick={() => setHasClicked(true)}>🎲 Gacha Sekarang</button>
                        </motion.div>
                    )}
                </div>
            </Container>
        </HelmetProvider>
    );
};

export default VoucherPage;
