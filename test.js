var Vacancy = require('./models/vacancyModel');
var Admin = require('./models/adminModel');
var Partner = require('./models/partnerModel');
var Member = require('./models/memberModel');
var Event = require('./models/eventModel')

const funcs = require('./fn');
const mongoose = require('mongoose');
const config = require("./config");

describe('Testing user story 20 and 21, As a partner I can edit my profile (Board members and password) and update my pending events', () => {
    // documents to perform tests on    
    let event1;
    let par1;
    beforeAll(async (done) => {
        jest.setTimeout(30000);
        await mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true });
        par1 = new Partner({ username: 'testPartner', name: 'Testing', password: '12345', email: 'passwordTesterPartner@a.com' });
        await par1.save();
        event1 = new Event({
            description: "test event",
            name: "7ama2y concert",
            price: "100001",
            location: "CFC",
            city: "cairo",
            eventDate: "11/11/1991",
            remainingPlaces: "999",
            eventType: "concert",
            speakers: ["7ama2y", "a5oo"],
            topics: ["song", "intro"],
            partner: par1._id
        });
        await event1.save();
        done();
    });
    test(`Changing password. It should now be: "new_12345_password"`, async (done) => {
        jest.setTimeout(30000);
        const response = await funcs.updatePartnerProfileChangePassword(par1);
        expect(response).toEqual("new_12345_password");
        done();
    });
    test(`Adding 3 board members to the partner profile`, async (done) => {
        jest.setTimeout(30000);
        const response = await funcs.updatePartnerProfileAddBoardMembers(par1);
        expect(response).toEqual(3);
        done();
    });
    test(`Changing the remaining places of an event to be 10`, async (done) => {
        jest.setTimeout(30000);
        const response = await funcs.updateEventByChangingRemainingPlaces(event1, par1);
        expect(response).toEqual(10);
        done();
    });
    afterAll(async (done) => {
        //     await mongoose.connection.db.dropDatabase();
        jest.setTimeout(30000);
        mongoose.connection.close();
        done();
    });
});

describe('testing stories 7, 16, 12 and 22', () => {
    // documents to perform tests on   
    let mem1, adm1, par1, vac1, vac2, eve1;
    beforeAll(async (done) => {
        await mongoose.connect(config.getTestingDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true });

        mem1 = new Member({ username: 'TesterMember', password: '176351', fname: 'john', lname: 'doe', email: 'memtest@m.com', address: '23 IdiotTest St testCity', interests: ['lego', 'programming'] });
        adm1 = new Admin({ username: 'TesterAdmin', password: '1234568910', email: 'commentTesterAdmin@a.com' });
        par1 = new Partner({ username: 'TesterPartner', name: 'Tester', password: '12345678910', email: 'commentTesterPartner@a.com' });
        vac1 = new Vacancy({ name: 'vacancyMadeToTest', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity', partner: par1._id, admin: adm1._id });
        vac2 = new Vacancy({ name: 'vacancy2MadeToTest', status: 'Open', description: 'testingParty2', duration: '7 years', city: 'Paris', partner: par1._id });
        eve1 = new Event({ name: 'eventMadeToTest', eventStatus: 'Approved', description: 'testingParty', duration: '7 years', eventType: 'lego', partner: par1._id })
        par1.vacancies.push(vac1._id);
        await mem1.save();
        await adm1.save();
        await vac1.save();
        await vac2.save();
        await par1.save();
        await eve1.save();
        done();
    });
    afterAll((done) => {
        setTimeout(async () => {
            //await mongoose.connection.db.dropDatabase();
            await mongoose.connection.close();
        }, 500)
        done();
    });
    test('expecting 2 comments added to a vacancy', async (done) => {
        let noOfComments = await funcs.AddingTwoCommentsToVacancy(vac1, par1, adm1);
        expect(noOfComments).toBe(2);
        done();
    });
    test('expecting vacancy applicants to increment by 1', async (done) => {
        let noOfApplicants = await funcs.gettingApplicants(vac1, par1, mem1);
        expect(noOfApplicants).toBe(1);
        done();
    });
    test('expecting returned profile to have same id of created one', async (done) => {
        let isSame = await funcs.showingProfile(mem1, par1);
        expect(isSame).toBeTruthy();
        done();
    });
    test('expecting one vacancy to be recommended', async (done) => {
        let noOfVacancies = await funcs.recommendVacancies(mem1);
        expect(noOfVacancies).toBe(1);
        done();
    });
    test('expecting one event to be recommended', async (done) => {
        let noOfEvents = await funcs.recommendEvents(mem1);
        expect(noOfEvents).toBe(1);
        done();
    })

});
