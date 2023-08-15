import React, { useState } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CATEGORIES, QUERY_USER } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FormGroup, FormLabel, FormSelect, FormCheck } from "react-bootstrap"; // Import Bootstrap components

const TransactionComponent = ({ type }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfTransaction, setDateOfTransaction] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State for showing warning

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateOfTransaction(event.target.value);
  };

  const handleRecurringChange = () => {
    setRecurring(!recurring);
  };

  const handleTransactionSubmit = () => {
    if (!selectedCategory || !amount || !dateOfTransaction) {
      // Show warning if any required fields are empty
      setShowWarning(true);
      return;
    }

    // Clear warning if all required fields are filled
    setShowWarning(false);

    // Implement API call to submit the transaction data to the backend
  };

  const { data: userData } = useQuery(QUERY_USER); // Replace with the actual user ID
  console.log(userData);

  // const { loading, error, data } = useQuery(QUERY_ALL_CATEGORIES, {
  //   variables: { id: userId },
  // });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   console.error("Error:", error);
  //   return <div>Error fetching data</div>;
  // }

  // const categories = data.user.categories;

  return (
    <div className="d-flex flex-column mt-4">
      <h2 className="my-2 display-5 text-center">
        Add New {type === "Income" ? "Income" : "Expense"}
      </h2>
      {showWarning && (
        <p style={{ color: "red" }}>Please fill in all required fields.</p>
      )}

      <FormGroup>
        <FormLabel>Category:</FormLabel>
        <FormSelect value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a Category</option>
          {/* Map over your income/expense categories and generate options */}
        </FormSelect>
      </FormGroup>

      <FormGroup>
        <FormLabel>Amount:</FormLabel>
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Description:</FormLabel>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          Date of {type === "Income" ? "Income" : "Expense"}:
        </FormLabel>
        <input
          type="date"
          className="form-control"
          value={dateOfTransaction}
          onChange={handleDateChange}
        />
      </FormGroup>

      <FormGroup className="my-3">
        <FormCheck
          type="checkbox"
          label="Recurring"
          checked={recurring}
          onChange={handleRecurringChange}
        />
      </FormGroup>

      <button className="btn btn-primary" onClick={handleTransactionSubmit}>
        Add {type === "Income" ? "Income" : "Expense"}
      </button>
    </div>
  );
};

export default TransactionComponent;
