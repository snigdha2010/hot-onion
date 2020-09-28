import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';

const Shipment = () => {
   
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className = 'ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="example" defaultValue="test" ref={register} />
      <input name="name" ref={register({ required: true })}  placeholder='name'/>
      {errors.name && <span className='error'>This name is required</span>}

      <input name="email" ref={register({ required: true })} />
      {errors.email && <span className='error'>This email is required</span>}

      <input name="name" ref={register({ required: true })} />
      {errors.name && <span className='error'>This field is required</span>}

      <input name="name" ref={register({ required: true })} />
      {errors.name && <span className='error'>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;