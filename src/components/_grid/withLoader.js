import React from 'react';
import Loader from '../Loader/Loader';

const withLoader = (Element) => {
  return (({ loading, ...rest }) => {
    return (
      loading ? <Loader /> : <Element {...rest} />
    );
  });
};

export default withLoader;
