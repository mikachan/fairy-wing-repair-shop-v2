var proxy = require("http-proxy-middleware");

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
    siteMetadata: {
        title: `The Fairy Wing Repair Shop`,
        description: `Collectables shop`,
        author: `Sarah Norris <sarah@sekai.co.uk>`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-source-stripe`,
            options: {
                objects: ["Product", "Sku", "Order"],
                secretKey: process.env.STRIPE_SECRET_KEY,
                downloadFiles: true,
                auth: false
            }
        },
        {
            resolve: `gatsby-plugin-stripe`,
            options: {
                async: true
            }
        },
        `gatsby-plugin-sass`
    ],
    // for avoiding CORS while developing Netlify Functions locally
    // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
    developMiddleware: app => {
        app.use(
            "/.netlify/functions/",
            proxy({
                target: "http://localhost:9000",
                pathRewrite: {
                    "/.netlify/functions/": ""
                }
            })
        );
    }
};
