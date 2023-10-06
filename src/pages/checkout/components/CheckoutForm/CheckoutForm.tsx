import Input from '@/components/Input';
import styles from './CheckoutForm.module.scss';
import React from 'react';
import Text, { TextColor, TextView, TextWeight } from '@/components/Text';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import rootStore from '@/store/RootStore/instance';
import { observer } from 'mobx-react-lite';

const CheckoutForm: React.FC = () => {
  const [cardNumber, setCardNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNumberChange = React.useCallback((cardNumber: string) => {
    if (cardNumber.length > 16 || isNaN(+cardNumber)) {
      return;
    }
    setCardNumber(cardNumber);
  }, []);

  const handleNameChange = React.useCallback((name: string) => {
    if (name.split(' ').length > 2 || !/^[a-zA-Z\s]*$/.test(name)) {
      return;
    }
    setName(name);
  }, []);

  const handleExpiryDateChange = React.useCallback((expiryDate: string) => {
    if (expiryDate.length > 5) {
      return;
    }
    setExpiryDate(expiryDate);
  }, []);

  const handleCvvChange = React.useCallback((cvv: string) => {
    if (cvv.length > 3 || isNaN(+cvv)) {
      return;
    }
    setCvv(cvv);
  }, []);

  const handleSubmit = React.useCallback(() => {
    const regex = /^([0-9]{2})\/([0-9]{2})$/;
    const match = expiryDate.match(regex);

    if (!match) {
      setError('Invalid date');
      return;
    }
    if (+match[1] > 12) {
      setError('Invalid month');
      return;
    }
    if (+match[2] < 23) {
      setError('Invalid year');
      return;
    }

    if (cardNumber.length < 16 || isNaN(+cardNumber)) {
      setError('Invalid card number');
      return;
    }

    if (name.split(' ').length > 2 || !/^[a-zA-Z\s]*$/.test(name)) {
      setError('Invalid name');
      return;
    }

    if (cvv.length < 3 || isNaN(+cvv)) {
      setError('Invalid cvv');
      return;
    }

    setIsSubmitting(true);
    rootStore.cart.clear();
    error && setError('');
  }, [cardNumber, name, expiryDate, cvv]);

  React.useEffect(() => {
    rootStore.cart.clear();
  }, []);

  return (
    <div className={styles.checkoutForm}>
      <Input
        placeholder="Card number"
        value={cardNumber}
        onChange={handleNumberChange}
        className={styles.checkoutFormNumberInput}
      />
      <Input
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        className={styles.checkoutFormNameInput}
      />
      <Input
        placeholder="Expiry date (MM/YY)"
        value={expiryDate}
        onChange={handleExpiryDateChange}
        className={styles.checkoutFormExpiryDateInput}
      />
      <Input
        placeholder="CVV"
        value={cvv}
        type="password"
        onChange={handleCvvChange}
        className={styles.checkoutFormCvvInput}
      />
      <Text color={TextColor.Accent} weight={TextWeight.Medium}>
        {error}
      </Text>
      {isSubmitting ? (
        <>
          <Text
            view={TextView.P20}
            color={TextColor.Accent}
            weight={TextWeight.Medium}
          >
            Success!
          </Text>
          <Link to="/">
            <Button className={styles.checkoutFormButton}>Back to shop</Button>
          </Link>
        </>
      ) : (
        <Button onClick={handleSubmit} className={styles.checkoutFormButton}>
          Checkout
        </Button>
      )}
    </div>
  );
};

export default CheckoutForm;
