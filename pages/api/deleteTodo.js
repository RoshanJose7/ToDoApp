import { db } from './db/firebase';

export default async (req, res) => {
	if (req.method === 'DELETE') {
		const id = req.body.id;
		const uid = req.body.uid;
		console.log(id);
		console.log(uid);

		await db
			.collection('users')
			.doc(uid)
			.collection('todos')
			.doc(id)
			.delete()
			.then(() => {
				console.log('ToDo Deleted Successfully');

				res.statusCode = 200;
				res.json({ success: 'ToDo deleted successfully' });
			})
			.catch(error => {
				console.log('Error deleting todo: ', error);

				res.statusCode = 500;
				res.json({ error: `Error deleting todo:  ${error}` });
			});
	}
};
