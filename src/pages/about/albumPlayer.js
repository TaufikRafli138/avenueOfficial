import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import './customPlayer.css';
import './style.css'; // File CSS untuk styling

const SpotifyPlayer = ({ data }) => {
    return (
        <Col>
            <Col className="d-flex align-items-center">
                <div className="player-container">
                    <Row className="mb-4">
                        <Col xs={4}>
                            <img src={data.interHarmon.albumCover} alt="Album Cover" className="album-cover" />
                        </Col>
                        <Col xs={8}>
                            <h1 className="display-4 mb-2">{data.interHarmon.title}</h1>
                            <p className="artist">{data.interHarmon.artist}</p>
                            <hr className="t_border my-2 text-left" />
                            <p className="album-info" style={{ textAlign: 'justify' }}>{data.interHarmon.albumInfo}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AudioPlayer
                                src={data.interHarmon.audioSrc}
                                onPlay={e => console.log("onPlay")}
                                className="media_player_ngikut"
                            // other props here
                            />
                        </Col>
                    </Row>
                </div>
            </Col>

            <Col className="d-flex align-items-center">
                <div className="player-container">
                    <Row className="mb-4">
                        <Col xs={4}>
                            <img src={data.tertuju.albumCover} alt="Album Cover" className="album-cover" />
                        </Col>
                        <Col xs={8}>
                            <h1 className="display-4 mb-2">{data.tertuju.title}</h1>
                            <p className="artist">{data.tertuju.artist}</p>
                            <hr className="t_border my-2 text-left" />
                            <p className="album-info" style={{ textAlign: 'justify' }}>{data.tertuju.albumInfo}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AudioPlayer
                                // autoPlay
                                src={data.tertuju.audioSrc}
                                onPlay={e => console.log("onPlay")}
                            // other props here
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Col>
    );
};

export default SpotifyPlayer;
