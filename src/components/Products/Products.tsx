import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ProductsStyles } from "./ProductsStyles"
import Product from "./Product"
import PropTypes from "prop-types"

const getTrabajos = graphql`
    query {
        products: allContentfulTrabajos {
            edges {
                node {
                    name
                    category
                    price
                    excerpt
                    contentful_id
                    slug
                    description {
                        description
                    }
                    images {
                        gatsbyImageData(width: 600, formats: [AUTO, WEBP])
                    }
                }
            }
        }
    }
`

const Features = ({ category }) => {

    const response = useStaticQuery(getTrabajos)
    const products = response.products.edges.filter(({node}) => node.category == category);

    return (
        <ProductsStyles>
            <div className="features__container">
                <div className="features__container--scroll">
                    {products.map(({ node }) => {
                        return <Product feature={node} category={category} />
                    })}
                </div>
            </div>
        </ProductsStyles>
    )
}

Features.propTypes = {
    category: PropTypes.oneOf(["actor", "director"]).isRequired,
}

export default Features
