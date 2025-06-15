import React, { useEffect } from 'react';

function TwitterTimeline({ username }) {
  useEffect(() => {
    // Check if Twitter's widgets.js script is already loaded
    if (!window.twttr) {
      // If not loaded, create script element for loading Twitter's widgets.js
      const script = document.createElement('script');
      script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      document.body.appendChild(script);

      return () => {
        // Clean up: remove the script when the component unmounts
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      {/* Replace 'babyyaurell' with the desired Twitter username */}
      <a
        className="twitter-timeline"
        data-width="100%"
        data-height="500"
        href={`https://twitter.com/${username}`}
      >
        Tweets by {username}
      </a>
    </div>
  );
}

export default TwitterTimeline;
