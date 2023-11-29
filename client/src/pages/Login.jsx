import PageHeadingCardFormFilter from "../components/PageHeadingCardFormFilter";
import SignInForm from "../components/SignInForm";
import "./NewLoginPage.css";

export default function Login() {
  return (
    <div className="new-login-page">
      <PageHeadingCardFormFilter />
      <SignInForm />
    </div>
  )
}