import React, { createRef, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  HStack,
  Button,
  VStack,
  Textarea,
  useColorMode,
  useToast,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  emailButtonValidation,
  emailSubmit,
  emailValidation,
} from "@utils/emailFunctions";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptchaKey } from "@utils/variables";

const EmailForm = () => {
  const { colorMode } = useColorMode();
  const ref = createRef();
  const [recaptcha, setRecaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  return (
    <Box as="main" display="flex" flexDir="column" alignItems="center">
      <Box width="850px" maxWidth="850px" mb="10px">
        {!loading ? (
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              subject: "",
              content: "",
            }}
            onSubmit={(values, formikBag) => {
              emailSubmit(
                values,
                ref,
                formikBag,
                toast,
                setLoading,
                setRecaptcha
              );
            }}
            validationSchema={emailValidation}
          >
            {({
              values: { email, firstName, lastName, subject, content },
              handleChange,
              errors,
            }) => (
              <Form>
                <VStack>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                      name="email"
                      value={email}
                      onChange={handleChange}
                      id="email"
                      type="email"
                      placeholder="Enter Email here"
                      color={colorMode === "light" ? "#000" : "#fff"}
                      borderRadius="4px"
                      borderWidth="3px"
                      borderColor="textBlue"
                      height="50px"
                      _hover={{ borderColor: "black" }}
                      _placeholder={{
                        color: colorMode === "light" ? "black" : "textBlue",
                        fontWeight: "bold",
                      }}
                    />
                    {errors.email ? (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    ) : (
                      <FormHelperText
                        fontWeight="bold"
                        color={colorMode === "light" ? "black" : "white"}
                      >
                        We'll never share your email/personal information.
                      </FormHelperText>
                    )}
                  </FormControl>
                </VStack>
                <HStack
                  mt="10px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <FormControl mr="10px" isInvalid={errors.firstName}>
                    <FormLabel htmlFor="fName">First Name:</FormLabel>
                    <Input
                      id="fName"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter First Name here"
                      color={colorMode === "light" ? "#000" : "#fff"}
                      borderRadius="4px"
                      borderWidth="3px"
                      borderColor="textBlue"
                      height="50px"
                      _hover={{ borderColor: "black" }}
                      _placeholder={{
                        color: colorMode === "light" ? "black" : "textBlue",
                        fontWeight: "bold",
                      }}
                    />
                    {errors.firstName && (
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.lastName}>
                    <FormLabel htmlFor="LName">Last Name:</FormLabel>
                    <Input
                      id="LName"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Last Name here"
                      color={colorMode === "light" ? "#000" : "#fff"}
                      borderRadius="4px"
                      borderWidth="3px"
                      borderColor="textBlue"
                      height="50px"
                      _hover={{ borderColor: "black" }}
                      _placeholder={{
                        color: colorMode === "light" ? "black" : "textBlue",
                        fontWeight: "bold",
                      }}
                    />
                    {errors.lastName && (
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    )}
                  </FormControl>
                </HStack>
                <VStack>
                  <FormControl mt="10px" isInvalid={errors.subject}>
                    <FormLabel htmlFor="subject">Subject:</FormLabel>
                    <Input
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Subject here"
                      color={colorMode === "light" ? "#000" : "#fff"}
                      borderRadius="4px"
                      borderWidth="3px"
                      borderColor="textBlue"
                      height="50px"
                      _hover={{ borderColor: "black" }}
                      _placeholder={{
                        color: colorMode === "light" ? "black" : "textBlue",
                        fontWeight: "bold",
                      }}
                    />
                    {errors.subject && (
                      <FormErrorMessage>{errors.subject}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt="10px" isInvalid={errors.content}>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <Textarea
                      id="content"
                      name="content"
                      value={content}
                      onChange={handleChange}
                      placeholder="Enter content here"
                      color={colorMode === "light" ? "#000" : "#fff"}
                      borderRadius="4px"
                      borderWidth="3px"
                      borderColor="textBlue"
                      height="50px"
                      _hover={{ borderColor: "black" }}
                      _placeholder={{
                        color: colorMode === "light" ? "black" : "textBlue",
                        fontWeight: "bold",
                      }}
                    />
                    {errors.content && (
                      <FormErrorMessage>{errors.content}</FormErrorMessage>
                    )}
                    <FormHelperText
                      color={colorMode === "light" ? "black" : "white"}
                      fontWeight="bold"
                    >
                      Protected by Recaptcha
                    </FormHelperText>
                  </FormControl>
                  <Box cursor="pointer">
                    <ReCAPTCHA
                      ref={ref}
                      size="normal"
                      sitekey={reCaptchaKey}
                      onChange={() => setRecaptcha(true)}
                      onExpired={() => {
                        if (recaptcha) {
                          setRecaptcha(false);
                          ref.current.reset();
                        }

                        toast({
                          title: "Recaptcha Expired",
                          description: "Verification expired. try again!",
                          status: "warning",
                          duration: 4000,
                          isClosable: true,
                          position: "top",
                        });
                      }}
                      onErrored={() => {
                        if (recaptcha) {
                          setRecaptcha(false);
                          ref.current.reset();
                        }
                        toast({
                          title: "Recaptcha Error",
                          description: "An error occured try to verify again.",
                          status: "error",
                          duration: 4000,
                          isClosable: true,
                          position: "top",
                        });
                      }}
                    />
                  </Box>

                  <Box>
                    <Button
                      type="submit"
                      bg="textBlue"
                      height="50px"
                      minWidth="150px"
                      ml="8px"
                      color="white"
                      flexBasis="30%"
                      fontSize="23px"
                      disabled={emailButtonValidation(
                        email,
                        firstName,
                        lastName,
                        subject,
                        content,
                        recaptcha,
                        errors
                      )}
                    >
                      {" "}
                      Submit
                    </Button>
                  </Box>
                </VStack>
              </Form>
            )}
          </Formik>
        ) : (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
          >
            <Box display="flex" alignItems="center" mt="24px">
              <Spinner color="textBlue" size="xl" mr="5px" />
              <Heading>Submitted! Waiting for response...</Heading>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmailForm;
