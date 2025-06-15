import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const EventModal = ({ event, onClose }) => {
    const shareToWhatsApp = () => {
        const message = `🎤 Event: ${event.title}\n📍 Lokasi: ${event.lokasi}\n🕒 Waktu: ${event.start.toLocaleString()} - ${event.end.toLocaleString()}\n🎶 Line Up: ${event.lineup}`;
        const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");
    };

    const shareToInstagram = () => {
        window.open("https://www.instagram.com/", "_blank"); // No direct IG share
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h3 className="text-lg font-bold mb-2">Detail Event</h3>
                <p className="italic text-gray-700 mb-1">{event.title}</p>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="text-left text-gray-700 text-sm space-y-1 mb-4">
                    <p><strong>Lokasi:</strong> {event.lokasi}</p>
                    <p><strong>Waktu:</strong> {event.start.toLocaleString()} - {event.end.toLocaleString()}</p>
                    <p><strong>Line Up:</strong> {event.lineup}</p>
                </div>

                <div style={contactListStyle}>
                    <button onClick={shareToWhatsApp} style={iconButton("#25D366")}>
                        <FaWhatsapp /> Share ke WhatsApp
                    </button>
                    <button onClick={shareToInstagram} style={iconButton("#FF0069")}>
                        <FaInstagram /> Share ke Instagram
                    </button>
                </div>

                <button onClick={onClose} style={closeBtn}>Tutup</button>
            </div>
        </div>
    );
};

// Styles (same as your ReplyModal)
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
    fontWeight: "bold",
    cursor: "pointer"
});

const closeBtn = {
    marginTop: "20px",
    padding: "6px 12px",
    borderRadius: "6px",
    background: "#e5e7eb",
    border: "none",
    cursor: "pointer"
};

export default EventModal;
