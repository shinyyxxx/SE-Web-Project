import PageHeadingCardFormFilter from "../components/PageHeadingCardFormFilter";
import SignUpFormContainer from "../components/SignUpFormContainer";
import "./NewRegPage.css";

export default function Register() {

  return (
    <div className="new-reg-page">
      <PageHeadingCardFormFilter />
      <SignUpFormContainer />
    </div>
  )
}