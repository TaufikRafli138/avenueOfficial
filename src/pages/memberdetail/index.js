import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { member } from "../../memberAvenue";
import TwitterTimeline from "./twitter";
import TikTokEmbed from "./tiktok";
import "./style.css";
import { Link } from "react-router-dom";
import VideoComponent from "./jiko";

const MemberDetail = () => {
  useEffect(() => {
    document.body.classList.add("detail-page"); // Tambahkan kelas "member-page" ke elemen body saat komponen dimuat
    return () => {
      document.body.classList.remove("member-page"); // Hapus kelas saat komponen dibongkar
    };
  }, []);
  const { callsign } = useParams();
  const memberData = member.dataMember[callsign];

  return (
    <Container className="mt-5 ngikutaplikasi rounding">
      <Row >


        <Col lg={4} className="sticky-top mt-5" >
          <Card style={{ padding: "20px" }} className="ngikutaplikasiCheki">
            <div>

              <Card.Body style={{ textAlign: "right", position: "relative" }} className="ngikutaplikasiCheki">
                <Card.Img variant="top" src={memberData.profile} />
                <h3 className="cheki">
                  {memberData.message}
                </h3>
                <div>

                </div>
              </Card.Body>

            </div>
            <Card.Body style={{ textAlign: "right" }}>
              <h4 style={{
                fontFamily: "Lucida Handwriting",

              }}>
                {memberData.callsign}
              </h4>
            </Card.Body>

          </Card>
        </Col>

        <Col lg={8} className="mt-5" style={{ overflowY: "auto", maxHeight: "80vh" }}>
          <Card className="ngikutaplikasi">
            <Card.Body >
              <h2 style={{ textAlign: "right" }}>Avenue Member</h2>

              <hr />
              <div>

              </div>
              <br />
              <div className="member-container">
                <div className="member-info">
                  <strong>Nama</strong>: {memberData.nama}
                </div>
                <div className="member-info">
                  <strong>Tanggal Lahir</strong>: {memberData.bod}
                </div>
                <div className="member-info">
                  <strong>Nama Panggilan</strong>: {memberData.callsign}
                </div>
                <div className="member-info">
                  <strong>Horoskop</strong>: {memberData.horoskop}
                </div>
                <div className="member-info">
                  <strong>Asal</strong>: {memberData.asal}
                </div>
              </div>
              <strong>Instagram:</strong>{" "}
              <a href={memberData.instagram}>@{memberData.instagram}</a>
              <br />
              <strong>Twitter:</strong>{" "}
              <a href={memberData.twitter}>@{memberData.twitter}</a>
              <br />
              <strong>TikTok:</strong>{" "}
              <a href={memberData.tiktok}>@{memberData.tiktok}</a>
            </Card.Body>

          </Card>

          <Card style={{ top: "20px" }} className="ngikutaplikasi">
            <Card.Body>
              <TwitterTimeline username={memberData.twitter} />

            </Card.Body>

          </Card>

          <Card style={{ top: "40px" }} className="ngikutaplikasi">
            <Card.Body>
              <TikTokEmbed username={memberData.tiktok} />

            </Card.Body>

          </Card>

          <Link to="/fanletter" style={{ display: "flex", alignItems: "center", justifyContent: "right", textDecoration: "none", marginBottom: "20px", marginTop: "50px" }}>
            <div id="button_p" className="ac_btn btn mb-5 mt-3" style={{ width: 300, display: "flex", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                <path d="M0 3v18h24V3H0zm22 2L12 12 2 5h20zM2 19V7l10 7 10-7v12H2z" />
              </svg>
              <span style={{ marginLeft: "50px" }}>Send Fan Letter</span>
            </div>
          </Link>
        </Col>
      </Row>
    </Container >
  );
};

export default MemberDetail;
