import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default[
    js.configs.recommended,
    prettier,
    {
        files:["src/**/*.js"],
        plugins:{
            prettier:prettier.rules
        },
        rules:{
            "no-unused-vars": "warn",//правило не использовать переменные var
        },
    },
]
module.exports = {
    env: {
        browser: true,
        node: false,
    },
    // другие настройки
};//совет из chatGpt что бы не подчеркивала fetch запросы Убедитесь, что ваш ESLint настроен на использование браузерной среды. В вашем файле `.eslintrc.js` добавьте: