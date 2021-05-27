import * as React from 'react';
import PropTypes from 'prop-types';

const ErrorMsg = ({ errorState: [errors, setErrors] }) => {
  const lastError = React.useRef('');

  React.useEffect(() => {
    let isMounted = true;

    if (errors.message) {
      if (lastError.current?.message) {
        lastError.current = errors;
      }
    }

    // eslint-disable-next-line no-return-assign
    return () => isMounted = false;
  }, [errors.message]);
  return (
    <aside id="error-msg">
      {console.errors}
      {errors.message}
    </aside>
  );
};

export default ErrorMsg;

ErrorMsg.propTypes = {
  errorState: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])).isRequired,
};
