import { useEffect, useContext } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { UserContext } from '../context/Usercontext';

export const fetchUsers = () => {
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
            const users = usersData.filter((user)=>user?.service?.includes("internet")&&user?.role=="client");
            // Update the context with the fetched data
            setInitialusers([...users]);
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

export const fetchSatUsers = () => {
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
            const users = usersData.filter((user)=>user?.service?.includes("satelite")&&user?.role=="client")
            // Update the context with the fetched data
            setInitialusers([...users]);
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

