import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Row, Col, Container, NavDropdown } from 'react-bootstrap';
import { Divider } from '@nextui-org/react';


const NavBar = () => {

    return (
        <>
             <Navbar collapseOnSelect expand='lg' style={{background: "rgba(240, 242, 245, 0.1)"}}>
                <Navbar.Brand style={{color: "#22aa98"}}><b>Looking</b></Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav"  className='justify-content-center'/> */}
                <Navbar.Collapse className='justify-content-center p-0' id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href='/' style={{color: '#4f5c68'}}><b>Home</b></Nav.Link>
                        <Nav.Link href='/find-friend' style={{color: '#4f5c68'}}><b>Find Friend</b></Nav.Link>
                        <Nav.Link href='/challenge' style={{color: '#4f5c68'}}><b>Challenge</b></Nav.Link>
                        <Nav.Link href='/ranking' style={{color: '#4f5c68'}}><b>Ranking</b></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Divider style={{background: '#4f5c68'}}/>
        </>
    );
};

export default NavBar;

                {/* <Row className='w-100'>
                    <Col md={2}>
                        <Navbar.Brand style={{color: "#ca205f"}}>Looking</Navbar.Brand>
                    </Col>
                     <Col md={8}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"  className='justify-content-end'/>
                        <Navbar.Collapse className='justify-content-center p-0' id="responsive-navbar-nav">
                            <Nav style={{color: '#f0f2f5'}}>
                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href='/find-friend'>Find Friend</Nav.Link>
                                <Nav.Link href='/challenge'>Challenge</Nav.Link>
                                <Nav.Link href='/ranking'>Ranking</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col md={2}>

                    </Col>
                </Row> */}