import "../styles/account.css";
import arrow from "../assets/arrow_forward_40dp_FILL0_wght400_GRAD0_opsz40.svg";

export const AccountDash = () => {
  return (
    <>
      <div className="genvag">
        <p>Account</p>
        <div className="arrow">
          <img src={arrow} alt="arrow pointing right" />
        </div>
      </div>
      <div className="genvag">
        <p>Billing</p>
        <div className="arrow">
          <img src={arrow} alt="arrow pointing right" />
        </div>
      </div>
      <div className="quick">
        <p>Quick overview</p>
        <div className="current">
          <h3>You are currently a STANDARD/PLUS/EXCLUSIVE member.</h3>
          <div className="to-tiers">
            <p>Curios about the other tiers and their benefits? Take a look!</p>
            <button type="button" className="btn">
              Tiers
            </button>
          </div>
        </div>
        <h5>Billed every 7th day</h5>
      </div>
    </>
  );
};
