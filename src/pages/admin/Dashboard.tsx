import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsSnap, ordersSnap, usersSnap] = await Promise.all([
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'orders')),
          getDocs(collection(db, 'users'))
        ]);

        let totalRevenue = 0;
        ordersSnap.forEach(doc => {
          totalRevenue += doc.data().total || 0;
        });

        setStats({
          products: productsSnap.size,
          orders: ordersSnap.size,
          users: usersSnap.size,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-noor-green', bg: 'bg-noor-light-green' },
    { name: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Total Products', value: stats.products, icon: Package, color: 'text-noor-orange', bg: 'bg-orange-50' },
    { name: 'Total Users', value: stats.users, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-noor-dark mb-8">Dashboard</h1>
      
      {loading ? (
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 h-32"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex items-center">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} mr-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-noor-dark/60">{stat.name}</p>
                <p className="text-2xl font-bold text-noor-dark">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
        <h2 className="text-xl font-bold text-noor-dark mb-4">Welcome to NoorKids Admin</h2>
        <p className="text-noor-dark/70">
          Use the sidebar to manage your products and view customer orders. 
          This dashboard provides a quick overview of your store's performance.
        </p>
      </div>
    </div>
  );
}
