const express = require('express');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

module.exports = Routes = (regNumbers, regNumberTable) => {
    //Home route
    const homeRoute = async (req, res) => {
        const registrations = await regNumberTable.displayMyRegs();
        res.render('index',{
            registrations 
        });
    }
    //displaying reg numbers & filter
    const displayRegNumbers = async (req, res) => {
        const name = req.body.regNumeber;
        const town = req.body.town;
        let capitalizeLetters = name.toUpperCase();
        let formatRegNumber1 = /^[CY|CJ|CA|CF]{2}\s[0-9]{3}\-[0-9]{3}$/;
        let formatRegNumber2 = /^[CY|CJ|CA|CF]{2}\s[0-9]{6}$/;
        let formatRegNumber3 = /^[CY|CJ|CA|CF]{2}\s[0-9]{4}$/;
        let formatRegNumber4 = /^[CY|CJ|CA|CF]{2}\s[0-9]{3}\s[0-9]{3}$/;
        if(formatRegNumber1.test(capitalizeLetters) == true || formatRegNumber2.test(capitalizeLetters) == true ||
        formatRegNumber3.test(capitalizeLetters) == true || formatRegNumber4.test(capitalizeLetters) == true){
            await regNumberTable.storeRegNumbers(name);
        }else if(formatRegNumber1.test(capitalizeLetters) !== true || formatRegNumber2.test(capitalizeLetters) !== true ||
        formatRegNumber3.test(capitalizeLetters) !== true || formatRegNumber4.test(capitalizeLetters) !== true){
            req.flash('info', 'Please enter a valid registration number');
        }
        await regNumberTable.getRegNumbers()
        await regNumberTable.filterTowns(town)
        res.redirect('/');
    }
    //clearing data
    const clearAllRegNumbers = async (req, res) => {
        await regNumberTable.deleteRegNumbers();
        await regNumberTable.getRegNumbers()
        req.flash('info', 'Registration numbers have been deleted');
        res.redirect('/');
    }
    return{
        homeRoute,
        displayRegNumbers,
        clearAllRegNumbers,
    }
}