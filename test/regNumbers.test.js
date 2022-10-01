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
            await regNumbers.getRegNumbers();
            let results = await regNumbers.displayMyRegs();
            
            assert.equal('CA 456-890', results[0].reg_no);
            assert.equal('CY 506-018', results[1].reg_no);
            assert.equal('CJ 611-975', results[2].reg_no);
            assert.equal('CF 178-804', results[3].reg_no);
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
