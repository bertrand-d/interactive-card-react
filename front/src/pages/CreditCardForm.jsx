import { useState } from 'react';
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

    const formattedValue = formatters[name] ? formatters[name](value) : value;
    setValues(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // FLip card on focus
  const handleFocus = (event) => {
    const { dataset } = event.target;
    const newFlipMode = dataset.cardPosition === "back" ? FLIP_BACK : FLIP_FRONT
    setFlipMode(newFlipMode)
  };

  //schema validation form
  const schema = yup
    .object({
      name: yup.string().required("Name is a required file"),
      number: yup.string().min(16).max(16).required("Card number is a required file"),
      expMonth: yup.number().transform((value) => Number.isNaN(value) ? null : value)
        .min(2, "Expiration month must be equal to 2 numbers length").max(2, "Expiration month must be equal to 2 numbers length").positive("Expiration month must be a positive number").integer().required("Expiration month is a required file"),
      expYear: yup.number().transform((value) => Number.isNaN(value) ? null : value)
        .min(2, "Expiration year must be equal to 2 numbers length").max(2, "Expiration year must be equal to 2 numbers length").positive("Expiration year must be a positive number").integer().required("Expiration year is a required file"),
      secretCode: yup.number().transform((value) => Number.isNaN(value) ? null : value)
        .min(3, "Secret code must be equal to 3 numbers length").max(3, "Secret code must be equal to 3 numbers length").positive("Secret code must be a positive number").integer().required("Secret code is a required file"),
    })
    .required()

  //react hook form for validation
  const { register, handleSubmit, formState, formState: { errors } } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  })

  console.log(errors)
  const onSubmit = (data) => {
    console.log("data")
  }

  //form state submit
  const { isSubmitting, isSubmitSuccessful } = formState

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
        <form onSubmit={handleSubmit(onSubmit)} id="form-card" name="form-card">
          <FormField
            type="text"
            label="Cardholder Name"
            name="name"
            placeholder="e.g. Jane Appleseed"
            cardPosition="front"
            value={values.name}
            onChange={handleChange}
            onFocus={handleFocus}
            register={register("name")}
          />
          {
            errors.name &&
            <span className="invalid-input">{errors.name?.message?.toString()}</span>
          }

          <FormField
            type="number"
            label="Card Number"
            name="number"
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength="16"
            cardPosition="front"
            value={values.number}
            onChange={handleChange}
            onFocus={handleFocus}
            onRegister={register("number")}
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
                  type="number"
                  name="expMonth"
                  placeholder="MM"
                  maxLength="2"
                  cardPosition="front"
                  value={values.expMonth}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onRegister={register("expMonth")}
                />

                <FormField
                  type="number"
                  name="expYear"
                  placeholder="YY"
                  maxLength="2"
                  cardPosition="front"
                  value={values.expYear}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onRegister={register("expYear")}
                />
              </div>
            </fieldset>
            <fieldset className="form-lane small-lane">
              <FormField
                type="number"
                label="CVC"
                name="secretCode"
                placeholder="e.g. 123"
                maxLength="3"
                cardPosition="back"
                value={values.secretCode}
                onChange={handleChange}
                onFocus={handleFocus}
                onRegister={register("secretCode")}
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
    </main>
  );
};