import React from 'react';
import { useEffect, useState } from 'react';
import { Student } from '../../interfaces/student/Student';
import { useForm } from 'react-hook-form';
import TextField from '../../components/shared/FormInputs/TextField';
import SelectField from '../../components/shared/FormInputs/SelectFIeld';
import { CheckboxList } from '../../components/shared/FormInputs/CheckBox';
import { StudentService } from '../../services/students/StudentsService';

import './StudentRegister.scss';

const StudentRegister = () => {

  const [canSubmit, setCanSubmit] = useState(false);

  const {register, handleSubmit, formState: {errors}, control, getValues, watch} = useForm<Student>();

  // useEffect(() => {
  //   if (watch('first_name') && watch('last_name') && watch('birth_date') && watch('age')){
  //     setCanSubmit(true);
  //   } else {
  //     setCanSubmit(false);
  //   }
  // }, [
  //     watch('first_name'),
  //     watch('last_name'),
  //     watch('birth_date'),
  //     watch('age'),
  // ]);

  return (
    <div className='Student-Register'>
      <div className='container-fluid-mb-3 form-group'>
        <h1>Student Register</h1>
        <h2>Student Personal Data</h2>
        <div className="row">
          <div className="col-4">
            <TextField
              label="First Name"
              field="first_name"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Last Name"
              field="last_name"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label htmlFor="">Photo</label>
            <input type="file" className='form-control' />
          </div>
          <div className="col-4">
            <p>Photo Prewiew</p>
            ...
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <TextField
              label='Birth Date'
              field='birth_date'
              type='date'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-2">
            <TextField
              label='Age'
              field='age'
              type='number'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-3">
            <SelectField
              label='Gender'
              field='gender'
              errors={errors}
              control={control}
              options={[
                { value: 1, label: 'Masculino' },
                { value: 2, label: 'Femenino' },
                { value: 3, label: 'Otro' }
              ]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextField
              label='Address'
              field='address'
              type='text'
              register={register}
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-3">
            <SelectField
              label='Transport_type'
              field='trans_type'
              errors={errors}
              control={control}
              options={[
                { value: 1, label: 'Transporte Público' },
                { value: 2, label: 'Caminando' },
                { value: 3, label: 'Bicicleta' },
                { value: 4, label: 'Transporte Privado' },
                { value: 5, label: 'Transporte Personal' },
                { value: 6, label: 'Carpool' },
                { value: 7, label: 'Otro' }
              ]}
            />
          </div>
          <div className="col-2">
            <SelectField
              label='Civil Status'
              field='civil_status'
              errors={errors}
              control={control}
              options={[
                { value: 1, label: 'Casado' },
                { value: 2, label: 'Soltero' },
                { value: 3, label: 'Divorciado' },
                { value: 4, label: 'Viudo' }
              ]}
            />
          </div>
        </div>
        <h2>Tutor Information</h2>
        <div className="row">
          <div className="col-4">
            <TextField
              label="Tutor Name"
              field="tutor_name"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Phone"
              field="tutor_phone"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Age"
              field="tutor_age"
              register={register}
              type='number'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextField
              label="Tutor Address"
              field="tutor_address"
              register={register}
              type='text'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Tutor Email"
              field="tutor_email"
              register={register}
              type='email'
              rules={{ required: 'This field is required' }}
              errors={errors}
            />
          </div>
          <div className="row">
            <div className="col-8">
              <button className="btn btn-primary xl" onClick={handleSubmit((data) => console.log(data))} disabled={!canSubmit}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
