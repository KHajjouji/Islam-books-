import { 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function SubscriptionManagement() {
  const currentPlan = {
    name: 'Family Premium',
    price: '$19.99',
    period: 'month',
    status: 'Active',
    nextBilling: 'May 15, 2026',
    features: [
      'Unlimited access to all books',
      'Full Academy features',
      'Up to 5 family profiles',
      'Offline reading mode',
      'Parental controls & analytics',
      'Exclusive monthly resources'
    ]
  };

  const otherPlans = [
    { name: 'Basic', price: '$9.99', period: 'month', features: ['Limited book access', 'Basic Academy', '1 profile'] },
    { name: 'Annual Family', price: '$199.99', period: 'year', features: ['All Premium features', '2 months free', 'Priority support'], popular: true }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-2">Subscription Management</h1>
        <p className="text-on-surface-variant font-medium">Manage your family's access to the Noor & Nurture ecosystem.</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <ShieldCheck className="h-48 w-48" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">{currentPlan.status} Plan</span>
            </div>
            <h2 className="text-5xl font-headline font-extrabold tracking-tight">{currentPlan.name}</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{currentPlan.price}</span>
              <span className="text-lg opacity-60 font-medium">/ {currentPlan.period}</span>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <button className="px-8 py-4 bg-accent text-secondary rounded-full font-bold text-sm shadow-xl shadow-black/10 hover:scale-105 transition-all">
                Change Plan
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-sm border border-white/20 hover:bg-white/20 transition-all">
                Cancel Subscription
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>Included in your plan</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentPlan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium opacity-90">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Billing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-outline-variant/20 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-extrabold text-primary">Payment Method</h3>
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Visa ending in 4242</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 bg-surface-low rounded-2xl border border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-secondary rounded-md flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
              <span className="text-sm font-bold text-on-surface">Expires 08/2028</span>
            </div>
            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Update</button>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant/20 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-surface-low flex items-center justify-center text-primary">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-extrabold text-primary">Next Billing Date</h3>
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Automatic Renewal</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 bg-surface-low rounded-2xl border border-outline-variant/10">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-on-surface">{currentPlan.nextBilling}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant/60">
              <AlertCircle className="h-4 w-4" />
              <span>Amount: {currentPlan.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="space-y-6">
        <h3 className="text-2xl font-headline font-extrabold text-primary">Explore Other Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherPlans.map((plan) => (
            <div key={plan.name} className={`bg-surface border rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden flex flex-col justify-between ${plan.popular ? 'border-primary ring-1 ring-primary' : 'border-outline-variant/20'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest">Most Popular</div>
              )}
              <div className="space-y-4">
                <h4 className="text-2xl font-headline font-extrabold text-primary">{plan.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-60 font-medium">/ {plan.period}</span>
                </div>
                <ul className="space-y-3 pt-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                      <CheckCircle2 className="h-4 w-4 text-primary opacity-40" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`mt-8 w-full py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/10 hover:scale-[1.02]' : 'bg-surface-low text-primary border border-outline-variant/20 hover:bg-outline-variant/10'}`}>
                <span>Switch to {plan.name}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
