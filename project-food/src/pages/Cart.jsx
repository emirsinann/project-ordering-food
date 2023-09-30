import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "../api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../actions/cartAction";
import { fetchUserAddress } from "../actions/userActions";
import Home from "../assets/home.png";

const images = require.context("../components/product-images", true);
const imageList = images.keys().map((image) => images(image));

const Cart = () => {
  const dispatch = useDispatch();
  const storedUserJSON = localStorage.getItem("user"); //localstorage dan user bilgileri çekildi
  const userAddress = useSelector((state) => state.userReducer.address); //userAdress reduxtan çekildi
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const [orderNote, setOrderNote] = useState(""); // sipariş notu
  const [selectedOption, setSelectedOption] = useState("creditCard");
  const [selectedAddressId, setSelectedAddressId] = useState(null); // seçilen adresin idsi
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressData, setAddressData] = useState({
    name: "",
    description: "",
    city: "",
    district: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    // adresleri çekme fonksiyonu
    dispatch(fetchUserAddress(getUserId));
  }, []);

  const handleAddressChange = (item) => {
    setSelectedAddressId(item.addressId); // seçilen adresin idsi set edildi radio butonlarından alındı
    setSelectedAddress(item); // seçilen adres set edildi
  };

  // Retrieve stored user data from localStorage

  const getUserId = () => {
    //user idsi çekildi
    if (storedUserJSON) {
      // Parse the stored user data
      const storedUser = JSON.parse(storedUserJSON);

      // Access the user ID
      const id = storedUser.id;
      return id;
    } else {
      console.log("No user data found in localStorage");
    }
  };

  const handleDelete = (itemId) => {
    //sepetten ürün silme fonksiyonu
    dispatch(removeFromCart(itemId));
  };

  const handleIncrement = (item) => {
    // sepetteki ürüne +1 ekleme fonksiyonu
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    // sepetteki üründen -1 çıkarma fonksiyonu
    if (item.quantity > 1) {
      dispatch(decrementCartItemQuantity(item));
    }
  };

  const handleSendOrder = () => {
    //sipariş gönderme fonksiyonu
    const id = getUserId();
    if (!selectedAddressId) {
      alert("Lütfen bir adres seçin");
      return;
    }
    if (cartItems.length === 0) {
      alert("Sepetinizde ürün yok");
      return;
    } else {
      axios
        .post(
          "/order",
          {
            iscredit: handleCreditChange(selectedOption),
            userId: id,
            adreAddressId: selectedAddressId,
            cartItems: cartItems,
            totalPrice: calculateTotalPrice(),
            orderNote: orderNote,
          },
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch(clearCart());
          alert("Siparişiniz başarıyla gönderildi!");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
        });
    }
  };

  const calculateTotalPrice = () => {
    //toplam fiyat hesaplama fonksiyonu
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleInputChange = (event) => {
    //adres ekleme formundaki inputların değişimini takip eden fonksiyon
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    //adres ekleme formunun submit edilmesini takip eden fonksiyon
    event.preventDefault();

    // Assuming you will send the data to the backend here
    try {
      await axios
        .post(
          "/address",
          {
            name: addressData.name,
            description: addressData.description,
            province: addressData.city,
            district: addressData.district,
          },
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            dispatch(fetchUserAddress(getUserId()));
            console.log("Address created:", addressData);
            handleCloseModal();
          } else {
            console.error("Failed to create address");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAddress = (addressId) => {
    //adres silme fonksiyonu
    if (window.confirm("Are you sure you want to delete this address?")) {
      axios
        .delete("/address", {
          data: { id: addressId },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          // Update the user's address list after successful deletion
          dispatch(fetchUserAddress(getUserId()));
        })
        .catch((error) => {
          console.error("Error deleting address:", error);
        });
    }
  };

  const handleOptionChange = (event) => {
    //ödeme şeklini takip eden fonksiyon
    setSelectedOption(event.target.value);
  };

  const handleCreditChange = (selectedOption) => {
    //ödeme şeklini belirleyen fonksiyon
    if (selectedOption === "creditCard") {
      return true;
    }
    if (selectedOption === "cash") {
      return false;
    }
  };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div>
      <Header />
      <Container className="cart">
        <Row>
          <Col md={12} lg={8} className="basket-col">
            {cartItems ? (
              cartItems.map((item) => {
                const id = item.productID - 1;
                return (
                  <div key={item.productID}>
                    <Row className="item-info">
                      <Image
                        className="cart-image"
                        src={imageList[id]}
                        key={imageList[id]}
                        alt="burger"
                        style={{ width: "28%" }}
                        fluid
                      />
                      <Col xs={6} sm={8} md={4}>
                        <div>
                          <h3>
                            {" "}
                            <b>{item.name} </b>{" "}
                          </h3>
                          <div className="divider"></div>
                          <p>{item.explanation}</p>
                          <p>Fiyat: {item.price}₺</p>

                          <br />
                        </div>
                      </Col>

                      <Col xs={3} sm={2} md={2} className="inc-dec-img">
                        <Button
                          className="inc-dec-button"
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </Button>
                        <strong className="quantity-item">
                          {item.quantity}
                        </strong>
                        <Button
                          className="inc-dec-button2"
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </Button>{" "}
                      </Col>

                      <Col xs={3} sm={2} md={2} className="trash-img">
                        <Button
                          className="delete-item"
                          onClick={() => handleDelete(item.productID)}
                        >
                          Sil
                        </Button>
                      </Col>
                    </Row>
                  </div>
                );
              })
            ) : (
              <div>
                <h3>Sepetinizde Ürün Bulunmamaktadır.</h3>
              </div>
            )}

            <Row md={12} className="">
              <div className="divider"></div>
              <h2>Kayıtlı Adresler</h2>
              {userAddress &&
                userAddress.map((item) => (
                  <Col sm={6} md={4} lg={3} key={item.addressId}>
                      <div
                        className={`card mb-3-address address-card ${
                          selectedAddressId === item.addressId ? "selected" : ""
                        } `}
                        onClick={() => handleAddressChange(item)}
                      >
                        <div className="card">
                          <Image
                            className="card-address-card"
                            src={Home}
                            alt="Home"
                          />
                        </div>
                        <div className="divider"></div>
                        <div className="card-body">
                          <p className="card-text"><strong>{item.name}</strong></p>
                          <p className="card-text">{item.description}</p>
                          <p className="card-text">
                            <strong>{item.province} / {item.district}{" "}</strong>
                          </p>
                          <Button
                            className="delete-address"
                            onClick={() => handleDeleteAddress(item.addressId)}
                          >
                            Sil
                          </Button>
                        </div>
                      </div>
                  </Col>
                ))}
              <Col sm={6} md={4} lg={3}>
                <div className="card mb-3-address">
                  <div className="card-zero-address" onClick={handleShowModal}>
                    <strong>+</strong>
                    <p>
                      <strong>Adres Ekle</strong>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header
                closeButton
                style={{ backgroundColor: "red", color: "white" }}
              >
                <Modal.Title>Adres Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Adres Başlığı</Form.Label>
                    <Form.Control
                      className="address-input"
                      type="text"
                      id="name"
                      name="name"
                      value={addressData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group style={{ paddingTop: "5px", marginTop: "5px" }}>
                    <Form.Label>Adres</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="address-input"
                      id="description"
                      name="description"
                      value={addressData.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group
                        style={{ paddingTop: "5px", marginTop: "5px" }}
                      >
                        <Form.Label>İl</Form.Label>
                        <Form.Control
                          className="address-input"
                          id="city"
                          name="city"
                          value={addressData.city}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        style={{ paddingTop: "5px", marginTop: "5px" }}
                      >
                        <Form.Label>İlçe</Form.Label>
                        <Form.Control
                          className="address-input"
                          type="text"
                          id="district"
                          name="district"
                          value={addressData.district}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="danger"
                    type="submit"
                    style={{ paddingTop: "5px", marginTop: "5px" }}
                  >
                    Kaydet
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            {/* Modal */}
            {/* <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton style={{ backgroundColor: 'red', color: 'white' }}>
                            <Modal.Title>Adres Ekle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group controlId="addressTitle" >
                                    <Form.Label>Adres Başlığı</Form.Label>
                                    <Form.Control className='address-input' type="text" placeholder="Adres Başlığı" />
                                </Form.Group>
                                <Form.Group controlId="address" style={{ paddingTop: '5px', marginTop: '5px' }} >
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control className='address-input' type="text" placeholder="Adres" />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="city" style={{ paddingTop: '5px', marginTop: '5px' }}>
                                            <Form.Label>İl</Form.Label>
                                            <Form.Control className='address-input' type="text" placeholder="İl" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="district" style={{ paddingTop: '5px', marginTop: '5px' }}>
                                            <Form.Label>İlçe</Form.Label>
                                            <Form.Control className='address-input' type="text" placeholder="İlçe" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="danger" type="submit" style={{ paddingTop: '5px', marginTop: '5px' }}>
                                    Adresi Kaydet
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal> */}
            <div className="divider"></div>
            <Row>
              <Col className="col-md-4">
                <div className="card border mb-3">
                  <div className="card-odeme-card">
                    <h5 className="card-title">Ödeme yöntemi</h5>
                  </div>
                  <div className="divider"></div>
                  <div className="card-body-odeme">
                    <div className="form-check">
                      <label htmlFor="creditCard" className="radio-input">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="creditCard"
                          checked={selectedOption === "creditCard"}
                          onChange={handleOptionChange}
                        />
                        Kredi Kartı
                      </label>
                      <label htmlFor="cash" className="radio-input">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="cash"
                          checked={selectedOption === "cash"}
                          onChange={handleOptionChange}
                        />
                        Nakit
                      </label>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="col-md-8-input-col">
                <Form.Control
                  as="textarea"
                  value={orderNote}
                  placeholder="Sipariş notu ekleyin."
                  onChange={(e) => setOrderNote(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col md={12} lg={4} className="siparis-col">
            <div className="container-md-siparis">
              <Row>
              <h5>
                <b> Sipariş Özeti</b>
              <div className="divider"></div>
              </h5>
                  <h5>
                    {" "}
                    <b> Seçilen Adres </b>
                  </h5>
                  {selectedAddressId !== null ? ( //Seçilen adres varsa
                    <div className="selected-address">
                      <p>{selectedAddress.name}</p>
                      <p>{selectedAddress.description}</p>
                      <p>
                        {selectedAddress.province} / {selectedAddress.district}
                      </p>
                      <p></p>
                    </div>
                  ) : (
                    <div>
                      <p>Bir adres seçilmedi.</p>
                    </div>
                  )}
              </Row>
              <Row className="siparis" md={12}>
                <Col md={12} className="total-price">
                  <h5>
                    <b> Toplam Tutar</b>
                  </h5>
                  <p>{calculateTotalPrice()}₺</p>
                </Col>
                <Col className="handle-button" md={12}>
                  <button type="button" className="btn btn-warning cart-button" onClick={()=>navigate('/')}>
                    <strong>Alışverişe Dön</strong>
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning cart-button"
                    onClick={handleSendOrder}
                  >
                    <strong>Sepeti Onayla</strong>
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <br />
      </Container>

      {/* <div className="cart">
      <Container fluid>
          <Row>
            <Col>
              <h2>Sepetim</h2>
              {cartItems.map((item) => (
                <div key={item.productID}>
                  <p>{item.name}</p>
                  <p>Adet: {item.quantity}</p>
                  <p>Adet Fiyatı: {item.price}₺</p>
                  <p>Toplam Fiyat: {item.price * item.quantity}₺</p>
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <button onClick={() => handleDelete(item.productID)}>
                    Sil
                  </button>
                  <hr />
                </div>
              ))}
              <p>Sepet Tutarı: {calculateTotalPrice()}₺</p>
              <h6>Ödeme Şekli:</h6>
              <label>
                <input
                  type="radio"
                  value="creditCard"
                  checked={selectedOption === "creditCard"}
                  onChange={handleOptionChange}
                />
                Kredi Kartı
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={selectedOption === "cash"}
                  onChange={handleOptionChange}
                />
                Nakit
              </label>
              <button onClick={handleSendOrder} disabled={sending}>
                Send order
              </button>
            </Col>
            <Col>
              <h2>User Profile</h2>
              {userAddress &&
                userAddress.map((user) => (
                  <div key={user.addressId}>
                    <p>Adres İsmi : {user.name}</p>
                    <p>Adres Açıklaması : {user.description}</p>
                    <p>İl : {user.province}</p>
                    <p>İlçe : {user.district}</p>
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={user.addressId}
                      onChange={handleAddressChange}
                    />
                    <button onClick={() => handleDeleteAddress(user.addressId)}>
                      Delete Address
                    </button>
                  </div> */}
      {/* <hr />
              < onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Address Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={addressData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="description">Address Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={addressData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={addressData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="district">District:</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={addressData.district}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Create Address</button>
              </form>
            </Col>
          </Row>
        </Container>
      </div> */}
    </div>
  );
};

export default Cart;
