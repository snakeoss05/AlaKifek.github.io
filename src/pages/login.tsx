import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Logaccount() {
  return (
    <div
      className="container d-flex align-items-center justfy-content-center align-content-center flex-column  "
      style={{ height: "calc(100vh - 155px)" }}
    >
      <Form className="w-25 bg-white p-5 rounded-4">
        <Form.Group controlId="formBasicEmail" className="my-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary mt-4" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
