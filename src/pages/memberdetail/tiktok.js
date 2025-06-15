import React from 'react';

const TikTokEmbed = ({ username }) => {
  // Replace 'user' with the TikTok username you want to embed
  const tiktokUsername = username || 'user';
console.log(tiktokUsername)
  return (
    <div>
      <iframe
        src={`https://www.tiktok.com/embed/v2/@${tiktokUsername}`}
        title="TikTok Embed"
        width="100%"
        height="500"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TikTokEmbed;
