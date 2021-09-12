import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { graphql, useStaticQuery } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { BlogSingleStyles } from "../components/Blog/BlogStyles"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const getBioData = graphql`
query {
    bioPortadaData: allContentfulPortada {
      edges {
        node {
          bio {
              raw
          }
          imagenPortadaBio {
            gatsbyImageData(width: 600, formats: [AUTO, WEBP])
          }
          tituloPortadaBiografia
        }
      }
    }
  }
  `

const Bold = ({ children }) => <strong>{children}</strong>
const Italic = ({ children }) => <em>{children}</em>
const Text = ({ children }) => <p>{children}</p>

const bio = () => {
    const response = useStaticQuery(getBioData)
    const {imagenPortadaBio, tituloPortadaBiografia, bio } = response.bioPortadaData.edges[0].node
    const bioPortadaImage = getImage(imagenPortadaBio[0])

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
            [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        },
    }

    return (
        <>
            <Seo title={tituloPortadaBiografia ?? "Biografía"} description={"" /*TODO Add SEO description */} />
            <Layout>
                <SimpleBanner title={tituloPortadaBiografia ?? "Biografía"}>
                    <GatsbyImage
                        className="banner__image"
                        image={bioPortadaImage}
                        alt="Apple iPhone camera"
                    />
                </SimpleBanner>
                <section>
                    <BlogSingleStyles>
                        <article className="blogsingle__content">
                            {renderRichText(bio, options)}
                        </article>
                    </BlogSingleStyles>
                </section>
            </Layout>
        </>
    )
}

export default bio
