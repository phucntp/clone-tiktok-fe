import './globals.scss'
import '@/styles/main.scss'
import { NextIntlClientProvider } from 'next-intl/client';

type Props = {
  children: React.ReactNode,
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export default async function RootLayout({
  children, params: { locale }
}: Props) {
  let messages;
  try {
    messages = (await import(`@/lang/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
  }
  return (
    <html lang={`${locale}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body><NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider></body>
    </html>
  )
}
