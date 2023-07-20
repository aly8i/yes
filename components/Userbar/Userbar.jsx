import React, { useContext, useState } from 'react'
import "./Userbar.css"
import {db} from "../../Firebase";
import { collection,doc,deleteDoc,getDoc,updateDoc,deleteField } from 'firebase/firestore';
import { UserContext } from '../../context/Usercontext'
import { formatDate,formatMoney } from '../../utils/functions'
import { PDFDocument, StandardFonts,PDFImage,rgb  } from 'pdf-lib';
import { toast } from 'react-toastify';
import axios from 'axios';
const Userbar = () => {
  const {user,setDetailview} = useContext(UserContext);
  const [buttonoptions,setButtonoptions] = useState(false);
  const usersRef = collection(db,'users');

  // const getLink = () => {
  //   const websites = JSON.parse(process.env.WEB_ARRAY);
  //   for (let i = 0; i < websites.length; i++) {
  //     if (websites[i].name === user?.intweb) {
  //       return `${websites[i].value}?phonenumber=${user.phonenumber}`;
  //     }
  //   }
  //   return null;
  // };

  // const weblink = getLink();
  
  const navigateToUser = () => {
    const webNoSpace = user?.intweb.replace(/\s/g, "");
    axios.post(`${process.env.AUTOMATION_SERVER}/${webNoSpace}`,{phonenumber:`${user?.phonenumber}`}).catch((err)=>{
      toast.warning("Automation serivce isn't enabled");
    });
  }

  const savePDFFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: 'application/pdf' });
  
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(data, fileName);
    } else {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  };
  

  const renderPDF = async () => {
    const currentDate = new Date();
    const dateObj = {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    }

    try {
      const docRef = doc(usersRef, `${user?.id}`);
      const userDoc = await getDoc(docRef);
  
      if (userDoc.exists()) {
        const user = userDoc.data();
        const x1 = user.username || '';
        const x2 = user.phonenumber || '';
        const x3 = user.intcredit || '';
        const x4 = formatDate(dateObj) || '';
  
        const pageWidth = 595; 
        const pageHeight = 842; 
  
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([pageWidth, pageHeight/2]); 
  
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 10;
        const rowHeight = 30;
        const margin = 50;
        const tableWidth = page.getWidth() - 2 * margin;
  
        const logoURL = '/yeslogo.png';
        const logoImageBytes = await fetch(logoURL).then((res) => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoImageBytes);
  
        page.drawImage(logoImage, {
          x: 50,
          y: 300,
          width: 180,
          height: 120,
        });
  
        const tableX = margin;
        let tableY = page.getHeight() - margin - rowHeight - 80;
        const backgroundColors = [rgb(1, 1, 1), rgb(0.55, 0.8, 1)];
        let currentBackgroundColorIndex = 0;
  
        const drawRow = (label, value) => {
          page.drawRectangle({
            x: tableX,
            y: tableY,
            width: tableWidth,
            height: rowHeight,
            color: backgroundColors[currentBackgroundColorIndex],
          });
  
          page.drawText(label, {
            x: tableX + 10,
            y: tableY + rowHeight / 2 - 7,
            font,
            fontSize,
          });
  
          page.drawText(value, {
            x: tableX + 200,
            y: tableY + rowHeight / 2 - 7,
            font,
            fontSize,
          });
  
          tableY -= rowHeight;
          currentBackgroundColorIndex = (currentBackgroundColorIndex + 1) % 2;
        };
  
        drawRow('Username', `    ${x1}`);
        drawRow('Phone Number', `    ${x2}`);
        drawRow('Service', '    internet');
        drawRow('Debit', `    ${x3} $`);
        drawRow('Date', `    ${x4}`);
  
        const pdfBytes = await pdfDoc.save();
        const filename = `internet-Debit-${x1}-${x4}.pdf`;
        savePDFFile(pdfBytes, filename);
        axios.post(`${process.env.AUTOMATION_SERVER}/invoice`,{phonenumber:`${x2}`}).catch((err)=>{
          toast.warning("Automation serivce isn't enabled");
        });
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  async function deleteUser() {
    try {
     
      const docRef = doc(usersRef,`${user?.id}`);
      const userSnap = await getDoc(docRef);
      var userr;
      if (userSnap.exists()) {
        userr = userSnap.data();
      }
      if(userr?.service&&userr?.service?.includes("satelite")){
        const data = {
          service:["satelite"],
          intcredit: deleteField(),
          intbox:deleteField(),
          intchargeamount: deleteField(),
          intchargeday: deleteField(),
          intweb: deleteField()
        }
        await updateDoc(docRef, data);
      }else{
        await deleteDoc(docRef);
      }
      toast.success("User deleted succefully");
    } catch (error) {
      toast.error("Error deleting user"+error);
    }
  }
  
  return (
    <div class="flex-col items-center border-r flex-grow s2">
      <button onMouseEnter={()=>{setButtonoptions(true)}} onClick={()=>{setButtonoptions(!buttonoptions)}} class="s4 w-8 h-8 ml-4  shadow text-gray-400 rounded-full flex items-center justify-center border  border-gray-700">
        <svg viewBox="0 0 24 24" class="w-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
      {buttonoptions&&
        <div onMouseLeave={()=>setButtonoptions(false)}class="text-center cursor-pointer shadow text-gray-400 message parker border border-gray-700">
          <div onClick={()=>setDetailview("useredit")} class="option edit border-b border-gray-700 ml-auto">edit</div>
          <div onClick={()=>setDetailview("useradd")} class="option add border-b border-gray-700 ml-auto">add</div>
          <div onClick={()=>renderPDF()} class="option add border-b border-gray-700 ml-auto">notify</div>
          <div onClick={async()=>await deleteUser()} class="option delete border-b border-gray-700 ml-auto">delete</div>
          <div onClick={async()=>setDetailview("usercredit")} class="option delete ml-auto">credit</div>
        </div>
      }
      <div class="flex flex-col ml-auto mt-2 mb-2 items-center w-full text-3xl text-gray-400">
        <div class="mb-2">{user?.username||"~"}</div>
        <img src={`https://robohash.org/${user?.username}`} class="s44 mr-4 rounded-full" alt="profile" />
      </div>
      <div class="sm:flex hidden w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Username</div>
            <div class=" text-lg text-gray-400">{user?.username||"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Phonenumber</div>
            <div class=" text-lg text-gray-400">{user?.phonenumber||"~"}</div>
        </div>
      </div>

      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Day of Charge</div>
            <div class=" text-lg text-gray-400">{user?.intchargeday?user?.intchargeday:"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Charge Amount</div>
            <div class=" text-lg text-gray-400">{user?.intchargeamount?user.intchargeamount:"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Website</div>
            <div onClick={()=>navigateToUser()} class=" text-lg  text-blue-500  hover:text-violet-800 cursor-pointer">{user?.intweb?user.intweb:"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Last Seen</div>
            <div class=" text-lg text-gray-400">{user?.lastseen?formatDate(user?.lastseen):"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Box</div>
            <div class=" text-lg text-gray-400">{user?.intbox||"~"}</div>
        </div>
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Credit</div>
            <div class={`text-lg ${user?.intcredit>0?`text-green-500`:`text-red-500`}`}>{user?.intcredit?formatMoney(user?.intcredit):"~"}</div>
        </div>
      </div>
    </div>
  )
}

export default Userbar