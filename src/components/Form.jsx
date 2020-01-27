import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components/Input';
import { Button } from 'components/Button';

export class Form extends Component {
  static propTypes =  {
    handleSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    formValid: PropTypes.bool.isRequired,
  }

  render() {
    const { handleSubmit, onChange, formValid } = this.props;
    
    return (
      <Fragment>
        <form className="form" method="post" onSubmit = { handleSubmit }>
          <Input 
            type="text"
            title="id:"
            id="input-id"
            name="id"
            placeholder="101"
            onChange={onChange}
          />
          <Input 
            type="text"
            title="first name:"
            id="input-firstName"
            name="firstName"
            placeholder="Sue"
            onChange={onChange}
          />
          <Input 
             type="text"
             title="last name:"
             id="input-lastName"
             name="lastName"
             placeholder="Corson"
             onChange={onChange}
          />
          <Input 
             type="text"
             title="email:"
             id="input-email"
             name="email"
             placeholder="dwhalley@in.gov"
             onChange={onChange}
          />
          <Input 
             type="text"
             title="phone:"
             id="input-phone"
             name="phone"
             placeholder="(612)211-6296"
             onChange={onChange}
          />
          <Button 
            action="#"
            type="submit"
            title="Добавить в таблицу"
            disabled={!formValid}
            onClick={handleSubmit}
            />
        </form>
      </Fragment>
    );
  }
}
