import { useState } from "react";
import ChatItem from "./ChatItem";
import { FaWhatsapp, FaEnvelope, FaTelegramPlane, FaPhoneAlt, FaInstagram } from "react-icons/fa";
const LOAD_LIMIT = 40;

const ReplyModal = ({ chat, onClose }) => {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h3 className="text-lg font-bold mb-2">Detail Kontak </h3>
                <p className="italic text-gray-700 mb-4">{chat.Name || "Anonim"} ( {chat.Company || "Untilted Company"} )</p>
                <div style={contactListStyle}>
                    <a href={`https://wa.me/+62${chat.Notelp}`} target="_blank" rel="noopener noreferrer" style={iconButton("#25D366")}>
                        <FaWhatsapp /> WhatsApp
                    </a>
                    <a href={`mailto:${chat.Email}`} style={iconButton("#EA4335")}>
                        <FaEnvelope /> Email
                    </a>
                    <a href={`https://t.me/${chat.Notelp}`} target="_blank" rel="noopener noreferrer" style={iconButton("#FF0069")}>
                        <FaInstagram /> Instagram
                    </a>
                    <a href={`tel:+62${chat.Notelp}`} style={iconButton("#6b7280")}>
                        <FaPhoneAlt /> Telepon
                    </a>
                </div>
                <button onClick={onClose} style={closeBtn}>Tutup</button>
            </div>
        </div>
    );
};
// Styles
const overlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 999,
};

const modalStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
};

const contactListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px"
};

const iconButton = (color) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px",
    color: "#fff",
    backgroundColor: color,
    border: "none",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold"
});

const closeBtn = {
    marginTop: "20px",
    padding: "6px 12px",
    borderRadius: "6px",
    background: "#e5e7eb",
    border: "none",
    cursor: "pointer"
};
export default function ChatList({ chats }) {


    const [visibleCount, setVisibleCount] = useState(LOAD_LIMIT);
    const [selectedChat, setSelectedChat] = useState(null);

    const visibleChats = chats.slice(0, visibleCount);

    const handleDetailContact = (chat) => {
        setSelectedChat(chat);
    };

    const handleReply = (chat) => {
        alert(`Balas untuk ${chat.Nama || "Anonim"}: "${chat.Message}"`);
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + LOAD_LIMIT);
    };

    const handleCloseModal = () => {
        setSelectedChat(null);
    };

    return (
        <div className="max-w-md mx-auto relative">
            <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2 mb-4">
                {visibleChats.map((chat, index) => (
                    <ChatItem key={index} data={chat} onReply={handleReply} onDetailContact={handleDetailContact} />
                ))}
            </div>

            {visibleCount < chats.length && (
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </button>
                </div>
            )}

            {selectedChat && (
                <ReplyModal chat={selectedChat} onClose={handleCloseModal} />
            )}
        </div>
    );
}
