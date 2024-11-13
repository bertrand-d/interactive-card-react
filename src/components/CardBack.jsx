import { FLIP_BACK, FLIP_FRONT } from "../pages/creditCardForm"

export default function CardBack({ secretCode, flipMode }) {
    let animation = ''
    if (flipMode == FLIP_BACK) {
        animation = 'go-front'
    } else if (flipMode == FLIP_FRONT) {
        animation = 'go-back'
    }

    return (
        <div className={`back-card ${animation}`}>
            <p className="secret-code">{secretCode || '•••'}</p>
        </div>
    )
};