import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/core'
import { css } from '@emotion/core'

type StyledButtonProps = ButtonProps & {
  type: 'button' | 'reset' | 'submit'
  isLoading?: boolean
  buttonSize?: 'small' | 'large'
}

const buttonStyle = (buttonSize: string) => css`
  margin-top: 2rem;
  ${buttonSize === 'small'
    ? css`
        width: 6rem;
      `
    : css`
        width: 14rem;
      `}
  font-family: DFDS, Verdana, system-ui, Arial, 'Helvetica Neue', Helvetica,
    sans-serif;
  background: rgb(237, 136, 0);
  :hover {
    background: rgb(242, 163, 59);
  }
`

const StyledButton = ({
  type,
  isLoading,
  buttonSize = 'small',
  children,
}: StyledButtonProps) => {
  return (
    <Button
      type={type}
      isLoading={isLoading}
      variantColor="orange"
      css={buttonStyle(buttonSize)}
    >
      {children}
    </Button>
  )
}

export default StyledButton
