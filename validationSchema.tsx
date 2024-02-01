import * as Yup from "yup";

// Define the validation schema using Yup
export const validationSchema = Yup.object({
  LengthOfLine: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .max(65535, 'Must be 65535 or less'),
  LengthOfWorkTool: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .max(65535, 'Must be 65535 or less'),
  HeightOfPiece: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .max(65535, 'Must be 65535 or less'),
  SpeedToWorkPlace: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .max(65535, 'Must be 65535 or less'),
  SpeedInFrezare: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .max(65535, 'Must be 65535 or less'),
});