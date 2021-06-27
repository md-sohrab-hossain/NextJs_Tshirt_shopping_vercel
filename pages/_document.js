import Document, { Html, Head, Main, NextScript } from "next/document";

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
          <meta property="custom" content="great work" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomeDocument;
