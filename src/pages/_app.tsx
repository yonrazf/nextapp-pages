import { withFronteggApp } from "@frontegg/nextjs/pages";
import "../styles/globals.css";
function CustomApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default withFronteggApp(CustomApp, {
  hostedLoginBox: false,
  authOptions: {
    // keepSessionAlive: true, // Uncomment this in order to maintain the session alive
  },
});
