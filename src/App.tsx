/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import IslamicChildrensBooks from './pages/IslamicChildrensBooks';
import QuranStories from './pages/QuranStories';
import ProphetStories from './pages/ProphetStories';
import RamadanBooks from './pages/RamadanBooks';
import BedtimeStories from './pages/BedtimeStories';
import Academy from './pages/Academy';
import BilingualBooks from './pages/BilingualBooks';
import Blog from './pages/Blog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './i18n';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="islamic-childrens-books" element={<IslamicChildrensBooks />} />
              <Route path="quran-stories-for-kids" element={<QuranStories />} />
              <Route path="stories-of-the-prophets-for-kids" element={<ProphetStories />} />
              <Route path="ramadan-books-for-kids" element={<RamadanBooks />} />
              <Route path="islamic-bedtime-stories" element={<BedtimeStories />} />
              <Route path="academy" element={<Academy />} />
              <Route path="online-islamic-classes-for-kids" element={<Academy />} />
              <Route path="bilingual-islamic-books-for-kids" element={<BilingualBooks />} />
              <Route path="blog" element={<Blog />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
