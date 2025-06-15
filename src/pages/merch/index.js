import React, { useState, useEffect } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig, dataabout } from "../../content_option";
import MemberOption from "./memberOption";
import FileInput from "./fileUpload";
import { GoogleSpreadsheet } from "google-spreadsheet";

export const Merchandise = () => {
  useEffect(() => {
    document.body.classList.add("merch-page");
    return () => {
      document.body.classList.remove("merch-page");
    };
  }, []);

  const [totalRandom, setTotalRandom] = useState(0);
  const [total, setTotal] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  useEffect(() => {
    addRandomNumberToTotal();
  }, [totalRandom]);

  const addRandomNumberToTotal = () => {
    const randomNum = generateRandomNumber();
    setRandomNumber(randomNum);
    setTotalRandom(randomNum);
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata({ ...formData, loading: true });

    const total_cheki = total;
    const total_pay = total * 30000;
    const mycode = `${formData.name.toUpperCase()}/${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}-AVJ/${total_pay}`;

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      social: formData.social,
      phone: formData.phone,
      to_name: contactConfig.YOUR_EMAIL,
      total_cheki: total_cheki,
      total_pay: total_pay,
      mycode: mycode,
    };

    try {
      // Kirim email menggunakan emailjs
      await emailjs.send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      );

      // Tambahkan data ke Google Sheets
      const doc = new GoogleSpreadsheet("117VcreCauL3NgB6wYAAi-6H8WZ0Fls7AOnfVVOeC8Fc");
      await doc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0]; // Index of the sheet to write to
      await sheet.addRow({
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Social: formData.social,
        Origin: formData.origin,
        Total: total,
        Total_Payment: ((total * 30000) + totalRandom).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
        My_Code: mycode,
      });

      setFormdata({
        ...formData,
        loading: false,
        alertmessage: "SUCCESS! Thank you for your message",
        variant: "success",
        show: true,
      });
    } catch (error) {
      console.error("Error:", error);
      setFormdata({
        ...formData,
        alertmessage: `Failed to send! ${error}`,
        variant: "danger",
        show: true,
      });
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
          <title>{meta.title} | Merchandise</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Pre-order Merchandise</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <h3 className="color_sec py-4">Order now, and have memories with your favorite members!!</h3>
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"
                }`}
              onClose={() => setFormdata({ ...formData, show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="12" className="mb-5">
            <p style={{ textAlign: "justify" }}>{dataabout.aboutme}</p>
          </Col>
          <Col lg="12" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <h3 style={{ marginBottom: 50 }}>Please fill in your data first</h3>
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Who Are You ?"
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--secondary-color)' }}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="What's Your Email ?"
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--secondary-color)' }}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="What's Your Phone Number ?"
                    value={formData.phone || ""}
                    type="text"
                    required
                    onChange={handleChange}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--secondary-color)' }}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="social"
                    name="social"
                    placeholder="What's Your Social Media ?"
                    type="text"
                    value={formData.social || ""}
                    required
                    onChange={handleChange}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--secondary-color)' }}
                  />
                </Col>
              </Row>
              <Col lg="12" className="form-group">
                <input
                  className="form-control rounded-0"
                  id="origin"
                  name="origin"
                  placeholder="Where Are You From?"
                  type="text"
                  value={formData.origin || ""}
                  required
                  onChange={handleChange}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--secondary-color)' }}
                />
              </Col>
              <Col lg="12" className="form-group">
                <MemberOption setTotal={setTotal} />
              </Col>
              <Col lg="12" className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h4>Your Unique Code ( {totalRandom} ) </h4>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h4>Total Order Quantity</h4>
                  <h3>Total: {total}</h3>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h4></h4>
                  <h4>{((total * 30000) + totalRandom).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h4>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h4> Detail Transfer<br />BCA : 1390904378 (Muhammad Ridwan Jamil)</h4>
                </div>
              </Col>
              <Col lg="12" className="form-group">
                <FileInput />
              </Col>
              <br />
              <Row className="mb-5">
                <Col lg="12" className="form-group mb-5">
                  <button className="btn ac_btn mb-5" type="submit" style={{ width: '100%' }}>
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

export default Merchandise;
