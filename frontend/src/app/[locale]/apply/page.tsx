'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from '@/providers/AuthProvider';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function ApplyPage() {
  const t = useTranslations('apply');
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 'personal', title: t('steps.personal') },
    { id: 'sport', title: t('steps.sport') },
    { id: 'logistics', title: t('steps.logistics') },
    { id: 'motivation', title: t('steps.motivation') }
  ];

  const schema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    country: z.string().min(2),
    city: z.string().min(2),
    yearsOfExperience: z.number().min(0),
    tournamentsPerYearCurrent: z.number().min(0),
    tournamentsGoalNextYear: z.number().min(0),
    weeklyTrainingHoursAvailable: z.number().min(0),
    accessToCourt: z.boolean(),
    accessToEquipment: z.boolean(),
    canRecordTrainingResults: z.boolean(),
    acceptanceOfDisciplineRules: z.boolean(),
    willingnessQuincenalReview: z.boolean(),
    motivationText: z.string().min(50)
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      yearsOfExperience: 0,
      tournamentsPerYearCurrent: 0,
      tournamentsGoalNextYear: 0,
      weeklyTrainingHoursAvailable: 0,
      accessToCourt: false,
      accessToEquipment: false,
      canRecordTrainingResults: false,
      acceptanceOfDisciplineRules: false,
      willingnessQuincenalReview: false,
      motivationText: ''
    }
  });

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // In a real scenario, we would register the user first or handle auth
      // For this demo, let's assume we send the application directly
      await api.post('/applications', data);
      router.push('/app/status');
    } catch (err) {
      alert('Error submitting application. Please ensure you are logged in.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20 px-8">
      <Header />

      <div className="max-w-xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">{t('title')}</h1>
          <p className="text-gray-secondary text-sm">{t('description')}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-accent-orange -translate-y-1/2 z-0"
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((s, i) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${i <= step ? 'bg-accent-orange text-white' : 'bg-white text-gray-secondary border border-gray-200'}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`absolute top-10 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap ${i === step ? 'text-graphite' : 'text-gray-secondary'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        <Card className="p-8 md:p-12 overflow-hidden shadow-2xl shadow-graphite/5 border-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="w-full"
                >
                  {step === 0 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Input label={t('form.firstName')} {...register('firstName')} />
                        <Input label={t('form.lastName')} {...register('lastName')} />
                      </div>
                      <Input label={t('form.country')} {...register('country')} />
                      <Input label={t('form.city')} {...register('city')} />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-6">
                      <Input label={t('form.yearsExperience')} type="number" {...register('yearsOfExperience', { valueAsNumber: true })} />
                      <Input label={t('form.tournamentsCurrent')} type="number" {...register('tournamentsPerYearCurrent', { valueAsNumber: true })} />
                      <Input label={t('form.tournamentsGoal')} type="number" {...register('tournamentsGoalNextYear', { valueAsNumber: true })} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <Input label={t('form.weeklyHours')} type="number" {...register('weeklyTrainingHoursAvailable', { valueAsNumber: true })} />
                      <div className="space-y-4 pt-4 border-t border-gray-50">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 accent-accent-orange rounded" {...register('accessToCourt')} />
                          <span className="text-sm font-medium text-gray-secondary group-hover:text-graphite transition-colors">{t('form.hasCourt')}</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 accent-accent-orange rounded" {...register('accessToEquipment')} />
                          <span className="text-sm font-medium text-gray-secondary group-hover:text-graphite transition-colors">{t('form.hasEquipment')}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <Input label={t('form.motivation')} multiline {...register('motivationText')} />
                      <div className="space-y-4 pt-4 border-t border-gray-50">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 accent-accent-orange rounded" {...register('acceptanceOfDisciplineRules')} />
                          <span className="text-xs text-gray-secondary">Acepto las normas de disciplina y metodología del programa.</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 accent-accent-orange rounded" {...register('willingnessQuincenalReview')} />
                          <span className="text-xs text-gray-secondary">Me comprometo a asistir a las revisiones quincenales de datos.</span>
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep} className="group">
                  <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  {t('steps.back' as any) || 'Back'}
                </Button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} className="group">
                  {t('steps.next' as any) || 'Next'}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                  {isSubmitting ? '...' : t('form.submit')}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
