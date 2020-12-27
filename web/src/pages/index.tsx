import React from 'react'
import { css } from '@emotion/core'
import { Form, Formik } from 'formik'
import { Text } from '@dfds-ui/typography'
import { Button } from '@chakra-ui/core'
import { Column, Container, Card, CardContent } from '@dfds-ui/react-components'

import { PageLayout } from '../components/PageLayout'
import { InputField } from '../components/InputField'
import FlexBox from '@dfds-ui/react-components/flexbox/FlexBox'

const containerStyle = css`
  margin: 2rem auto;
`

const buttonStyle = css`
  font-family: DFDS,Verdana,system-ui,Arial,"Helvetica Neue",Helvetica,sans-serif;
  background: rgb(237, 136, 0);
  :hover{
    background: rgb(242, 163, 59)
  }
`
const Index = () => {
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
            <CardContent>
              <Formik
                initialValues={{ bookingId: '' }}
                onSubmit={(values) => console.log(values)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FlexBox>
                      <InputField
                        name="bookingId"
                        label="Booking No."
                        placeholder="Type here ..."
                      />
                      <FlexBox itemsFlexEnd>
                        <Button
                          type="submit"
                          isLoading={isSubmitting}
                          variantColor="orange"
                          css={buttonStyle}
                        >
                          Log In
                        </Button>
                      </FlexBox>
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
