import * as Yup from "yup";
import { emailInstance } from "./axiosConfig";

export const emailSubmit = async (
  { email, firstName, lastName, subject, content },
  ref,
  formikBag,
  toast,
  setLoading,
  setRecaptcha
) => {
  if (ref.current.getValue()) {
    toast({
      title: "Email submitted",
      description: "Submitted! You will be informed if submitted successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setLoading(true);
    const emailRes = await emailInstance({
      url: "/emailSend",
      method: "post",
      data: {
        email,
        firstName,
        lastName,
        subject,
        content,
      },
    });
    if (emailRes?.data?.res === "Success") {
      setLoading(false);
      toast({
        title: "Email Success",
        description: "Success! I will respond to you shortly!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      formikBag.resetForm();
    }
    setRecaptcha(false);
    if (ref?.current) {
      ref.current.reset();
    }
  }
};

export const emailValidation = Yup.object().shape({
  email: Yup.string("Make sure to enter string")
    .email("use proper email format")
    .required("Don't forget to enter email"),
  firstName: Yup.string("Enter First Name Properly").required(
    "Make sure to input first name"
  ),
  lastName: Yup.string("Enter Last Name Properly").required(
    "Make sure to input last name"
  ),
  subject: Yup.string("Enter proper subject/title for email").required(
    "Make sure to enter subject/title"
  ),
  content: Yup.string(
    "Make sure to enter what you what you'd like to talk about"
  ).required("Enter what you want to talk about"),
});

export const emailButtonValidation = (
  email,
  firstName,
  lastName,
  subject,
  content,
  recaptcha,
  errors
) => {
  return (
    email.length === 0 ||
    errors.email ||
    firstName.length === 0 ||
    errors.firstName ||
    lastName.length === 0 ||
    errors.lastName ||
    subject.length === 0 ||
    errors.subject ||
    content.length === 0 ||
    errors.content ||
    !recaptcha
  );
};
