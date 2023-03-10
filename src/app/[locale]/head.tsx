/* eslint-disable no-unused-vars */
// import {createTranslator} from 'next-intl';

type Props = {
  params: {
    locale: string;
  };
};

export default async function Head({params: {locale}}: Props) {

  // let messages;
  // try {
  //   messages = (await import(`@/lang/${locale}.json`)).default;
  // } catch (error) {
  // }

  // const t = createTranslator({locale, messages});
  return (
    <>
      {/* <title>{t('login.title')}</title> */}
      <title>Helloworld</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
