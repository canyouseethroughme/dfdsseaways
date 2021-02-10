import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  reservations: Array<Reservation>;
  reservation?: Maybe<Reservation>;
  tables: Array<Table>;
  table?: Maybe<Table>;
  users: Array<User>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  orderItems: Array<OrderItem>;
  orderItem?: Maybe<OrderItem>;
  orders: Array<Order>;
  menuItems: Array<MenuItem>;
  menuItem?: Maybe<MenuItem>;
  bookings: Array<Booking>;
  booking?: Maybe<BookingResponse>;
};


export type QueryReservationArgs = {
  id: Scalars['Float'];
};


export type QueryTableArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryOrderItemArgs = {
  orderId: Scalars['Float'];
};


export type QueryOrdersArgs = {
  reservationId: Scalars['Float'];
};


export type QueryMenuItemArgs = {
  id: Scalars['Float'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['Float'];
  dateAndTime: Scalars['String'];
  noPersons: Scalars['Int'];
  bookingId: Scalars['Float'];
  tableId: Scalars['Float'];
};

export type Table = {
  __typename?: 'Table';
  id: Scalars['Float'];
  maxPersons: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  orderId: Scalars['Float'];
  menuItemId: Scalars['Float'];
  price: Scalars['Int'];
  amount: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  reservationId: Scalars['Float'];
};

export type MenuItem = {
  __typename?: 'MenuItem';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  price: Scalars['Int'];
  itemType: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  id: Scalars['Float'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  userId: Scalars['Float'];
};

export type BookingResponse = {
  __typename?: 'BookingResponse';
  errors?: Maybe<Array<FieldError>>;
  booking?: Maybe<Booking>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReservation: Reservation;
  updateReservation?: Maybe<Reservation>;
  deleteReservation: Scalars['Boolean'];
  createOrderItems: Array<OrderItem>;
  createOrderItem: OrderItem;
  updateOrderItem?: Maybe<OrderItem>;
  deleteOrderItem: Scalars['Boolean'];
  createOrder: Order;
  deleteOrder: Scalars['Boolean'];
  login: BookingResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateReservationArgs = {
  tableId: Scalars['Float'];
  noPersons: Scalars['Float'];
  dateAndTime: Scalars['DateTime'];
};


export type MutationUpdateReservationArgs = {
  tableId: Scalars['Float'];
  noPersons: Scalars['Float'];
  dateAndTime: Scalars['DateTime'];
  id: Scalars['Float'];
};


export type MutationDeleteReservationArgs = {
  id: Scalars['Float'];
};


export type MutationCreateOrderItemsArgs = {
  orderItems: Array<OrderItemInput>;
};


export type MutationCreateOrderItemArgs = {
  price: Scalars['Float'];
  amount: Scalars['Float'];
  menuItemId: Scalars['Float'];
  orderId: Scalars['Float'];
};


export type MutationUpdateOrderItemArgs = {
  amount: Scalars['Float'];
  menuItemId: Scalars['Float'];
  orderId: Scalars['Float'];
};


export type MutationDeleteOrderItemArgs = {
  orderId: Scalars['Float'];
};


export type MutationCreateOrderArgs = {
  reservationId: Scalars['Float'];
};


export type MutationDeleteOrderArgs = {
  reservationId: Scalars['Float'];
};


export type MutationLoginArgs = {
  bookingId: Scalars['Float'];
};


export type OrderItemInput = {
  orderId: Scalars['Float'];
  menuItemId: Scalars['Float'];
  price: Scalars['Int'];
  amount: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  bookingId: Scalars['Float'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'BookingResponse' }
    & { booking?: Maybe<(
      { __typename?: 'Booking' }
      & Pick<Booking, 'id' | 'startDate' | 'endDate' | 'userId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateOrderMutationVariables = Exact<{
  reservationId: Scalars['Float'];
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'reservationId'>
  ) }
);

export type CreateOrderItemsMutationVariables = Exact<{
  orderItems: Array<OrderItemInput>;
}>;


export type CreateOrderItemsMutation = (
  { __typename?: 'Mutation' }
  & { createOrderItems: Array<(
    { __typename?: 'OrderItem' }
    & Pick<OrderItem, 'orderId' | 'menuItemId' | 'price' | 'amount'>
  )> }
);

export type CreateReservationMutationVariables = Exact<{
  noPersons: Scalars['Float'];
  dateAndTime: Scalars['DateTime'];
  tableId: Scalars['Float'];
}>;


export type CreateReservationMutation = (
  { __typename?: 'Mutation' }
  & { createReservation: (
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'dateAndTime' | 'noPersons' | 'tableId'>
  ) }
);

export type BookingQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingQuery = (
  { __typename?: 'Query' }
  & { booking?: Maybe<(
    { __typename?: 'BookingResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>>, booking?: Maybe<(
      { __typename?: 'Booking' }
      & Pick<Booking, 'userId' | 'startDate' | 'endDate'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName'>
  )> }
);

export type MenuItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type MenuItemsQuery = (
  { __typename?: 'Query' }
  & { menuItems: Array<(
    { __typename?: 'MenuItem' }
    & Pick<MenuItem, 'id' | 'name' | 'price' | 'description' | 'category' | 'itemType'>
  )> }
);

export type ReservationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReservationsQuery = (
  { __typename?: 'Query' }
  & { reservations: Array<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'bookingId' | 'noPersons' | 'dateAndTime' | 'tableId'>
  )> }
);


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
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateOrderDocument = gql`
    mutation CreateOrder($reservationId: Float!) {
  createOrder(reservationId: $reservationId) {
    id
    reservationId
  }
}
    `;

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};
export const CreateOrderItemsDocument = gql`
    mutation CreateOrderItems($orderItems: [OrderItemInput!]!) {
  createOrderItems(orderItems: $orderItems) {
    orderId
    menuItemId
    price
    amount
  }
}
    `;

export function useCreateOrderItemsMutation() {
  return Urql.useMutation<CreateOrderItemsMutation, CreateOrderItemsMutationVariables>(CreateOrderItemsDocument);
};
export const CreateReservationDocument = gql`
    mutation CreateReservation($noPersons: Float!, $dateAndTime: DateTime!, $tableId: Float!) {
  createReservation(tableId: $tableId, noPersons: $noPersons, dateAndTime: $dateAndTime) {
    id
    dateAndTime
    noPersons
    tableId
  }
}
    `;

export function useCreateReservationMutation() {
  return Urql.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument);
};
export const BookingDocument = gql`
    query Booking {
  booking {
    errors {
      message
    }
    booking {
      userId
      startDate
      endDate
    }
  }
}
    `;

export function useBookingQuery(options: Omit<Urql.UseQueryArgs<BookingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BookingQuery>({ query: BookingDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MenuItemsDocument = gql`
    query MenuItems {
  menuItems {
    id
    name
    price
    description
    category
    itemType
  }
}
    `;

export function useMenuItemsQuery(options: Omit<Urql.UseQueryArgs<MenuItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MenuItemsQuery>({ query: MenuItemsDocument, ...options });
};
export const ReservationsDocument = gql`
    query Reservations {
  reservations {
    id
    bookingId
    noPersons
    dateAndTime
    tableId
  }
}
    `;

export function useReservationsQuery(options: Omit<Urql.UseQueryArgs<ReservationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReservationsQuery>({ query: ReservationsDocument, ...options });
};