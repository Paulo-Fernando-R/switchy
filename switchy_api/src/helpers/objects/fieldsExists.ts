export default function fieldsExists(fields: any, rules: Array<string>){
    return rules.every(rule =>
        fields.hasOwnProperty(rule)
    );
}