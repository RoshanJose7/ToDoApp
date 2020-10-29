import { db } from './db/firebase';

export default async (req, res) => {
	if (req.method === 'POST') {
		const newTodoTitle = req.body.title;
		const uid = req.body.uid;

		await db
			.collection('users')
			.doc(uid)
			.collection('todos')
			.add({
				title: newTodoTitle
			})
			.then(function () {
				console.log('Document successfully written!');
			})
			.catch(function (error) {
				console.error('Error writing document: ', error);
				res.statusCode = 500;
				res.json({ error: `Error writing document: ${error}` });
			});

		res.statusCode = 200;
		res.json(newTodoTitle);
	}
};
