// Composant pour le champ de formulaire
export default function FormField({type, label, name, placeholder, maxLength, cardPosition, value, onChange, onFocus, onRegister }) {
    return (
        <div className="form-lane">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                data-card-position={cardPosition}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                register = {onRegister}
                required
            />
        </div>
    )
};