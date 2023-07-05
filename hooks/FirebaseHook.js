import { useEffect, useContext } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { UserContext } from '../context/Usercontext';

const fetchUsers = () => {
  const { setInitialusers } = useContext(UserContext);
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const usersQuery = query(usersRef, where('username', '!=', null));

        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
          if (!snapshot.empty) {
            const usersData = snapshot.docs.map((doc) => {
              const id = doc.id;
              const data = doc.data();
              return { id, ...data };
            });
            
            // Update the context with the fetched data
            setInitialusers([...usersData]);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  // No return statement or value is needed
};

export default fetchUsers;