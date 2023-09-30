import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../actions/orderActions"; // Import your action
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.orderReducer.orders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const paymentMethod = (iscredit) => {
    if (iscredit) {
      return "Kredi Kartı";
    } else {
      return "Nakit";
    }
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
      <button
        className="details-button"
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <Header />
      <div className="orders">
        <h2>Siparişlerim</h2>
        <div className="divider"></div>
        <Container className="order-container" fluid>
          <Accordion className="accordion-wrapper" flush>
            {userOrders &&
              userOrders.map((order) => {
                return (
                  <div key={order.orderID}>
                    <Row className="order-row" key={order.orderID}>
                      <Col>
                        <h6 className="order-id">
                          Sipariş ID: {order.orderID}
                        </h6>
                        <div className="divider"></div>
                        <p className="order-date">
                          <strong>Sipariş Tarihi:</strong>{" "}
                          {order.siparisTarihi.toString().slice(0, 10) +
                            " " +
                            order.siparisTarihi.toString().slice(11, 19)}
                        </p>
                      </Col>
                      <Col className="mid-column">
                        {order.adre ? (
                          <>
                            <p className="address-header">
                              <strong>{order.adre.name}</strong>
                            </p>
                            <p className="address-desc">
                              {order.adre.description}
                            </p>
                            <p className="address-province">
                              {order.adre.province} / {order.adre.district}
                            </p>
                          </>
                        ) : (
                          <p className="address-desc">Adres Silindi.</p>
                        )}
                      </Col>
                      <Col className="right-column">
                        <p className="payment">
                          <strong>Ödeme Yöntemi:</strong>{" "}
                          {paymentMethod(order.iscredit)}
                        </p>
                        <p className="order-total">
                          <strong>Toplam:</strong> {order.totalPrice}₺
                        </p>
                        <CustomToggle eventKey={order.orderID}>
                          Detaylar
                        </CustomToggle>
                      </Col>
                    </Row>
                    <Accordion.Collapse eventKey={order.orderID}>
                      <div className="products-window">
                        <Row className="product-header">
                          <Col>
                            <p>
                              <strong>Ürün</strong>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              <strong>Adet</strong>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              <strong>Adet Fiyatı</strong>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              <strong>Fiyat</strong>
                            </p>
                          </Col>
                        </Row>
                        {order.order_products.map((product) => {
                          return (
                            <Row
                              className="product-accordion"
                              key={product.productProductID}
                            >
                              <Col>
                                <p>{product.product.name}</p>
                              </Col>
                              <Col>
                                <p>{product.quantity} ad.</p>
                              </Col>
                              <Col>
                                <p>{product.product.price}₺</p>
                              </Col>
                              <Col>
                                <p>
                                  {product.product.price * product.quantity}₺
                                </p>
                              </Col>
                              <div className="divider"></div>
                            </Row>
                          );
                        })}
                        <Row className="product-accordion">
                          <Col>
                            <p>Sipariş Notu : {order.orderNote}</p>
                          </Col>
                        </Row>
                      </div>
                    </Accordion.Collapse>
                  </div>
                );
              })}
          </Accordion>
        </Container>
      </div>
    </>
  );
};

export default OrdersPage;
