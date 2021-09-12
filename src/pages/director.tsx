import React from "react"
import Layout from "../components/Layout"
import Features from "../components/Products/Products"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const getDirectorPortadaData = graphql`
query {
    directorPortadaData: allContentfulPortada {
      edges {
        node {
          imagenPortadaDirector {
            gatsbyImageData(width: 600, formats: [AUTO, WEBP])
          }
          tituloPortadaDirector
        }
      }
    }
  }
`

const director = () => {
    const response = useStaticQuery(getDirectorPortadaData)
    const directorPortadaData = response.directorPortadaData.edges[0].node;
    const portadaImage = getImage(directorPortadaData.imagenPortadaDirector[0])
    return (
        <>
            <Seo title={directorPortadaData.tituloPortadaDirector ?? "Director"} description="" />
            <Layout>
                <SimpleBanner title={directorPortadaData.tituloPortadaDirector ?? "Director"}>
                    <GatsbyImage
                        className="banner__image"
                        image={portadaImage}
                        alt={"Apple iPhone face down"}
                    />
                </SimpleBanner>
                <Features category="director"/>
            </Layout>
        </>
    )
}

export default director
