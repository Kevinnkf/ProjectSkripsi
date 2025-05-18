import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import pool from '../config/db.js'; 
import db from '../models/index.js';
import { Op } from 'sequelize';

const faq = db.faq;

export async function addFAQ(req, res){
    try {
        const {question, answer} = req.body;
    
        const newFAQ = await faq.create({
            question: question,
            answer: answer
        })
    
        res.status(201).json({
          message: 'Added successfully',
          admin: newFAQ,
        });
    } catch (error) {
        console.log("Error occured: ", error)
        // res.status(500).json({
        //     error: "Failed to add",
        //     detail: error.message
        // })
    }
}

export async function getFAQ(req, res){
    try {
        const newFAQ = await faq.findAll()
        return res.status(200).json(newFAQ);
    
    } catch (error) {
        console.log("Error occured: ", error)
        return res.status(500).json({
          message: 'Error occured: ',
          detail: error.message,
        });
    }
}