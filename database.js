
module.exports = function regNumbers(db){
    let allRegNo;
    let regNumbers;
    const storeRegNumbers = async (regNo) => {
        let storeRegs = await db.oneOrNone('SELECT reg_no FROM no_plates WHERE reg_no = $1', [regNo])
        let slice = regNo.slice(0, 2);
        let townID = await db.oneOrNone('SELECT id FROM towns where startswith=$1;', [slice]);
        if(storeRegs == null && townID !== null){
            await db.manyOrNone('insert into no_plates(reg_no, town_id) values ($1, $2);', [regNo, townID.id]);
        }
    }
    const checkRegNumbers = async (numberPlates) =>{
        let theRegNumber = await db.one('select count(*) from no_plates where reg_no = $1;', [numberPlates]);
        return theRegNumber;
    }
    const deleteRegNumbers = async () => {
        clearedRegNumbers = await db.none('delete from no_plates;');
        return clearedRegNumbers;
    }
    const filterTowns = async (startswith) => {
        if(startswith === "CY" || startswith === "CJ" || startswith === "CA" || startswith === "CF" ){
            let townID = await db.oneOrNone('SELECT id FROM towns WHERE startswith=$1;', [startswith]);
            allRegNo = await db.manyOrNone('select reg_no from no_plates where town_id=$1;', [townID.id]);
            regNumbers = '';
        }else if(startswith == "all"){
            allRegNo = await db.manyOrNone('SELECT reg_no FROM no_plates;');
            regNumbers = '';
        }
    }
    const getRegNumbers = async () => {
        regNumbers = await db.manyOrNone('select reg_no from no_plates;');
        return regNumbers;
    }
    const displayMyRegs = async () => {
        return allRegNo;
    }

    return{
        storeRegNumbers,
        getRegNumbers,
        checkRegNumbers,
        deleteRegNumbers,
        filterTowns,
        displayMyRegs
    }
}