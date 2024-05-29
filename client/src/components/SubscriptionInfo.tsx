import "../styles/account.css";

interface ISubscriptionInfo {
    dummyData: {email: string,
        plan: {
            name: string,
            cost: string,
        },
        renewal: string,
        billing: string
    }
}

export const SubscriptionInfo = (props: ISubscriptionInfo) => {

  return (
    <div className="sub-container">
      <div className="sub-info">
        <h2>Your subscription info</h2>
        <div className="info-row">
          <p>Current plan:</p>
          <h4>{props.dummyData.plan.name}</h4>
        </div>
        <div className="info-row">
          <p>Next billing date:</p>
          <h4>{props.dummyData.renewal}</h4>
        </div>
      </div>
      <div className="billing">
        <h2>Billing Information:</h2>
        <p>Renewal: Every 7tn day</p>
        <p>Cost: ${props.dummyData.plan.cost}/month</p>
        <p>Payment method: {props.dummyData.billing}</p>
        <button type="button" className="btn">Change</button>
      </div>
    </div>
  );
};
