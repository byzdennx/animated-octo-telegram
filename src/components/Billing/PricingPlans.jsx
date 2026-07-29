import React, { useState } from 'react';
import { Check, Sparkles, Crown, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PricingPlans = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Gratis',
      icon: Star,
      price: { monthly: 0, yearly: 0 },
      features: [
        '100 pesan per bulan',
        'Respons dasar AI',
        'Riwayat chat 7 hari',
        '1 session chat',
        'Support email'
      ],
      color: 'gray',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Crown,
      price: { monthly: 99000, yearly: 990000 },
      features: [
        'Pesan tidak terbatas',
        'Respons AI premium',
        'Riwayat chat unlimited',
        '5 session chat parallel',
        'Prioritas support',
        'Export chat',
        'Custom prompt'
      ],
      color: 'blue',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Sparkles,
      price: { monthly: 299000, yearly: 2990000 },
      features: [
        'Semua fitur Pro',
        'Tim unlimited',
        'Admin dashboard',
        'Custom AI training',
        'SLA guarantee',
        'Dedicated support',
        'API access'
      ],
      color: 'purple',
      popular: false
    }
  ];

  const handleSubscribe = (planId) => {
    if (planId === 'free') {
      toast.success('Anda sudah menggunakan paket gratis');
      return;
    }
    toast.success(`Berlangganan paket ${planId} - Demo`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/chat')}
              className="p-2 hover:bg-gray-700/30 rounded-xl transition text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">Paket Langganan</h1>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition ${
                billingCycle === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition ${
                billingCycle === 'yearly'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Tahunan <span className="text-xs text-green-400">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
            const priceLabel = billingCycle === 'monthly' ? '/bulan' : '/tahun';

            return (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl border p-6 transition hover:scale-105 ${
                  isPopular
                    ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium px-4 py-1 rounded-full">
                    Terpopuler
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 mx-auto rounded-2xl bg-${plan.color}-500/20 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${plan.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">
                      {price === 0 ? 'Gratis' : `Rp ${price.toLocaleString()}`}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-400 text-sm ml-1">{priceLabel}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 rounded-xl transition font-medium ${
                    isPopular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : plan.id === 'free'
                      ? 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.id === 'free' ? 'Paket Aktif' : 'Langganan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            * Semua harga dalam Rupiah (IDR) • Pembayaran aman melalui sistem
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
