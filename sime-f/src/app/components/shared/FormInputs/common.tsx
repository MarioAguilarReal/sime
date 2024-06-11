export const getDescendent = (obj: any, desc: string) => {
  return desc.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export const getErrorElement = (content: any) =>{
  return <p className="invalid-input-error">* {content}</p>
}

export const getValidationErrors = (errors: any, field: string, label: string, rules: any, requiredError = "es requerido") => {
  const error = getDescendent(errors, field);
  if (error) {
    return <span className="text-danger">{`* ${error.message} ${requiredError}`}</span>;
  }
  return null;
}
