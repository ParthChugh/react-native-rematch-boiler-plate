import React from 'react';
import ResetPasswordOtp from './ResetPassowrdOtp';

const CreateAccount = props => {
  return <ResetPasswordOtp {...props} createAccount={true} />;
};

export default CreateAccount;
