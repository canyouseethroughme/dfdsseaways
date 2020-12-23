import React from 'react'
import { Form, Formik } from 'formik'
import { css } from '@emotion/core'
import { TextField } from '@dfds-ui/forms'
import { Text } from '@dfds-ui/typography'
import { Column, CardTitle, Container, Card, CardContent, Button } from '@dfds-ui/react-components'

import { PageLayout } from '../components/PageLayout'

interface IndexProps {
}

const containerStyle = css`
  display: grid; 
  justify-content: center; 
  margin-top: 3rem; 
  
`

const cardStyle = css`align-items: center; margin-top: 2rem;`;

const Index = ({}: IndexProps) => {
    return (
      <PageLayout heroTitle="DFDS" heroHeadline=" Welcome to SeaWays Restaurant App" heroImg={"/restaurantdfds.jpg"}>    
        <Container>
          <Column l={6} css={containerStyle}>
            <Card size="m" variant="fill"> 
            <Text styledAs="heroHeadline"><b>DFDS</b> SeaWays <b>Restaurant</b> Booking <b>App</b></Text>
              <CardContent css={css`margin-top: 2rem;`}>   
                <Formik initialValues={{bookingId: ''}} onSubmit={(values) => console.log(values)}>
                  {() => (
                  <Form >
                    <TextField name="bookingId" label="Booking Number" required errorMessage="" defaultValue="" hintText="Type here.." adornment={<Button css={css`height: 40px;`}>Log In</Button>}/>
                  </Form>
                  )}
                </Formik>
              </CardContent>
            <CardContent>
                <Text styledAs="label">Decide and order your food and drinks in advance by logging in with your booking number. Cut down the waiting time, order online!</Text>
            </CardContent>
            </Card>
          </Column>
        </Container>
      </PageLayout>
    );
}

export default Index