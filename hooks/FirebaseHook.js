import { useEffect, useContext, useState } from 'react';
import { collection, query, where, doc, onSnapshot,getDocs, getDoc } from 'firebase/firestore';
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

export const fetchCollUsers = () => {
  const { setInitialusers } = useContext(UserContext);
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const usersQuery = query(usersRef, where('username', '!=', null));

        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
          if (!snapshot.empty) {
            const usersData =  snapshot.docs.map((doc) => {
              const id = doc.id;
              const data = doc.data();
              return { id, ...data };
            });
            const users = usersData.filter((user)=>user?.role=="client");
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

export const fetchColl = () => {
  const { setCollectors } = useContext(UserContext);
  const usersRef = collection(db, 'users');
  const onholdRef = collection(db, 'onhold');
  const usersQuery = query(usersRef, where('role', '==', 'collector'));
  const onholdQuery = query(onholdRef);
  const [users,setUsers] = useState([]);
  const [onhold,setOnhold] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const unsubscribeUsers = onSnapshot(usersQuery, async (usersSnapshot) => {
          if (!usersSnapshot.empty) {
            const usersData = await Promise.all(usersSnapshot.docs.map(async (userDoc) => {
              const user = { id: userDoc.id, ...userDoc.data() };
              return user;
            }));

            setUsers([...usersData]);
          } else {
            console.log('No user documents found');
          }
        });
        return () => {
          unsubscribeUsers();
        };
      } catch (error) {
        console.log('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const unsubscribeOnhold = onSnapshot(onholdQuery, async (onholdSnapshot) => {
          if (!onholdSnapshot.empty) {
            const onholdData = await Promise.all(onholdSnapshot.docs.map(async (onholdDoc) => {
              const x = { id: onholdDoc.id, ...onholdDoc.data() };
              return x;
            }));

            setOnhold([...onholdData]);
          } else {
            setOnhold([]);
            console.log('No Onhold documents found');
          }
        });
        return () => {
          unsubscribeOnhold();
        };
      } catch (error) {
        console.log('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (users.length === 0) return;
      const newUsers = [];
  
      for (let i = 0; i < users.length; i++) {
        let satcredit = 0;
        let intcredit = 0;
  
        for (let j = 0; j < onhold.length; j++) {
          if (onhold[j].by === users[i].id) {
            if (onhold[j].type === "satelite") {
              satcredit += onhold[j].amount;
            } else {
              intcredit += onhold[j].amount;
            }
          }
        }
  
        const updatedUser = {
          ...users[i],
          satcredit,
          intcredit,
        };
  
        newUsers.push(updatedUser);
      }
  
      setCollectors(newUsers);
    };
  
    fetchData();
  }, [users, onhold]);
};