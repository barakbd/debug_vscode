'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const box = require('box-node-sdk');
const fs = require("fs");
let configFile = fs.readdirSync("box_config_service_account.json");
configFile = JSON.parse(configFile[0]);
let session = box.getPreconfiguredInstance(configFile);
const boxServiceAccountClient = session.getAppAuthClient('enterprise');
exports.boxServiceAccountClient = boxServiceAccountClient;
boxServiceAccountClient.users.get('me', null)
    .then((serviceAccountUser) => {
    console.log("Service Account - ", serviceAccountUser);
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94X3NlcnZpY2VfYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvY29uZmlnL2JveF9zZXJ2aWNlX2FjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBRSxjQUFjLENBQUMsQ0FBQztBQUNyQyx5QkFBeUI7QUFTekIsSUFBSSxVQUFVLEdBQWMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBQzdFLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBR3ZDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2RCxNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQWdCOUQsMERBQXVCO0FBWC9CLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztLQUN4QyxJQUFJLENBQUMsQ0FBQyxrQkFBdUIsRUFBRSxFQUFFO0lBRzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUN6RCxDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUVoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDIn0=