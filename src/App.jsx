// Importing the React library and the useState hook to manage state in the app
import React, { useState } from 'react';
// Importing the CSS file for styling
import './App.css';

function App() {
  // useState hook is used to store and manage the state of the form fields
  // The state will hold values for product name, description, and target audience
  const [adContent, setAdContent] = useState({
    productName: '', // Empty value for now
    description: '',
    audience: '',
  });

  //to track validation errors
  const [errors, setErrors] = useState({
    productName: '',
    description: '',
    audience: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  // handleInputChange function will be called every time the user types something in an input field
  // It updates the corresponding field in the adContent state
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get name and value from input field
    // Update the state with the new value, spread the previous state and change the specific field
    setAdContent({ ...adContent, [name]: value });
  };

  // handleSubmit function will be called when the user submits the form
  // For now, it just logs the form data to the console (you will replace this with AI logic later)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page when submitted
    
    // Add this line for debugging
    console.log('Form submitted');
    
    if (!validateForm()) return;
  
    try {
      const response = await fetch('http://localhost:3001/submit-ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // sending JSON
        },
        body: JSON.stringify(adContent), // convert form data to JSON
      });
  
      const result = await response.json();
      console.log(result.message); // this message comes from the backend
      setSuccessMessage(result.message);
    } catch (error) {
      console.error('Error submitting ad content:', error);
    }
  };
  

  //function to validate form
  const validateForm = () => {
    const newErrors = {};
    //check if the field is empty
    if (!adContent.productName) {
      newErrors.productName = 'Product name is required';
    }
    if (!adContent.description) {
      newErrors.description = 'Description is required';
    }
    if (!adContent.audience) {
      newErrors.audience = 'Audience is required';
    }

    setErrors(newErrors);
    //return true if no errors, false if there is an error
    return Object.keys(newErrors).length === 0;
  };


  return (
    // Main container of the app
    <div className="App">
      {/* Heading of the app */}
      <h1>AdGenie: AI Ad Content Generator</h1>

      {/* Form that collects data for generating ad content */}
      <form onSubmit={handleSubmit}>
        {/* Input field for the product name */}
        <div>
          <label>Product Name:</label>
          <input
            type="text" // Specifies text as input
            name="productName" // Used to identify the field in the state
            value={adContent.productName} // The value of this input field is controlled by the state
            onChange={handleInputChange} // Every time the user types, handleInputChange will be called
            placeholder="Enter product name" // Placeholder text for input field
          />
          {/*display error if there is an error*/}
          {errors.productName && <p style={{color : 'red'}}>{errors.productName}</p>}
        </div>

        {/* Input field for the description */}
        <div>
          <label>Description:</label>
          <input
            type="text" // Specifies input should be text
            name="description" // Used to identify the description field in the state
            value={adContent.description} // The value of this input field is controlled by the state
            onChange={handleInputChange} // Every time the user types, handleInputChange will be called
            placeholder="Enter description" // Text for input field
          />
          {errors.description && <p style={{color : 'red'}}>{errors.description}</p>}
        </div>

        {/* Input field for target audience */}
        <div>
          <label>Target Audience:</label>
          <input
            type="text" // Specifies input should be text
            name="audience" // Identifies the audience field in the state
            value={adContent.audience} // The value of this input field is controlled by the state
            onChange={handleInputChange} // Will be called when the user types
            placeholder="Enter target audience" // Placeholder text for input field
          />
          {errors.audience && <p style={{ color: 'red' }}>{errors.audience}</p>}
        </div>

        {/* Submit button for the form */}
        <button type="submit">Generate Ad</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

    </div>
  );
}

// Export the App component so it can be used in other files (like index.js)
export default App;
