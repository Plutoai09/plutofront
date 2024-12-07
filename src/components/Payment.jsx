import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #00000;
`;

const PaymentCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const PaymentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const BackIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  border-radius: 4px;
  font-size: 14px;
  background-color: #f8f8f8;
`;

const PaymentIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 24px;
  margin: 0 8px;
`;

const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(89);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
  };

  const handleBack = () => {
    window.location.href = 'https://getpluto.in';
  };

  const handlePayment = async () => {
    // Reset previous errors
    setEmailError('');
    setPhoneError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
    }

    // Validate phone
    if (!phone) {
      setPhoneError('Phone number is required');
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    }

    // Check if there are any validation errors
    if (!email || !phone || !validateEmail(email) || !validatePhone(phone)) {
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load');
        setLoading(false);
        return;
      }

      // Create order via your backend
      const { data } = await axios.post('http://127.0.0.1:5000/api/create-order', {
        amount: 200, // Amount in paise (e.g., 1000 paise = ₹10)
        currency: 'INR'
      });
      console.log(data)
      const options = {
        key: 'rzp_live_gC8XrdngTZTdd8', // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'Pluto',
        description: 'Art of Conversation',
        image: '/public/logo.png',
        order_id: data.id,
        handler: async (response) => {
          try {
            // Verify payment on your backend
            const verifyResponse = await axios.post(
              'http://127.0.0.1:5000/api/verify-payment',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              window.location.href = '/login';
            } else {
              alert('Payment Verification Failed');
            }
          } catch (error) {
            alert('Payment Verification Error');
            console.error(error);
          }
        },
        prefill: {
          name: 'Customer Name',
          email: email,
          contact: phone,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#000',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('Error initiating payment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Placeholder for actual icon paths
  const paymentIcons = [
    { src: '/images/icon1.webp', alt: 'Visa' },
    { src: '/images/icon2.png', alt: 'Mastercard' },
    { src: '/images/icon3.webp', alt: 'American Express' },
    { src: '/images/icon4.svg', alt: 'American Express' }
  ];

  return (
    <PaymentContainer>
      <PaymentCard>
        <PaymentHeader>
          <BackButton onClick={handleBack}>
            <BackIcon src="/images/back.svg" alt="Back" />
          </BackButton>
          <Title>Payment Details</Title>
        </PaymentHeader>
        <InputContainer>
          <InputLabel>Amount</InputLabel>
          <InputField value={`₹${amount}.00`} disabled />
        </InputContainer>
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={!!emailError}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <InputLabel>Phone</InputLabel>
          <InputField
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            error={!!phoneError}
          />
          {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
        </InputContainer>
        <PaymentIcons>
          {paymentIcons.map((icon, index) => (
            <IconWrapper key={index}>
              <IconImage src={icon.src} alt={icon.alt} />
            </IconWrapper>
          ))}
        </PaymentIcons>
        <PayButton disabled={loading} onClick={handlePayment}>
          {loading ? 'Processing...' : `Pay ₹${amount}.00`}
        </PayButton>
      </PaymentCard>
    </PaymentContainer>
  );
};

export default Payment;