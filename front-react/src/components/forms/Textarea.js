import React from "react";

const Textarea = ({
    name,
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    error = ""
}) => (
    <div className="form-group">
        <label className="labelForm" htmlFor={name}>{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder || label}
            name={name}
            id={name}
            className={"form-control" + (error && " is-invalid")}
        >
        </textarea>
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Textarea;