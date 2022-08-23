import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PUBLIC_KEY_EMAILJS, SERVICE_EMAILJS, TEMPLATE_EMAILJS } from '../config';
import Nav from '../components/Navigation';
import Footer from '../components/Footer';

import '../assets/styles/pages/_contactMe.scss'

const ContactMe = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(SERVICE_EMAILJS, TEMPLATE_EMAILJS, form.current, PUBLIC_KEY_EMAILJS)
        .then((result) => {
            //console.log(result.text);
        }, (error) => {
            //console.log(error.text);
        });
    };
    
    const [name, setName] = useState(null);


    useEffect(() => {
        
    })

    return (
        <div>
            <Nav/>

                <h1 className='contactMe'>Contactez-moi</h1>
                <div className='formContactContainer'>
                    <form ref={form} className='formContact' onSubmit={sendEmail}>
                        <div className='containerInput'>
                            <label>Nom</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='containerInput'>
                            <label>Email</label>
                            <input type="email" name="email" />
                        </div>
                        <div className='containerInput'>
                            <label>Message</label>
                            <textarea name="message" />
                        </div>
                        <input type="submit" value="Envoyer" className='submitButton' />
                    </form>
                    <div className="debug">
                        <pre>
                            <code>
                                &#123;
                                <br/>
                                <p className='categories'>"name" : "Nejma";</p>
                                <p className='categories'>"email": &#123;</p>
                                    <span className='subCategories'>"value": "guermachenejma@gmail.com",</span>
                                    <br />   
                                    <span className='subCategories'>"valid": true</span>
                                
                                <p className='categories'>&#125;,</p>
            
                                <p className='categories'>"message": &#123;</p>
                                    <span className='subCategories'>"text": "Dear Mr. President,",</span>
                                    <br />
                                    <span className='subCategories'>"maxlength": 255</span>

                                <p className='categories'>&#125;,</p>
                            
                                &#125;	
                            </code>
                        </pre>
                    </div>
                </div>
                
            <Footer/>
        </div>
    );
};

export default ContactMe;