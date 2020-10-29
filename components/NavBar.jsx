import Link from 'next/link';
import Router from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
	const { currentUser, logout } = useAuth();

	return (
		<nav className='flex justify-between items-center py-4'>
			<p className='text-2xl font-bold text-grey-800'>
				<Link href='/'>
					<a className='text-red-400'>ToDo App</a>
				</Link>
			</p>
			<div className='flex'>
				{!currentUser && (
					<a className='rounded py-2 px-4 mr-2 bg-blue-500 text-white hover:bg-blue-600' href='/signup'>
						SignUp
					</a>
				)}
				{!currentUser && (
					<a className='rounded py-2 px-4 bg-blue-500 text-white hover:bg-blue-600' href='/login'>
						Login
					</a>
				)}
				{currentUser && (
					<img
						style={{ marginRight: '10px', height: '40px', width: '45px' }}
						src={currentUser.photoURL}
						alt={currentUser.displayName}
					/>
				)}
				{currentUser && (
					<button
						className='rounded py-2 px-4 bg-blue-500 text-white hover:bg-blue-600'
						onClick={() => {
							logout();
							Router.push('/login');
						}}
					>
						LogOut
					</button>
				)}
			</div>
		</nav>
	);
}
