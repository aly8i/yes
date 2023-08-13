import React from 'react'
import styles from "./Footer.module.scss"
import {HiOutlineOfficeBuilding} from 'react-icons/hi';
import {BsTelephone} from 'react-icons/bs';
import {HiOutlineMail} from 'react-icons/hi';
import {BsWhatsapp} from 'react-icons/bs';
import {ImFacebook} from 'react-icons/im';
import {FaTwitter} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
        <hr />
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.Col}>
                <h6><HiOutlineMail className={styles.icon}/>&nbsp;&nbsp;Email</h6>
                    <p className={styles.textJustify}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yaghibilal@gmail.com
                    </p>
                </div>
                <div className={styles.Col}>
                    <h6><BsTelephone className={styles.icon}/>&nbsp;&nbsp;Phonenumber</h6>
                    <p className={styles.textJustify}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+9613564248
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
                    <li className={styles.socialIcon}>
                        <ImFacebook className={styles.i}/>
                    </li>
                    <li className={styles.socialIcon}>
                        <BsWhatsapp className={styles.i}/>
                    </li>
                    <li className={styles.socialIcon}>
                        <FaTwitter className={styles.i}/>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer