import React from 'react'
import { Form, Formik } from 'formik'
import { css } from '@emotion/core'
import { TextField } from '@dfds-ui/forms'
import { Text } from '@dfds-ui/typography'
import {
  Column,
  Container,
  Card,
  CardContent,
  Button,
} from '@dfds-ui/react-components'

import { PageLayout } from '../components/PageLayout'

interface IndexProps {}

const containerStyle = css`
  margin: 2rem auto;
`
const Index = ({}: IndexProps) => {
  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline=" Welcome to SeaWays Restaurant App"
      heroImg={'/restaurantdfds.jpg'}
    >
      <Container>
        <Column l={6} css={containerStyle}>
          <Card size="m" variant="fill">
            <Text styledAs="heroHeadline">
              <b>DFDS</b> SeaWays <b>Restaurant</b> Booking <b>app</b>
            </Text>
            <CardContent
              css={css`
                margin-top: 2rem;
              `}
            >
              <Formik
                initialValues={{ bookingId: '' }}
                onSubmit={(values) => console.log(values)}
              >
                {() => (
                  <Form>
                    <TextField
                      name="bookingId"
                      label="Booking Number"
                      required
                      errorMessage=""
                      defaultValue=""
                      hintText="Type here.."
                      adornment={
                        <Button
                          css={css`
                            height: 40px;
                          `}
                        >
                          Log In
                        </Button>
                      }
                    />
                  </Form>
                )}
              </Formik>
            </CardContent>
            <CardContent>
              <Text styledAs="labelBold">
                Cut down the waiting time and order online!
              </Text>
              <Text styledAs="label">
                Looking for a quick and easy way to book dinner for your trip?
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
