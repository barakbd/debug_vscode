// Require the Box SDK
const BoxSDK = require("box-node-sdk");
// import box from "box-node-sdk"; - throws ts error - implicit any
console.log(
  "\n",
  (process.env.BOX_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
  "\n"
);
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
    privateKey: (process.env.BOX_PRIVATE_KEY as string).replace(/\\n/g, "\n")
    // privateKey:
    // "-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIn6Ma7h/36LwCAggA\nMBQGCCqGSIb3DQMHBAhGSuDQFv6xvQSCBMglbdsqd+2aXXz92ylXpMQtXU/hGOQG\nu62oo2so3DY4wR62h5Lr38ZELaGkpKZSBMfo/1j2UcEXods0gGPsNyqRLFTKIfIv\nKYUSznJ88W1TA6fVVl8jIZeOJah8RsE4ui9WoCoh68PTmi4WCgpEQvSIpLylTzZ7\n9+ZDdYtje3suz9zkOwaDI6lPHD+WL+hxZwlNpnVPPQNE4C//JAu7uySuFQArV0V5\n78JYbgk9FTQECaLV0y2s8HF9WFu0yLtI5inc/4EfY9GIhdvwwl+iPMyl6WNPf6h5\n56FnzM/DqFoxDiRUSRAp3eI5jEdDp9NS7SVh6Zou1J4/8C+JoteRYOw+kYd+HNJQ\nDUviAGJqnRM9UJJAEVFsO3/tqgX71uIcZEDHBBwxVKDwhWkimRnms41NR0PzPwey\n6GAfckW/GoRtNKOucx1W5Ikn6Psei02P0VJ/+RLqorCmX0VZaKbMD1XYeDryKzb7\nKTSUDiGnfc8VarT4wIFwQIMde5CsQP9e37KsNPYMA62pIAm9WWDmaZ9vZ+nK35sn\npozf/lW5UHXxdAhPBPnETrDHEt+fktB7H/YLp+gwz9VOdbn4l1ONHcrBn3WR9dv3\nyOPvfySW9d/hvRqFpjM9Z/dKTr6m8bTLtabrXvpv1+V36LGHWlg5GXiqeNNW20ww\nutwMwmUcBJpeImDkRbcw3QCYrx/caQTZ0FaUwRVmeUGQxyAQPwnrV9LLBW7ORH+c\n2xSiQQUFEDJqhVewPpuax5kSqu++ZtrwxqF7+upRZUWPnr/0NNR27xtXhQDHAvzy\n6zxw0+EoqtIeNX21LiXW/QBPk7YjF2Tp1VkZy5oBhDmA0GflBlBcU8NwU9Oy9mNi\n/1RD+EQVitG3Xa5IbY0lK5tkgwGMeiyqND894RPtsmnIDHQjT5N+7JT6l6x/Fqsw\nqLvU6cQ067Fq7QUzVcXyefPUVjgNsL8hNVOdEc7qdZbgs+/s80lJJ3qXVR3duSLI\nBMPZNAu41INQbHZQtlAw+wr33Mqp5QgsYfwwJZ3GQpJYbyENf3xoLk/7tsd/Zej/\n0YyegBw7ECqYuzSVcQfn6SHilHPq1FKlu//q+4dWvHdPvxK8llUVGcG7CyUbhgsn\nJkBsojPWkjs52aRRDmyRr0C1ybtBxGpqTJQ8AvkEZAW2YnUG/4EZ0kH+7I/ZHIdG\n9Tu+vssxOsCEtMsEWzirSSboP3024JvLm+LdwTuwnSkYwacAoae6+mY2NHfv4fYW\nMYZqZSOeDrjMVDwxrMZkY0EnCDNcsfe4ChkohkKs6cAmV9nrQBD5am7CYhVAaKnR\nMfqQmRGxDFfhDlve5h2SB1z98/gnb02xLzvfZcmTTGBZMRbel1MvXvmbe0gKjFrT\n4TEqycaOPKzA9GsGdq2wiQ0Bsls3CwCccjN/V7pLa56udPuyD5hHJEjRCT4704Iy\nt8NefHu6Ks9rge3b8fBDZLkfQv1V1EfYdpYcLd2mIbZvHif2zrU6yenBi7DQvAry\neK8WgTa9ndTCkMiAzduViIosKRUUKtML80SsBtN+f+UxXqdQ1aL/YPuXRiAHh9O+\n6Je9dJ/z5FtQjDgHX/VH1JYhwD0DeuIfkAVb4zjEPO6in1lx8W3/yQRV5Hetz0Oc\nmCE=\n-----END ENCRYPTED PRIVATE KEY-----\n"
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
