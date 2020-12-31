import React from 'react'

import { css } from '@emotion/core'
import { useMeQuery, useMenuItemsQuery } from '../generated/graphql'

import { PageLayout } from '../components/PageLayout'
import { Column, Container, Card, Button } from '@dfds-ui/react-components'
import { Modal } from '@dfds-ui/modal'

const Reservations = ({}) => {
  const [meData] = useMeQuery()
  const [menuItems] = useMenuItemsQuery()
  const [openModal, setOpenModal] = React.useState(false)
  console.log(menuItems)
  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline={`Welcome ${meData.data?.me.firstName}`}
      heroImg={'/kidfds.jpg'}
    >
      <Container fluid>
        <Column
          l={4}
          css={css`
            margin: auto;
          `}
        >
          <Card size="m" variant="fill">
            <Button type="button">BOOK A TABLE</Button>
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
                {menuItems.data?.menuItems.map((menuItem) => {
                  return (
                    <>
                      <p>{menuItem.name}</p>
                      <p>{menuItem.price}</p>
                    </>
                  )
                })}
              </div>
            </Modal>
          </Card>
        </Column>
        <Column l={4}>
          <Card size="m" variant="fill">
            Table
          </Card>
        </Column>
      </Container>
    </PageLayout>
  )
}

export default Reservations
