import React, { useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";
import {
  documentationPhotos
} from "../../albumAvenue";
import SpotifyPlayer from './albumPlayer';
import Gallery from './gallery';
export const GalleryPhotos = () => {
  useEffect(() => {
    document.body.classList.add("gallery-page"); // Tambahkan kelas "member-page" ke elemen body saat komponen dimuat
    return () => {
      document.body.classList.remove("gallery-page"); // Hapus kelas saat komponen dibongkar
    };
  }, []);
  return (
    <HelmetProvider>
      <Container className="About-header ngikutin">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row >
          <Col className="d-flex align-items-center">
            <div className="gallery-container">
              <h1 className="display-4 mb-4 mt-4">Avenue J Gallery</h1>
              <hr className="t_border my-4 ml-0 text-left" />
              <Gallery data={documentationPhotos} />
            </div>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col className="d-flex align-items-center">
          </Col>
        </Row>
      </Container>
    </HelmetProvider >
  );
};
