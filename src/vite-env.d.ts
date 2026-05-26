/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_IMP_CODE: string;
  readonly VITE_PG_PROVIDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  IMP?: {
    init: (code: string) => void;
    request_pay: (
      params: {
        pg: string;
        pay_method: string;
        merchant_uid: string;
        name: string;
        amount: number;
        buyer_email: string;
        buyer_name: string;
        buyer_tel: string;
      },
      callback: (response: {
        success: boolean;
        imp_uid?: string;
        merchant_uid?: string;
        error_code?: string;
        error_msg?: string;
      }) => void
    ) => void;
  };
}
