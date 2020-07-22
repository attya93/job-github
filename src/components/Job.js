import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);

    const toggleCollapse = () => {
        setOpen(!open);
    }
    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">
                                {job.company}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <h5>
                            <Badge variant="secondary" className="mb-2 mr-1">{job.type}</Badge>
                            <Badge variant="secondary" className="mb-2">{job.location}</Badge>
                        </h5>
                        <div style={{ wordBreak: "break-all" }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img src={job.company_logo} alt={job.company} height="50" className='d-none d-md-block' />
                </div>
                <Card.Text>
                    <Button variant="primary" onClick={toggleCollapse}>
                        {open ? "Hide Details" : "Show Details"}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default Job
