import Head from 'next/head';
import Router from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from './api/db/firebase';

export default function Home() {
	const newTodoRef = useRef('');
	const { currentUser } = useAuth();
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [todos, setTodos] = useState([]);

	currentUser ? null : Router.push('/login');

	async function sendTodo() {
		await fetch('api/createTodo', {
			method: 'POST',
			body: JSON.stringify({
				title: newTodoRef.current.value,
				uid: currentUser.uid
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(() => {
				newTodoRef.current.value = '';
				setSuccess('ToDo created successfully');
				getTodos();
				setTimeout(() => {
					setSuccess('');
				}, 2000);
				console.log('ToDo Created Successfully');
			})
			.catch(err => {
				setError('Error creating ToDo');
				console.error(err);
				setTimeout(() => {
					setError('');
				}, 2000);
			});
	}

	async function getTodos() {
		if (currentUser) {
			const records = [];
			await db
				.collection('users')
				.doc(currentUser.uid)
				.collection('todos')
				.get()
				.then(function (querySnapshot) {
					querySnapshot.forEach(function (doc) {
						records.push({ id: doc.id, ...doc.data() });
					});
					setTodos(records);
				})
				.catch(function (error) {
					console.error('Error getting documents: ', error);
				});
		}
	}

	async function deleteTodo(id) {
		await fetch('api/deleteTodo', {
			method: 'DELETE',
			body: JSON.stringify({
				id,
				uid: currentUser.uid
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(() => {
				setSuccess('ToDo deleted successfully');
				getTodos();
				setTimeout(() => {
					setSuccess('');
				}, 2000);
			})
			.catch(err => {
				setError('Error deleting ToDo');
				console.error(err);
				setTimeout(() => {
					setError('');
				}, 2000);
			});
	}

	useEffect(() => {
		setSuccess("ToDo's Loaded");
		getTodos();
		setTimeout(() => {
			setSuccess('');
		}, 2000);
	}, []);

	if (currentUser) {
		return (
			<div className='page'>
				<Head>
					<title>Home</title>
				</Head>
				{success && <h2 className='rounded-md text-white text-center bg-green-500 my-4 max-w-xl'>{success}</h2>}
				{error && <h2 className='rounded-md text-white text-center bg-red-500 my-4 max-w-xl'>{error}</h2>}
				<input
					placeholder='Create ToDo'
					className='rounded-md border-2 text-center'
					ref={newTodoRef}
					type='text'
				/>
				<button
					className='rounded ml-2 py-1 px-4 bg-green-500 text-white hover:bg-green-600'
					type='submit'
					onClick={() => sendTodo()}
				>
					Create
				</button>
				<div className='container'>
					{todos.map(todo => (
						<div
							className='flex rounded-md my-5 shadow-lg h-12 justify-between items-center bg-grey-800'
							key={todo.id}
						>
							<i className='fas fa-arrow-right ml-4' />
							<p className='text-lg'>{todo.title}</p>
							<button
								className='rounded py-1 px-4 bg-red-500 mr-2 text-white hover:bg-red-600'
								onClick={() => deleteTodo(todo.id)}
							>
								<i className='fas fa-trash' />
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
	return null;
}
