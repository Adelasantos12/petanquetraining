'use client';

import { useState } from 'react';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { api } from '@/providers/AuthProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ApplicationPage() {
  const t = useTranslations('application');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'CH',
    city: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    yearsPlaying: 0,
    currentLevel: 'recreativo',
    tournamentsPerYearCurrent: 0,
    tournamentsPerYearGoal: 0,
    weeklyTrainingHoursAvailable: 0,
    accessToCourt: false,
    accessToEquipment: false,
    canRecordTrainingResults: false,
    preferredTrainingDays: [],
    primaryGoal6Months: '',
    mainWeaknessSelfPerceived: '',
    mainStrengthSelfPerceived: '',
    whyThisAcademy: '',
    willingnessQuincenalReview: false,
    acceptanceOfDisciplineRules: false,
    confirmationTruthfulInformation: false,
    consentDataProcessing: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/applications', formData);
      router.push('/dashboard'); // or status page
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <form onSubmit={handleSubmit} className="space-y-12">

        {/* Section 1 */}
        <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-bold mb-6">{t('section1')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label={t('firstName')} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
            <Input label={t('lastName')} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
            <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <Input label={t('city')} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required />
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-bold mb-6">{t('section2')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label={t('yearsPlaying')} type="number" value={formData.yearsPlaying} onChange={e => setFormData({...formData, yearsPlaying: parseInt(e.target.value)})} required />
            <Input label={t('weeklyHours')} type="number" value={formData.weeklyTrainingHoursAvailable} onChange={e => setFormData({...formData, weeklyTrainingHoursAvailable: parseInt(e.target.value)})} required />
          </div>
        </div>

        <div className="flex items-center space-x-4">
            <input type="checkbox" checked={formData.accessToCourt} onChange={e => setFormData({...formData, accessToCourt: e.target.checked})} />
            <span>{t('courtAccess')}</span>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? '...' : t('submit')}
        </Button>
      </form>
    </div>
  );
}
