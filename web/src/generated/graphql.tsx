import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type Query = {
  __typename?: 'Query'
  reservations: Array<Reservation>
  reservation?: Maybe<Reservation>
  tables: Array<Table>
  table?: Maybe<Table>
  users: Array<User>
  user?: Maybe<User>
  me?: Maybe<User>
  orderItems: Array<OrderItem>
  orderItem?: Maybe<OrderItem>
  orders: Array<Order>
  menuItems: Array<MenuItem>
  menuItem?: Maybe<MenuItem>
  bookings: Array<Booking>
  booking?: Maybe<BookingResponse>
}

export type QueryReservationArgs = {
  id: Scalars['Float']
}

export type QueryTableArgs = {
  id: Scalars['Float']
}

export type QueryUserArgs = {
  id: Scalars['Float']
}

export type QueryOrderItemArgs = {
  orderId: Scalars['Float']
}

export type QueryOrdersArgs = {
  reservationId: Scalars['Float']
}

export type QueryMenuItemArgs = {
  id: Scalars['Float']
}

export type Reservation = {
  __typename?: 'Reservation'
  id: Scalars['Float']
  dateAndTime: Scalars['String']
  noPersons: Scalars['Int']
  bookingId: Scalars['Float']
  tableId: Scalars['Float']
}

export type Table = {
  __typename?: 'Table'
  id: Scalars['Float']
  maxPersons: Scalars['Int']
}

export type User = {
  __typename?: 'User'
  id: Scalars['Float']
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type OrderItem = {
  __typename?: 'OrderItem'
  orderId: Scalars['Float']
  menuItemId: Scalars['Float']
  price: Scalars['Int']
  amount: Scalars['Int']
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['Float']
  reservationId: Scalars['Float']
}

export type MenuItem = {
  __typename?: 'MenuItem'
  id: Scalars['Float']
  name: Scalars['String']
  description: Scalars['String']
  type: Scalars['Int']
  price: Scalars['Int']
  itemType: Scalars['Int']
}

export type Booking = {
  __typename?: 'Booking'
  id: Scalars['Float']
  startDate: Scalars['String']
  endDate: Scalars['String']
  userId: Scalars['Float']
}

export type BookingResponse = {
  __typename?: 'BookingResponse'
  errors?: Maybe<Array<FieldError>>
  booking?: Maybe<Booking>
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createReservation: Reservation
  updateReservation?: Maybe<Reservation>
  deleteReservation: Scalars['Boolean']
  createOrderItem: OrderItem
  updateOrderItem?: Maybe<OrderItem>
  deleteOrderItem: Scalars['Boolean']
  createOrder: Order
  deleteOrder: Scalars['Boolean']
  login: BookingResponse
  logout: Scalars['Boolean']
}

export type MutationCreateReservationArgs = {
  tableId: Scalars['Float']
  noPersons: Scalars['Float']
  dateAndTime: Scalars['DateTime']
}

export type MutationUpdateReservationArgs = {
  tableId: Scalars['Float']
  noPersons: Scalars['Float']
  dateAndTime: Scalars['DateTime']
  id: Scalars['Float']
}

export type MutationDeleteReservationArgs = {
  id: Scalars['Float']
}

export type MutationCreateOrderItemArgs = {
  price: Scalars['Float']
  amount: Scalars['Float']
  menuItemId: Scalars['Float']
  orderId: Scalars['Float']
}

export type MutationUpdateOrderItemArgs = {
  amount: Scalars['Float']
  menuItemId: Scalars['Float']
  orderId: Scalars['Float']
}

export type MutationDeleteOrderItemArgs = {
  orderId: Scalars['Float']
}

export type MutationCreateOrderArgs = {
  reservationId: Scalars['Float']
}

export type MutationDeleteOrderArgs = {
  reservationId: Scalars['Float']
}

export type MutationLoginArgs = {
  bookingId: Scalars['Float']
}

export type LoginMutationVariables = Exact<{
  bookingId: Scalars['Float']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'BookingResponse' } & {
    booking?: Maybe<
      { __typename?: 'Booking' } & Pick<
        Booking,
        'id' | 'startDate' | 'endDate' | 'userId'
      >
    >
    errors?: Maybe<
      Array<
        { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
      >
    >
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'firstName'>>
}

export const LoginDocument = gql`
  mutation Login($bookingId: Float!) {
    login(bookingId: $bookingId) {
      booking {
        id
        startDate
        endDate
        userId
      }
      errors {
        field
        message
      }
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const MeDocument = gql`
  query Me {
    me {
      id
      firstName
    }
  }
`

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}
