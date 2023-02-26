import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";

import mustache from 'mustache';

import { FindByIdParam, BaseModalInterface, Model } from "../../../core/Model";
import { EmailTemplate } from "../dto/template.dto";


const template = {subject: '', html: '', text: ''}; // template model가져다가 사용하기

class TemplateModel extends Model implements BaseModalInterface<EmailTemplate> {
    private tableName = "";

    constructor(dao: DynamoDBClient) {
        super(dao);
    }
    
    async findById(id: FindByIdParam) {
        const params:GetItemCommandInput = {
            TableName: this.tableName,
            Key: {
                primaryKey: {S: id},
            },
            AttributesToGet: ["subject" , "html", "text"],
        }
        try {
            const command = new GetItemCommand(params);
            const data = await this.dao.send(command);
            const { subject = "", html = "", text = "" } = unmarshall(data.Item);
            
            return {subject, html, text};
        } catch (error) {
            throw error;
        }
        
    }

    // TODO: util로 뺴기 model로직 아님
    generate(template: EmailTemplate, templateArgs: Record<string, unknown>) {
        const html = mustache.render(template?.html || "", templateArgs);
        const text = mustache.render(template?.text || "", templateArgs);
        const subject = mustache.render(template.subject || "", templateArgs);

        return {text, subject, html}
    }
}

export default TemplateModel;