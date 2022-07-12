let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(ContactList);

            res.render('myself/list', {
                title: 'Contacts',
                ContactList: contactList,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('myself/contact', {
        title: 'Add Contact',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "address": req.body.address,
        "description": req.body.description,
        "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the Contact list
            res.redirect('/contact-list');
            //res.redirect('/');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('myself/edit', {
                title: 'Edit Contact',
                Contact: contactToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = Contact({
        "_id": id,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "address": req.body.address,
        "description": req.body.description,
        "email": req.body.email
    });

    Contact.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the Contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the Contact list
            res.redirect('/contact-list');
        }
    });
}