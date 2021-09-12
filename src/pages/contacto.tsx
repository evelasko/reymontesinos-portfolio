import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Contact from "../components/Contact/Contact"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { useStaticQuery, graphql } from 'gatsby';

const getContactoData = graphql`
query {
    contactoPortadaData: allContentfulPortada {
      edges {
        node {
          imagenPortadaContacto {
            gatsbyImageData(width: 600, formats: [AUTO, WEBP])
          }
          tituloPortadaContacto
        }
      }
    }
  }`

const contacto = () => {
    const response = useStaticQuery(getContactoData)
    const { imagenPortadaContacto, tituloPortadaContacto } = response.contactoPortadaData.edges[0].node
    const contactoPortadaImage = getImage(imagenPortadaContacto)
    return (
        <>
            <Seo title={tituloPortadaContacto ?? "Contáctame"} description={"" /*TODO add SEO description */}/>
            <Layout>
                <SimpleBanner title={tituloPortadaContacto ?? "Contáctame"}>
                    <GatsbyImage
                        className="banner__image"
                        image={contactoPortadaImage}
                        alt="Apple Macbook Dark"
                    />
                </SimpleBanner>
                <Contact />
            </Layout>
        </>
    )
}

export default contacto
