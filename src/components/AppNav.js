import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoRadioTower from 'react-icons/lib/go/radio-tower';
import { getCategories } from '../actions'
import { capitalize } from '../utils/helpers'

class AppNav extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const categories_list = this.props.categories.data.categories || [ ]

    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Readable</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          { categories_list.map(({name,path}) => (
              <NavItem key={name} href={`/${path}`}> {capitalize(name)} </NavItem>
          )) }
          <NavItem href='/all/new/editor'><GoRadioTower/> Add Post</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state

  return {
    categories,
  }
}

const mapDispatchToProps = {
  getCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNav)
