import React, { useState } from 'react';

export default function ChatItem({ data, onDelete }) {
    const [isHover, setIsHover] = useState(false);

    const buttonStyle = {
        padding: '4px 12px',
        fontSize: '0.875rem',
        backgroundColor: isHover ? '#7e22ce' : '#ffffff',
        color: isHover ? '#ffffff' : '#7e22ce',
        border: '1px solid #7e22ce',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
    };

    function getTimeAgo(sendString) {
        const send = new Date(sendString.replace(' ', 'T')); // ubah jadi format ISO agar bisa diparse
        const now = new Date();
        const diff = Math.floor((now - send) / 1000); // selisih dalam detik
        console.log(send);
        console.log(now);
        console.log(send);
        if (diff < 60) return 'a few seconds ago';
        if (diff < 120) return 'a minute ago';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 7200) return 'an hour ago';
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 172800) return 'a day ago';
        return `${Math.floor(diff / 86400)} days ago`;
    }



    return (
        <div className="border rounded-2xl p-4 shadow mb-2 bg-white">
            <div className="text-sm text-gray-500 mb-3">
                <b>{data.Nama}</b> Ngirimin kamu Surat Nih. Suratnya ditujukan untuk {data.Member}. Yuk Kepoin Suratnya.
            </div>

            <p
                style={{
                    backgroundColor: '#f5f5f5',
                    borderLeft: '4px solid #d93025',
                    padding: '8px 16px',
                    color: '#202124',
                    fontWeight: 500,
                    borderRadius: '4px',
                    fontSize: '0.95rem',
                }}
            >
                " <i>{data.Message}</i> "
            </p>
            <p
                style={{
                    textAlign: 'right',
                    padding: '1px',
                    color: '#202124',
                    fontWeight: 1,
                    borderRadius: '4px',
                    fontSize: '0.70rem',
                }}
            >
                <b>{getTimeAgo(data.Send)}</b><br />{data.From}, {new Date(data.Send).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                    style={buttonStyle}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => onDelete(data)}
                >
                    Hapus
                </button>
            </div>

        </div >
    );
}
