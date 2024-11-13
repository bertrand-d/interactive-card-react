import { useEffect, useState } from 'react';
import CardFront from '../components/cardFront';
import CardBack from '../components/CardBack';
import FormField from '../components/FormField';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export const FLIP_NEUTRAL = 0
export const FLIP_BACK = -1
export const FLIP_FRONT = 1

export default function CreditCardForm() {
  // Initial state with default values
  const initialState = {
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    secretCode: ''
  };

  const [values, setValues] = useState(initialState);
  const [flipMode, setFlipMode] = useState(FLIP_NEUTRAL)

  //Change value and format it
  const handleChange = (event) => {
    const { name, value } = event.target;

    const formatters = {
      number: (val) => val.replace(/\D/g, ''),
      expMonth: (val) => {
        const num = parseInt(val);
        return num > 12 ? '12' : val.replace(/\D/g, '');
      },
      expYear: (val) => val.replace(/\D/g, ''),
      secretCode: (val) => val.replace(/\D/g, '')
    };

    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FLip card on focus
  const handleFocus = (event) => {
    const { dataset } = event.target;
    let newFlipMode
    if (dataset.cardPosition === "back") {
      newFlipMode = FLIP_BACK
    } else if (dataset.cardPosition === "front" && flipMode === FLIP_NEUTRAL) {
      newFlipMode = FLIP_NEUTRAL
    } else {
      newFlipMode = FLIP_FRONT
    }
    setFlipMode(newFlipMode)
  };

  //schema validation form
  const schema = yup.object({
    name: yup.string()
      .required("Name is a required field"),
    number: yup.string()
      .matches(/^\d{16}$/, "Card number must have 16 numbers")
      .required("Card number is a required field"),
    expMonth: yup.string()
      .matches(/^\d{1,2}$/, "Month number must have 1 or 2 digits")
      .test("valid-month", "Month number must be between 1 and 12 digits",
        (value) => !value || (parseInt(value) >= 1 && parseInt(value) <= 12))
      .required("Month number is a required field"),
    expYear: yup.string()
      .matches(/^\d{2}$/, "Year expiration number must have 2 digits")
      .required("Year expiration number is a required field"),
    secretCode: yup.string()
      .matches(/^\d{3}$/, "Secret code number must have 3 digits")
      .required("Secret code number is a required field"),
  });

  //react hook form for validation
  const { register, reset, handleSubmit, formState, formState: { errors } } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log("data", data)
  }

  //form state submit
  const [displaySuccessPopup, setDisplaySuccessPopup ] = useState(false)
  useEffect(() => {
    if(formState.isSubmitSuccessful){
      setDisplaySuccessPopup(true)
      reset({
        data: initialState,
      })
    }
  }, [formState])
  

  return (
    <main className="main-card-page">
      <div className="main-left">
        <div className="bank-card-container">
          <div className="bank-card">
            <CardFront
              cardNumber={values.number}
              name={values.name}
              expMonth={values.expMonth}
              expYear={values.expYear}
              flipMode={flipMode}
            />
            <CardBack secretCode={values.secretCode} flipMode={flipMode} />
          </div>
        </div>
      </div>

      <div className="main-right">
        <form className="form-card" name="form-card">
          <FormField
            label="Cardholder Name"
            cardPosition="front"
            placeholder="e.g. Jane Appleseed"
            onChange={handleChange}
            onFocus={handleFocus}
            register={{ ...register("name") }}
          />
          {
            errors.name &&
            <span className="invalid-input">{errors.name?.message?.toString()}</span>
          }

          <FormField
            label="Card Number"
            name="number"
            maxLength="16"
            placeholder="e.g. 1234 5678 9123 0000"
            cardPosition="front"
            onChange={handleChange}
            onFocus={handleFocus}
            register={{ ...register("number") }}
          />
          {
            errors.number &&
            <span className="invalid-input">{errors.number?.message?.toString()}</span>
          }

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
                  register={{ ...register("expMonth") }}
                />

                <FormField
                  name="expYear"
                  placeholder="YY"
                  maxLength="2"
                  cardPosition="front"
                  value={values.expYear}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  register={{ ...register("expYear") }}
                />
              </div>
            </fieldset>
            <fieldset className="form-lane small-lane">
              <FormField
                label="CVC"
                name="secretCode"
                placeholder="e.g. 123"
                maxLength="3"
                cardPosition="back"
                value={values.secretCode}
                onChange={handleChange}
                onFocus={handleFocus}
                register={{ ...register("secretCode") }}
              />
            </fieldset>
          </div>
          {
            errors.expMonth &&
            <span className="invalid-input">{errors.expMonth?.message?.toString()}</span>
          }
          {
            errors.expYear &&
            <span className="invalid-input">{errors.expYear?.message?.toString()}</span>
          }
          {
            errors.secretCode &&
            <span className="invalid-input">{errors.secretCode?.message?.toString()}</span>
          }
          <button type="submit" className="button" form="form-card" onClick={handleSubmit(onSubmit)}>
            Confirm
          </button>
        </form>
      </div>
      {
        displaySuccessPopup &&
        <div className="finish">
          <p className="big-font">THANK YOU !</p>
          <p className="grey-font">We've added your card details</p>
          <div className="button" onClick={()=>(setDisplaySuccessPopup(false))}>
            Continue
          </div>
        </div>
      }
    </main>
  );
};