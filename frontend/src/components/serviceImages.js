import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceImages = ({ serviceId }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/service_images/${serviceId}`);
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [serviceId]);

    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Service Image ${index + 1}`} />
            ))}
        </div>
    );
};

export default ServiceImages;
