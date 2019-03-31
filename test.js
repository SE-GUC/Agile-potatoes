
const Vacancy = require('./models/vacancyModel');
const Event = require('./models/eventModel');
const Admin = require('./models/adminModel');
const Partner = require('./models/partnerModel');
const Member = require('./models/memberModel');

const funcs = require('./fn');
const mongoose = require('mongoose');
const config = require("./config");

describe('testing stories 7, 16, 12 and 22', () => {
    // documents to perform tests on   
    let mem1, adm1, par1, vac1, vac2, eve1;
    beforeAll(async (done) => {
        await mongoose.connect(config.getTestingDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true });
        
        mem1 = new Member({ username: 'TesterMember', password: '176351', fname: 'john', lname: 'doe', email: 'memtest@m.com', address: '23 IdiotTest St testCity', interests:['lego', 'programming'] });
        adm1 = new Admin({ username: 'TesterAdmin', password: '1234568910', email: 'commentTesterAdmin@a.com' });
        par1 = new Partner({ username: 'TesterPartner', name: 'Tester', password: '12345678910', email: 'commentTesterPartner@a.com' });
        vac1 = new Vacancy({ name: 'vacancyMadeToTest', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity',partner: par1._id, admin: adm1._id });
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
            await mongoose.connection.db.dropDatabase();
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
    
})