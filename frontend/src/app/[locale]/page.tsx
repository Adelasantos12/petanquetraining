'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Zap,
  BarChart3,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const t = useTranslations('landing');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 selection:bg-accent-orange selection:text-white">
      <Header />

      {/* HERO */}
      <section className="px-8 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-off-white text-[10px] font-bold tracking-widest uppercase text-gray-secondary mb-8 border border-gray-200"
        >
          <Target className="w-3 h-3 text-accent-orange" />
          <span>{t('tagline')}</span>
        </motion.div>

        <motion.h1
          {...fadeInUp}
          className="text-6xl md:text-8xl font-bold text-graphite tracking-tighter mb-8 max-w-5xl leading-[0.9]"
        >
          {t('hero_title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-secondary max-w-2xl mb-12 leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/apply">
            <Button size="lg" className="min-w-[200px] group">
              {t('cta_primary')}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              {t('cta_secondary')}
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* WHAT IS */}
      <section className="bg-off-white/50 py-32 px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">{t('what_is.title')}</h2>
            <p className="text-xl text-gray-secondary leading-relaxed mb-12">
              {t('what_is.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                  <BarChart3 className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="font-bold">Análisis de Datos</h4>
                <p className="text-sm text-gray-secondary">Métricas precisas de efectividad en tiro y punto.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                  <Zap className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="font-bold">Optimización</h4>
                <p className="text-sm text-gray-secondary">Plan de mejora basado en debilidades detectadas.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
          >
             <div className="absolute inset-0 bg-graphite flex items-center justify-center p-12">
                <div className="w-full aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                  <span className="text-white/20 font-bold tracking-widest text-4xl uppercase">Interface Preview</span>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center tracking-tighter">{t('how_works.title')}</h2>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[1, 2, 3, 4].map((step) => (
            <motion.div key={step} variants={fadeInUp}>
              <Card className="h-full border-none bg-off-white/30" hoverEffect>
                <span className="text-4xl font-bold text-accent-orange/20 mb-6 block">0{step}</span>
                <h3 className="text-xl font-bold mb-4">{t(`how_works.step${step}`)}</h3>
                <p className="text-sm text-gray-secondary leading-relaxed">
                  {t(`how_works.step${step}_desc`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ELIGIBILITY */}
      <section className="bg-graphite py-32 px-8 text-white rounded-[40px] mx-4 md:mx-8 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-white">{t('eligibility.title')}</h2>
            <p className="text-xl text-gray-secondary mb-12">
              {t('eligibility.subtitle')}
            </p>
            <ul className="space-y-6">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-center space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-accent-orange shrink-0" />
                  <span className="text-lg font-medium">{t(`eligibility.points.${i}`)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-16">
              <Link href="/apply">
                <Button size="lg" className="min-w-[240px]">Apply Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 tracking-tighter text-center">{t('faq.title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              className="w-full text-left p-6 rounded-xl border border-gray-100 bg-white hover:border-accent-orange/20 transition-all group"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-graphite group-hover:text-accent-orange transition-colors">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm text-gray-secondary leading-relaxed pt-4 border-t border-gray-50">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
