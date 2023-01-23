import React, { useEffect } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/itemsRedux';

const ListForm = ({ system }) => {
  const dispatch = useDispatch();

  type FormValues = {
    item: { name: string; amount: number; unit: string }[];
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      item: [{ name: '', amount: 1, unit: '' }],
    },
  });

  const { fields } = useFieldArray({
    name: 'item',
    control,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        item: [{ name: '', amount: 1, unit: '' }],
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = ({ ...data }: FormValues) => {
    console.log(data.item);
    data.item.forEach((element) => dispatch(addItem({ ...element })));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        return (
          <section key={field.id}>
            <label>
              <span>Name</span>
              <input
                type='string'
                {...register(`item.${index}.name`, {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
                placeholder='name'
              />
            </label>

            <label>
              <span>amount</span>
              <input
                type='number'
                min='1'
                {...register(`item.${index}.amount`, {
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'There must be at least one product of this kind',
                  },
                })}
                placeholder='amount'
              />
            </label>
            <label>
              <span>Unit</span>
              {system === 'metric' && (
                <select {...register(`item.${index}.unit`)}>
                  <option value=''>Select...</option>
                  <option value='millilitre'>millilitre</option>
                  <option value='litre'>litre</option>
                  <option value='milligram'>milligram</option>
                  <option value='gram'>gram</option>
                  <option value='kilogram'>kilogram</option>
                </select>
              )}
              {system === 'imperial' && (
                <select {...register(`item.${index}.unit`)}>
                  <option value=''>Select...</option>
                  <option value='fluid ounce'>fluid once</option>
                  <option value='pint'>pint</option>
                  <option value='gallon'>gallon</option>
                  <option value='ounce'>ounce</option>
                  <option value='pound'>pound</option>
                  <option value='stone'>stone</option>
                </select>
              )}
            </label>
          </section>
        );
      })}

      {/* <input
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
      )} */}

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
