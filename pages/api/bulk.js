import { db } from '../../Firebase'; // Import your Firebase configuration
import { collection,addDoc } from 'firebase/firestore';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const apiKey = req.headers.authorization;
    if (apiKey !== `${process.env.ADMIN_KEY}`) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    try {
      const usersRef = collection(db, 'users');
      const users = req.body.users;

      const addUsersPromise = users.map((user) => {
        return addDoc(usersRef, user);
      });

      await Promise.all(addUsersPromise);
      res.status(200).json({ message: 'Users added.' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding users !' });
    }
  } else {
    res.status(404).json({ error: 'Invalid method.' });
  }
}