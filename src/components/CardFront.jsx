import { FLIP_BACK, FLIP_FRONT } from "../pages/creditCardForm"

export default function CardFront({ cardNumber, name, expMonth, expYear, flipMode}) {
    let animation = ''
    if (flipMode == FLIP_BACK) {
        animation = 'go-back'
    } else if (flipMode == FLIP_FRONT) {
        animation = 'go-front'
    }

    // Formatage du numéro de carte bancaire
    function cc_format(value) {
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    return (
        <div className={`front-card ${animation}`} >
            <p className="card-number">{cc_format(cardNumber) || cc_format("0000000000000000")}</p>
            <div className="front-card-bottom">
                <p className="card-name">{name || 'VOTRE NOM'}</p>
                <p>
                    <span className="expiration-month">{expMonth || 'MM'}</span>
                    /
                    <span className="expiration-year">{expYear || 'YY'}</span>
                </p>
            </div>
        </div>
    )
};