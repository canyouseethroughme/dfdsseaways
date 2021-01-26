import React from 'react'
import { css } from '@emotion/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'

import { useLoginMutation } from '../generated/graphql'
import { Text } from '@dfds-ui/typography'
import {
  Column,
  Container,
  Card,
  CardContent,
  Button,
} from '@dfds-ui/react-components'
import FlexBox from '@dfds-ui/react-components/flexbox/FlexBox'

import { PageLayout } from '../components/PageLayout'
import { toErrorMap } from '../utils/toErrorMap'
import InputField from '../components/InputField'

export const containerStyle = css`
  margin: 2rem auto;
`

const Index = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()
  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline="Welcome to SeaWays Restaurant App"
      heroImg={'/restaurantdfds.jpg'}
    >
      <Container>
        <Column l={6} css={containerStyle}>
          <Card
            size="m"
            variant="fill"
            css={css`
              width: 100%;
            `}
          >
            <Text styledAs="heroHeadline">
              <b>DFDS</b> SeaWays <b>Restaurant</b> Booking <b>app</b>
            </Text>
            <CardContent
              css={css`
                margin-top: 1rem;
                height: 7rem;
              `}
            >
              <Formik
                initialValues={{ bookingId: '' }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login({
                    bookingId: parseFloat(values.bookingId),
                  })
                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                  } else if (response.data?.login.booking) {
                    router.push('/reservations')
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FlexBox justifyCenter>
                      <InputField
                        name="bookingId"
                        label="Booking No."
                        placeholder="Type here ..."
                      />
                      <Button
                        type="submit"
                        submitting={isSubmitting}
                        css={css`
                          margin-top: 32px;
                          height: 38px;
                        `}
                      >
                        Log In
                      </Button>
                    </FlexBox>
                  </Form>
                )}
              </Formik>
            </CardContent>
            <CardContent>
              <Text styledAs="labelBold">
                Cut down the waiting time and order online!
              </Text>
              <Text styledAs="label">
                Looking for a quick and easy way to book a table for your trip?
                Log in with your booking number to order your food and drinks
                ahead of time!
              </Text>
            </CardContent>
          </Card>
        </Column>
      </Container>
    </PageLayout>
  )
}

export default Index
