import React from 'react'
import styles from "./Home.module.scss"
import Map from './Map'
import Footer from './Footer'
const Home = () => {
    const internetPlans = [
        {
            name:"Platinum Plan",
            info:"5M-GOLD 400GB",
            price:"$10/month"
        },
        {
            name:"Bronze Plan",
            info:"6M-GOLD 500GB",
            price:"$12/month"
        },
        {
            name:"Silver Plan",
            info:"7M-GOLD 600GB",
            price:"$14/month"
        },
        {
            name:"Gold Plan",
            info:"9M-GOLD 750GB",
            price:"$16/month"
        },
        {
            name:"Daily Plan",
            info:"20M /8GB PER DAY",
            price:"$10/month"
        },
        {
            name:"Starter Plan",
            info:"2M 200GB",
            price:"$5/month"
        },
        {
            name:"Pro Plan",
            info:"8M UP TO 20 MB DOUBLE SPEED NO FUP 550GB",
            price:"$12/month"
        },
        
    ]
    const satelitePlans= [
        {
            name:"Subscription Plan",
            info:"24/7 Satelite",
            price:"$2/month"
        },
        {
            name:"Satelite Cable",
            info:"High quality Satelite cable for clear image",
            price:"$0.2/meter"
        },
    ]

    const internetPlans2= [
        {
            name:"Ethernet Cable",
            info:"High quality Ethernet Cable to prevent loss",
            price:"$0.3/meter"
        },
        {
            name:"Home Router",
            info:"High quality home router with wide coverage",
            price:"$14"
        },
        {
            name:"Fiber Optic Cable",
            info:"transmit your internet through light for fast streaming",
            price:"1$/meter"
        },
    ]
  return (
    <div className={styles.container}>
        <div className={styles.hero}>
            <h1>Internet & Satellite Services</h1>
            <p>Experience high-speed and reliable internet and satellite services.</p>
            <div className={styles.btn}>Get Started</div>
        </div>

        <section id="features" className={styles.featuresContainer}>
            <h2 className={styles.featuresTitle}>Features We Offer</h2>
            <div className={styles.features}>
                <div className={styles.feature}>
                    <h3>Blazing Fast Internet</h3>
                    <p>Enjoy lightning-fast internet speeds for all your online activitieswth multiple plans so it fits your needs.</p>
                </div>
                <div className={styles.feature}>
                    <h3>Lebanese Channels with Satellite</h3>
                    <p>Stay up to date and stream in real-time yor favorite lebanese, and international channels.</p>
                </div>
                <div className={styles.feature}>
                    <h3>Maintenance Support</h3>
                    <p>We Fix and repair any issue that comes your way. We sell all euipments you need too.</p>
                </div>
            </div>
        </section>
       
        <section id="pricing" className={styles.pricing}>
            <h2 className={styles.pricingTitle}>Internet Pricings</h2>
            <div className={`${styles.planCon} ${styles.scroll}`}>
                {
                    internetPlans.map((plan)=>(
                        <div className={styles.plan}>
                            <h3>{plan.name}</h3>
                            <p>{plan.info}</p>
                            <p>{plan.price}</p>
                        </div>
                    ))
                }
            </div>
        </section>
        <section id="pricing2" className={styles.pricing}>
            <h2 className={styles.pricingTitle}>Satelite Pricings</h2>
            <div className={styles.planCon}>
                {
                    satelitePlans.map((plan)=>(
                        <div className={styles.plan}>
                            <h3>{plan.name}</h3>
                            <p>{plan.info}</p>
                            <p>{plan.price}</p>
                        </div>
                    ))
                }
            </div>
        </section>
        <section id="pricing3" className={styles.pricing}>
            <h2 className={styles.pricingTitle}>Internet Equipments</h2>
            <div className={styles.planCon}>
                {
                    internetPlans2.map((plan)=>(
                        <div className={styles.plan}>
                            <h3>{plan.name}</h3>
                            <p>{plan.info}</p>
                            <p>{plan.price}</p>
                        </div>
                    ))
                }
            </div>
        </section>
        <Map/>
        <Footer/>
    </div>
  )
}

export default Home