import './sass/main.scss';

function App() {
  return (
    <>
      <main className="main-card-page">
        <div className="main-left">
          <div className="bank-card-container">
            <div className="bank-card">
              <div className="front-card">
                <p id="card-number">0000 0000 0000 0000</p>
                <div className="front-card-bottom">
                  <p id="card-name">name</p>
                  <p><span id="expiration-month">00</span> / <span id="expiration-year">00</span></p>
                </div>
              </div>
              <div className="back-card">
                <p id="secret-code">000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-right">
          <form action="" method="push" id="form-card">
            <div className="form-lane">
              <label htmlFor="cardholder-name">Cardholder Name </label>
              <input type="text" name="name" id="cardholder-name" placeholder="e.g. Jane Appleseed"
                data-text-replicate="card-name" data-card-position="front" required />
            </div>
            <div className="form-lane">
              <label htmlFor="card-number-front">Card Number </label>
              <input type="text" name="card-number-front" id="card-number-front" placeholder="e.g. 1234 5678 9123 0000"
                maxLength="16" data-text-replicate="card-number" data-card-position="front" required />
            </div>
            <div className="form-block">
              <fieldset className="form-lane small-lane">
                <legend>Exp. Date (MM/YY)</legend>
                <div className="double-lane">
                  <label htmlFor="expiration-month"></label>
                  <input type="text" name="expiration-month" placeholder="MM" maxLength="2" id="expiration-month-input"
                    data-text-replicate="expiration-month" data-card-position="front" required />
                  <label htmlFor="expiration-year"></label>
                  <input type="text" name="expiration-year" placeholder="YY" maxLength="2" id="expiration-year-input"
                    data-text-replicate="expiration-year" data-card-position="front" required />
                </div>
              </fieldset>
              <div className="form-lane">
                <label htmlFor="secret-code">CVC</label>
                <input type="text" name="secret-code" placeholder="e.g. 123" id="secret-code-input"
                  data-text-replicate="secret-code" maxLength="3" data-card-position="back" required />
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
