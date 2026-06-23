'use client';

import { CheckIcon, XIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { PricingToggle } from './pricing-toggle';
import { UpgradeButton } from './upgrade-button';

type Feature = {
  name: string;
  free: string | boolean;
  pro: string | boolean;
};

type LoginDict = {
  welcomeBack: string;
  joinUs: string;
  loginSubtitle: string;
  registerSubtitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  signIn: string;
  signUp: string;
  hasAccount: string;
  noAccount: string;
  switchToLogin: string;
  switchToRegister: string;
  terms: string;
  errorRegister: string;
  errorLogin: string;
  errorGeneric: string;
  orContinueWith: string;
  googleSignIn: string;
};

type PricingCardsProps = {
  initialInterval: 'monthly' | 'yearly';
  features: Feature[];
  loginHref: string;
  texts: {
    free: string;
    freePrice: string;
    freePeriod: string;
    pro: string;
    proPrice: string;
    proPeriod: string;
    proYearlyPrice: string;
    proYearlyPeriod: string;
    proYearlySave: string;
    getStarted: string;
    upgrade: string;
    yes: string;
    no: string;
  };
  loginDict: LoginDict;
};

export function PricingCards({
  initialInterval,
  features,
  loginHref,
  texts,
  loginDict,
}: PricingCardsProps) {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>(initialInterval);

  return (
    <>
      <PricingToggle
        interval={interval}
        onToggle={setInterval}
        monthlyLabel={texts.proPeriod}
        yearlyLabel={texts.proYearlyPeriod}
        saveLabel={texts.proYearlySave}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        {/* Free Tier */}
        <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm">
          <h2 className="mb-2 text-2xl font-bold">{texts.free}</h2>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">{texts.freePrice}</span>
            <span className="ml-2 text-muted-foreground">{texts.freePeriod}</span>
          </div>
          <Link
            href={loginHref}
            className="mb-8 flex h-12 w-full items-center justify-center rounded-xl border border-border bg-background text-sm font-semibold transition-colors hover:bg-muted"
          >
            {texts.getStarted}
          </Link>
          <ul className="space-y-4">
            {features.map((feat) => (
              <li key={feat.name} className="flex items-center gap-3 text-sm">
                {feat.free === false ? (
                  <XIcon size={16} className="shrink-0 text-muted-foreground/40" />
                ) : (
                  <CheckIcon size={16} className="shrink-0 text-primary" />
                )}
                <span className={feat.free === false ? 'text-muted-foreground/60' : ''}>
                  {feat.name}:{' '}
                  {feat.free === false ? texts.no : feat.free === true ? texts.yes : feat.free}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Tier */}
        <div className="relative rounded-3xl border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-8 shadow-xl shadow-primary/5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
              POPULAR
            </span>
          </div>
          <h2 className="mb-2 text-2xl font-bold">{texts.pro}</h2>
          <div className="mb-1">
            <span className="text-4xl font-extrabold">
              {interval === 'yearly' ? texts.proYearlyPrice : texts.proPrice}
            </span>
            <span className="ml-2 text-muted-foreground">
              {interval === 'yearly' ? texts.proYearlyPeriod : texts.proPeriod}
            </span>
          </div>
          {interval === 'monthly' && (
            <p className="mb-6 text-xs text-muted-foreground">
              {texts.proYearlyPrice} {texts.proYearlyPeriod} &middot; {texts.proYearlySave}
            </p>
          )}
          {interval === 'yearly' && <div className="mb-6" />}
          <UpgradeButton label={texts.upgrade} interval={interval} loginDict={loginDict} />
          <ul className="space-y-4">
            {features.map((feat) => (
              <li key={feat.name} className="flex items-center gap-3 text-sm">
                <CheckIcon size={16} className="shrink-0 text-primary" />
                <span>
                  {feat.name}: {feat.pro === true ? texts.yes : feat.pro}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
