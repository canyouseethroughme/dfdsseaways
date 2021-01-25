import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { css } from '@emotion/core'
import {
  useMeQuery,
  useMenuItemsQuery,
  useReservationsQuery,
} from '../generated/graphql'

import { PageLayout } from '../components/PageLayout'
import {
  Column,
  Container,
  Card,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableDataCell,
} from '@dfds-ui/react-components'
import { Modal } from '@dfds-ui/modal'
import { format } from 'date-fns'

const Reservations = ({}) => {
  const [meData] = useMeQuery()
  const [menuItemsData] = useMenuItemsQuery()
  const [reservationsData] = useReservationsQuery()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const router = useRouter()

  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline={`Welcome ${meData.data?.me?.firstName}`}
      heroImg={'/kidfds.jpg'}
    >
      <Container fluid>
        <Column
          l={5}
          m={12}
          css={css`
            margin: auto;
          `}
        >
          <Card size="m" variant="fill">
            <Button onClick={() => router.push('/bookTable')}>
              BOOK A TABLE
            </Button>
            <Button onClick={() => setOpenModal(true)}>VIEW MENU</Button>
            <Modal
              css={css`
                z-index: 1000;
              `}
              heading="Fullscreen for s and m"
              isOpen={openModal}
              shouldCloseOnEsc={true}
              onRequestClose={() => setOpenModal(false)}
              sizes={{
                s: 'fullscreen',
                m: 'fullscreen',
                l: '80%',
                xl: '80%',
                xxl: '80%',
              }}
            >
              <div>
                {menuItemsData.data?.menuItems.map((menuItem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <p>{menuItem.name}</p>
                      <p>{menuItem.price}</p>
                    </React.Fragment>
                  )
                })}
              </div>
            </Modal>
          </Card>
        </Column>
        <Column l={5} m={12}>
          <Card size="m" variant="fill">
            <Table isInteractive>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Reservation No.</TableHeaderCell>
                  <TableHeaderCell align="center">Date & Time</TableHeaderCell>
                  <TableHeaderCell>No. of persons</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationsData.data?.reservations.map(
                  (reservation, index) => {
                    return (
                      <TableRow key={index}>
                        <TableDataCell>{reservation.id}</TableDataCell>
                        <TableDataCell align="center">
                          {format(
                            new Date(parseInt(reservation.dateAndTime)),
                            'dd/MM/yyyy @ HH:mm'
                          )}
                        </TableDataCell>
                        <TableDataCell>{reservation.noPersons}</TableDataCell>
                      </TableRow>
                    )
                  }
                )}
              </TableBody>
            </Table>
          </Card>
        </Column>
      </Container>
    </PageLayout>
  )
}

export default Reservations
