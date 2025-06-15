import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig, dataabout } from "../../content_option";
import MemberOption from "./memberOption";

export const Fanletter = () => {
  useEffect(() => {
    document.body.classList.add("member-page");
    return () => {
      document.body.classList.remove("member-page");
    };
  }, []);

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    social: "",
    origin: "",
    message: "",
    selectedMember: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleChangeMember = (selectedMember) => {
    setFormdata({ ...formData, selectedMember });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata((prev) => ({ ...prev, loading: true }));
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const payload = {
      Nama: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      Social: formData.social,
      From: formData.origin,
      Member: formData.selectedMember,
      Message: formData.message,
      Send: formattedDate,
      Status: "Waiting Approval"
    };

    try {

      const targetUrl = "https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=postFanLetter";

      const response = await fetch(targetUrl, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormdata({
          name: "",
          email: "",
          phone: "",
          social: "",
          origin: "",
          message: "",
          selectedMember: "",
          loading: false,
          show: true,
          alertmessage: "Fanletter berhasil dikirim! Tunggu respon dari member ya!",
          variant: "success"
        });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal mengirim fanletter.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setFormdata((prev) => ({
        ...prev,
        loading: false,
        show: true,
        alertmessage: `Gagal mengirim fanletter! ${error.message}`,
        variant: "danger"
      }));
      document.getElementsByClassName("co_alert")[0].scrollIntoView();
    }
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container className="ngikutin">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Fanletter</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Fan Letter</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <h3 className="color_sec py-4">
              Come on, send a letter to your favorite member and show them something!
            </h3>
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"}`}
              onClose={() => setFormdata((prev) => ({ ...prev, show: false }))}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            {dataabout.fanlet.split('\n').map((line, index) => (
              <p key={index} style={{ textAlign: 'justify' }}>{line}</p>
            ))}
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Who Are You ?"
                    value={formData.name}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    name="email"
                    placeholder="What's Your Email ?"
                    type="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    name="phone"
                    placeholder="What's Your Phone Number ?"
                    value={formData.phone}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    name="social"
                    placeholder="What's Your Social Media ?"
                    type="text"
                    value={formData.social}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Col lg="12" className="form-group">
                <input
                  className="form-control rounded-0"
                  name="origin"
                  placeholder="Where Are You From?"
                  type="text"
                  value={formData.origin}
                  required
                  onChange={handleChange}
                />
              </Col>
              <Col lg="12" className="form-group">
                <MemberOption handleChangeMember={handleChangeMember} />
              </Col>
              <textarea
                className="form-control rounded-0"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit" style={{ width: "100%" }}>
                    {formData.loading ? "Sending..." : "Send"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
}; 