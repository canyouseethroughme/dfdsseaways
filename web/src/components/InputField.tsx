import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core'
import { css } from '@emotion/core'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

const inputStyle = css`
  width: 17rem;
  ::placeholder{
    font-family: DFDS,Verdana,system-ui,Arial,"Helvetica Neue",Helvetica,sans-serif;
  }
`
const labelStyle = css`
   font-family: DFDS,Verdana,system-ui,Arial,"Helvetica Neue",Helvetica,sans-serif;
`

export const InputField= ({
  label,
  size: _,
  ...props
}: InputFieldProps) => {
  const [field, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} css={labelStyle}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        css={inputStyle}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}
