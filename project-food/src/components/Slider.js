import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import slider1 from '../assets/bugeritem1.jpg';

export default function Slider() {
  return (
    <div className="slider">
      <Carousel>
        <Carousel.Item>
          <Image className="carousel-img" src={slider1}  />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="carousel-img" src={slider1}  />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="carousel-img" src={slider1}  />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
