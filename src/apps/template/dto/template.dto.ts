export interface EmailTemplateBase {
    type?: string;
    subject: string;
}
export interface EmailTemplateWithHTML extends EmailTemplateBase {
    html: string;
    text?: string;
}

export interface EmailTemplateWithText extends EmailTemplateBase {
    html?: string;
    text: string;
}

export type EmailTemplate = EmailTemplateWithHTML | EmailTemplateWithText;