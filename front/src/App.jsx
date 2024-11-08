import './sass/main.scss';
import { useState, useRef } from 'react';

function App() {

  const [values, setValues] = useState({
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    secretCode: ''
  })

  const handleChange = (event) => {
    //get the name and the value of the target element
    const { name, value } = event.target;

    //keep all values, and change only element targeted
    setValues({
      ...values,
      [name]: value
    })
  }

  const cardBack = useRef(null);
  const cardFront = useRef(null);

  const handleFocus = (event) => {
    const { dataset } = event.target

    //if the focus is on an input connected to the back of the card, and the back card element only contain "back-card" class, than back card go to the front
    if (dataset.cardPosition === "back" && cardBack.current.classList.contains("back-card")) {
      cardBack.current.className = "back-card go-front"
      cardFront.current.className = "front-card go-back"
    } else {
      cardBack.current.className = "back-card go-back"
      cardFront.current.className = "front-card go-front"
    }
  }


  return (
    <>
      <main className="main-card-page">
        <div className="main-left">
          <div className="bank-card-container">
            <div className="bank-card">
              <div className="front-card" ref={cardFront}>
                <p id="card-number">{values.number}</p>
                <div className="front-card-bottom">
                  <p id="card-name">{values.name}</p>
                  <p>
                    <span id="expiration-month">{values.expMonth}</span>
                    /
                    <span id="expiration-year">{values.expYear}</span></p>
                </div>
              </div>
              <div className="back-card" ref={cardBack}>
                <p id="secret-code">{values.secretCode}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-right">
          <form action="" method="push" id="form-card">
            <div className="form-lane">
              <label htmlFor="cardholder-name">Cardholder Name </label>
              <input type="text" name="name" id="cardholder-name" placeholder="e.g. Jane Appleseed"
                data-card-position="front" value={values.name} onChange={handleChange} onFocus={handleFocus} required />
            </div>
            <div className="form-lane">
              <label htmlFor="card-number-front">Card Number </label>
              <input type="text" name="number" id="card-number-front" placeholder="e.g. 1234 5678 9123 0000"
                maxLength="16" data-card-position="front" value={values.number} onChange={handleChange} onFocus={handleFocus} required />
            </div>
            <div className="form-block">
              <fieldset className="form-lane small-lane">
                <legend>Exp. Date (MM/YY)</legend>
                <div className="double-lane">
                  <label htmlFor="expiration-month"></label>
                  <input type="text" name="expMonth" placeholder="MM" maxLength="2" id="expiration-month-input"
                    data-card-position="front" value={values.expMonth} onChange={handleChange} onFocus={handleFocus} required />
                  <label htmlFor="expiration-year"></label>
                  <input type="text" name="expYear" placeholder="YY" maxLength="2" id="expiration-year-input"
                    data-card-position="front" value={values.expYear} onChange={handleChange} onFocus={handleFocus} required />
                </div>
              </fieldset>
              <div className="form-lane">
                <label htmlFor="secret-code">CVC</label>
                <input type="text" name="secretCode" placeholder="e.g. 123" id="secret-code-input"
                  maxLength="3" data-card-position="back" value={values.secretCode} onChange={handleChange} onFocus={handleFocus} required />
              </div>
            </div>
            <input type="submit" className="button" id="valid-form-button" value="Confirm" />
          </form>
          <div id="finish">
            <p className="big-font">THANK YOU !</p>
            <p className="grey-font">We've added your card details</p>
            <div className="button" id="continue">
              Continue
            </div>
          </div>
        </div>
      </main>
      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://d-bertrand.fr">Delphine Bertrand</a>.
      </footer>
    </>
  )
}

export default App
