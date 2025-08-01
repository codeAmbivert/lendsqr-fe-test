"use client";
import { useState } from "react";
import "@/app/styles/general.scss";
import "@/app/styles/sign-in.scss";
import { Logo, Logo2, SignInImg } from "../../../public/icons";
import InputField from "../shared/InputField";
import localFont from "next/font/local";
import Button from "../shared/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Avenir_Next = localFont({
  src: [
    {
      path: "../../../public/Avenir Next/AvenirNextCyr-Thin.woff",
      weight: "100",
    },
    {
      path: "../../../public/Avenir Next/AvenirNextCyr-Light.woff",
      weight: "300",
    },
    {
      path: "../../../public/Avenir Next/AvenirNextCyr-Regular.woff",
      weight: "400",
    },
    {
      path: "../../../public/Avenir Next/AvenirNextCyr-Medium.woff",
      weight: "500",
    },
    {
      path: "../../../public/Avenir Next/AvenirNextCyr-Demi.woff",
      weight: "600",
    },
    {
      path: "../../../public/Avenir Next/AvenirNextCyr-Bold.woff",
      weight: "700",
    },
  ],
  variable: "--avenir-font",
  display: "swap",
});

const SignInComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      });
      return;
    }
    setLoading(true);
    router.push("/dashboard");
  };

  return (
    <div className={`container ${Avenir_Next.variable}`}>
      <div className="img-container">
        <div>
          <Logo height={36} width={173.76} />
          <SignInImg className="signin-img" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div>
            <Logo2 height={36} width={173.76} className="mobile-logo" />
            <h1>Welcome!</h1>
            <p className="info-text">Enter details to login.</p>
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              icon={
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-type"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              }
              error={errors.password}
            />
            <Link href="#" className="fgt-pwd">
              FORGOT PASSWORD?
            </Link>
            <Button className="btn" variant="filter" type="submit">
              {loading ? "LOGGING IN..." : "LOG IN"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInComponent;
