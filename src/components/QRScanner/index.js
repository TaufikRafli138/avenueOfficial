import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);
    const [hover1, setHover1] = useState(false);
    const handleApprove = async () => {
        setError("");
        setLoading(true);

        try {
            const submissionID = data["Submission ID"];
            const status = "C";

            if (!submissionID) {
                setError("SubmissionID tidak ditemukan di data.");
                setLoading(false);

                return;
            }

            const URL = `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=approveCheki&SubmissionID=${submissionID}&Status=${status}`;

            const response = await fetch(URL, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });

            const result = await response.json();

            if (result.success) {
                alert("✅ Approve berhasil!");
                window.location.href = "/Checkin-Cheki"
                // misalnya: refresh atau update status
            } else {
                setError("❌ Approve gagal.");
            }
        } catch (err) {
            console.error(err);
            setError("⚠️ Terjadi kesalahan saat meng-approve.");
        } finally {
            setLoading(false);
        }
    };
    const buttonStyle = {
        padding: "10px",
        backgroundColor: "#bfadff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "all 0.3s ease"
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: "white",
        color: "#bfadff",
        border: "2px solid #bfadff"
    };

    const buttonStyle1 = {
        padding: "10px",
        backgroundColor: "#bfadff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "all 0.3s ease"
    };

    const buttonHoverStyle1 = {
        ...buttonStyle1,
        backgroundColor: "white",
        color: "#bfadff",
        border: "2px solid #bfadff"
    };

    const handleScan = async (result) => {
        if (!result || !result.text) return;
        const code = result.text;

        try {
            const res = await fetch(`https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=getRiwayatPembelian&kode=${code}`);
            const resultJson = await res.json();
            if (resultJson.success) {
                setData(resultJson.data);
            } else {
                navigate("/notfound");
            }
        } catch (err) {
            setError("Gagal mengambil data.");
        }
    };

    const handleError = (err) => {
        console.error(err);
        setError("Gagal membuka kamera.");
    };





    return (
        <div>
            {!data && (
                <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={(result, error) => {
                        if (result) handleScan(result);
                        if (error) handleError(error);
                    }}
                    style={{ width: "100%" }}
                />
            )}

            {data && (
                <div className="text-start mt-4">
                    <h3 style={{ marginBottom: '50px' }}>Detail Pemesanan</h3>

                    {data["Status"] === "Y" ? (
                        <>
                            {Object.entries(data).map(([key, value]) => {
                                if (data["Sudah Redeem"] === "Done") {
                                    return <div key="done">YAHAHAHAH</div>;
                                }

                                if (!value) return null;

                                if (key === "Bukti Pembayaran") {
                                    return (
                                        <p key={key}>
                                            <strong>{key}:</strong>{" "}
                                            <a href={value} target="_blank" rel="noopener noreferrer">
                                                Lihat Bukti
                                            </a>
                                        </p>
                                    );
                                }

                                if (key === "Sudah Redeem" || key === "Status") {
                                    return null;
                                }

                                if (key === "Pemesanan") {
                                    const lines = value.split("\n").filter(Boolean);
                                    const items = [];
                                    let total = "";

                                    lines.forEach((line) => {
                                        const match = line.match(/^(.*?) \(Amount: ([\d,.]+) IDR, Quantity: (\d+)\)$/);
                                        if (match) {
                                            const [, name, amount, quantity] = match;
                                            items.push({ name, amount, quantity });
                                        } else if (line.startsWith("Total:")) {
                                            total = line.replace("Total: ", "");
                                        }
                                    });

                                    return (
                                        <div key={key} style={{ marginBottom: "1rem" }}>
                                            <strong>{key}:</strong>
                                            <table style={{ width: "100%", marginTop: "0.5rem", borderCollapse: "collapse", border: "1px solid #ccc" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: "1px solid #ccc", padding: "4px" }}>Nama</th>
                                                        <th style={{ border: "1px solid #ccc", padding: "4px" }}>Harga</th>
                                                        <th style={{ border: "1px solid #ccc", padding: "4px" }}>Jumlah</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td style={{ border: "1px solid #ccc", padding: "4px" }}>{item.name}</td>
                                                            <td style={{ border: "1px solid #ccc", padding: "4px" }}>{item.amount}</td>
                                                            <td style={{ border: "1px solid #ccc", padding: "4px" }}>{item.quantity}</td>
                                                        </tr>
                                                    ))}
                                                    {total && (
                                                        <tr>
                                                            <td colSpan="2" style={{ textAlign: "right", padding: "4px", border: "1px solid #ccc" }}><strong>Total</strong></td>
                                                            <td style={{ padding: "4px", border: "1px solid #ccc" }}><strong>{total}</strong></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                }

                                return (
                                    <p key={key}>
                                        <strong>{key}:</strong> {value}
                                    </p>
                                );
                            })}

                            <button
                                style={hover ? buttonHoverStyle : buttonStyle}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                onClick={() => {
                                    handleApprove();
                                }}
                            >
                                Approve Cheki
                            </button>
                            <br />
                        </>
                    ) : data["Status"] === "C" ? (
                        <div className="alert alert-success">✅ Kamu sudah Cheki 🎉</div>
                    ) : data["Status"] === "N" ? (
                        <div className="alert alert-danger">❌ Pembayaran tidak berhasil</div>
                    ) : data["Status"] === "Waiting Approval" ? (
                        <div className="alert alert-warning">⏳ Menunggu pembayaran disetujui</div>
                    ) : (
                        <div className="alert alert-warning">⏳ Menunggu pembayaran disetujui</div>
                    )}
                    <button
                        style={hover1 ? buttonHoverStyle1 : buttonStyle1}
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        onClick={() => window.location.href = "/Checkin-Cheki"}
                    >

                        Scan Ulang
                    </button>
                </div>
            )}



            {/* {error && <p className="text-danger mt-3">{error}</p>} */}
        </div>
    );
};

export default QRScanner;
