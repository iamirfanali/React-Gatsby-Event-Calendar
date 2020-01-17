import React from "react"
import Layout from "../components/layout"
import Calendar from "../components/calender"

const IndexPage = () => (
  <Layout>
    <div className="container">
      <div className="row">
        <div className="col-12 pt-5 pb-5">
          <Calendar />
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
