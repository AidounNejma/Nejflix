import React from "react";

const File = ({
    name,
    label,
    onChange,
    type = "file",
    error = "",
    className=""
}) => (
    <div className="form-group">
        <label className="labelForm" htmlFor={name}>{label}</label>
        <input
            onChange={onChange}
            type={type}
            name={name}
            id={name}
            className={className + " form-control" + (error && " is-invalid")}
        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default File;