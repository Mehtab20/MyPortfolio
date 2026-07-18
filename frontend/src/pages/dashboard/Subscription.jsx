import { useState } from 'react';
import Button from '../../components/ui/Button';
import GlassCard from '../../components/ui/GlassCard';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic AI features',
    features: [
      '100 AI credits / month',
      'Basic chat support',
      '1 project',
      'Community access',
    ],
    cta: 'Current Plan',
    popular: false,
    disabled: true,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professionals and small teams',
    features: [
      '1,000 AI credits / month',
      'Priority chat support',
      'Unlimited projects',
      'API access',
      'Advanced analytics',
      'Team collaboration',
    ],
    cta: 'Subscribe',
    popular: true,
    disabled: false,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For large teams and organizations',
    features: [
      '10,000 AI credits / month',
      '24/7 dedicated support',
      'Unlimited projects',
      'Full API access',
      'Custom integrations',
      'Advanced analytics',
      'SSO & SAML',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
    disabled: false,
  },
];

export default function Subscription() {
  const [billing, setBilling] = useState('monthly');

  const handleSubscribe = async (planName) => {
    // Stripe checkout placeholder
    alert(`[Stripe Placeholder] Redirecting to ${planName} checkout...\n\nIn production, this will:\n1. Create a Stripe Checkout Session\n2. Redirect to Stripe's hosted checkout page\n3. Handle the success/cancel callback\n4. Update the user's subscription status via webhook`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Subscription
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Choose the plan that fits your needs
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setBilling('monthly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            billing === 'monthly' ? 'btn-primary' : ''
          }`}
          style={
            billing !== 'monthly'
              ? {
                  color: 'var(--theme-text-secondary)',
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-glass-bg)',
                }
              : {}
          }
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling('yearly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            billing === 'yearly' ? 'btn-primary' : ''
          }`}
          style={
            billing !== 'yearly'
              ? {
                  color: 'var(--theme-text-secondary)',
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-glass-bg)',
                }
              : {}
          }
        >
          Yearly
          <span
            className="ml-1.5 text-[10px] font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            Save 20%
          </span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card-surface rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${
              plan.popular
                ? 'golden-border relative'
                : 'golden-border-hover'
            }`}
          >
            {plan.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider btn-primary"
              >
                Most Popular
              </div>
            )}

            <div className={`${plan.popular ? 'mt-4' : ''}`}>
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
                {plan.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {billing === 'yearly' && plan.price !== '$0'
                    ? `$${parseInt(plan.price.slice(1)) * 10}`
                    : plan.price}
                </span>
                <span className="text-sm ml-1" style={{ color: 'var(--theme-text-muted)' }}>
                  {plan.price === '$0' ? '/forever' : plan.period}
                </span>
              </div>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full mb-6"
                onClick={() => handleSubscribe(plan.name)}
                disabled={plan.disabled}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Current Plan Info */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--theme-text)' }}>
          Current Plan: Free
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
          You are currently on the Free plan. Upgrade to Pro to unlock more features.
        </p>
        <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--theme-surface-lighter)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: '12%',
              background: 'linear-gradient(90deg, #d4a522, #e8b92e)',
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--theme-text-muted)' }}>
          12% of Free plan credits used this month
        </p>
      </div>
    </div>
  );
}
