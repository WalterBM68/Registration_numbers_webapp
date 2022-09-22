module.exports = function theRegNumbers(db){
    const storeRegNumbers = async (regNo) => {
        let storeRegs = await db.oneOrNone('SELECT reg_no FROM no_plates WHERE reg_no=$1', [regNo])
        let slice = regNo.slice(0, 2);
        if(storeRegs == null){
            let townID = await db.oneOrNone('select id from towns where startswith=$1', [slice]);
            await db.manyOrNone('insert into no_plates(reg_no, town_id) values ($1, $2);', [regNo, townID.town_id]);
            console.log('town ' + townID.town_id);
        }
    }
    const getRegNumbers = async () => {
        const allRegNo = await db.many('select * from no_plates;');
    }
    const deleteRegNumbers = async () => {
        const clearedRegNumbers = await db.none('delete from no_plates;');
        return clearedRegNumbers;
    }
    const filterTowns = async () => {
        // if(){}
    }
    return{
        storeRegNumbers,
        getRegNumbers,
        deleteRegNumbers,
        filterTowns
    }
}