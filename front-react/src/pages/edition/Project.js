import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Field from '../../components/forms/Field';
import File from '../../components/forms/File';
import Textarea from '../../components/forms/Textarea';
import Navigation from '../../components/Navigation';
import { toast } from "react-toastify";
import '../../assets/styles/pages/_project.scss';
import ProjectApi from '../../services/ProjectApi';
import { Link, useParams } from 'react-router-dom';
import Dropzone from "dropzone";
import Datetime from '../../components/forms/Datetimes';


const Project = () => {
    
    const id  = useParams().projectId;
    
    const [project, setProject] = useState({
        name: "",
        description: "",
        language: "",
        company: "",
        framework: "",
        dateOfCreation:""
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        language: "",
        company: "",
        framework: "",
        dateOfCreation:""
    });

    const [editing, setEditing] = useState(false);

    // Récupération du projet en fonction de l'identifiant
    const fetchProject = async id => {
        try {
            const { name, description, language, company, framework, dateOfCreation } = await ProjectApi.find(
                id
            );
            setProject({ name, description, language, company, framework, dateOfCreation });
        } catch (error) {
            toast.error("Le projet n'a pas pu être chargé");
        }
    };

    // Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
        useEffect(() => {
            if (id !== "new") {
            setEditing(true);
            fetchProject(id);
            }
        }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {

        const { name, value } = currentTarget;
        setProject({ ...project, [name]: value });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});

            if (editing) {
                await ProjectApi.update(id, project);
                toast.success("Le client a bien été modifié");
            } else {
                await ProjectApi.create(project);
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
                <h1>Editer un projet</h1>
                <Field
                    name="name"
                    label="Nom du projet"
                    placeholder="ShonenJump"
                    value={project.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <Textarea
                    name="description"
                    label="Description"
                    placeholder="Je vous présente..."
                    value={project.description}
                    onChange={handleChange}
                    error={errors.description}
                    type='textarea'
                />

                <File
                    name="thumbnail"
                    label="Vignette"
                    value=''
                    className="formProject-Thumbnail"
                    onChange={handleChange}
                    error=''
                />

                <File
                    name="secondPicture"
                    label="Image de couverture"
                    value=''
                    className="formProject-SecondPicture"
                    onChange={handleChange}
                    error=''
                />

                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="ex: Biyn Media"
                    value={project.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <Field
                    name="language"
                    label="Langages"
                    placeholder="ex: PHP, Javascript"
                    value={project.language}
                    onChange={handleChange}
                    error={errors.language}
                />

                <Field
                    name="framework"
                    label="Frameworks"
                    placeholder="ex: Symfony, ReactJs"
                    value={project.framework}
                    onChange={handleChange}
                    error={errors.framework}
                />

                <Datetime
                    name="dateOfCreation"
                    label="Date de création"
                    value={new Date(project.dateOfCreation)}
                    onChange={handleChange}
                    error={errors.dateOfCreation}
                />

                <div className="form-group">
                    <button type="submit" className="submitEditProject">
                        Enregistrer
                    </button>
                    <Link to="/tous-les-projets" className="btnReturnToProjects">
                        Retour à la liste
                    </Link>
                </div>

            </form>

            <Footer />
        </>
    );
};

export default Project;