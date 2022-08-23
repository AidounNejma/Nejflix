import React, { useRef, useState } from 'react';
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
    
    const [name, setName] = useState('Jean Dupont');
    const [email, setEmail] = useState('jean.dupont@gmail.com');
    const [message, setMessage] = useState('Bonjour, je souhaiterais prendre contact avec vous...'); 
    const [valid, setValid] = useState('true');

    // Fonction pour vérifier si l'email est valide
    var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    function isEmail (value) {
        if(emailRegExp.test(value) === true){
            setValid('true')
        }else{
            setValid('false')
        }
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        isEmail(e.target.value)
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }


    return (
        <div>
            <Nav/>

                <h1 className='contactMe'>Contactez-moi</h1>
                <div className='formContactContainer'>
                    <form ref={form} className='formContact' onSubmit={sendEmail}>
                        <div className='containerInput'>
                            <label>Nom</label>
                            <input type="text" name="name" onChange={(e) => handleName(e)} />
                        </div>
                        <div className='containerInput'>
                            <label>Email</label>
                            <input type="email" name="email" onChange={(e) => handleEmail(e)} />
                        </div>
                        <div className='containerInput'>
                            <label>Message</label>
                            <textarea name="message" rows="7" onChange={(e) => handleMessage(e)}/>
                        </div>
                        <input type="submit" value="Envoyer" className='submitButton'  />
                    </form>
                    <div className="debug">
                        <pre>
                            <code>
                                &#123;
                                <br/>
                                <p className='categories'>"name" : "{name}";</p>
                                <p className='categories'>"email": &#123;</p>
                                    <span className='subCategories'>"value": "{email}",</span>
                                    <br />   
                                    <span className='subCategories'>"valid": {valid}</span>
                                
                                <p className='categories'>&#125;,</p>
            
                                <p className='categories'>"message": &#123;</p>
                                    <span className='subCategories'>"text": "{message}",</span>
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