import { FLIP_BACK, FLIP_FRONT } from "../pages/creditCardForm"

export default function CardFront({ cardNumber, name, expMonth, expYear, flipMode}) {
    let animation = ''
    if (flipMode == FLIP_BACK) {
        animation = 'go-back'
    } else if (flipMode == FLIP_FRONT) {
        animation = 'go-front'
    }

    return (
        <div className={`front-card ${animation}`} >
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