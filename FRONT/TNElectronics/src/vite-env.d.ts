/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_RECAPTCHA_KEY: string;
    VITE_PRUEBA: string;
    VITE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}