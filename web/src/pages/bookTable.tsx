import React, { useEffect, useState } from 'react'
import {
  useMeQuery,
  useMenuItemsQuery,
  useBookingQuery,
  useCreateReservationMutation,
  useCreateOrderMutation,
  useCreateOrderItemsMutation,
  OrderItemInput,
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
  ListItem,
  ListText,
  ListTextGroup,
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
import FlexBox from '@dfds-ui/react-components/flexbox/FlexBox'

interface Sections {
  noPersons: boolean
  date: boolean
  time: boolean
  menu: boolean
  pay: boolean
  confirmation: boolean
}

interface MenuSectionType {
  header: string
  dbKey: string
}

interface OrderItem {
  id: number
  amount?: number
  price: number
  name: string
}

const BookTable = ({}) => {
  const router = useRouter()
  const [meData] = useMeQuery()
  const [booking] = useBookingQuery()
  const [menuItems] = useMenuItemsQuery()
  const [, createReservation] = useCreateReservationMutation()
  const [, createOrder] = useCreateOrderMutation()
  const [, createOrderItems] = useCreateOrderItemsMutation()

  const [bookingStartDate, setBookingStartDate] = useState<string>()
  const [bookingEndDate, setBookingEndDate] = useState<string>()
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
  const [orderItems, setOrderItems] = useState<OrderItem[]>()
  const [totalItems, setTotalItems] = useState<number>()

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

  useEffect(() => {
    if (menuItems) {
      setOrderItems(
        menuItems.data?.menuItems.map((menuItem) => ({
          id: menuItem.id,
          price: menuItem.price,
          name: menuItem.name,
        }))
      )
    }
  }, [menuItems])

  const handleOrderItemsChange = (itemId: number, amount: number) => {
    setOrderItems((prevState) => {
      const itemIndex = prevState?.findIndex((item) => item.id === itemId)
      if (itemIndex) {
        const newState = [...(prevState || [])]
        newState[itemIndex].amount = amount > 0 ? amount : undefined
        return newState
      }
      return prevState
    })
  }

  const handleChange = (key1: keyof Sections, key2: keyof Sections) => {
    setIsSectionOpen((prevState) => ({
      ...prevState,
      [key1]: !prevState[key1],
      [key2]: !prevState[key2],
    }))
  }

  const filterMenuItems = menuItems.data?.menuItems

  const createMenuSection = (category: string) =>
    filterMenuItems
      ?.filter((menuItem) => menuItem.category === category)
      .map((element, index) => (
        <React.Fragment key={index}>
          <ListItem multiline>
            <ListTextGroup>
              <ListText styledAs="labelBold">{element.name}</ListText>
              <ListText styledAs="body">{element.description}</ListText>
            </ListTextGroup>
          </ListItem>
          <ListItem divider>
            <ListText>
              <Counter
                minVal={0}
                maxVal={8}
                initialVal={0}
                executeOnChange={(value) =>
                  handleOrderItemsChange(element.id, value)
                }
              />
            </ListText>
            <FlexBox itemsFlexEnd>
              <ListText styledAs="labelBold">{element.price} DKK</ListText>
            </FlexBox>
          </ListItem>
        </React.Fragment>
      ))

  const menuSections: MenuSectionType[] = [
    {
      header: 'Starters',
      dbKey: 'starter',
    },
    {
      header: 'Main Course',
      dbKey: 'main_course',
    },
    {
      header: 'Sides',
      dbKey: 'side_orders',
    },
    {
      header: 'Desert',
      dbKey: 'desert',
    },
    {
      header: 'Alcoholic beverages',
      dbKey: 'alcoholic',
    },
    {
      header: 'Nonalcoholic beverages',
      dbKey: 'nonalcoholic',
    },
  ]
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
            initialValues={{}}
            onSubmit={async () => {
              let responseOrder
              let responseOrderItem
              const responseReservation = await createReservation({
                dateAndTime: `${moment(selectedDate).format(
                  'YYYY-MM-DD'
                )}T${moment(selectedTime).format('HH:MM')}:00.000Z`,
                tableId: 2,
                noPersons: counterNoPersons,
              })

              if (responseReservation.data?.createReservation.id) {
                responseOrder = await createOrder({
                  reservationId: responseReservation.data?.createReservation.id,
                })
              }
              if (responseOrder?.data?.createOrder.id && orderItems) {
                const orderId = responseOrder.data.createOrder.id
                const orderItemsInput: OrderItemInput[] = orderItems
                  .filter((item) => item.amount)
                  .map((item) => ({
                    orderId,
                    menuItemId: item.id,
                    price: item.price,
                    amount: Number(item.amount),
                  }))

                responseOrderItem = await createOrderItems({
                  orderItems: orderItemsInput,
                })
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Accordion
                  disabled
                  isOpen={isSectionOpen.noPersons}
                  heading="Guests"
                >
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
                    <DatePicker
                      autoOk
                      variant="static"
                      disablePast
                      initialFocusedDate={bookingStartDate}
                      minDate={bookingStartDate}
                      maxDate={bookingEndDate}
                      openTo="date"
                      value={selectedDate}
                      onChange={(d) => setSelectedDate(d)}
                    />
                    <ButtonStack align="right">
                      <Button
                        type="button"
                        onClick={() => handleChange('date', 'noPersons')}
                        variation="secondary"
                      >
                        Go Back
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handleChange('date', 'time')}
                        disabled={selectedDate === undefined}
                      >
                        Continue
                      </Button>
                    </ButtonStack>
                  </Accordion>

                  <Accordion
                    disabled
                    isOpen={isSectionOpen.time}
                    heading="Time"
                  >
                    <TimePicker
                      autoOk
                      variant="static"
                      openTo="hours"
                      initialFocusedDate={new Date().setHours(12, 0, 0, 0)}
                      value={selectedTime}
                      onChange={(t) => setSelectedTime(t)}
                    />
                    <ButtonStack align="right">
                      <Button
                        type="button"
                        onClick={() => handleChange('time', 'date')}
                        variation="secondary"
                      >
                        Go Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleChange('time', 'menu')}
                        disabled={selectedTime === undefined}
                      >
                        Continue
                      </Button>
                    </ButtonStack>
                  </Accordion>
                </MuiPickersUtilsProvider>
                <Accordion disabled isOpen={isSectionOpen.menu} heading="Menu">
                  {menuSections.map((item, index) => (
                    <React.Fragment key={index}>
                      <Text styledAs="sectionHeadline">{item.header}</Text>
                      {createMenuSection(item.dbKey)}
                    </React.Fragment>
                  ))}
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
                      onClick={() => {
                        handleChange('menu', 'pay')
                        let totalAmount = 0
                        orderItems
                          ?.filter((item) => item.amount)
                          .forEach((item) => {
                            if (item.amount) {
                              totalAmount =
                                totalAmount + item.price * item.amount
                            }
                          })
                        setTotalItems(totalAmount)
                      }}
                      disabled={
                        orderItems &&
                        orderItems?.filter((item) => item.amount).length <= 0
                      }
                    >
                      Continue
                    </Button>
                  </ButtonStack>
                </Accordion>

                <Accordion
                  disabled
                  isOpen={isSectionOpen.pay}
                  heading="Summary & Pay"
                >
                  <ListItem multiline divider>
                    <ListTextGroup>
                      <ListText styledAs="labelBold">Guests</ListText>
                      <ListText styledAs="body">{counterNoPersons}</ListText>
                    </ListTextGroup>
                  </ListItem>
                  <ListItem multiline divider>
                    <ListTextGroup>
                      <ListText styledAs="labelBold">Selected date</ListText>
                      <ListText styledAs="body">
                        {moment(selectedDate).format('DD-MM-YYYY')}
                      </ListText>
                    </ListTextGroup>
                  </ListItem>
                  <ListItem multiline divider>
                    <ListTextGroup>
                      <ListText styledAs="labelBold">Selected time</ListText>
                      <ListText styledAs="body">
                        {moment(selectedTime).format('HH:MM')}
                      </ListText>
                    </ListTextGroup>
                  </ListItem>
                  <ListItem>
                    <ListTextGroup>
                      <ListText styledAs="labelBold">Ordered items</ListText>
                    </ListTextGroup>
                  </ListItem>
                  {orderItems
                    ?.filter((item) => item.amount)
                    .map((item) => (
                      <ListItem divider key={item.id}>
                        <ListTextGroup>
                          <ListText styledAs="body">
                            <b>{item.name}</b> x {item.amount} ={' '}
                            {item.amount && item.price * item.amount}DKK
                          </ListText>
                        </ListTextGroup>
                      </ListItem>
                    ))}
                  <ListItem multiline divider>
                    <ListTextGroup>
                      <ListText styledAs="labelBold">Total</ListText>
                      <ListText styledAs="labelBold">{totalItems} DKK</ListText>
                    </ListTextGroup>
                  </ListItem>

                  <ButtonStack align="right">
                    <Button
                      type="button"
                      onClick={() => handleChange('pay', 'menu')}
                      variation="secondary"
                    >
                      Go Back
                    </Button>
                    <Button
                      type="submit"
                      submitting={isSubmitting}
                      onClick={() => handleChange('pay', 'confirmation')}
                    >
                      Agree & PAY
                    </Button>
                  </ButtonStack>
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
