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

module.exports = Routes = (regNumberTable, db) => {
    //Home route
    const homeRoute = async (req, res) => {
        const town = req.body.town;
        const registrations = await regNumberTable.filterTowns(town) || await regNumberTable.getRegNumbers();
        console.log(registrations)
        res.render('index',{
            registrations 
        });
    }

    //displaying reg numbers & filter
    const displayRegNumbers = async (req, res) => {
        const regNumber = req.body.regNumeber;
        const town = req.body.town;
        let upperCase = regNumber.toUpperCase();
        let formatReg1 = /^[CY|CJ|CA|CF]{2}\s[0-9]{3}\-[0-9]{3}$/;
        let formatReg2 = /^[CY|CJ|CA|CF]{2}\s[0-9]{3}\s[0-9]{3}$/;
        let formatReg3 = /^[CY|CJ|CA|CF]{2}\s[0-9]{4}$/;
        let formatReg4 = /^[CY|CJ|CA|CF]{2}\s[0-9]{6}$/;
        let checkIfRegNoExists = await regNumberTable.checkRegNumbers(upperCase);

        if(checkIfRegNoExists.count == 1 && !town){
            req.flash('info', 'This registration number exist!');
        } 
        if((formatReg1.test(upperCase) == true || formatReg2.test(upperCase) == true || formatReg3.test(upperCase) == true || formatReg4.test(upperCase) == true) && !town){
            await regNumberTable.storeRegNumbers(upperCase); 
        }else if((formatReg1.test(upperCase) !== true || formatReg2.test(upperCase) !== true || formatReg3.test(upperCase) !== true || formatReg4.test(upperCase) !== true) && !town){
            req.flash('info', 'Please enter a valid registration number');
        }
        await regNumberTable.filterTowns(town);
        res.redirect('/');
    }

    //clearing data
    const clearAllRegNumbers = async (req, res) => {
        await regNumberTable.deleteRegNumbers();
        await regNumberTable.getRegNumbers();
        req.flash('info', 'Registration numbers have been deleted');
        res.redirect('/');
    }

    return{
        homeRoute,
        displayRegNumbers,
        clearAllRegNumbers,
    }
}
