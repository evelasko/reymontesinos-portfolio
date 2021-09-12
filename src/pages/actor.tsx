import React from "react"
import Layout from "../components/Layout"
import Features from "../components/Products/Products"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const getActorPortadaData = graphql`
query {
    actorPortadaData: allContentfulPortada {
      edges {
        node {
          imagenPortadaActor {
            gatsbyImageData(width: 600, formats: [AUTO, WEBP])
          }
          tituloPortadaActor
        }
      }
    }
  }
`

const actor = () => {
    const response = useStaticQuery(getActorPortadaData)
    const actorPortadaData = response.actorPortadaData.edges[0].node;
    const portadaImage = getImage(actorPortadaData.imagenPortadaActor[0])
    return (
        <>
            <Seo title={actorPortadaData.tituloPortadaActor ?? "Actor"} description="" />
            <Layout>
                <SimpleBanner title={actorPortadaData.tituloPortadaActor ?? "Actor"}>
                    <GatsbyImage
                        className="banner__image"
                        image={portadaImage}
                        alt="Apple iPhone face down"
                    />
                </SimpleBanner>
                <Features category="actor"/>
            </Layout>
        </>
    )
}

export default actor
