import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <h1 className="sheet__title"> <a href={data.datoCmsWork.demourl}>{data.datoCmsWork.demourl}</a></h1>
        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        <div class__name="sheet__video">
           <iframe src= {data.datoCmsWork.videoiframeurl} width='600px' height ='340px' frameborder="0" scrolling="no" allowfullscreen="true"></iframe>
		    </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />

		<div className="sheet__links">
		  <a href={data.datoCmsWork.blogurl}>Blog Post</a><br/>
		  <img src={data.datoCmsWork.githubicon.fluid.src} /><a href={data.datoCmsWork.githuburl}>Github</a> <br/>
		  <a href={data.datoCmsWork.demourl}>{data.datoCmsWork.demourl}</a><br/>
	
		  </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
	  blogurl
	  githuburl
	  githubicon{
          fluid(maxWidth: 32, imgixParams: { auto: "compress" }) {
            src
          }
	  }
	  demourl
	  videoiframeurl
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
