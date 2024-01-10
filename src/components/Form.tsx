import React from "react";
import { Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { Button, Dropdown, Form } from "react-bootstrap";
import { affiliationsData } from "../affiliations";
import { useState } from "react";
import { User } from "../types/types";
import axios from "axios";
import { useAlert } from "react-alert";

const SignupSchema = object().shape({
  firstName: string().min(2, "Too short first name!").max(50, "Too long first name!").required("Required"),
  lastName: string().min(2, "Too short last name!").max(50, "Too long last name!").required("Required"),
  email: string().email("Invalid email").required("Required"),
  state: string(),
});

export const RegistrationForm = () => {
  const alert = useAlert();
  const [affiliation, setAffiliation] = useState<string[]>(["L100"]);
  const [affiliationError, setAffiliationError] = useState("");

  const handleDropdown = (aff: string) => {
    if (affiliation.includes(aff)) {
      setAffiliation((prev) => (prev.length > 1 ? prev.filter((item) => item !== aff) : prev));
    } else {
      setAffiliation((prev) => [...prev, aff]);
    }
  };

  const onSubmitHandler = async (values: User, { resetForm, setSubmitting }: FormikHelpers<User>) => {
    try {
      const response = await axios.put("https://hpkkgjm317.execute-api.eu-north-1.amazonaws.com/test/users", values);
      resetForm();
      setSubmitting(false);
      const message = response.data.message;
      alert.success(message || "Your Account has been submitted to AFSCME for review");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error with registration";
      alert.error(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        affiliation: affiliation,
        state: "NY",
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmitHandler}>
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form className="form d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
          <Form.Group controlId="firstName" className="form-group">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Monika"
              value={values.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </Form.Group>
          <Form.Group controlId="lastName" className="form-group">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Geller"
              value={values.lastName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="error">{errors.lastName}</div>}
          </Form.Group>
          <Form.Group controlId="email" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </Form.Group>
          <div className="d-flex align-items-center w-100">
            <Form.Group controlId="state" className="form-group flex-grow-1 me-2">
              <Form.Label>State</Form.Label>
              <Form.Select
                onChange={(e) => {
                  handleChange(e);
                  const selectedState = e.target.value;
                  const filteredAffiliations = affiliationsData.filter((aff) => aff.state === selectedState);
                  if (filteredAffiliations.length > 0) {
                    setAffiliation([filteredAffiliations[0].aff]);
                  } else {
                    setAffiliation([]);
                  }
                }}>
                {Array.from(new Set(affiliationsData.map((aff) => aff.state))).map((state, key) => (
                  <option value={state} key={key}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="affiliation" className="form-group flex-grow-1">
              <Form.Label>Affiliations</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className="w-100" variant="outline-secondary">
                  {affiliation.join(", ")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {affiliationsData
                    .filter((aff) => aff.state === values.state)
                    .map((item, key) => (
                      <Dropdown.Item key={key} onClick={() => handleDropdown(item.aff)}>
                        {item.aff} {affiliation.includes(item.aff) && "✓"}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
              {affiliationError && <div className="error">{affiliationError}</div>}
            </Form.Group>
          </div>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
