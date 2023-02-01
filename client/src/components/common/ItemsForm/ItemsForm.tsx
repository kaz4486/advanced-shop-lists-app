import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../redux/itemsRedux';

const ItemsForm = ({ system, setSubmitedListError }) => {
  const dispatch = useDispatch();

  type FormValues = {
    item: { name: string; amount: number; unit: string; volume: number }[];
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      item: [{ name: '', amount: 1, unit: '', volume: 0 }],
    },
  });

  const { fields, append, prepend, remove, update } = useFieldArray({
    name: 'item',
    control,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        item: [{ name: '', amount: 1, unit: '', volume: 0 }],
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onItemSubmit = ({ ...data }: FormValues) => {
    setSubmitedListError(false);
    data.item.forEach((element) => dispatch(addItem({ ...element })));
  };

  const ConditionallInput = ({ control, index, field }) => {
    const value = useWatch({
      name: 'item',
      control,
    });

    return (
      <Controller
        control={control}
        name={`item.${index}.volume`}
        render={({ field }) =>
          value?.[index]?.unit !== '' ? (
            <input
              type='number'
              min='0'
              {...register(`item.${index}.volume`, {
                disabled: false,
                valueAsNumber: true,
                required: {
                  value: true,
                  message: 'You must insert volume of this product',
                },
                min: {
                  value: 1,
                  message: 'There must be at least one product of this kind',
                },
              })}
            />
          ) : (
            <input
              type='number'
              min='0'
              {...register(`item.${index}.volume`, {
                disabled: true,
                valueAsNumber: true,
              })}
            />
          )
        }
      ></Controller>
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onItemSubmit)}>
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
                <p>{errors.item?.[index]?.name?.message}</p>
              </label>

              <label>
                <span>amount</span>
                <input
                  type='number'
                  min='1'
                  {...register(`item.${index}.amount`, {
                    required: {
                      value: true,
                      message: 'Amount is required',
                    },
                    valueAsNumber: true,
                    min: 1,
                  })}
                  placeholder='amount'
                />
                <p>{errors.item?.[index]?.amount?.message}</p>
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
              <label>
                <span>volume</span>
                <ConditionallInput
                  key={field.id}
                  {...{ control, index, field }}
                />
                <p>{errors.item?.[index]?.volume?.message}</p>
              </label>
              <button type='button' onClick={() => remove(index)}>
                Remove
              </button>
              <button
                type='button'
                onClick={() =>
                  update(index, { name: '', amount: 1, unit: '', volume: 0 })
                }
              >
                Reset
              </button>
            </section>
          );
        })}
        <button
          type='button'
          onClick={() => {
            append({
              name: '',
              amount: 1,
              unit: '',
              volume: 0,
            });
          }}
        >
          Append
        </button>
        <button
          type='button'
          onClick={() => {
            prepend({
              name: '',
              amount: 1,
              unit: '',
              volume: 0,
            });
          }}
        >
          Prepend
        </button>
        <button type='submit'>Create</button>
      </form>
    </Container>
  );
};

export default ItemsForm;
