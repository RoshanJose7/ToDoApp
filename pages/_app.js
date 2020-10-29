import '../styles/index.css';
import '../styles/responsive.css';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<div className='container px-4 mx-auto my-6 max-w-xl max-h-full'>
				<Head>
					<script src='https://kit.fontawesome.com/0dde756733.js' crossOrigin='anonymous'></script>
				</Head>
				<NavBar />
				<Component {...pageProps} />
			</div>
		</AuthProvider>
	);
}

export default MyApp;
