import type { AppProps } from "next/app";
import "github-markdown-css";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
