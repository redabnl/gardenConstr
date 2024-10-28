import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceCarousel = ({ galleryPath }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch the images from the folder
        const fetchImages = async () => {
            try {
                const response = await axios.get(`/api/service_images${galleryPath}`);
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [galleryPath]);

    return (
        <div className="carousel">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Service image ${index + 1}`} />
            ))}
        </div>
    );
};



export default ServiceCarousel;
