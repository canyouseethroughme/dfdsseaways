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

const inputStyle = (error: string) => css`
  ${error ? css`margin-bottom: 0;` : css`margin-bottom: 1.5rem;`}
  width: 100%;
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
    <FormControl isInvalid={!!error} css={css`width: 100%;`}>
      <FormLabel htmlFor={field.name} css={labelStyle}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        css={inputStyle(error)}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}
