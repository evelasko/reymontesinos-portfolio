import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ProductsStyles } from "../Products/ProductsStyles"
import Product from "../Products/Product"

const getTrabajos = graphql`
    query {
        trabajos: allContentfulTrabajos(
            filter: { featured: { eq: true } }
        ) {
            edges {
                node {
                    category
                    name
                    price
                    excerpt
                    contentful_id
                    slug
                    images {
                        gatsbyImageData(width: 600, formats: [AUTO, WEBP])
                    }
                }
            }
        }
    }
`

const Features = () => {
    const response = useStaticQuery(getTrabajos)
    const directorFeatures = response.trabajos.edges.filter(({node}) => node.category == "director")
    const actorFeatures = response.trabajos.edges.filter(({node}) => node.category == "actor")

    return (
        <ProductsStyles>
            <div className="features__container">
                <h2>Actor</h2>
                <div className="features__container--scroll">
                    {actorFeatures.map(({ node }) => {
                        return <Product feature={node} category="actor"/>
                    })}
                </div>
            </div>
            <div className="features__container">
                <h2>Director</h2>
                <div className="features__container--scroll">
                    {directorFeatures.map(({ node }) => {
                        return <Product feature={node} category="director"/>
                    })}
                </div>
            </div>
        </ProductsStyles>
    )
}

export default Features
