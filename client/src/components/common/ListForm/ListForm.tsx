import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/itemsRedux';

const ListForm = ({ system }) => {
  const dispatch = useDispatch();

  type FormValues = {
    name: string;
    amount: number;
    unit: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      amount: 1,
      unit: '',
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        amount: 1,
        unit: '',
      });
    }
  }, [formState.isSubmitSuccessful, reset]);

  const onSubmit = ({ ...data }: FormValues) => {
    dispatch(addItem({ ...data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='string'
        {...register('name', {
          required: {
            value: true,
            message: 'Name is required',
          },
        })}
        placeholder='name'
      />
      <p>{errors.name?.message}</p>
      <input
        type='number'
        min='1'
        {...register('amount', {
          valueAsNumber: true,
          min: {
            value: 1,
            message: 'There must be at least one product of this kind',
          },
        })}
        placeholder='amount'
      />
      <p>{errors.amount?.message}</p>
      {system === 'metric' && (
        <select {...register('unit')}>
          <option value=''>Select...</option>
          <option value='millilitre'>millilitre</option>
          <option value='litre'>litre</option>
          <option value='milligram'>milligram</option>
          <option value='gram'>gram</option>
          <option value='kilogram'>kilogram</option>
        </select>
      )}
      {system === 'imperial' && (
        <select {...register('unit')}>
          <option value=''>Select...</option>
          <option value='fluid ounce'>fluid once</option>
          <option value='pint'>pint</option>
          <option value='gallon'>gallon</option>
          <option value='ounce'>ounce</option>
          <option value='pound'>pound</option>
          <option value='stone'>stone</option>
        </select>
      )}

      <button type='submit'>Create</button>
      <button type='reset'>Reset</button>
    </form>
  );

  //   const [name, setName] = useState('');
  //   const [amount, setAmount] = useState('');
  //   // const [amount, setAmount] = useState('')
  //   // const [amount, setAmount] = useState('')

  //   const dispatch = useDispatch();

  //   const handleAddItem = (e) => {
  //     e.preventDefault();
  //     dispatch(addItem({ name, amount }));
  //     setName('');
  //     setAmount('');
  //   };

  //   const handleClearItem = (e) => {
  //     e.preventDefault();
  //     setName('');
  //     setAmount('');
  //   };
  //   return (
  //     <form onSubmit={handleAddItem}>
  //       <input
  //         type='text'
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //       <input
  //         type='text'
  //         value={amount}
  //         onChange={(e) => setAmount(e.target.value)}
  //       />

  //       <button type='submit'>Add item</button>
  //       <button type='reset' onClick={handleClearItem}>
  //         Clear item
  //       </button>
  //     </form>
  //   );
};

export default ListForm;
