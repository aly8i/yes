import { db } from '../../Firebase'; // Import your Firebase configuration
import { collection,where,query,getDocs,updateDoc } from 'firebase/firestore';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const apiKey = req.headers.authorization;
    if (apiKey !== `${process.env.CRON_KEY}`) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    try {
      const date = new Date().toISOString().split('T')[0].split("-");
      const day = parseInt(date[2]);
      const usersRef = collection(db, 'users');
      const usersQuery1 = query(usersRef, where('role', '==', "client"),where('satchargeday', '==', day),where('service',"array-contains",'satelite'));
      const usersQuery2 = query(usersRef, where('role', '==', "client"),where('intchargeday', '==', day),where('service',"array-contains",'internet'));
      const usersSnapshot1 = await getDocs(usersQuery1);
      const usersSnapshot2 = await getDocs(usersQuery2);
      var promises = [];

      usersSnapshot1.forEach((doc) => {
        const userRef = doc.ref;
        const newCredit = doc.data().satcredit + doc.data().satchargeamount ;
        const promise = updateDoc(userRef, { satcredit: newCredit });
        promises.push(promise);
      });
      usersSnapshot2.forEach((doc) => {
        const userRef = doc.ref;
        const newCredit = doc.data().intcredit + doc.data().intchargeamount;
        const promise = updateDoc(userRef, { intcredit: newCredit });
        promises.push(promise);
      });

      await Promise.all(promises);

      res.status(200).json({ message: 'Update executed !' });
    } catch (error) {
      console.error('Error increasing credit:', error);
      res.status(500).json({ error: 'Error increasing credit.' });
    }
  } else {
    res.status(404).json({ error: 'Invalid method.' });
  }
}