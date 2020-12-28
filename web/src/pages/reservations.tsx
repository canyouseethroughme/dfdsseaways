import React from 'react'
import { PageLayout } from '../components/PageLayout'
import { useMeQuery } from '../generated/graphql'

const Reservations = ({}) => {
  const [{ data }] = useMeQuery()
  console.log(data)
  return (
    <PageLayout
      heroTitle="DFDS"
      heroHeadline={`Welcome ${data?.me.firstName}`}
      heroImg={'/kidfds.jpg'}
    >
      hi
    </PageLayout>
  )
}

export default Reservations
