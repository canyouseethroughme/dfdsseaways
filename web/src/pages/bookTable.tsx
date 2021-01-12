import React, { useState } from 'react'
import { useMeQuery } from '../generated/graphql'
import { PageLayout } from '../components/PageLayout'
import {
  Label,
  Column,
  Container,
  Accordion,
  Counter,
  Button,
  ButtonStack,
} from '@dfds-ui/react-components'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'
import { Form, Formik } from 'formik'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

interface Sections {
  noPersons: boolean
  date: boolean
  time: boolean
  menu: boolean
  pay: boolean
  confirmation: boolean
}

const BookTable = ({}) => {
  const router = useRouter()
  const [meData] = useMeQuery()

  const [isSectionOpen, setIsSectionOpen] = useState<Sections>({
    noPersons: true,
    date: false,
    time: false,
    menu: false,
    pay: false,
    confirmation: false,
  })

  const [counterNoPersons, setCounterNoPersons] = useState<number>(1)
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>()
  const [selectedTime, setSelectedTime] = useState<MaterialUiPickersDate>()

  const handleChange = (key1: keyof Sections, key2: keyof Sections) => {
    setIsSectionOpen((prevState) => ({
      ...prevState,
      [key1]: !prevState[key1],
      [key2]: !prevState[key2],
    }))
  }

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (time: MaterialUiPickersDate) => {
    setSelectedTime(time)
  }
  console.log('selectedDate', selectedDate)
  console.log('counterNoPersons', counterNoPersons)
  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline={`Book a table, ${meData.data?.me?.firstName}`}
      heroImg={'/waiterdfds.jpg'}
    >
      <Label>
        <span onClick={() => router.back()}>Go Back</span>
      </Label>
      <Container fluid>
        <Column
          l={8}
          m={12}
          css={css`
            margin: auto;
          `}
        >
          <Formik
            initialValues={{ noPersons: counterNoPersons, dateAndTime: '' }}
            onSubmit={async (values, { setErrors }) => {}}
          >
            {({ isSubmitting }) => (
              <Form>
                <Accordion
                  disabled
                  isOpen={isSectionOpen.noPersons}
                  heading="Guests"
                >
                  <p>select number of guests in dropdown</p>
                  <Counter
                    minVal={1}
                    maxVal={8}
                    initialVal={1}
                    executeOnChange={(e) => setCounterNoPersons(e)}
                  />
                  <ButtonStack align="right">
                    <Button
                      type="button"
                      onClick={() => handleChange('noPersons', 'date')}
                    >
                      Continue
                    </Button>
                  </ButtonStack>
                </Accordion>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Accordion
                    disabled
                    isOpen={isSectionOpen.date}
                    heading="Date"
                  >
                    <p>select date from date picker</p>
                    <DatePicker
                      autoOk
                      orientation="landscape"
                      variant="static"
                      openTo="date"
                      value={selectedDate}
                      onChange={(d) => handleDateChange(d)}
                    />

                    <ButtonStack align="right">
                      <Button
                        type="button"
                        onClick={() => handleChange('date', 'noPersons')}
                        variation="secondary"
                      >
                        Go Back
                      </Button>
                      {selectedDate === undefined ? (
                        <Button type="button" disabled>
                          Continue
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => handleChange('date', 'time')}
                        >
                          Continue
                        </Button>
                      )}
                    </ButtonStack>
                  </Accordion>

                  <Accordion
                    disabled
                    isOpen={isSectionOpen.time}
                    heading="Time"
                  >
                    <p>select time from outlined buttons</p>
                    <TimePicker
                      autoOk
                      ampm={false}
                      variant="static"
                      orientation="landscape"
                      openTo="minutes"
                      value={selectedTime}
                      onChange={(t) => handleTimeChange(t)}
                    />
                    <ButtonStack align="right">
                      <Button
                        type="button"
                        onClick={() => handleChange('time', 'date')}
                        variation="secondary"
                      >
                        Go Back
                      </Button>
                      {selectedTime === undefined ? (
                        <Button type="button" disabled>
                          Continue
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => handleChange('time', 'menu')}
                        >
                          Continue
                        </Button>
                      )}
                    </ButtonStack>
                  </Accordion>
                </MuiPickersUtilsProvider>
                <Accordion disabled isOpen={isSectionOpen.menu} heading="Menu">
                  <p>menu is divided on categories</p>
                  <p>
                    in every category there are different types of dishes and
                    every dish has an amount input dropdown and price in the end
                    of the row
                  </p>
                  <ButtonStack align="right">
                    <Button
                      type="button"
                      onClick={() => handleChange('menu', 'time')}
                      variation="secondary"
                    >
                      Go Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleChange('menu', 'pay')}
                    >
                      Continue
                    </Button>
                  </ButtonStack>
                </Accordion>

                <Accordion disabled isOpen={isSectionOpen.pay} heading="Pay">
                  <p>A BUTTON PAY</p>
                </Accordion>
              </Form>
            )}
          </Formik>

          <Accordion
            disabled
            isOpen={isSectionOpen.confirmation}
            heading="Confirmation"
          >
            <p>
              when confirmation accordion is opened, after seconds, the user is
              redirected to the main page. and he is notified with a counter.
            </p>
          </Accordion>
        </Column>
      </Container>
    </PageLayout>
  )
}

export default BookTable
