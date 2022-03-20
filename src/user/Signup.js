import React, {useState} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import { API } from '../config'
import { signup } from '../auth/index';

const Signup = () => {
    const[values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password,success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

   

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

  const signUpForm = () => {
      return(
      <form style={{padding:30}}>
        <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input type="text" className='form-control' value={name} onChange={handleChange('name')}></input>
        </div>
        <div className='form-group'>
            <label className='text-muted'>Email</label>
            <input type="email" className='form-control' value={email} onChange={handleChange('email')}></input>
        </div>
        <div className='form-group'>
            <label className='text-muted'>Password</label>
            <input type="password" className='form-control' value={password} onChange={handleChange('password')}></input>
        </div>
        <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
      </form>
      );
  }

  const showError = () => (
      <div className='alert alert-danger' style={{display: error ? '': 'none'}}>
        {error}
      </div>
  )

  const showSuccess = () => (
    <div className='alert alert-info' style={{display: success ? '': 'none'}}>
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  )

  return (
    <div>
    <Layout title="Sign Up" description='Node React E-cpmmerce App' className="container">
    {signUpForm()}
    {showSuccess()}
    {showError()}
    
    </Layout>
       
    </div>
     
  )
}

export default Signup