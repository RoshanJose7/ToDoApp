import '../styles/index.css';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<div className='container mx-auto my-6 max-w-xl max-h-full'>
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
