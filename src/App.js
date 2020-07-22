import React, { useState } from 'react';
import useFetechJops from './Hook/useFetech';
import JobPagination from './components/JobPagination';
import SearchForm from './components/SearchForm';

import { Container } from 'react-bootstrap'
import Job from './components/Job';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetechJops(params, page);

  const inputChangeHandler = (ev) => {
    const param = ev.target.name
    const value = ev.target.value
    setPage(1);
    setParams(preParams => {
      return {
        ...preParams,
        [param]: value
      }
    })

  }
  return (
    <Container className="my-4">
      <h1 className='mb-4'>GitHub Jobs</h1>

      <SearchForm params={params} onParamChange={inputChangeHandler} />
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading ...</h1>}
      {error && <h1>Error, Try to refresh ...</h1>}
      <h1>{jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}</h1>
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>

  );
}

export default App;
