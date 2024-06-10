import "../styles/account.css";
import arrow from "../assets/arrow_forward_40dp_FILL0_wght400_GRAD0_opsz40.svg";
import { Link } from "react-router-dom";

interface IAccountDash {
  dummyData: {
    email: string;
    plan: {
      name: string;
      cost: string;
    };
    renewal: string;
    billing: string;
  };
  setSelection: (selection: "dashboard" | "subscription" | "settings" | "support") => void;
}

export const AccountDash = (props: IAccountDash) => {
  const handleAccount = () => {
    props.setSelection("settings");
  };

  const handleBilling = () => {
    props.setSelection("subscription");
  }

  return (
    <>
      <div className="genvag" onClick={handleAccount}>
        <p>Account</p>
        <div className="arrow">
          <img src={arrow} alt="arrow pointing right" />
        </div>
      </div>
      <div className="genvag" onClick={handleBilling}>
        <p>Billing</p>
        <div className="arrow">
          <img src={arrow} alt="arrow pointing right" />
        </div>
      </div>
      <div className="quick">
        <p>Quick overview</p>
        <div className="current">
          <h3>You are currently a {props.dummyData.plan.name} member.</h3>
          <div className="to-tiers">
            <p>Curious about the other tiers and their benefits? Take a look!</p>
            <Link to="/user/subscriptions" style={{ textDecoration: "none" }}>
              <button type="button" className="btn">
                Tiers
              </button>
            </Link>
          </div>
        </div>
        <h5>Billed ${props.dummyData.plan.cost} every 7th day</h5>
      </div>
    </>
  );
};
