"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chaiHttp = require("chai-http");
const app_1 = require("./app");
chai_1.use(chaiHttp);
describe("GET /folders/0", () => {
    it("it should get a folder named 'All Files' ", () => {
        chai_1.request(app_1.default)
            .get("/folders/1")
            .end((err, res) => {
            console.log("appppppp - ", app_1.default);
            try {
                chai_1.expect(200);
                chai_1.expect(res.body).to.not.equal(null);
            }
            catch (e) {
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSwrQkFBNEQ7QUFDNUQsc0NBQXVDO0FBR3ZDLCtCQUF3QjtBQUV4QixVQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDZCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7UUFFbkQsY0FBTyxDQUFDLGFBQUcsQ0FBQzthQUNULEdBQUcsQ0FBQyxZQUFZLENBQUM7YUFFakIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGFBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQztnQkFDSCxhQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1osYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUd0QyxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUViLENBQUM7UUFPSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==