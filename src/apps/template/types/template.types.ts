import SMTPTransport from "nodemailer/lib/smtp-transport";
import { EmailTemplate } from "../dto/template.dto";

interface SendMailBaseProps {
    to: string | string[];
}

export interface SendMailByTemplateProps extends SendMailBaseProps {
    template: EmailTemplate;
}

export interface SendMailByTemplateIdProps extends SendMailBaseProps {
    templateId: string;
}

export interface SendMailListBaseProps{
    to: string[];
    template?: EmailTemplate;
    templateId?: string;
    unit?: number;
    templateArgs?: Record<string, unknown>;
}

export type SendMailListProps =  SendMailListBaseProps & ( Omit<SendMailByTemplateProps, "to"> | Omit<SendMailByTemplateIdProps, "to">);


export interface EmailSenderInterface{
    sendMailByTemapalte: (P: SendMailByTemplateProps) => Promise<SMTPTransport.SentMessageInfo>;
    sendMailByTemplateId: (P: SendMailByTemplateIdProps) => Promise<SMTPTransport.SentMessageInfo>;
}