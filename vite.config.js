// import { rewriter } from "json-server"
import {defineConfig} from "vite"

export default defineConfig({
server: {
   proxy:{
      "/api" : {
         target: "http://localhost:3000",
         changeOrigin:true,
         rewrite:(path)=>path.replace(/^\/api/,"")
      },
   },
   base: ' https://maks4k.github.io/desertsViteVanillaJS/', 
   }
})//изменили запрос на url через прокси 