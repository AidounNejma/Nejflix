import React from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import 'moment/locale/fr';

const Datetimes = ({
    name,
    label,
    value,
    onChange,
    error = ""
}) => (
    <div className="form-group">
        <label className="labelForm" htmlFor={name}>{label}</label>
        <Datetime
            locale="fr-ca"  
            onChange={onChange}
            name={name}
            id={name}
            value={value}
        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Datetimes;