const assert = require('assert');
const pgPromise = require('pg-promise');
const pgp = pgPromise();
const RegNumbers = require('../database');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/test_reg_numbers';
const config = {
  connectionString: DATABASE_URL
}
if (process.env.NODE_ENV == 'production') {
	config.ssl = {
		rejectUnauthorized : false
	}
}
const db = pgp(config);

describe('Testing Reg numbers database', function(){

    it('It should insert reg numbers into the reg table', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CA 456-890', 3);
            await regNumbers.storeRegNumbers('CY 506-018', 1);
            await regNumbers.storeRegNumbers('CJ 611-975', 2);
            await regNumbers.storeRegNumbers('CF 178-804', 4);
            await regNumbers.displayMyRegs();
            let results = await regNumbers.getRegNumbers();
            
            assert.equal('CA 456-890', results[0].reg_no);
            assert.equal('CY 506-018', results[1].reg_no);
            assert.equal('CJ 611-975', results[2].reg_no);
            assert.equal('CF 178-804', results[3].reg_no);
            await db.none('delete from no_plates;');
        }catch(err){
            console.log(err);
        }
    });
    it("It should select all regNumbers that were inserted", async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CY 189-708', 1);
            await regNumbers.storeRegNumbers('CJ 220-400', 2);
            await regNumbers.displayMyRegs();
            let results = await regNumbers.getRegNumbers();

            assert.equal('CY 189-708', results[0].reg_no);
            assert.equal('CJ 220-400', results[1].reg_no);
            await db.none('delete from no_plates;');
        }catch(error){
            console.log(error);
        }
    });
    it('It should only the Cape Town regNumbers', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CA 905-170', 3);
            await regNumbers.storeRegNumbers('CJ 220-400', 2);
            await regNumbers.storeRegNumbers('CA 753-486', 3);
            await regNumbers.storeRegNumbers('CF 321-793', 4);
            await regNumbers.storeRegNumbers('CY 183-774', 1);
            await regNumbers.storeRegNumbers('CA 431-896', 3);
            await regNumbers.filterTowns('CA');
            let results = await regNumbers.displayMyRegs();

            assert.equal('CA 905-170', results[0].reg_no);
            assert.equal('CA 753-486', results[1].reg_no);
            assert.equal('CA 431-896', results[2].reg_no);
            await db.none('delete from no_plates;');
        }catch(error){
            console.log(error);
        }
    });
    it('It should return only Bellville regNumbers', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CY 001-155', 1);
            await regNumbers.storeRegNumbers('CA 905-170', 3);
            await regNumbers.storeRegNumbers('CY 183-774', 1);
            await regNumbers.storeRegNumbers('CJ 220-400', 2);
            await regNumbers.storeRegNumbers('CY 503-686', 1);
            await regNumbers.storeRegNumbers('CF 321-793', 4);
            await regNumbers.storeRegNumbers('CY 731-895', 1);
            await regNumbers.filterTowns('CY');
            let results = await regNumbers.displayMyRegs();

            assert.equal('CY 001-155', results[0].reg_no);
            assert.equal('CY 183-774', results[1].reg_no);
            assert.equal('CY 503-686', results[2].reg_no);
            assert.equal('CY 731-895', results[3].reg_no);
            await db.none('delete from no_plates;');
        }catch(err){
            console.log(err);
        }
    });
    it('It should return only Paarl regNumbers', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CF 321-793', 4);
            await regNumbers.storeRegNumbers('CA 905-170', 3);
            await regNumbers.storeRegNumbers('CJ 220-400', 2);
            await regNumbers.storeRegNumbers('CA 753-486', 3);
            await regNumbers.storeRegNumbers('CJ 102-046', 2);
            await regNumbers.storeRegNumbers('CY 183-774', 1);
            await regNumbers.filterTowns('CJ');
            let results = await regNumbers.displayMyRegs();

            assert.equal('CJ 220-400', results[0].reg_no);
            assert.equal('CJ 102-046', results[1].reg_no);
            await db.none('delete from no_plates;');
        }catch(err){
            console.log(err);
        }
    });
    it('It should return only Kuilsriver regNumbers', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CA 905-170', 3);
            await regNumbers.storeRegNumbers('CJ 220-400', 2);
            await regNumbers.storeRegNumbers('CA 753-486', 3);
            await regNumbers.storeRegNumbers('CF 321-793', 4);
            await regNumbers.storeRegNumbers('CY 183-774', 1);
            await regNumbers.storeRegNumbers('CA 431-896', 3);
            await regNumbers.filterTowns('CF');
            let results = await regNumbers.displayMyRegs();

            assert.equal('CF 321-793', results[0].reg_no);
            await db.none('delete from no_plates;');
        }catch(err){
            console.log(err);
        }
    });
    it('It should return all the regNumbers for all the towns', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CJ 220-400', 2);
            await regNumbers.storeRegNumbers('CA 905-170', 3);
            await regNumbers.storeRegNumbers('CY 183-774', 1);
            await regNumbers.storeRegNumbers('CA 753-486', 3);
            await regNumbers.storeRegNumbers('CF 321-793', 4);
            await regNumbers.filterTowns('all');
            let results = await regNumbers.displayMyRegs();

            assert.equal('CJ 220-400', results[0].reg_no);
            assert.equal('CA 905-170', results[1].reg_no);
            assert.equal('CY 183-774', results[2].reg_no);
            assert.equal('CA 753-486', results[3].reg_no);
            assert.equal('CF 321-793', results[4].reg_no);
            await db.none('delete from no_plates;');
        }catch(err){
            console.log(err);
        }
    });
    it('It should not return anything since Paarl regNumber is not inserted', async function(){
        try{
            let regNumbers = RegNumbers(db);
            await regNumbers.storeRegNumbers('CF 270-410', 2);
            await regNumbers.storeRegNumbers('CA 905-170', 3);
            await regNumbers.storeRegNumbers('CY 183-774', 1);
            await regNumbers.storeRegNumbers('CA 753-486', 3);
            await regNumbers.storeRegNumbers('CF 321-793', 4);
            await regNumbers.filterTowns('CJ');
            let results = await regNumbers.displayMyRegs();

            assert.equal(null, results.reg_no);
            await db.none('delete from no_plates;');
        }catch(err){
            console.log(err);
        }
    });
    it('It should delete all the inserted number plates', async function(){
        try {
            let regNumbers = RegNumbers(db);
            await regNumbers.getRegNumbers();
            assert.equal(null, await regNumbers.deleteRegNumbers());
        } catch (error) {
           console.log(error); 
        }
    });
    after(function(){
        db.$pool.end
    });
});
