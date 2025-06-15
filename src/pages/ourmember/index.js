import React, { useEffect } from "react";
import "./stylemember.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { member } from "../../memberAvenue";
import { meta } from "../../content_option";

export const Member = () => {
  useEffect(() => {
    document.body.classList.add("member-page"); // Tambahkan kelas "member-page" ke elemen body saat komponen dimuat
    return () => {
      document.body.classList.remove("member-page"); // Hapus kelas saat komponen dibongkar
    };
  }, []);
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
            <h1 className="display-4 mb-4">Our Member</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 " style={{ display: "flex", flexWrap: "wrap" }}>
          {member.dataMember && Object.values(member.dataMember).map((data, i) => {
            const isCaptain = data.role === "captain";
            return (
              <div key={data.callsign} className="imajinate_item" style={{ width: "33%", marginBottom: "20px", position: "relative" }}>
                {isCaptain && ( // Jika role adalah captain, tambahkan gambar dan gaya tambahan
                  <img src="/capt.png" alt="Captain Icon" style={{ position: "absolute", top: 10, right: 10, width: "25%", height: "auto" }} />
                )}
                <div className="bottonelah">
                  <h1 className="memberName" >{data.callsign}</h1>
                </div>
                <img src={data.profile} alt="" className="imgnya" />
                <div className="content">

                  <a href={`/DetailMember/${data.callsign}`}>View Member</a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
