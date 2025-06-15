"use client";
import ChatList from "../../components/adminfan/ChatList";
import React, { useEffect, useState } from "react";
import "./styleku.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import axios from "axios";

export default function ChatPage() {
    const [chatData, setChatData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [memberName, setMemberName] = useState(""); // ⬅️ TAMBAHAN

    const overlayStyle = {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    };

    const modalStyle = {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: "350px",
        gap: "12px"
    };

    const inputStyle = {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "1rem"
    };

    const buttonStyle = {
        padding: "10px",
        backgroundColor: "#bfadff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    };

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            const payload = { username, password };

            const URL =
                "https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=login"
                ;


            const response = await fetch(URL, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.success) {
                if (data.data?.Role === "Admin") {
                    setMemberName(data.data?.Nama); // ⬅️ Simpan nama member
                    setShowLogin(false);
                    fetchChatData(data.data?.Nama); // ⬅️ Kirim nama member ke fetch
                } else {
                    setError("Hei Anda Member Apenyu Gausah Kepo ya Anda >.<");
                }
            } else {
                setError("Login gagal. Cek Username dan Passwordnya lagi Ya.");
            }
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan saat login.");
        } finally {
            setLoading(false);
        }
    };

    const fetchChatData = async (member) => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec",
                {
                    params: {
                        jenis_trx: "getFanLetter",
                    },
                }
            );

            const rawData = response.data || [];
            const filteredData = rawData.filter(item => item.Status === "Waiting Approval");
            console.log(filteredData)
            console.log(response);
            setChatData(filteredData);
        } catch (error) {
            console.error("Error fetching fan letter:", error);
            setChatData([]); // Kosongkan jika error
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        document.body.classList.add("member-page");
        return () => {
            document.body.classList.remove("member-page");
        };
    }, []);

    if (showLogin) {
        return (
            <div style={overlayStyle}>
                <div style={modalStyle}>
                    <h2 className="text-xl font-bold mb-4">Credential Confirm</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
                    <button onClick={handleLogin} style={buttonStyle}>
                        {loading ? "Validating..." : "Login"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Portfolio | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4">Fan Letter</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <div className="p-6 min-h-screen bg-gray-100">
                    {loading ? (
                        <p>Sedang Mengambil Fan Letter Mu. Harap Bersabar ya ...</p>
                    ) : (
                        <ChatList chats={chatData} onRefresh={() => fetchChatData(memberName)} />
                    )}
                </div>
            </Container>
        </HelmetProvider>
    );
}
