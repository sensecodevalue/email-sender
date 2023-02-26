import nodemailer from 'nodemailer';
import EmailSenderService from '../service/sender.service';
import Queue from 'bee-queue';
import { SendMailListBaseProps } from '../types/template.types';
import SenderController from '../controller/sender.controller';
import TemplateModel from '../model/template.model';
import dynamodbClient from '../../../database/dynamodbDAO';

const emailQueue = new Queue<SendMailListBaseProps>('EMAIL_TRANSPORTER', {removeOnSuccess:true, });
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SENDER_SERVICE,
    auth: { user: process.env.EMAIL_SENDER, pass: process.env.EMAIL_SENDER_TOKEN },
});

const templateModel = new TemplateModel(dynamodbClient);

const emailSenderService = new EmailSenderService(transporter, emailQueue, templateModel);
const senderController = new SenderController(emailSenderService);


export default {
    templateModel,
    emailSenderService,
    senderController,
}
