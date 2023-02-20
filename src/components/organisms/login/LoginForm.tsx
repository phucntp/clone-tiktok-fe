import React from 'react'
import InputNormal from '@/components/atoms/form/InputNormal'

function LoginForm() {
  return (
    <div>
        <div className='background-white'>LoginForm</div>
        <div>
            <InputNormal label='Login' />
        </div>
    </div>
  )
}

export default LoginForm