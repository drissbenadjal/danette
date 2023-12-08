import "@/styles/globals.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Navbar from "@/components/Navbar/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { ColorContextProvider } from "@/context/ColorContext";
import Loading from "@/components/Loading/Loading";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <ColorContextProvider>
          <Loading />
          <Navbar />
          <SwitchTransition mode="out-in">
            <CSSTransition key={Component} classNames="fade" timeout={400}>
              <Component {...pageProps} />
            </CSSTransition>
          </SwitchTransition>
        </ColorContextProvider>
      </AuthContextProvider>
    </>
  );
}