import "../styles/main.css";
import type { AppProps } from "next/app";

import Footer from "../layout/footer";
import { Provider } from "../context/UserContext";
import Header from "../layout/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className="bg-[#222] text-white h-screen w-screen">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;
