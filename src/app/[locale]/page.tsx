'use client';
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('login');
  return (
    <main>{t('title')}</main>
  )
}
