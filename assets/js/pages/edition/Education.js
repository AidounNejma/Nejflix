import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import '../../../css/pages/_project.scss';
/* import Dropzone from "dropzone"; */

import Navigation from '../../components/Nav';
import Footer from '../../components/Footer';
import Field from '../../components/forms/Field';
import File from '../../components/forms/File';
import Textarea from '../../components/forms/Textarea';
import Datetime from '../../components/forms/Datetimes';

import EducationApi from '../../services/EducationApi';
import axios from '../../interceptors/axios';


const Education = () => {
    //Récupération de l'id dans l'URL
    const params = useParams();

    //Initialisation de la variable id avec "creation"
    var id = 'creation';
    var title = 'Créer une formation';
    
    //S'il y a un id dans l'url, c'est une edition
    if(params.educationId){
        id = params.educationId;
        title = "Editer une formation"
    }

    // Constantes pour les fichiers 
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    //Constantes pour les inputs du projet (initialisés vides)
    const [education, setEducation] = useState({
        name: "",
        description: "",
        language: "",
        company: "",
        framework: "",
        dateOfCreation:"",
        percentage: "",
        duration: "",
        thumbnail: null,
        video: null
    });

    //Contantes pour les erreurs (initialisées vides)
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        language: "",
        company: "",
        framework: "",
        dateOfCreation:"",
        percentage: "",
        duration: "",
        thumbnail: "",
        video: ""
    });

    //Constante pour l'édition
    const [editing, setEditing] = useState(false);

    // Récupération de la formation en fonction de l'identifiant
    const fetchEducation = async id => {
        try {
            const { name, description, language, company, framework, dateOfCreation, percentage, duration } = await EducationApi.find(
                id
            );
            setEducation({ name, description, language, company, framework, dateOfCreation, percentage, duration });
        } catch (error) {
            toast.error('😩 Oh la formation n\'a pas pu être chargée.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // Chargement de la formation si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "creation") {
            setEditing(true);
            fetchEducation(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setEducation({ ...education, [name]: value });
    }

    //Gestion des changement de la date
    const handleDate = (date) => {
        setEducation({ ...education, 'dateOfCreation' : new Date(date._d) });
    }

    //Gestion des fichiers Thumbnail
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

            //console.log(response);
            //On insère l'url dans le champ thumbnail de l'entité Education
            setEducation({ ...education, 'thumbnail' : response.data['@id'] });

            return response;
        });
    }

    //Gestion des fichiers Video
    const handleVideo = async ({currentTarget}) => {
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

            //console.log(response);
            //On insère l'url dans le champ video de l'entité Education
            setEducation({ ...education, 'video' : response.data['@id'] });

            return response;
        });
    }

    

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {

        console.log(education);
        event.preventDefault();

        try {
            setErrors({});

            if (editing) {
                await EducationApi.update(id, education);
                toast.success('🥳 La formation a bien été modifiée !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else {
                await EducationApi.create(education);
                toast.success('🥳 La formation a bien été créée !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch ({ response }) {
            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error('😩 Oh il semblerait qu\'il y a des erreurs dans votre formulaire.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
                    value={education.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <Textarea
                    name="description"
                    label="Description"
                    placeholder="Je vous présente..."
                    value={education.description}
                    onChange={handleChange}
                    error={errors.description}
                    type='textarea'
                />

                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="ex: Biyn Media"
                    value={education.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <Field
                    name="language"
                    label="Langages"
                    placeholder="ex: PHP, Javascript"
                    value={education.language}
                    onChange={handleChange}
                    error={errors.language}
                />

                <Field
                    name="framework"
                    label="Frameworks"
                    placeholder="ex: Symfony, ReactJs"
                    value={education.framework}
                    onChange={handleChange}
                    error={errors.framework}
                />

                <Field
                    name="percentage"
                    label="Pourcentage"
                    placeholder="100"
                    value={education.percentage}
                    onChange={handleChange}
                    error={errors.percentage}
                />

                <Field
                    name="duration"
                    label="Durée de la vidéo"
                    placeholder="0m39"
                    value={education.duration}
                    onChange={handleChange}
                    error={errors.duration}
                />

                <label htmlFor="dateOfCreation" className='labelForInputsForm'>Date de création</label>
                <Datetime
                    name="dateOfCreation"
                    label="Date de création"
                    value={new Date(education.dateOfCreation)}
                    onChange={handleDate}
                    error={errors.dateOfCreation}
                />

                <label htmlFor="thumbnail" className='labelForInputsForm'>Vignette</label>
                <File
                    name="thumbnail"
                    label="Vignette"
                    className="formProject-Thumbnail"
                    onChange={handleThumbnail}
                    error=''
                />
                <label htmlFor="video" className='labelForInputsForm'>Vidéo</label>
                <File
                    name="video"
                    label="Vidéo"
                    className="formProject-Thumbnail"
                    onChange={handleVideo}
                    error=''
                />

                <div className="form-group">
                    <button type="submit" className="submitEditProject">
                        Enregistrer
                    </button>
                    <Link to="/toutes-les-formations" className="btnReturnToProjects">
                        Retour à la liste
                    </Link>
                </div>

            </form>

            <Footer />
        </>
    );
};

export default Education;