import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import '../../assets/styles/pages/_project.scss';
/* import Dropzone from "dropzone"; */

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Field from '../../components/forms/Field';
import File from '../../components/forms/File';
import Textarea from '../../components/forms/Textarea';
import Datetime from '../../components/forms/Datetimes';

import ExperienceApi from '../../services/ExperienceApi';
import axios from '../../interceptors/axios';


const Experience = () => {
    //Récupération de l'id dans l'URL
    const params = useParams();
    
    //Initialisation de la variable id avec "creation"
    var id = 'creation';
    var title = 'Créer une expérience';
    
    //S'il y a un id dans l'url, c'est une edition
    if(params.experienceId){
        id = params.experienceId;
        title = "Editer une expérience"
    }

    // Constantes pour les fichiers 
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    //Constantes pour les inputs du projet (initialisés vides)
    const [experience, setExperience] = useState({
        name: "",
        description: "",
        language: "",
        company: "",
        framework: "",
        dateOfCreation:"",
        thumbnail: ""
    });

    //Contantes pour les erreurs (initialisées vides)
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        language: "",
        company: "",
        framework: "",
        dateOfCreation:"",
        thumbnail: ""
    });

    //Constante pour l'édition
    const [editing, setEditing] = useState(false);

    // Récupération de l'experience en fonction de l'identifiant
    const fetchExperience = async id => {
        try {
            const { name, description, language, company, framework, dateOfCreation } = await ExperienceApi.find(
                id
            );
            setExperience({ name, description, language, company, framework, dateOfCreation });
        } catch (error) {
            toast.error("Le projet n'a pas pu être chargé");
        }
    };

    // Chargement de l'experience si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "creation") {
            setEditing(true);
            fetchExperience(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setExperience({ ...experience, [name]: value });
    }

    //Gestion des changement de la date
    const handleDate = (date) => {
        setExperience({ ...experience, 'dateOfCreation' : new Date(date._d) });
    }

    //Gestion des fichiers
    const handleThumbnail = async ({currentTarget}) => {
        setSelectedFile(selectedFile, currentTarget.files[0]);
        setIsFilePicked(isFilePicked, true);
        
        const formData = new FormData();
        
        //On met le fichier dans la variable formData
		formData.append('file', currentTarget.files[0]);
        
        // Requête à l'API pour envoyer le fichier
        await axios.post('media_objects', formData,  {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {

            console.log(response);
            //On insère l'url dans le champ thumbnail de l'entité experience
            setExperience({ ...experience, 'thumbnail' : response.data['@id'] });

            return response;
        });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});

            if (editing) {
                await ExperienceApi.update(id, experience);
                toast.success("Le client a bien été modifié");
            }else {
                await ExperienceApi.create(experience);
                toast.success("Le client a bien été créé");
            }
        } catch ({ response }) {
            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire !");
            }
        }
    }

    return (
        <>
            <Navigation />

            <form onSubmit={handleSubmit} className="formEditionProject">
                <h1>{title}</h1>
                <Field
                    name="name"
                    label="Nom du projet"
                    placeholder="ShonenJump"
                    value={experience.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <Textarea
                    name="description"
                    label="Description"
                    placeholder="Je vous présente..."
                    value={experience.description}
                    onChange={handleChange}
                    error={errors.description}
                    type='textarea'
                />

                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="ex: Biyn Media"
                    value={experience.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <Field
                    name="language"
                    label="Langages"
                    placeholder="ex: PHP, Javascript"
                    value={experience.language}
                    onChange={handleChange}
                    error={errors.language}
                />

                <Field
                    name="framework"
                    label="Frameworks"
                    placeholder="ex: Symfony, ReactJs"
                    value={experience.framework}
                    onChange={handleChange}
                    error={errors.framework}
                />

                <Datetime
                    name="dateOfCreation"
                    label="Date de création"
                    value={new Date(experience.dateOfCreation)}
                    onChange={handleDate}
                    error={errors.dateOfCreation}
                />

                <File
                    name="thumbnail"
                    label="Vignette"
                    className="formProject-Thumbnail"
                    onChange={handleThumbnail}
                    error=''
                />

                <div className="form-group">
                    <button type="submit" className="submitEditProject">
                        Enregistrer
                    </button>
                    <Link to="/toutes-les-experiences" className="btnReturnToProjects">
                        Retour à la liste
                    </Link>
                </div>

            </form>

            <Footer />
        </>
    );
};

export default Experience;