export interface FormSelectProps {
  formName: string;
  inputName: string;
  labelText: string;
  helpText?: string;
  options: { label: string; value: string }[];
  classes?: string[];
  disabled?: boolean;
  value?: string;
}
