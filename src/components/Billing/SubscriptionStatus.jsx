import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, CreditCard, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const SubscriptionStatus = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState({
    plan: 'free',
    status: 'active',
    expiresAt: null,
    features: []
  });

  useEffect(() => {
    // Load subscription from memory or API
    const saved = localStorage.getItem(`subscription_${user?.uid}`);
    if (saved) {
      setSubscription(JSON.parse(saved));
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Status Langganan</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
          <div>
            <p className="text-sm text-gray-400">Paket</p>
            <p className="text-white font-medium capitalize">{subscription.plan}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(subscription.status)}`}>
            {getStatusIcon(subscription.status)}
            <span className="capitalize">{subscription.status}</span>
          </div>
        </div>

        {subscription.expiresAt && (
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
            <Calendar className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Berlaku hingga</p>
              <p className="text-white">
                {new Date(subscription.expiresAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}

        {subscription.plan === 'free' && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-sm text-blue-400">
              💡 Upgrade ke paket Pro untuk fitur lebih lengkap
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
