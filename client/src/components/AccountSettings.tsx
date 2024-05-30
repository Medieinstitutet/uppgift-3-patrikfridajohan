import "../styles/account.css";

interface IAccountSettings {
  dummyData: {
    email: string;
    plan: {
      name: string;
      cost: string;
    };
    renewal: string;
    billing: string;
  };
}

export const AccountSettings = (props: IAccountSettings) => {

    // useeffect to get cookie info
    
  return (
    <div className="account-settings-container">
      <div className="settings-personal-info">
        <h3>Personal information</h3>
        <form className="personal-info-form">
            <label htmlFor="" className="form-label">Firstname</label>
            <input type="text" className="form-control"/>
            <label htmlFor="" className="form-label">Lastname</label>
            <input type="text" className="form-control"/>
            <label htmlFor="" className="form-label">Email</label>
            <input type="text" className="form-control"/>
            <button type="submit" className="btn">Save changes</button>
        </form>
      </div>
      <div className="settings-billing-info">
        
      </div>
    </div>
  );
};
