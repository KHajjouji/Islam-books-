/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import IslamicChildrensBooks from './pages/IslamicChildrensBooks';
import QuranStories from './pages/QuranStories';
import ProphetStories from './pages/ProphetStories';
import RamadanBooks from './pages/RamadanBooks';
import BedtimeStories from './pages/BedtimeStories';
import Academy from './pages/Academy';
import BilingualBooks from './pages/BilingualBooks';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DynamicPage from './pages/DynamicPage';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import SubscriptionManagement from './pages/dashboard/SubscriptionManagement';
import OrderHistory from './pages/dashboard/OrderHistory';
import FamilyProfile from './pages/dashboard/FamilyProfile';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminPacks from './pages/admin/Packs';
import AdminCampaigns from './pages/admin/Campaigns';
import AdminSubscriptions from './pages/admin/Subscriptions';
import AdminBlog from './pages/admin/Blog';
import AdminPages from './pages/admin/Pages';
import './i18n';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Main Site Routes */}
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
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="pages/:slug" element={<DynamicPage />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
              
              {/* Parent Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<ParentDashboard />} />
                <Route path="subscription" element={<SubscriptionManagement />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="profile" element={<FamilyProfile />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="packs" element={<AdminPacks />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="campaigns" element={<AdminCampaigns />} />
                <Route path="subscriptions" element={<AdminSubscriptions />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="pages" element={<AdminPages />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
