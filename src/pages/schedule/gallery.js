import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Gallery extends React.Component {
    render() {
        // Ambil data dari props
        const { data } = this.props;

        // Periksa apakah data ada
        if (!data) {
            return <div>No data available</div>;
        }

        // Render galeri dengan data yang diberikan
        return (
            <div>
                <Carousel autoPlay interval={3000} transitionTime={5000} infiniteLoop>
                    {/* Loop melalui setiap artist di data */}
                    {Object.keys(data).map(artist => (
                        // Loop melalui setiap foto di artist
                        data[artist].map((photo, index) => (
                            <div key={`${artist}_${index}`}>
                                <img src={photo} alt={`Photo ${index + 1}`} />
                                {/* <p className="legend">{`Photo ${index + 1}`}</p> */}
                            </div>
                        ))
                    ))}
                </Carousel>
            </div>
        );
    }
}

export default Gallery;
