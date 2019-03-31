
var Vacancy = require('./models/vacancyModel');
var Admin = require('./models/adminModel');
var Partner = require('./models/partnerModel');
var Member = require('./models/memberModel');

const funcs = require('./fn');
const mongoose = require('mongoose');
const config = require("./config");

describe('testing stories 7,16 and 22', () => {
    // documents to perform tests on   
    let mem1; 
    let adm1;
    let par1;
    let vac1;
    beforeAll(async (done) => {
        await mongoose.connect(config.getTestingDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true });
        
        mem1 = new Member({ username: 'TesterMember', password: '176351', fname: 'john', lname: 'doe', email: 'memtest@m.com', address: '23 IdiotTest St testCity' });
        await mem1.save();
        adm1 = new Admin({ username: 'TesterAdmin', password: '1234568910', email: 'commentTesterAdmin@a.com' });
        await adm1.save();
        par1 = new Partner({ username: 'TesterPartner', name: 'Tester', password: '12345678910', email: 'commentTesterPartner@a.com' });
        vac1 = new Vacancy({ name: 'vacancyMadeToTest', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity',partner: par1._id, admin: adm1._id });
        par1.vacancies.push(vac1._id);
        await vac1.save();
        await par1.save();
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
    
})