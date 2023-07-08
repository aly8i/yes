import { db } from '../../Firebase'; // Import your Firebase configuration
import { collection,where,query,getDocs,updateDoc } from 'firebase/firestore';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const date = new Date().toISOString().split('T')[0].split("-");
      const day = date[2];
      const month = date[1];
      const year = date[0];
      console.log(day,month,year);
       // Get the current date in YYYY-MM-DD format
      const usersRef = collection(db, 'users');
      const usersQuery = query(usersRef, where('role', '==', "client"));
      const usersSnapshot = await getDocs(usersQuery);

        var promises = [];

      usersSnapshot.forEach((doc) => {
        const userRef = doc.ref;
        const newCredit = doc.data().satcredit + 100;
        const promise = updateDoc(userRef, { satcredit: newCredit });
        promises.push(promise);
      });

      await Promise.all(promises);

      res.status(200).json({ message: 'Credit increased for eligible users.' });
    } catch (error) {
      console.error('Error increasing credit:', error);
      res.status(500).json({ error: 'Error increasing credit.' });
    }
  } else {
    res.status(404).json({ error: 'Invalid method.' });
  }
}