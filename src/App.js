import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  // loading for showing status of page
  const [loading, setLoading] = useState(true)
  // jobs for storing data that we will fetch
  const [jobs, setJobs] = useState([])
  // we will use value as index for navigating through array of objects in data
  const [value, setValue] = useState(0)

  // get data from API
  const fetchJobs = async () => {
    try {
      const response = await fetch(url);
      const newJobs = await response.json();
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch data after first render
  useEffect(() => {
    fetchJobs();
  }, []);

  // when loading show status message
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  // show it only after the loading, because before fetching we have empty array as initial state
  const { company, dates, duties, title } = jobs[value];


  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* button container */}
        <div className="btn-container">
          {/* for each element in jobs array render a button */}
          {jobs.map((item, index) => {
            // 1. when click on button - update value so it's equal to index of a button. When value changes, we render new job object, because we use value as index jobs[value]
            // 2. if the index of a button matches current state value then apply active-class
            return <button key={item.id} onClick={() => setValue(index)} className={`job-btn ${index === value && 'active-btn'}`}> {item.company}</button>
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {/* render a div for each element of duties array */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
      <button type="button" class="btn">more info</button>
    </section >
  )
}

export default App
