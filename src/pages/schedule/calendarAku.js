import React, { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { id } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaWhatsapp, FaInstagram, FaCamera } from "react-icons/fa";
import "./style.css";



const locales = { id };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: id }),
  getDay,
  locales,
});

const EventModal = ({ event, onClose }) => {
  if (!event) return null;
  const today = new Date();
  const eventDate = new Date(event.start);
  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = new Date(event.start).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ display: "flex" }}>
          <button style={closeBtn} onClick={onClose}>X</button>
        </div>
        <h3 className="text-lg font-bold mb-2">{event.title}</h3>
        {event.photo && (
          <img
            src={event.photo}
            alt={event.title}
            style={{
              width: "50%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}

        <p className="mb-2 italic">{event.description}</p>


        <div
          className="mb-4"
          style={{ textAlign: "left", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}
        >
          <strong>Detail Event</strong>
          <p className="mb-2" style={{ textAlign: "left" }}>
            Tanggal: {formattedDate}
          </p>
          <p className="mb-2" style={{ textAlign: "left" }}>
            Lokasi: {event.lokasi}
          </p>
          <p className="mb-2" style={{ textAlign: "left" }}>
            Link:{" "}
            <a
              href={event.link.startsWith("http") ? event.link : `https://${event.link}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3366cc", textDecoration: "underline" }}
            >
              Cek Disini &gt;.&lt;
            </a>
          </p>

        </div>

        <div
          className="mb-4"
          style={{ textAlign: "left", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}
        >
          <strong>Line Up:</strong>
          <div style={{ display: "table", width: "100%" }}>
            {event.lineup.split(",").map((name, idx) => (
              <div
                key={idx}
                style={{
                  display: "table-row",
                  borderBottom: "1px solid #eee",
                  padding: "4px 0",
                }}
              >
                <div style={{ display: "table-cell", padding: "4px 0" }}>{name.trim()}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="mb-4"
          style={{
            textAlign: "left",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <strong>SetList :</strong>
          {diffDays > 2 ? (
            <div style={{ paddingTop: "8px", color: "#999", fontStyle: "italic" }}>
              Coming Soon
            </div>
          ) : (
            <div style={{ display: "table", width: "100%" }}>
              {(event.Setlist || "")
                .split(",")
                .map((name, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "table-row",
                      borderBottom: "1px solid #eee",
                      padding: "4px 0"
                    }}
                  >
                    <div style={{ display: "table-cell", padding: "4px 0" }}>
                      {name.trim()}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div style={contactListStyle}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`🎌 Hai minna-san~! 🎌
Kabar gembira buat kalian para VenUs Avenue J! ✨

Setelah sekian lama menanti, akhirnya momen yang ditunggu-tunggu datang juga! Saatnya kita berkumpul, bersenang-senang, dan merayakan event spesial yang penuh warna dan semangat. Avenue J, idol group kesayangan kalian yang membawakan berbagai lagu cover anime dan J-Pop, serta membawakan single original mereka, akan tampil secara langsung di event spesial ini! Untuk detailnya bisa dicek di bawah ini ya~ 🎉

🌟 Avenue J proudly presents 🌟
🌸 ${event.name} 🌸

📅 Tanggal: ${event.start.toLocaleDateString('id-ID')}
🕖 Waktu: Pukul ${event.start.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
📍 Lokasi: ${event.location}

Bersiaplah untuk malam yang tak akan terlupakan! Akan ada penampilan spesial dari Avenue J, membawakan lagu-lagu favorit kalian dengan penuh semangat! 🎤🎶🎭

✨ Yuk datang dan ramaikan! Tunjukkan semangatmu sebagai VenUs sejati, dan nyanyikan lagu-lagu favorit bersama kami! Dukung Avenue J di panggung dan jadilah bagian dari perjalanan kami!

📢 Save the date dan ajak rekan, pacar, teman, teman rasa pacar, selingkuhan, adek-adekan, atau apapun itu!
Let’s create an unforgettable night, together with Avenue J!
— Dengan cinta dan semangat dari kami, Avenue J 💖`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={iconButton("#25D366")}
          >
            <FaWhatsapp /> Share ke WhatsApp
          </a>

        </div>

        <div style={contactListStyle}>
          <a
            href="https://form.jotform.com/251244424629456"
            target="_blank"
            rel="noopener noreferrer"
            style={iconButton("#bfadff")}
          >

            <FaCamera /> Amankan Cheki Disini
          </a>

        </div>

      </div>
    </div>
  );
};
const overlayStyle = {
  position: "fixed",
  top: 16,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  overflow: "auto", // penting agar bisa scroll saat konten tinggi
};

const modalStyle = {
  backgroundColor: "#fff",
  marginTop: "30px",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "80vh", // batasi tinggi modal
  overflowY: "auto",  // scroll vertikal jika perlu
  position: "relative",
  textAlign: "CENTER"
};

const contactListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "15px",
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
});
const closeBtn = {
  marginTop: "20px",
  marginRight: "10px",
  marginLeft: "auto", // Tambahkan ini
  padding: "6px 12px",
  borderRadius: "6px",
  background: "#e5e7eb",
  border: "none",
  cursor: "pointer",
};

const convertDriveLinkToDirect = (url) => {
  const match = url.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    const direct = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(direct.replace(/^https?:\/\//, ""))}`;
  }
  return null;
};


export default function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=getAcaraAvenue"
      );
      const data = await response.json();

      const parsedEvents = data.map((item) => ({
        title: item.Title,
        description: item.Description || "",
        start: new Date(item.Start),
        end: new Date(item.End),
        lokasi: item.Lokasi,
        lineup: item.Lineup,
        Setlist: item.Setlist,
        link: item.link,
        photo: convertDriveLinkToDirect(item.photo) || "",
      }));

      setEvents(parsedEvents);
    } catch (error) {
      console.error("Gagal memuat data dari API:", error);
      console.log(error);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ width: "100%", height: "600px", padding: "1rem" }}>
      <Calendar
        eventPropGetter={(event) => {
          let backgroundColor = "#bfadff";

          return {
            style: {
              backgroundColor,
              color: "white",
              borderRadius: "8px",
              border: "none",
              padding: "4px",
              fontSize: "0.85rem",
              transition: "transform 0.2s ease",
            },
          };
        }}
        components={{
          toolbar: (toolbar) => (
            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                {["PREV", "NEXT"].map((type, i) => (
                  <button
                    key={i}
                    onClick={() => toolbar.onNavigate(type)}
                    style={{
                      backgroundColor: "White",
                      color: "black",
                      border: "1px solid #5a32a3",
                      padding: "6px 12px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#6f42c1";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "White";
                    }}
                  >
                    {type === "PREV" && "<<"}
                    {type === "NEXT" && ">>"}
                  </button>
                ))}
              </div>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{toolbar.label}</div>
            </div>
          ),
          event: ({ event }) => (
            <div>
              <strong>{event.title}</strong>
              <div style={{ fontSize: "0.75rem" }}>
                {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")} {event.lokasi ? ` (${event.lokasi})` : ""}
              </div>
            </div>
          ),
        }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        defaultDate={new Date(2025, 5, 10)}
        views={["month", "week", "day", "agenda"]}
        onSelectEvent={handleSelectEvent}
        messages={{
          today: "Hari ini",
          previous: "Sebelumnya",
          next: "Berikutnya",
          month: "Bulan",
          week: "Minggu",
          day: "Hari",
          agenda: "Events",
          date: "Tanggal",
          time: "Waktu",
          event: "Acara",
          noEventsInRange: "Tidak ada acara dalam rentang waktu ini",
        }}
      />
      <EventModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
}
