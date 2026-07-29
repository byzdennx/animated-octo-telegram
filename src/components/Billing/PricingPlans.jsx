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
       
