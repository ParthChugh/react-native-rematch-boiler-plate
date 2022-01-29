import React from 'react';
import ResetPassword from './ResetPassword';

const CreateAccount = props => {
  return <ResetPassword {...props} createAccount={true} />;
};

export default CreateAccount;
