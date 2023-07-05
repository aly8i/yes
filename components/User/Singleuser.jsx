"use client"

import React, { useState, useEffect } from 'react';
import { formatMoney } from '../../utils/functions';
import { db } from '../../Firebase';
import styles from "../../styles/Userpage.module.css"
import { collection, doc, getDoc } from 'firebase/firestore';


export default function UserPage({userId}) {
  const usersRef = collection(db, 'users');
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!userId) {
          console.log('User ID is empty');
          return;
        }
        const userRef = doc(usersRef, userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocument();
  }, [userId, usersRef]);
  if(user=={})
    return <h1>loading</h1>
  return (
    <div className={styles.card}>
        <div className={styles.title}>{user.username}</div>
     <img className={styles.img} src={`https://robohash.org/${user.username}`}/>
        <div className={styles.section}>
            <div className={styles.stitle}>Phone Number</div>
            <div className={styles.info}>{user.phonenumber}</div>
        </div>
        <div className={styles.section}>
            <div className={styles.stitle}>Credit</div>
            <div style={user.credit>0?{color:"red"}:{color:"green"}}className={styles.info}>{formatMoney(user.credit)}</div>
        </div>
     
    </div>
  );
}
