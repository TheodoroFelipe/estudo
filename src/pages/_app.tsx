import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bulma/css/bulma.css'
import 'components/common/loader/loader.css'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";   //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                               //icons

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
