import React, { useState, useEffect } from 'react';
import { urlImageSlider } from '../../../config';
import SliderService from '../../../services/SliderService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons from react-icons library
import '../../../assets/styles/banner.css'; 

const Banner = () => {
    const [sliders, setSliders] = useState([]);
    const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
    const [showNavigation, setShowNavigation] = useState(false); // State to toggle navigation visibility

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const result = await SliderService.getAll();
                const filteredSliders = result.filter(slider => slider.status !== 0 && slider.status !== 2);
                setSliders(filteredSliders);
            } catch (error) {
                console.error("Error fetching sliders:", error);
            }
        };
        fetchSliders();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSliderIndex(prevIndex =>
                prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [sliders]);

    const goToPreviousSlide = () => {
        setCurrentSliderIndex(prevIndex =>
            prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentSliderIndex(prevIndex =>
            prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
        );
    };

    const renderSlider = () => {
        if (!sliders || sliders.length === 0) {
            return <div>Loading sliders...</div>;
        }

        const currentSlider = sliders[currentSliderIndex];

        return (
            <div className="slider-item" key={currentSlider.id}>
                <img src={urlImageSlider + currentSlider.image} alt="Women's latest fashion sale" className="banner-img" />
                
                {showNavigation && (
                    <div className="slider-navigation">
                        <button className="prev-slide-btn btn btn-outline-light" onClick={goToPreviousSlide}>
                            <FaChevronLeft />
                        </button>
                        <button className="next-slide-btn btn btn-outline-light" onClick={goToNextSlide}>
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="banner" onMouseEnter={() => setShowNavigation(true)} onMouseLeave={() => setShowNavigation(false)}>
            <div className="container">
                <div className="slider-container has-scrollbar">
                    {renderSlider()}
                </div>
            </div>
        </div>
    );
};

export default Banner;
