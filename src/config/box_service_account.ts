// Require the Box SDK
const BoxSDK = require("box-node-sdk");
// import box from "box-node-sdk"; - throws ts error - implicit any

const boxSDK = new BoxSDK({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
  appAuth: {
    keyID: process.env.BOX_PUBLIC_KEY_ID,
    passphrase: process.env.BOX_PASSPHRASE,
    // privateKey: Buffer.from(
    //   process.env.BOX_PRIVATE_KEY1 as string,
    //   "base64"
    // ).toString()
    privateKey:
      "-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIdLjTHaNDdX8CAggA\nMBQGCCqGSIb3DQMHBAgCFlgAMi2AwgSCBMjo90O2IQkEHyoDyMKjT+yg5PuoZ3KT\nXm8sDbC/c2/YjRF99KZ3JdnqGL+SMPUp04IRSJkKp1gspWoyGC5ZmvKEHIh1pJ27\nH/pORIvH99NPLcl/EF+dqGlhyNgXTfXNWcZ4OICiPz+YO5yZBFQZR8ElFL/zh64Z\njrhrEeO4U82TZ110CQ+Dd735igTgWoUMKUwnS2M/0vdDROh/6rx12hTTCkabkoKm\nT0X5U1PQcY3TItu6j2tfW/LGDD+QV2qXjsXArvkJ6pEc4W4aDj+qYA4M6jqXoSEt\nqJf0vX5e5C1LhHt+MbCl/TJ84yQFzVzGg6CbDg1+RSH+re3//xCKSxC9GbpY4lR0\nugA75OL5l6HwJfWu+BrawitCIbQSp893ZIUevVbVl1Su9/vint/VCfjTBYCiSeVk\nidrMZorrLGfOqUGIpP2H9I+G4RY4N4itPdfTNL39d4c3EAkcG6Be/K1ggoxXESZV\nWoXdXIV1YMtXzdSBcDrOd1N/EpPpm0MOy5mzT2nTdzzyJRLWQ1JfU4jlvO5e5LEC\n1Yq9YR5jeOrcuqtSSjnBvnUrbg4dPwrTAAclVEFp2nRSvCi9uVdO9YGVCNZkk+Mi\npdHZ00gP9tiZu0AU+eklBvFTPy9xpEeSMGW8QxkFz5wleiC++WZUGDLZHBmRkwwQ\nIUnk4feNEJCA6cUJJyxtIhJ46vyj4xmW9hOgQZ4gVnZADTPrsGkJTTBBDzmKnq+v\npnmoVZgNvtzAQt+Ica4m0REFYDMe3GVB5FxptYzLDw0iiY00SMwamxYgqdotj3q4\nKGx+fxBaq4Tdje91CyU5FmECKTGdF8Vmw52hSK7F1llOiMO0dCkRUJcxZUMFQQVO\n4XMFBzmIH0Jfnc215o0aShrwvSzhqYU+lVuEW19ASl0EktPIjcHjfLCSaob0/Snb\nlX5BpzUssuRSxFWKDZREUI5PJ4QIre0FVzvSBPlsI+a+yhwOH5RAd3B2nXIfl0/S\ngC7zq49BaMu8X4hqWr0iQvQcT4q3HQmFLhXJzGfezAvEeOufLtj9JOeuvDR6H9TZ\nuQrk/388p4IPoEZuPOg5kozjd58ysx9V9IXhNWcbVmRXgzeIA+sMrR3+a4CCyKTB\nYcGvC1L6qws6M1c/Qm0/wW+tb8QMavvI7UsrGM7FiP/TwX5u/Z+1IhXwrUgLWTQ5\nbiaFOkHjqrjjptLwgshphuJdpIb5LvDcaaTkkkOfjjKWW+/mwxxo7LsbopaCLHTR\n4Zmzrg683hhu7VBYYdn2JZ2MXOaOqB7YGSSHfLNgbk2YLsu660VDnZxrso96C5fw\nQlxE9W2Rayn+Oiwwcivqak2BziKR15t6UKsvnmDSxS0gwT98kRetscXiTEiD8dBL\nbbNtze8pO+O8VRX8bWvU6fkKhYiImc++bkn9hU+5ft/WC9Q4isMRV1w5JmUBVkn3\n3Yl9Z9r4c23iDzlPS2r//QBMEUy54I0BXoaiTY06Z5ZL0DRYBBoIOQBXcYQ72jqZ\n4Zoamu+m1J3EelgPHV9qc2HJcd9+LkGeoBusm9nDNfoql78kcYbR4DKM5t9e1Qc9\ndpdH/ggKetY+oWDxJeNMjX3pgGjGScprRufM2eGsfTMMMGaZw2/VcKuphHeYtcV5\nzN8=\n-----END ENCRYPTED PRIVATE KEY-----\n"
  }
});
// Get the service account client, used to create and manage app user accounts
var boxServiceAccountClient = boxSDK.getAppAuthClient(
  "enterprise",
  process.env.BOX_APP_ENTERPRISE_ID
);

/* // Initialize the SDK with the Box configuration file and create a client that uses the Service Account.
import { readdirSync } from "fs";

const files: string[] = readdirSync("../../../box_config_service_account.json");
// const configFile: string = JSON.parse(files[0]);
const configFile: any = process.env.BOX_CONFIG;

const session = box.getPreconfiguredInstance(configFile);
const boxServiceAccountClient = session.getAppAuthClient("enterprise");
 */
/* Use the users.get method to retrieve current user's information by passing 'me' as the ID.
Since this client uses the Service Account, this will return the Service Account's information. */

boxServiceAccountClient.users
  .get("me", null)
  .then((serviceAccountUser: any) => {
    // Log the Service Account's login value which should contain "AutomationUser".
    // For example, AutomationUser_375517_dxVhfxwzLL@boxdevedition.com
    // console.log("Service Account - ", serviceAccountUser);
  })
  .catch((err: any) => {
    // Log any errors for debugging
    console.log(err);
  });

export { boxServiceAccountClient };
