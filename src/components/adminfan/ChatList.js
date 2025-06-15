import { useState } from "react";
import ChatItem from "./ChatItem";

const LOAD_LIMIT = 40;

export default function ChatList({ chats, onRefresh }) {
    const [visibleCount, setVisibleCount] = useState(LOAD_LIMIT);

    const visibleChats = chats.slice(0, visibleCount);

    const onDelete = async (data) => {
        const confirmDelete = window.confirm(`Yakin ingin menghapus surat dari ${data.Nama}?`);
        if (!confirmDelete) return;

        try {
            const formData = new URLSearchParams();
            formData.append('jenis_trx', 'ubahStatusFanLetter');
            formData.append('SubmissionID', data.SubmissionID);
            formData.append('Status', 'D');

            const SubmissionID = data.SubmissionID;
            const Status = 'D';
            const targetUrl = `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=ubahStatusFanLetter&SubmissionID=${encodeURIComponent(SubmissionID)}&Status=${encodeURIComponent(Status)}`;


            const response = await fetch(targetUrl, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: formData.toString(),
            });

            const text = await response.text();
            console.log("Response text:", text);

            try {
                const result = JSON.parse(text);
                if (result.success) {
                    alert("Surat berhasil dihapus!");
                    if (onRefresh) onRefresh(); // ini akan reload halaman tanpa perlu login ulang

                } else {
                    alert("Gagal menghapus surat: " + result.message);
                }
            } catch (err) {
                alert("Respon bukan JSON: " + text);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Terjadi kesalahan saat menghapus surat.');
        }
    };

    const onApproval = async (data) => {
        const confirmDelete = window.confirm(`Yakin ingin menghapus surat dari ${data.Nama}?`);
        if (!confirmDelete) return;

        try {
            const formData = new URLSearchParams();
            formData.append('jenis_trx', 'ubahStatusFanLetter');
            formData.append('SubmissionID', data.SubmissionID);
            formData.append('Status', 'Y');

            const SubmissionID = data.SubmissionID;
            const Status = 'Y';
            const targetUrl = `https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=ubahStatusFanLetter&SubmissionID=${encodeURIComponent(SubmissionID)}&Status=${encodeURIComponent(Status)}`;


            const response = await fetch(targetUrl, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: formData.toString(),
            });

            const text = await response.text();
            console.log("Response text:", text);

            try {
                const result = JSON.parse(text);
                if (result.success) {
                    alert("Surat berhasil diterima dan telah diteruskan ke member terkait!");
                    if (onRefresh) onRefresh(); // ini akan reload halaman tanpa perlu login ulang

                } else {
                    alert("Gagal menerima surat: " + result.message);
                }
            } catch (err) {
                alert("Respon bukan JSON: " + text);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Terjadi kesalahan saat menghapus surat.');
        }
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + LOAD_LIMIT);
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2 mb-4">
                {visibleChats.map((chat, index) => (
                    <ChatItem key={index} data={chat} onDelete={onDelete} onApproval={onApproval} />
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
        </div>
    );
}
