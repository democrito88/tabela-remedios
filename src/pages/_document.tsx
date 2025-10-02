import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Favicon em SVG */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* fallback opcional em PNG/ICO (caso navegadores antigos não suportem SVG) */}
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
        <title>Tabela de Remédios</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
