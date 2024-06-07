import "../styles/account.css";

// interface ISubscriptionInfo {
//   dummyData: {
//     email: string;
//     plan: {
//       name: string;
//       cost: string;
//     };
//     renewal: string;
//     billing: string;
//   };
// }

interface ISubscriptionInfo {
  subscriptionData: {
    name: string;
    price: number;
    active: boolean;
    enddate: date;
  };
}

export const SubscriptionInfo = (props: ISubscriptionInfo) => {
  const { subscriptionData } = props;

  return (
    <div className="sub-container">
      <div className="sub-info">
        <h2>Your subscription info</h2>
        <div className="info-row">
          <p>Current plan:</p>
          <h4>{subscriptionData.name}</h4>
        </div>
        <div className="info-row">
          <p>Next billing date:</p>
          <h4></h4>
        </div>
      </div>
      <div className="billing">
        <h2>Billing Information:</h2>
        <p>Renewal: Every 7tn day</p>
        <p>Cost: ${subscriptionData.price}/month</p>
        <p>Payment method: Stripe</p>
        <button type="button" className="btn">
          Change plan
        </button>
        <button type="button" className="btn">
          Cancel subscription
        </button>
      </div>
    </div>
  );
};
