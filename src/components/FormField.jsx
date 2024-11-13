import React from 'react'

export default function FormFieldBebou({label, placeholder, maxLength, cardPosition, onChange, onFocus, register}) {
    const {name, value, onChange: onChangeForm, ref } = register
    return (
        <div className="form-lane">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                placeholder={placeholder}
                maxLength={maxLength}
                data-card-position={cardPosition}
                required
                name={name}
                value={value}
                onChange={(e) => {
                    onChangeForm(e)
                    onChange(e)
                }}
                onFocus={onFocus}
                ref = {ref}
            />
        </div>
    )
}