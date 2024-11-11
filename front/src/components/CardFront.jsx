export default function CardFront({ cardNumber, name, expMonth, expYear, isFlipped }) {
    console.log(isFlipped)
    return (
        <div className={`front-card ${isFlipped ? 'go-back' : 'go-front'}`} >
            <p id="card-number">{cardNumber || '0000000000000000'}</p>
            <div className="front-card-bottom">
                <p id="card-name">{name || 'VOTRE NOM'}</p>
                <p>
                    <span id="expiration-month">{expMonth || 'MM'}</span>
                    /
                    <span id="expiration-year">{expYear || 'YY'}</span>
                </p>
            </div>
        </div>
    )
};