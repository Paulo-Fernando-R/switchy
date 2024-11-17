"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = (password) => `<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Switchy</title>

        <style>
            body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
            h1 {
                font-size: 24px;
                font-family: sans-serif;
                color: #3d65c9;
            }
            p {
                font-size: 18px;
                font-family: sans-serif;
                color: #333333;
            }
            span {
                font-size: 28px;
                font-family: sans-serif;
                color: #3d65c9;
            }
        </style>
    </head>
    <body>
        <h1>Sua nova senha do Switchy</h1>
        <p>
            Esta é sua nova senha para ser usada temporariamente no app. <br />Recomendamos que vocé mude a senha assim
            que possível.
        </p>
        <span>${password}</span>

        <p>🫡🥰🫡</p>
    </body>
</html>`;
exports.emailTemplate = emailTemplate;
