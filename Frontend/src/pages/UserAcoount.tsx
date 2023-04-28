import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ProfileInformation from "./ProfileInformation";
import UserHistorique from "./UserHistorique";
function UserAccount() {
  return (
    <Tabs
      defaultActiveKey="Informations"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="Informations" title="Settings">
        <ProfileInformation />
      </Tab>

      <Tab eventKey="Historique" title="Historique">
        <UserHistorique />
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled></Tab>
    </Tabs>
  );
}

export default UserAccount;
