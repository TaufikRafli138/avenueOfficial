import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const STATUS_STEPS = [
    "Dipesan",
    "Pembayaran Terkonfirmasi",
    "Siap Cheki",
    "Sudah Cheki",
];

const STATUS_MAP = {
    "dipesan": 0,
    "pembayaran terkonfirmasi": 1,
    "siap cheki": 2,
    "sudah cheki": 3,
};
export default function Tracking() {
    const [kode, setKode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [detail, setDetail] = useState(null);

    const handleTracking = async () => {
        setLoading(true);
        setError("");
        setDetail(null);
        try {
            // const url = `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=getRiwayatPembelian&kode=${encodeURIComponent(
            //     kode.trim()
            // )}`;

            const url = `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=getRiwayatPembelian&kode=MQ6MW`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Gagal mengambil data");
            const data = await res.json();
            console.log(data);
            if (!data || !data.data.Status) {
                setError("Data tidak ditemukan atau format salah.");
            } else {
                setDetail(data.data);
            }
        } catch (err) {
            setError(err.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    // index status yang sekarang, default ke 0 jika tidak ketemu
    const currentIndex = detail?.status
        ? STATUS_MAP[detail.status.toLowerCase()] ?? 0
        : 0;


    return (
        <div
            style={{
                maxWidth: 480,
                margin: "40px auto",
                padding: 20,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                background: "#f7f9fc",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgb(99 99 99 / 0.2)",
            }}
        >
            <h2 style={{ textAlign: "center", color: "#222" }}>Tracking Pembelian</h2>

            <input
                type="text"
                placeholder="Masukkan Kode Pembelian"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 16,
                    borderRadius: 8,
                    border: "2px solid #ccc",
                    outline: "none",
                    marginBottom: 16,
                    transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />

            <button
                onClick={handleTracking}
                disabled={!kode.trim() || loading}
                style={{
                    width: "100%",
                    padding: "12px 0",
                    fontSize: 18,
                    fontWeight: "600",
                    color: "white",
                    background: "#007bff",
                    border: "none",
                    borderRadius: 8,
                    cursor: loading || !kode.trim() ? "not-allowed" : "pointer",
                    opacity: loading || !kode.trim() ? 0.6 : 1,
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                    if (!loading && kode.trim()) e.target.style.backgroundColor = "#0056b3";
                }}
                onMouseLeave={(e) => {
                    if (!loading && kode.trim()) e.target.style.backgroundColor = "#007bff";
                }}
            >
                {loading ? "Loading..." : "Tracking"}
            </button>

            {error && (
                <div
                    style={{
                        marginTop: 20,
                        color: "#b00020",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    {error}
                </div>
            )}

            {detail && (
                <div
                    style={{
                        marginTop: 30,
                        background: "white",
                        borderRadius: 12,
                        padding: 20,
                        boxShadow: "0 6px 18px rgb(0 0 0 / 0.1)",
                    }}
                >
                    <h3 style={{ marginBottom: 12, color: "#333" }}>
                        Detail Pembelian Kode: <span style={{ color: "#007bff" }}>{kode}</span>
                    </h3>

                    <p>
                        <strong>Nama Produk:</strong> {detail.nama_produk || "-"}
                    </p>
                    <p>
                        <strong>Tanggal Pembelian:</strong> {detail.tanggal_pembelian || "-"}
                    </p>
                    <p>
                        <strong>Total Harga:</strong> {detail.total_harga || "-"}
                    </p>

                    <div style={{ marginTop: 30 }}>
                        <h4>Status Pengiriman</h4>
                        <ProgressBar
                            percent={(currentIndex / (STATUS_STEPS.length - 1)) * 100}
                            filledBackground="linear-gradient(to right, #007bff, #00d4ff)"
                            height={8}
                            width="100%"
                        >
                            {STATUS_STEPS.map((step, index) => (
                                <Step key={step}>
                                    {({ accomplished }) => (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                fontSize: "12px",
                                                color: accomplished ? "#007bff" : "#aaa",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: "50%",
                                                    backgroundColor: accomplished ? "#007bff" : "#ccc",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#fff",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {index + 1}
                                            </div>
                                            {step}
                                        </div>
                                    )}
                                </Step>
                            ))}
                        </ProgressBar>
                    </div>
                </div>
            )}
        </div>
    );
}
