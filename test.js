const Vacancy = require('./models/vacancyModel');
const Event = require('./models/eventModel');
const Admin = require('./models/adminModel');
const Partner = require('./models/partnerModel');
const Member = require('./models/memberModel');

const funcs= require('./function');
const mongoose = require('mongoose');
const config = require("./config");
describe('TESTING', () => {
    let mem1, adm1, par1, vac1, vac2, eve1;
    beforeAll(async (done) => {
        await mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true });
        mem1 = new Member({ username: 'TesterMember', password: '176351', fname: 'john', lname: 'doe', email: 'memtest@m.com', address: '23 IdiotTest St testCity' });
        adm1 = new Admin({ username: 'TesterAdmin', password: '1234568910', email: 'commentTesterAdmin@a.com' });
        par1 = new Partner({ username: 'TesterPartner', name: 'Tester', password: '12345678910', email: 'commentTesterPartner@a.com' });
        vac1 = new Vacancy({ name: 'vacancyMadeToTest', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity', partner: par1._id, admin: adm1._id });
        vac2 = new Vacancy({ name: 'vacancy2MadeToTest', status: 'Open', description: 'testingParty2', duration: '7 years', city: 'Paris', partner: par1._id });
        eve1 = new Event({ name: 'event2MadeToTest', status: 'submitted', description: 'testingParty3', price: 300, city: 'Paris', partner: par1._id });
        par1.vacancies.push(vac1._id);
        par1.events.push(eve1._id);
        await mem1.save();
        await adm1.save();
        await vac1.save();
        await vac2.save();
        await par1.save();
        await eve1.save();
        setTimeout(async () => {
            await mongoose.connection.db.dropDatabase();
            await mongoose.connection.close();
            done();
        }, 500)
        done();
    });
    afterAll((done) => {
       
        
    }); 
    test('expecting 2 comments added to an event', async (done) => {
        await  noOfComments = await funcs.AddingTwoCommentsToEvents(eve1, par1, adm1);
        expect(noOfComments).toBe(2);
        done();
    });
    test('expecting creating a vacancy', async (done) => {
        await number = await funcs.CreatingVacancy(par1, vac1) 
        expect(number).toBe(1);
        done();
    });
}





)