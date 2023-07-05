import React from 'react'
import styles from "../../styles/Userpage.module.css"
import UserPage from '../../components/User/Singleuser'

const Page = ({id}) => {
  return (
    <div className={styles.container}>
      <UserPage userId={id}/>
    </div>
    
  )
}

export default Page
export async function getServerSideProps(context) {
    return {
        props: {
          id:context.params.id 
        }
      };
}