import { 
  Package, 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  Filter,
  Download,
  ExternalLink
} from 'lucide-react';

export default function OrderHistory() {
  const orders = [
    { 
      id: 'ORD-2026-8842', 
      date: 'March 24, 2026', 
      total: '$45.98', 
      status: 'Delivered', 
      items: ['The Story of Prophet Nuh', 'Quran Stories for Kids'],
      tracking: 'TRK99284210',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop'
    },
    { 
      id: 'ORD-2026-7715', 
      date: 'February 12, 2026', 
      total: '$29.99', 
      status: 'Delivered', 
      items: ['Ramadan Explorer Kit'],
      tracking: 'TRK99115201',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=100&h=100&fit=crop'
    },
    { 
      id: 'ORD-2026-6602', 
      date: 'January 05, 2026', 
      total: '$12.50', 
      status: 'Delivered', 
      items: ['Islamic Bedtime Stories'],
      tracking: 'TRK99002155',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-2">Order History</h1>
          <p className="text-on-surface-variant font-medium">Track your physical book orders and view past purchases.</p>
        </div>
        <div className="flex gap-3 bg-surface-low p-1.5 rounded-full border border-outline-variant/20">
          <button className="px-6 py-2.5 bg-accent text-secondary rounded-full font-bold text-xs shadow-sm">All Orders</button>
          <button className="px-6 py-2.5 text-on-surface-variant hover:text-primary rounded-full font-bold text-xs transition-colors">In Progress</button>
          <button className="px-6 py-2.5 text-on-surface-variant hover:text-primary rounded-full font-bold text-xs transition-colors">Completed</button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 bg-surface border border-outline-variant/20 px-6 py-4 rounded-3xl shadow-sm focus-within:ring-2 ring-primary/20 transition-all">
          <Search className="h-5 w-5 text-primary" />
          <input 
            type="text" 
            placeholder="Search by order ID or product name..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-surface border border-outline-variant/20 rounded-3xl font-bold text-sm text-primary hover:bg-surface-low transition-all shadow-sm">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-surface border border-outline-variant/20 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Order Info */}
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm">
                  <img src={order.image} alt="Order Item" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-headline font-extrabold text-primary">{order.id}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3" />
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-on-surface">{order.items.join(', ')}</p>
                  <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant/60">
                    <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> {order.date}</span>
                    <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> {order.tracking}</span>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-end gap-4 min-w-[200px]">
                <div className="text-right">
                  <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Order Total</p>
                  <p className="text-2xl font-headline font-extrabold text-primary">{order.total}</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-6 py-3 bg-surface-low text-primary rounded-full font-bold text-xs border border-outline-variant/20 hover:bg-outline-variant/10 transition-all flex items-center justify-center gap-2">
                    <Download className="h-3.5 w-3.5" />
                    <span>Invoice</span>
                  </button>
                  <button className="flex-1 sm:flex-none px-6 py-3 bg-primary text-white rounded-full font-bold text-xs shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    <span>Track Order</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expandable Details Placeholder */}
            <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">View Details</button>
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Buy Again</button>
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Get Help</button>
              </div>
              <ChevronRight className="h-5 w-5 text-outline-variant group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Load More */}
      <div className="text-center py-12">
        <button className="px-10 py-4 bg-surface-low text-primary rounded-full font-bold text-sm border border-outline-variant/20 hover:bg-outline-variant/10 transition-all">
          Load Older Orders
        </button>
      </div>
    </div>
  );
}
