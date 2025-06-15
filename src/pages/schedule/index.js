import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Example from './calendarAku';
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
  albumAvenue, photofc
} from "../../albumAvenue";
import SpotifyPlayer from './albumPlayer';
import Gallery from './gallery';
export const Schedule = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Schedule | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Schedule</h1>
            <hr className="t_border my-4 ml-0 text-left" />

          </Col>
        </Row>
        <Row className="sec_sp_onAb">
          <Example />
        </Row>

      </Container>
    </HelmetProvider >
  );
};
