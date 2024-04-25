import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}> {/* //next-auth/reactから提供される */}
    
      <> 
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
}
//_app.tsx
