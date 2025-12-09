import { useState } from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/Formik";

function App() {
  return (
    <>
      <RegistrationForm />
      <FormikForm />
    </>
  );
}

export default App;
