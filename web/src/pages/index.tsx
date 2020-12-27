import React from 'react'
import { css } from '@emotion/core'
import { Form, Formik } from 'formik'
import { Text } from '@dfds-ui/typography'
import { Button } from '@chakra-ui/core'
import { Column, Container, Card, CardContent } from '@dfds-ui/react-components'

import { PageLayout } from '../components/PageLayout'
import { InputField } from '../components/InputField'
import FlexBox from '@dfds-ui/react-components/flexbox/FlexBox'

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
                {({ isSubmitting }) => (
                  <Form>
                    <FlexBox>
                      <InputField
                        name="bookingId"
                        label="Booking No."
                        placeholder="Type here ..."
                        css={css`
                          width: auto;
                        `}
                      />
                      <FlexBox itemsFlexEnd>
                        <Button
                          type="submit"
                          isLoading={isSubmitting}
                          variantColor="orange"
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
