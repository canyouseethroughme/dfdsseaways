import React, { useEffect, useState } from 'react'
import {
  useMeQuery,
  useMenuItemsQuery,
  useBookingQuery,
} from '../generated/graphql'
import { PageLayout } from '../components/PageLayout'
import {
  Label,
  Column,
  Container,
  Accordion,
  Counter,
  Button,
  ButtonStack,
  Table,
  TableBody,
  TableDataCell,
  TableRow,
} from '@dfds-ui/react-components'
import { Text } from '@dfds-ui/typography'
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
import moment from 'moment'
import menu from '@dfds-ui/react-components/menu/Menu'

interface Sections {
  noPersons: boolean
  date: boolean
  time: boolean
  menu: boolean
  pay: boolean
  confirmation: boolean
}

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
}

const BookTable = ({}) => {
  const router = useRouter()
  const [meData] = useMeQuery()
  const [booking] = useBookingQuery()
  const [menuItems] = useMenuItemsQuery()

  const [bookingStartDate, setBookingStartDate] = useState<string>()
  const [bookingEndDate, setBookingEndDate] = useState<string>()

  useEffect(() => {
    setBookingStartDate(
      moment(
        new Date(parseInt(booking.data?.booking?.booking?.startDate!))
      ).format('YYYY-MM-DD')
    )
    setBookingEndDate(
      moment(
        new Date(parseInt(booking.data?.booking?.booking?.endDate!))
      ).format('YYYY-MM-DD')
    )
  }, [booking])

  const [isSectionOpen, setIsSectionOpen] = useState<Sections>({
    noPersons: true,
    date: false,
    time: false,
    menu: false,
    pay: false,
    confirmation: false,
  })

  const handleChange = (key1: keyof Sections, key2: keyof Sections) => {
    setIsSectionOpen((prevState) => ({
      ...prevState,
      [key1]: !prevState[key1],
      [key2]: !prevState[key2],
    }))
  }

  const [counterNoPersons, setCounterNoPersons] = useState<number>(1)
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>()
  const [selectedTime, setSelectedTime] = useState<MaterialUiPickersDate>()

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (time: MaterialUiPickersDate) => {
    setSelectedTime(time)
  }

  const filterMenuItems = menuItems.data?.menuItems
  const starters = filterMenuItems?.filter(
    (menuItem) => menuItem.category === 'starter'
  )
  const mainCourses = filterMenuItems?.filter(
    (menuItem) => menuItem.category === 'main_course'
  )
  const sides = filterMenuItems?.filter(
    (menuItem) => menuItem.category === 'side_orders'
  )
  const deserts = filterMenuItems?.filter(
    (menuItem) => menuItem.category === 'desert'
  )
  const alcoholics = filterMenuItems?.filter(
    (menuItem) => menuItem.category === 'alcoholic'
  )
  const nonalcoholics = filterMenuItems?.filter(
    (menuItem) => menuItem.category === 'nonalcoholic'
  )
  const table = (
    object: MenuItem,
    index: string | number | null | undefined
  ) => (
    <Table key={index}>
      <TableBody>
        <TableRow>
          <TableDataCell>
            <b>{object.name}</b>
          </TableDataCell>
          <TableDataCell align="left">{object.description}</TableDataCell>
          <TableDataCell align="right">
            <Counter
              minVal={0}
              maxVal={8}
              initialVal={0}
              executeOnChange={() => console.log(object.id)}
            />
          </TableDataCell>
          <TableDataCell align="right">
            <b>{object.price}</b>DKK
          </TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  )
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
                      variant="static"
                      disablePast
                      initialFocusedDate={bookingStartDate}
                      minDate={bookingStartDate}
                      maxDate={bookingEndDate}
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
                      variant="static"
                      openTo="hours"
                      initialFocusedDate={new Date().setHours(12, 0, 0, 0)}
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
                  <Text styledAs="sectionHeadline">Starters</Text>
                  {starters?.map((starter, index) => table(starter, index))}
                  <Text styledAs="sectionHeadline">Main Course</Text>
                  {mainCourses?.map((mainCourse, index) =>
                    table(mainCourse, index)
                  )}
                  <Text styledAs="sectionHeadline">Sides</Text>
                  {sides?.map((side, index) => table(side, index))}
                  <Text styledAs="sectionHeadline">Desert</Text>
                  {deserts?.map((desert, index) => table(desert, index))}
                  <Text styledAs="sectionHeadline">Alcoholic beverages</Text>
                  {alcoholics?.map((alcoholic, index) =>
                    table(alcoholic, index)
                  )}
                  <Text styledAs="sectionHeadline">Nonalcoholic beverages</Text>
                  {nonalcoholics?.map((nonalcoholic, index) =>
                    table(nonalcoholic, index)
                  )}
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
