/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_RECAPTCHA_KEY: string;
    VITE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}