import * as Yup from "yup";
export const addUserSchema = Yup.object({
  name: Yup.string().min(4, "Too short ").max(20).required(),
  email: Yup.string().email("Invalid Email").required(),
  salary: Yup.number().required(),
  age: Yup.number().required(),
  exit_date: Yup.string().required(),
  Job_title: Yup.string().required(),
  gender: Yup.string().required(),
  hire_date: Yup.date().required(),
  department: Yup.string().required(),
  city: Yup.string().required(),
  password: Yup.string().required(),
  role: Yup.string(),
  annual_leave: Yup.number().required(),
  sick_leave: Yup.number().required(),
  employee_id: Yup.number(),
  remaining_leave: Yup.number(),
});

export const leaveSchema = Yup.object({
  name: Yup.string().min(4).max(20),
  email: Yup.string().email(),
  leave_type: Yup.string().required(),
  to_date: Yup.date(),
  from_date: Yup.date().required(),
  leave_application: Yup.string().required(
    "Application must contain reason for leave"
  ),
  days: Yup.number(),
  employee_id: Yup.string().required(),
  status: Yup.string().required(),
});

export const leaveDecisionSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required(),
  status: Yup.string().required(),
  comment: Yup.string(),
  employee_id: Yup.string().required(),
});
export const updateUserSchema = Yup.object({
  name: Yup.string().min(4).max(20).required(),
  salary: Yup.number().required(),
  age: Yup.number().required(),
  exit_date: Yup.string().required(),
  Job_title: Yup.string().required(),
  gender: Yup.string().required(),
  hire_date: Yup.date().required(),
  department: Yup.string().required(),
  city: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().nullable(),
});
