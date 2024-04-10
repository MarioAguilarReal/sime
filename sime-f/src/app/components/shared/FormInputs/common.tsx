export const getDescendent = (obj: any, desc: string) => {
  return desc.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export const getErrorElement = (content: any) =>{
  return <p className="invalid-input-error">* {content}</p>
}

export const getValidationErrors = (errors: any, field: string, label: string, rules: any, requiredError = "is required") => {
  const error = getDescendent(errors, field);
  if (error) {
    return error.message;
  }
  if (rules.required) {
    return `${label} ${requiredError}`;
  }
  return null;
}
