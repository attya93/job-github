import React from 'react'
import { Form, Col } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
    return (
        <Form className="mb-4">
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onParamChange}
                        type='text'
                        value={params.description}
                        name="description" />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={onParamChange}
                        type='text'
                        value={params.location}
                        name="location" />
                </Form.Group>

                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check onChange={onParamChange}
                        value={params.full_time}
                        type="checkbox"
                        name="full_time"
                        id="full_time"
                        className="mb-2"
                        label="Full Time" />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default SearchForm
