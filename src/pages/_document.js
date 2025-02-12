import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import 'regenerator-runtime/runtime';

//!👇 this is the absolute base template for rendering your page
class CustomeDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Kanit:wght@200&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossOrigin="anonymous"></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}

export default CustomeDocument;
