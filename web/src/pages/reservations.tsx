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
  Counter,
  ListItem,
  ListText,
  ListTextGroup,
} from '@dfds-ui/react-components'
import { Text } from '@dfds-ui/typography'
import { Modal } from '@dfds-ui/modal'
import { format } from 'date-fns'
import FlexBox from '@dfds-ui/react-components/flexbox/FlexBox'

interface MenuSectionType {
  header: string
  dbKey: string
}

const Reservations = ({}) => {
  const [meData] = useMeQuery()
  const [menuItemsData] = useMenuItemsQuery()
  const [reservationsData] = useReservationsQuery()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const router = useRouter()

  const filterMenuItems = menuItemsData.data?.menuItems

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
            <ListText></ListText>
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
              heading="Menu"
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
                {menuSections.map((item, index) => (
                  <React.Fragment key={index}>
                    <Text styledAs="sectionHeadline">{item.header}</Text>
                    {createMenuSection(item.dbKey)}
                  </React.Fragment>
                ))}
              </div>
            </Modal>
          </Card>
        </Column>
        <Column l={5} m={12}>
          <Card size="m" variant="fill">
            <Table isInteractive>
              <TableHead>
                <TableRow>
                  <TableHeaderCell align="center">Date & Time</TableHeaderCell>
                  <TableHeaderCell>No. of persons</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationsData.data?.reservations.map(
                  (reservation, index) => {
                    return (
                      <TableRow key={index}>
                        <TableDataCell align="center">
                          {format(
                            new Date(parseInt(reservation.dateAndTime)),
                            'dd/MM/yyyy @ HH:mm'
                          )}
                        </TableDataCell>
                        <TableDataCell align="center">
                          {reservation.noPersons}
                        </TableDataCell>
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
