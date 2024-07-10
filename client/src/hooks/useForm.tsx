import { useState } from "react";

type ValidationRule<T> = (value: T) => string | null;

interface FormValues {
  [key: string]: string | number | any; // Dynamic form values
}

interface ValidationRules {
  [key: string]: ValidationRule<any>; // Dynamic validation rules
}

const useForm = <T extends FormValues>(
  initialState: T = {} as T,
  validationRules: ValidationRules = {}
): {
  values: T;
  errors: { [key: string]: string | null };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (submitFunction: (data: T) => void) => (event: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
} => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target.checked);
    // Handle checkbox values separately
    const newValue = event.target.type === "checkbox" ? event.target.checked : value;
    setValues({ ...values, [name]: newValue });

    // Validate the field on change (optional)
    const fieldError = validateField(name, newValue);
    setErrors({ ...errors, [name]: fieldError });
  };

  const validateField = (fieldName: string, fieldValue: any): string | null => {
    const validationRule = validationRules[fieldName];
    if (!validationRule) return null; // No validation rule for this field

    const errorMessage = validationRule(fieldValue);
    return errorMessage || null; // Return error message or null if valid
  };

  const validateForm = (): boolean => {
    let hasErrors = false;
    const newErrors: { [key: string]: string | null } = {};

    // Validate all fields based on validation rules
    for (const field in validationRules) {
      const error = validateField(field, values[field]);
      if (error) {
        hasErrors = true;
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return !hasErrors; // Return true if no errors, false otherwise
  };

  const handleSubmit = (submitFunction: (data: T) => void) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      submitFunction(values);
      // Handle successful form submission (reset form, etc.)
    } else {
      console.error("Form has validation errors:", errors);
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, resetForm };
};

export default useForm;
