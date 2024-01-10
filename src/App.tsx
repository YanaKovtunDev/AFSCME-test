import React from "react";
import { Container } from "react-bootstrap";
import { RegistrationForm } from "./components/Form";
import "./App.css";
import { positions, Provider as AlertProvider } from "react-alert";
import { Alert } from "./components/Alert";

function App() {
  return (
    <AlertProvider template={Alert} position={positions.TOP_RIGHT} timeout={4000} containerStyle={{ zIndex: 2001 }}>
      <Container className="d-flex flex-column align-items-center mt-4">
        <h3 className="mb-4">Registration form</h3>
        <RegistrationForm />
      </Container>
    </AlertProvider>
  );
}

export default App;
