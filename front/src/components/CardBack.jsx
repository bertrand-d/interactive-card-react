export default function CardBack({ secretCode, isFLipped }) {
    return (
        <div className={`back-card ${isFLipped ? 'go-front' : 'go-back'}`}>
            <p id="secret-code">{secretCode || '•••'}</p>
        </div>
    )
};