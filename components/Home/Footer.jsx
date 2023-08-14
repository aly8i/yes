import React from 'react'
import styles from "./Footer.module.scss"
import {HiOutlineOfficeBuilding} from 'react-icons/hi';
import {BsTelephone} from 'react-icons/bs';
import {HiOutlineMail} from 'react-icons/hi';
import {BsWhatsapp} from 'react-icons/bs';
import {ImFacebook} from 'react-icons/im';
import {FaTwitter} from 'react-icons/fa';

const Footer = () => {
const emailAddress = 'yaghibilal@gmail.com';
  const subject = 'Message for Yes.net';
  const body = 'Hello,\n\nSincerely,';
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
  const whatsappLink = `https://wa.me/03564248`;
  return (
    <footer className={styles.siteFooter}>
        <hr />
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.Col}>
                <h6><HiOutlineMail className={styles.icon}/>&nbsp;&nbsp;Email</h6>
                    <p className={styles.textJustify}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href={mailtoLink} target='_blank'>yaghibilal@gmail.com</a>
                    </p>
                </div>
                <div className={styles.Col}>
                    <h6><BsTelephone className={styles.icon}/>&nbsp;&nbsp;Phonenumber</h6>
                    <p className={styles.textJustify}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href={whatsappLink} target='_blank'>+9613564248</a>
                    </p>
                </div>
                <div className={styles.Col}>
                    <h6><HiOutlineOfficeBuilding className={styles.icon}/>&nbsp;&nbsp;Opening Hours</h6>
                    <ul className={styles.footerLinks}>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monday to Sunday</li>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 p.m to 11 p.m</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.row2}>
                <p className={styles.copyrightText}>
                    Copyright &copy; 2023 All Rights Reserved by <a>YES.NET</a>
                </p>
                <ul className={styles.socialIcons}>
                    <a href="#" className={`${styles.none} ${styles.scaleAnimation}`}>
                        <li className={styles.socialIcon}>
                            <ImFacebook className={styles.i}/>
                        </li>
                    </a>
                    <a href={whatsappLink} className={`${styles.none} ${styles.scaleAnimation}`} target='_blank'>
                        <li className={styles.socialIcon}>
                            <BsWhatsapp className={styles.i}/>
                        </li>
                    </a>
                    <a href="#" className={`${styles.none} ${styles.scaleAnimation}`}>
                        <li className={styles.socialIcon}>
                            <FaTwitter className={styles.i}/>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer