module.exports = Routes = (regNumbers, regNumberTable) => {
    //Home route
    const homeRoute = async (req, res) => {
        res.render('index',{
         dispregs: await regNumberTable.displayMyRegs()
        });
    }
    //displaying reg numbers & filter
    const displayRegNumbers = async (req, res) => {
        const name = req.body.regNumeber;
        const town = req.body.town;
        await regNumberTable.storeRegNumbers(name);
        await regNumberTable.getRegNumbers()
        await regNumberTable.filterTowns(town)
        res.redirect('/');
    }
    //clearing data
    const clearAllRegNumbers = async (req, res) => {
        await regNumberTable.deleteRegNumbers();
        await regNumberTable.getRegNumbers()
        res.redirect('/');
    }
    return{
        homeRoute,
        displayRegNumbers,
        clearAllRegNumbers,
    }
}