import "../styles/styles.scss";
import Head from "next/head";

export default ({ title, description, ogImage }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{"Dobré bydlo"}</title>
    <meta
      name="description"
      content={
        description ||
        "Prodej bytového textilu - látky, závěsy, záclony, ubrusy, ručníky, polštáře. Nabízíme čištění oděvů, opravu obuvi, šití na míru."
      }
    />
    <meta property="og:title" content={"Dobré bydlo"} />
    <meta
      property="og:description"
      content={
        description ||
        "Prodej bytového textilu - látky, závěsy, záclony, ubrusy, ručníky, polštáře. Nabízíme čištění oděvů, opravu obuvi, šití na míru."
      }
    />
    <meta
      name="og:image"
      content={ogImage || "/static/img/og/og-main.jpg?v=1"}
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="static/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="static/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="static/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="static/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="static/favicon/safari-pinned-tab.svg"
      color="#ff0000"
    />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);
