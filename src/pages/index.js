import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Calendar from "../components/calender"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Calendar />
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
