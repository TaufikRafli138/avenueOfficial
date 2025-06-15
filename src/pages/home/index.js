import React, { useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import Slideshow from "./slider";

export const Home = () => {
  useEffect(() => {
    document.body.classList.add("home-page"); // Tambahkan kelas "member-page" ke elemen body saat komponen dimuat
    return () => {
      document.body.classList.remove("home-page"); // Hapus kelas saat komponen dibongkar
    };
  }, []);
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
          // style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/data.png)` }}
          >
            <Slideshow />

          </div>

          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                        introdata.animated.fourth,
                        introdata.animated.fifth,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                {introdata.description.split('\n').map((line, index) => (
                  <p key={index} style={{ textAlign: 'justify' }}>{line}</p>
                ))}
                <div className="intro_btn-action pb-5">
                  <Link to="/member" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      Our Member
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Us
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
