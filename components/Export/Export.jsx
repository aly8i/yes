"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import {db} from "../../Firebase";
import { collection ,query, where, onSnapshot } from 'firebase/firestore';
import styles from "./Export.module.scss"

const Export = () => {
    const [users,setUsers] = useState([])
    const usersRef = collection(db, 'users');
    const fetchSatelite = async () => {
        try {
          const usersQuery = query(usersRef, where('service', 'array-contains', 'satelite'));
          const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            if (!snapshot.empty) {
              const usersData = snapshot.docs.map((doc) => {
                const id = doc.id;
                const data = doc.data();
                return { id, username:data.username , phonenumber:data.phonenumber,box:data.satbox,credit:data.satcredit,dayofcharge:data.satchargeday};
              })
              setUsers([...usersData]);
            }
          });
            if (users.length>0) {
              const workbook = XLSX.utils.book_new();
              const worksheet = XLSX.utils.json_to_sheet(users);
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
              const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
              saveExcelFile(excelBuffer, 'satelite.xlsx');
            } else {
              console.log('No data found');
            }
  
            return () => {
              unsubscribe();
            };
        } catch (error) {
          console.log('Error fetching documents:', error);
        }
    };
    const fetchInternet = async () => {
        try {
          const usersQuery = query(usersRef, where('service', 'array-contains', 'internet'));
          const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            if (!snapshot.empty) {
              const usersData = snapshot.docs.map((doc) => {
                const id = doc.id;
                const data = doc.data();
                return { id, username:data.username , phonenumber:data.phonenumber,box:data.intbox,credit:data.intcredit,dayofcharge:data.intchargeday,website:data.intweb};
              })
              setUsers([...usersData]);
            }
          });
            if (users.length>0) {
              const workbook = XLSX.utils.book_new();
              const worksheet = XLSX.utils.json_to_sheet(users);
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
              const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
              saveExcelFile(excelBuffer, 'internet.xlsx');
            } else {
              console.log('No data found');
            }
  
            return () => {
              unsubscribe();
            };
        } catch (error) {
          console.log('Error fetching documents:', error);
        }
    };
        // Fetch the data from Firebase table
    const saveExcelFile = (buffer, fileName) => {
        const data = new Blob([buffer], { type: 'application/octet-stream' });
    
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // For IE and Edge browsers
            window.navigator.msSaveBlob(data, fileName);
        } else {
        // For other modern browsers
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            setTimeout(() => {
                // Clean up the URL object after some time
                window.URL.revokeObjectURL(url);
            }, 100);
        }
    };
      
  return (
    <div className={styles.wrapper}>
        <div className={styles.card}>
            <div class="flex flex-row w-50 pr-2 pl-2 m-auto mt-5 align-middle items-center">
                <button style={{borderRadius:"1.125rem"}}  class={`cursor-pointer w-full text-center shadow p-2 border border-gray-700`} className={styles.button} onClick={async()=>{await fetchSatelite()}}>
                    Export Satelite
                </button>
            </div>
            <div class="flex flex-row w-50 pr-2 pl-2 m-auto mt-5 align-middle items-center">
                <button style={{borderRadius:"1.125rem"}} class={`cursor-pointer w-full text-center shadow p-2 border border-gray-700`} className={styles.button} onClick={async()=>{await fetchInternet()}}>
                    Export Internet
                </button>
            </div>
        </div>
    </div>
  )
}

export default Export 