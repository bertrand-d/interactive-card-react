import { useState } from 'react';
import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import FormField from '../components/FormField'

export default function CreditCardForm() {
  // Etat initial avec valeurs par défaut
  const initialState = {
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    secretCode: ''
  };

  const [values, setValues] = useState(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Gestionnaire de changement de valeur avec formatage
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validation des entrées selon le champ
    const formatters = {
      number: (val) => val.replace(/\D/g, ''),
      expMonth: (val) => {
        const num = parseInt(val);
        return num > 12 ? '12' : val.replace(/\D/g, '');
      },
      expYear: (val) => val.replace(/\D/g, ''),
      secretCode: (val) => val.replace(/\D/g, '')
    };

    const formattedValue = formatters[name] ? formatters[name](value) : value;

    setValues(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Gestion du flip de la carte
  const handleFocus = (event) => {
    const { dataset } = event.target;
    setIsCardFlipped(dataset.cardPosition === "back");
  };

  // Soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation et traitement du formulaire
    console.log('Formulaire soumis:', values);
  };

  return (
    <main className="main-card-page">
      <div className="main-left">
        <div className="bank-card-container">
          <div className="bank-card">
            <CardFront
              isFlipped={isCardFlipped}
              cardNumber={values.number}
              name={values.name}
              expMonth={values.expMonth}
              expYear={values.expYear}
            />
            <CardBack secretCode={values.secretCode} isFLipped={isCardFlipped}/>
          </div>
        </div>
      </div>

      <div className="main-right">
        <form onSubmit={handleSubmit} id="form-card">
          <FormField
            label="Cardholder Name"
            name="name"
            placeholder="e.g. Jane Appleseed"
            cardPosition="front"
            value={values.name}
            onChange={handleChange}
            onFocus={handleFocus}
          />

          <FormField
            label="Card Number"
            name="number"
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength="16"
            cardPosition="front"
            value={values.number}
            onChange={handleChange}
            onFocus={handleFocus}
          />

          <div className="form-block">
            <fieldset className="form-lane small-lane">
              <legend>Exp. Date (MM/YY)</legend>
              <div className="double-lane">
                <FormField
                  name="expMonth"
                  placeholder="MM"
                  maxLength="2"
                  cardPosition="front"
                  value={values.expMonth}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <FormField
                  name="expYear"
                  placeholder="YY"
                  maxLength="2"
                  cardPosition="front"
                  value={values.expYear}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </div>
            </fieldset>

            <FormField
              label="CVC"
              name="secretCode"
              placeholder="e.g. 123"
              maxLength="3"
              cardPosition="back"
              value={values.secretCode}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>

          <button type="submit" className="button">
            Confirm
          </button>
        </form>
      </div>
    </main>
  );
};