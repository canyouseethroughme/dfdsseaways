import React from 'react'
import { css } from '@emotion/core'
import { SiteLayout, Hero, Footer } from '@dfds-ui/react-components'

interface PageLayoutProps {
    heroTitle: string
    heroHeadline: string
    heroImg: string
    children: any;
}

export const PageLayout = ({heroTitle, heroHeadline, heroImg, children}: PageLayoutProps) => {
        return ( 
            <SiteLayout.Grid>
            <SiteLayout.Header css={css`background-color: #002b45;`}>
                <Hero title={heroTitle} headline={heroHeadline} imageSrc={heroImg}/>
            </SiteLayout.Header>
            <SiteLayout.Main>
                {children}
            </SiteLayout.Main>
            <SiteLayout.Footer>
                <Footer/>
            </SiteLayout.Footer>
            </SiteLayout.Grid>
          
        );
}