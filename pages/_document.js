import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en' className='[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]'>
        <Head>
          <meta name='apple-mobile-web-app-title' content='Tailwind CSS' />
          <meta name='application-name' content='Tailwind CSS' />
          <meta name='msapplication-TileColor' content='#38bdf8' />
          {/* <meta name='msapplication-config' content={v('/favicons/browserconfig.xml')} /> */}
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body className='antialiased text-gray-500 dark:text-gray-400'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
