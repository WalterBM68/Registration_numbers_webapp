
module.exports = Routes = (regNumbers, regNumberTable) => {
    //Home route
    const homeRoute = async (req, res) => {
        const theRegNumbers = regNumbers.printRegNumbers();
        res.render('index',{
            theRegNumbers
        });
    } 
    //displaying reg numbers
    const displayRegNumbers = async (req, res) => {
        const name = req.body.regNumeber;
        await regNumberTable.storeRegNumbers(name);
        res.redirect('/');
    } 
    //filtering towns
    const filteredByTowns = async (req, res) => {
        const town = req.params.town;
    }
    //clearing data
    const clearAllRegNumbers = async (req, res) => {
        await regNumberTable.deleteRegNumbers();
        res.redirect('/');
    }
    return{
        homeRoute,
        displayRegNumbers,
        filteredByTowns,
        clearAllRegNumbers
    } 
}