import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75vh;
  background-color: #ffffff;
  padding-top: 24px;
`;

const PaymentCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 0;
  box-shadow: none;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
`;

const PaymentHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  border: none;
  color: #000000;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 12px;
  padding: 4px 8px;
`;

const InputContainer = styled.div`
  margin-bottom: 32px;
`;

const InputLabel = styled.span`
  display: block;
  font-size: 16px;
  color: #000000;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d4d4d4;
  border-radius: 0;
  font-size: 18px;
`;

const BottomSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
`;

const PaymentIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f2f2f2;
  padding: 16px 0;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  margin: 0 10px;
`;

const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 18px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(89);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Input validation
    if (!email || !phone) {
      alert('Please enter email and phone number');
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
        amount: 8900, // Amount in paise (e.g., 1000 paise = ₹10)
        currency: 'INR',
      });
      console.log(data)
      const options = {
        key: 'rzp_live_gC8XrdngTZTdd8', // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'Pluto',
        description: 'Test Transaction',
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
              alert('Payment Successful!');
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
          color: '#000000', // Changed to match original design
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

  // Placeholder for actual icon paths
  const paymentIcons = [
    { src: '/images/icon1.webp', alt: 'Visa' },
    { src: '/images/icon2.png', alt: 'Mastercard' },
    { src: '/images/icon3.png', alt: 'American Express' },
    { src: '/images/icon4.svg', alt: 'American Express' }
  ];

  return (
    <PaymentContainer>
      <PaymentCard>
        <div>
          <PaymentHeader>
            <Title>
              <BackButton>←</BackButton>
              Payment Details
            </Title>
          </PaymentHeader>
          <InputContainer>
            <InputLabel>Amount</InputLabel>
            <InputField 
              value={`₹${amount}.00`} 
              disabled 
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Email</InputLabel>
            <InputField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Phone</InputLabel>
            <InputField
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </InputContainer>
        </div>
        <BottomSection>
          <PaymentIcons>
            {paymentIcons.map((icon, index) => (
              <IconWrapper key={index}>
                <IconImage 
                  src={icon.src} 
                  alt={icon.alt} 
                />
              </IconWrapper>
            ))}
          </PaymentIcons>
          <PayButton disabled={loading} onClick={handlePayment}>
            {loading ? 'Processing...' : `Pay ₹${amount}.00`}
          </PayButton>
        </BottomSection>
      </PaymentCard>
    </PaymentContainer>
  );
};

export default Payment;