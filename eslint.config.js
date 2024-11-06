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