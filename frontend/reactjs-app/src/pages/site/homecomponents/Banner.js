
import { urlImageSlider } from '../../../config';
import Sliderervice from '../../../services/SliderService';
import React, { useState, useEffect } from 'react';

const Banner = () => {

  const [sliders, setSliders] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
      const fetchSliders = async () => {
          try {
              let result = await Sliderervice.getAll();
              const sortedSliders = result.filter(slider => slider.status !== 0 && slider.status !== 2);
              setSliders(sortedSliders);
          } catch (error) {
              console.error("Error fetching:", error);
          }
      };
      fetchSliders();
  }, [reload]);

  const renderBrands = () => {
    if (!sliders) {
        return <div>Loading sliders...</div>;
    }

    return sliders.map(slider => (
      <div className="slider-item" key={slider.id}>
      <img src={urlImageSlider + slider.image}  alt="women's latest fashion sale" className="banner-img" ></img>
      <div className="banner-content">
        <p className="banner-subtitle">Trending item</p>
        <h2 className="banner-title">Women's latest fashion sale</h2>
        <p className="banner-text">
          starting at $ <b>20</b>.00
        </p>
        <a href="#" className="banner-btn">Shop now</a>
      </div>
    </div>
    ));
};
    return (
      <div className="banner">
        <div className="container">
          <div className="slider-container has-scrollbar">
            {renderBrands()}
          </div>
        </div>
      </div>

    );
};

export default Banner;