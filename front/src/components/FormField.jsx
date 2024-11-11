// Composant pour le champ de formulaire
export default function FormField({ label, name, placeholder, maxLength, cardPosition, value, onChange, onFocus }) {
    return (
        <div className="form-lane">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                data-card-position={cardPosition}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                required
            />
        </div>
    )
};