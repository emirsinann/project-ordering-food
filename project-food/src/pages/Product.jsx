import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import ProductList from '../components/ProductList'

export default function Product() {
  return (
    <div>
        <Header/>
        <Slider/>
        <ProductList/>
        <Footer/>
    </div>
  )
}
