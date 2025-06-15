import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

                    {Object.entries(data).map(([key, value]) => {
                        if (data["Sudah Redeem"] === "Done") {
                            return "YAHAHAHAH";
                        } else {
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
                            if (key === "Sudah Redeem") {
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
                        }
                    })}

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => window.location.href = "/Checkin-Cheki"}
                    >
                        Scan Ulang
                    </button>
                </div>
            )}

            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default QRScanner;
