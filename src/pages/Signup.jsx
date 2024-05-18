// @ts-nocheck
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTag from "@/src/components/ErrorTag";
import { doCreateUserWithEmailAndPassword } from "@/src/firebase/auth";
import { useAuth } from "../contexts/authContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm Password and Password must match"
    ) // Ensure confirmPassword matches password
    .required("Confirm password is required"),
  username: Yup.string().required("Username is requried"),
});

const Signup = () => {
  const { updateUserProfile } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        const userCredentials = await doCreateUserWithEmailAndPassword(
          values.email,
          values.password
        );
        await updateUserProfile(values.username);
      } catch (erroruserCredential) {
        console.error("error while creating user ", error);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema,
  });
  return (
    <Card className="mx-auto w-full md:w-[500px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
              />

              {formik.errors.username ? (
                <ErrorTag text={formik.errors.username} />
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {formik.errors.email ? (
                <ErrorTag text={formik.errors.email} />
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <ErrorTag text={formik.errors.password} />
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword ? (
                <ErrorTag text={formik.errors.confirmPassword} />
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Creating an account...." : "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/sigin" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
