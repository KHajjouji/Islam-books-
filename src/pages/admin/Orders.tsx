import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Eye, Edit2, ShoppingCart, User, Calendar, Package, CheckCircle2, Clock, AlertCircle, Trash2, Search, Filter } from 'lucide-react';

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
  };
  createdAt: any;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ords: Order[] = [];
      querySnapshot.forEach((doc) => {
        ords.push({ id: doc.id, ...doc.data() } as Order);
      });
      // Sort by newest first
      ords.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setOrders(ords);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setStatusUpdating(orderId);
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status.");
    } finally {
      setStatusUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">Order History</h1>
          <p className="text-lg text-primary/60 font-medium max-w-xl">Monitor and manage customer orders, fulfillment status, and logistics.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white h-32 rounded-[2.5rem] border border-outline-variant/10 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/10">
                  <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Order Details</th>
                  <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Customer</th>
                  <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Date</th>
                  <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Total</th>
                  <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Status</th>
                  <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-24 text-center">
                      <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
                        <Eye className="h-8 w-8 text-primary/20" />
                      </div>
                      <h3 className="text-xl font-headline font-black text-primary mb-2 tracking-tight">No orders yet</h3>
                      <p className="text-primary/40 font-medium">When customers start buying, their orders will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-xs">
                            #{order.id.slice(-4).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-black text-primary tracking-tight">Order {order.id.slice(0, 8)}</div>
                            <div className="text-xs text-primary/40 font-bold uppercase tracking-widest">{order.items.length} items</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="font-bold text-primary">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                        <div className="text-xs text-primary/40 font-medium">{order.shippingAddress.city}, {order.shippingAddress.zip}</div>
                      </td>
                      <td className="p-8">
                        <div className="font-bold text-primary/80">
                          {order.createdAt ? new Date(order.createdAt.toMillis()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </div>
                        <div className="text-[10px] text-primary/30 font-black uppercase tracking-widest">
                          {order.createdAt ? new Date(order.createdAt.toMillis()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </td>
                      <td className="p-8 font-black text-primary text-lg">${order.total.toFixed(2)}</td>
                      <td className="p-8">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          disabled={statusUpdating === order.id}
                          className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none outline-none cursor-pointer transition-all shadow-sm ${getStatusColor(order.status)} ${statusUpdating === order.id ? 'opacity-50' : 'hover:scale-105'}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-8 text-right">
                        <button className="p-4 text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-2xl transition-all shadow-sm">
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
