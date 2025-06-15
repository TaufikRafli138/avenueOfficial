// import React, { useEffect, useState } from "react";
// import { WiMoonAltWaningCrescent4 } from "react-icons/wi";


// const Themetoggle = () => {
//   const [theme, settheme] = useState(localStorage.getItem("theme"));
//   const themetoggle = () => {
//     settheme(theme === "dark" ? "light" : "dark");
//   };
//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem('theme', theme);
//   }, [theme]);
//   return (
//     <div className="nav_ac" onClick={themetoggle}>
//       <WiMoonAltWaningCrescent4 />
//     </div>
//   );
// };

// export default Themetoggle;


import React, { useEffect } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const Themetoggle = () => {
  useEffect(() => {
    // Setel ke 'light' saat pertama kali komponen dimuat
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, []);

  // Klik tidak akan mengubah tema
  const themetoggle = () => {
    // Opsional: bisa tampilkan alert atau hanya abaikan klik
    console.log("Theme is locked to light mode");
  };

  return (
    <div className="nav_ac" onClick={themetoggle}>
      {/* <WiMoonAltWaningCrescent4 /> */}
    </div>
  );
};

export default Themetoggle;
