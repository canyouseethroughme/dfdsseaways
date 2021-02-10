/** @jsx jsx */
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { css, jsx } from '@emotion/core'
import {
  useMeQuery,
  useMenuItemsQuery,
  useReservationsQuery,
  useLogoutMutation,
} from '../generated/graphql'
import { menuSections } from '../utils/constants'

import { PageLayout } from '../components/PageLayout'
import {
  Column,
  Container,
  Card,
  Button,
  ListItem,
  ListText,
  ListTextGroup,
  ButtonStack,
  ListIcon,
} from '@dfds-ui/react-components'
import { Text } from '@dfds-ui/typography'
import { Modal } from '@dfds-ui/modal'
import { ChevronRight } from '@dfds-ui/icons/system'
import { format } from 'date-fns'
import FlexBox from '@dfds-ui/react-components/flexbox/FlexBox'

const Reservations = ({}) => {
  const [meData] = useMeQuery()
  const [menuItemsData] = useMenuItemsQuery()
  const [reservationsData] = useReservationsQuery()
  const [, logout] = useLogoutMutation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
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

  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline={`Welcome ${meData.data?.me?.firstName}`}
      heroImg={'/kidfds.jpg'}
    >
      <FlexBox justifyFlexEnd>
        <Button
          onClick={() => {
            logout(), router.push('/')
          }}
          iconAlign="left"
          size="small"
          variation="text"
        >
          Logout
        </Button>
      </FlexBox>
      <Container fluid>
        <Column
          l={5}
          m={12}
          css={css`
            margin: 5% auto;
          `}
        >
          <Card size="m" variant="fill">
            <ButtonStack orientation="vertical">
              <Button
                onClick={() => (
                  setIsSubmitting(true), router.push('/bookTable')
                )}
                submitting={isSubmitting}
              >
                BOOK A TABLE
              </Button>
              <Button variation="secondary" onClick={() => setOpenModal(true)}>
                VIEW MENU
              </Button>
            </ButtonStack>
            <Modal
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
            {reservationsData.data?.reservations.length ? (
              <>
                <Text styledAs="smallHeadline">Reservations</Text>
                {reservationsData.data?.reservations.map(
                  (reservation, index) => (
                    <ListItem multiline clickable divider key={index}>
                      <ListTextGroup>
                        <ListText styledAs="labelBold">
                          {format(
                            new Date(parseInt(reservation.dateAndTime)),
                            'dd/MM/yyyy'
                          )}
                        </ListText>
                        <ListText styledAs="body">
                          Guests: {reservation.noPersons}
                        </ListText>
                        <ListText
                          styledAs="smallHeadline"
                          css={css`
                            color: #49a2df;
                          `}
                        >
                          {format(
                            new Date(parseInt(reservation.dateAndTime)),
                            'HH:00'
                          )}
                        </ListText>
                      </ListTextGroup>
                      <ListIcon size="xl" icon={ChevronRight} />
                    </ListItem>
                  )
                )}
              </>
            ) : (
              <Text styledAs="smallHeadline">
                You don't have any reservations yet.
              </Text>
            )}
          </Card>
        </Column>
      </Container>
    </PageLayout>
  )
}

export default Reservations
