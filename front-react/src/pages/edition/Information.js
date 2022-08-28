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

import InformationApi from '../../services/InformationApi';
import axios from '../../interceptors/axios';


const Information = () => {
    //Récupération de l'id dans l'URL
    const params = useParams();

    var id = params.informationsId;
    
    // Constantes pour les fichiers 
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    //Constantes pour les inputs des information (initialisés vides)
    const [informations, setInformations] = useState({
        name: "",
        age: "",
        nationality: "",
        drivingLicence: "",
        number: "",
        address:"",
        city: "",
        zipCode: "",
        country: "",
        biography: "",
        video: ""
    });

    //Contantes pour les erreurs (initialisées vides)
    const [errors, setErrors] = useState({
        name: "",
        age: "",
        nationality: "",
        drivingLicence: "",
        number: "",
        address:"",
        city: "",
        zipCode: "",
        country: "",
        biography: "",
        video: ""
    });

    // Récupération de la formation en fonction de l'identifiant
    const fetchInformations = async id => {
        try {
            const { name, age, nationality, drivingLicence, number, address, city, zipCode, country, biography, video, thumbnail } = await InformationApi.find(
                id
            );
            setInformations({ name, age, nationality, drivingLicence, number, address, city, zipCode, country, biography, video, thumbnail });
        } catch (error) {
            toast.error("La formation n'a pas pu être chargée");
        }
    };

    // Chargement de la formation si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        fetchInformations(id);
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInformations({ ...informations, [name]: value });
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
            setInformations({ ...informations, 'thumbnail' : response.data['@id'] });

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
            setInformations({ ...informations, 'video' : response.data['@id'] });

            return response;
        });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            await InformationApi.update(id, informations);
            toast.success("Les information ont bien été modifiées");
            
        } catch ({ response }) {
            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error("Il y a des erreurs dans votre formulaire !");
            }
        }
    }

    return (
        <>
            <Navigation />

            <form onSubmit={handleSubmit} className="formEditionProject">
                <h1>Edition des informations</h1>
                <Field
                    name="name"
                    label="Nom et prénom"
                    placeholder="Nejma Aidoun"
                    value={informations.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <Field
                    name="age"
                    label="Age"
                    placeholder="27"
                    value={informations.age}
                    onChange={handleChange}
                    error={errors.age}
                />

                <Field
                    name="nationality"
                    label="Nationalité"
                    placeholder="Française"
                    value={informations.nationality}
                    onChange={handleChange}
                    error={errors.nationality}
                />

                <Field
                    name="drivingLicence"
                    label="Permis de conduire"
                    placeholder="Permis B"
                    value={informations.drivingLicence}
                    onChange={handleChange}
                    error={errors.drivingLicence}
                />

                <Field
                    name="number"
                    label="Numéro de téléphone"
                    placeholder="0699396183"
                    value={informations.number}
                    onChange={handleChange}
                    error={errors.number}
                />

                <Field
                    name="address"
                    label="Adresse"
                    placeholder="31B rue du Faubourd d'Auvergne"
                    value={informations.address}
                    onChange={handleChange}
                    error={errors.address}
                />

                <Field
                    name="zipCode"
                    label="Code Postal"
                    placeholder="30100"
                    value={informations.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                />

                <Field
                    name="city"
                    label="Ville"
                    placeholder="Alès"
                    value={informations.city}
                    onChange={handleChange}
                    error={errors.city}
                />

                <Field
                    name="country"
                    label="Pays"
                    placeholder="France"
                    value={informations.country}
                    onChange={handleChange}
                    error={errors.country}
                />

                <Textarea
                    name="biography"
                    label="Biographie"
                    placeholder="Salut, moi c'est Nejma..."
                    value={informations.biography}
                    onChange={handleChange}
                    error={errors.biography}
                    type='textarea'
                />

                <label htmlFor="thumbnail" className='labelForInputsForm'>Vignette</label>
                <File
                    name="thumbnail"
                    label="Vignette"
                    className="formInformation-Thumbnail"
                    onChange={handleThumbnail}
                    error=''
                />
                <label htmlFor="video" className='labelForInputsForm'>Vidéo</label>
                <File
                    name="video"
                    label="Vidéo"
                    className="formInformation-Video"
                    onChange={handleVideo}
                    error=''
                />

                <div className="form-group">
                    <button type="submit" className="submitEditProject">
                        Enregistrer
                    </button>
                    <Link to="/tableau-de-bord" className="btnReturnToProjects">
                        Retour au tableau de bord
                    </Link>
                </div>

            </form>

            <Footer />
        </>
    );
};

export default Information;