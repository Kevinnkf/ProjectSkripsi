import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import pool from '../config/db.js'; 
import db from '../models/index.js';
import { Op } from 'sequelize';
import axios from 'axios';      

const faq = db.faq;
const chat = db.chat;

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

export async function editFAQ(req, res){
    try {
        const { id } = req.params;  
        const {question, answer} = req.body;

        // Find the FAQ 
        const existingFaq = await faq.findByPk(id);

        if (!existingFaq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        existingFaq.question = question;
        existingFaq.answer = answer;

        await existingFaq.save();
    
        res.status(201).json({
          message: 'Updated successfully',
          admin: existingFaq,
        });
    } catch (error) {
        console.log("Error occured: ", error)
        res.status(500).json({
            error: "Failed to update",
            detail: error.message
        })
    }
}

export async function deleteFAQ(req, res){
    try {
        const { id } = req.params;  

        // Find the FAQ 
        const existingFaq = await faq.findByPk(id);

        if (!existingFaq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        await existingFaq.destroy();
    
        res.status(201).json({  
          message: 'Deleted successfully',
          admin: existingFaq,
        });
    } catch (error) {
        console.log("Error occured: ", error)
        res.status(500).json({
            error: "Failed to Delete",
            detail: error.message
        })
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

export async function classifyFAQ(req, res) {
    try {
        const chats = await chat.findAll();

        const questions = chats.map(c => c.questions);

        const response = await axios.post(`${process.env.RAG_SERVICE_URL}/predict`, {
            questions,
        });

        const classified = chats.map((c, index) => ({
            id: c.id,
            question: c.questions,
            predictedCategory: response.data.predictions[index]
        }));

        res.json(classified);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to classify' });
    }
}