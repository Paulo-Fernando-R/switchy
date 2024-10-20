export default function fieldsNotEmpty(fields: object){
    return Object.values(fields).every(
        value => value !== ""
      );
}