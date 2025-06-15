import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig, dataabout } from "../../content_option";

export const ContactUs = () => {
  useEffect(() => {
    document.body.classList.add("contact-page");
    return () => {
      document.body.classList.remove("contact-page");
    };
  }, []);

  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    company: "",
    instagram: "",
    notelp: "",
    locationWork: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata((prev) => ({ ...prev, loading: true }));

    // Membuat timestamp format YYYY-MM-DD HH:mm:ss
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const payload = {
      Name: formData.name,
      Company: formData.company + " (" + formData.locationWork + ")",
      Instagram: formData.instagram,
      Notelp: formData.notelp,
      Email: formData.email,
      Message: formData.message,
      Send: formattedDate,
      Status: "Waiting Approval",
    };

    try {
      const targetUrl = "https://script.google.com/macros/s/AKfycbx_bUCrNKsOtExxKBBE4vHOlckKm_NGFQ7NQ3StArU-c5pLjIO4oTAH6Ldw71eb6ZWM2w/exec?jenis_trx=postMailReceipt";

      const response = await fetch(targetUrl, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setFormdata({
          email: "",
          name: "",
          company: "",
          instagram: "",
          notelp: "",
          locationWork: "",
          message: "",
          loading: false,
          alertmessage: "Berhasil mengirim pesan ke Management Avenue!",
          variant: "success",
          show: true,
        });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Terjadi kesalahan saat mengirim.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setFormdata((prev) => ({
        ...prev,
        loading: false,
        show: true,
        alertmessage: `Gagal mengirim! ${error.message}`,
        variant: "danger",
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
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
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
            <h3 className="color_sec py-4">Let's Get Acquainted, and Collaborate Together</h3>
            {dataabout.aboutme.split('\n').map((line, index) => (
              <p key={index} style={{ textAlign: 'justify' }}>{line}</p>
            ))}

          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Boleh tau Nama Kakak ?"
                    value={formData.name}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Kakak Ada Email?"
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
                    id="company"
                    name="company"
                    placeholder="Kakak Dari Komunitas/PT apa ? "
                    type="text"
                    value={formData.company}
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="locationWork"
                    name="locationWork"
                    placeholder="Kakak Dari Mana ?"
                    type="text"
                    value={formData.locationWork}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="instagram"
                    name="instagram"
                    placeholder="Kakak Ada Instagram ?"
                    value={formData.instagram}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="notelp"
                    name="notelp"
                    placeholder="Kakak Ada No Telp ?"
                    type="text"
                    value={formData.notelp}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Boleh Nih Kakak Tulis Pesan Kakak Buat Member Pilihan Kakak"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit" style={{ width: '100%', height: '150%' }}>
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
