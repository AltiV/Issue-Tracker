import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Button, Form, Table } from 'react-bootstrap'

export default class IssueDetails extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      url: '',
      description: '',
      issue: '',

      update_description: '',

      edit_description: '',
      edit_state: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.deleteIssue = this.deleteIssue.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.editUpdate = this.editUpdate.bind(this)
    this.deleteUpdate = this.deleteUpdate.bind(this)
  }

  componentDidMount () {
    axios
      .get('/api/projects/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          url: response.data.url,
          description: response.data.description,
          issue: response.data.issues.find(
            obj => obj._id === this.props.match.params.type
          )
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  deleteIssue () {
    axios
      .delete(
        '/api/projects/' +
          this.props.match.params.id +
          '/' +
          this.props.match.params.type +
          '/delete'
      )
      .then(res => {
        this.props.history.push('/projects/' + this.props.match.params.id)
      })
  }

  onSubmit (event) {
    event.preventDefault()

    const update = {
      description: this.state.update_description
    }

    event.target.reset()

    // Send a POST request to the database to save the project
    axios
      .post(
        '/api/projects/' +
          this.props.match.params.id +
          '/' +
          this.props.match.params.type +
          '/addupdate',
        update
      )
      .then(res => {
        // axios
        //   .get('/api/projects/' + this.props.match.params.id)
        //   .then(response => {
        //     console.log(this.props.match.params.type)

        //     console.log(response.data.issues)

        //     this.setState({
        //       ...this.state,
        //       issue: response.data.issues.find(
        //         obj => (obj._id = this.props.match.params.type)
        //       )
        //     })

        //     console.log(this.state)
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })

        window.location.reload(false)
      })
  }

  editUpdate (event, newDescription) {
    event.preventDefault()

    const update = {
      description: newDescription
    }

    axios
      .patch(
        '/api/projects/' +
          this.props.match.params.id +
          '/' +
          this.props.match.params.type +
          '/' +
          this.state.edit_state +
          '/update',
        update
      )
      .then(response => {
        this.setState({
          ...this.state,
          edit_state: 0
        })

        axios
          .get('/api/projects/' + this.props.match.params.id)
          .then(response => {
            // this.setState({
            //   ...this.state,
            //   issue: response.data.issues.find(
            //     obj => (obj._id = this.props.match.params.type)
            //   )
            // })

            // ISSUE: Issue[0] always copies the same ID as whatever issue is currently being linked to, forcing incorrect state update
            // console.log(response.data)

            // This is a stopgap for now
            window.location.reload(false)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => console.log(error))
  }

  deleteUpdate (event, id) {
    event.preventDefault()

    axios
      .delete(
        '/api/projects/' +
          this.props.match.params.id +
          '/' +
          this.props.match.params.type +
          '/' +
          id +
          '/delete'
      )
      .then(() => {
        // axios
        //   .get('/api/projects/' + this.props.match.params.id)
        //   .then(response => {
        //     this.setState({
        //       ...this.state,
        //       issue: response.data.issues.find(
        //         obj => (obj._id = this.props.match.params.type)
        //       )
        //     })
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })

        window.location.reload(false)
      })
      .catch(error => console.log(error))
  }

  render () {
    return this.state.issue.name ? (
      <>
        <Link to={'/projects/' + this.props.match.params.id}>
          &lt; Return to Project
        </Link>

        <Button variant='danger float-right' onClick={this.deleteIssue}>
          Delete Issue
        </Button>

        <Link
          to={
            '/projects/' +
            this.props.match.params.id +
            '/' +
            this.props.match.params.type +
            '/update'
          }
        >
          <Button variant='info float-right'>Edit Issue</Button>
        </Link>

        <h3>{this.state.issue.name}</h3>
        <p>{this.state.issue.description}</p>

        <h3>Updates</h3>

        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId='updateDescription'>
            <Form.Control
              name='update_description'
              required
              type='text'
              placeholder='Add new update here'
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>

        <Table bordered hover responsive size='sm'>
          <thead className='thead-light'>
            <tr>
              <th>Update</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.issue.updates
              .map(update => {
                return (
                  <tr key={update._id}>
                    <td>
                      {this.state.edit_state === update._id ? (
                        <Form
                          onSubmit={event =>
                            this.editUpdate(
                              event,
                              event.target.edit_description.value
                            )
                          }
                        >
                          <Form.Group controlId='editUpdate'>
                            <Form.Control
                              name='edit_description'
                              required
                              autoFocus
                              type='text'
                              defaultValue={update.description}
                              onBlur={() => this.setState({ edit_state: 0 })}
                            />
                          </Form.Group>
                        </Form>
                      ) : (
                        update.description
                      )}
                    </td>
                    <td>{new Date(update.createdAt).toLocaleString()}</td>
                    <td>
                      {' '}
                      <Button
                        variant='info'
                        onClick={() => {
                          setTimeout(() => {
                            this.setState({ edit_state: update._id })
                          }, 100)
                        }}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant='danger'
                        onClick={event => this.deleteUpdate(event, update._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              })
              .sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1))}
          </tbody>
        </Table>
      </>
    ) : (
      <>Loading...</>
    )
  }
}
