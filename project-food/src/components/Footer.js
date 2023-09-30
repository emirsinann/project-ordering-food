import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footer-box'>
      <Container fluid>
        <Row xs={1} sm={2} className='footer-row'>
            <Col className='left-col' md={4}>
              <div className="social-wrapper">
                <h2><strong>BURGER BRAND</strong></h2>
                <h6>0 (242) 999 99 99</h6>
                <h6>Pınarbaşı mah. Üniversite içi Teknokent Arge 2</h6>
                <h6>Antalya / Türkiye</h6>
              </div>
            </Col>
            <Col className='right-col' md={4}>
              <div className="social-wrapper">
                <Link className='footer-links' to={"https://www.instagram.com"}>
                <h6><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff",}} /> @burgerbrand99</h6>
                </Link>
                <Link className='footer-links' to={"https://www.facebook.com"}>
                <h6><FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff",}} /> burgerbrand99</h6>
                </Link>
                <Link className='footer-links' to={"/"}>
                <h6><FontAwesomeIcon icon={faGlobe} style={{color: "#ffffff",}} /> burgerbrand99@food.com</h6>
                </Link>
                
              </div>
            </Col>
          <h6 className='copyright'>© 2023 Tüm hakları saklıdır.</h6>
        </Row>
      </Container>
    </div>
  )
}
