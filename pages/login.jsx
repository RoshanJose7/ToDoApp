import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef } from 'react';
import { signInWithGoogle } from './api/db/firebase';

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleLogIn() {
		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			Router.push('/');
		} catch {
			setError('Failed to log in');
		}

		setLoading(false);
	}

	async function GoogleLogin() {
		setError('');
		setLoading(true);
		await signInWithGoogle();
		setSuccess('Logged In Successfully');
		Router.push('/');
		setLoading(false);
	}

	return (
		<div className='container rounded-md border-black border-2 mx-auto mt-10 max-w-sm'>
			<Head>
				<title>Log In</title>
			</Head>
			<div className='flex flex-col mx-auto my-8 justify-between items-center'>
				<h2 className='text-center text-4xl mb-2'>Log In</h2>
				{error && <h2 className='text-white bg-red-400 text-center'>{error}</h2>}
				{success && <h2 className='text-white bg-green-400 text-center'>{success}</h2>}
				<p className='font-bold text-xl my-2'>Email</p>
				<input
					placeholder='Email'
					className='rounded text-center border-2'
					type='email'
					ref={emailRef}
					required
				/>
				<p className='font-bold text-xl my-2'>Password</p>
				<input
					placeholder='Password'
					className='rounded text-center border-2'
					type='password'
					ref={passwordRef}
					required
				/>
				<button
					className='rounded-md text-white bg-blue-500 mt-4 mb-2 px-2'
					disabled={loading}
					onClick={handleLogIn}
				>
					Log In
				</button>
				&nbsp; or &nbsp;
				<button onClick={() => GoogleLogin()} disabled={loading}>
					<i className='fab fa-google fa-2x' />
				</button>
				<div className='w-100 text-center mt-3'>
					<Link href='/forgotpassword'>
						<a className='text-gray-500'>Forgot Password</a>
					</Link>
				</div>
			</div>
			<div className='w-100 text-center mb-4 mt-2'>
				Don't have an account?&nbsp;
				<Link href='/signup'>
					<a className='text-blue-500'>Sign Up</a>
				</Link>
			</div>
		</div>
	);
}
