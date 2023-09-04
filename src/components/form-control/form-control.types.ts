export interface FormControlProps {
  formName: string;
  inputName: string;
  labelText: string;
  helpText?: string;
  placeholderText: string;
  type?: string;
  value?: string;
  min?: string;
  disabled?: boolean;
  classes?: string[];
}
