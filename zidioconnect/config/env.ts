interface EnvConfig {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    from: string;
  };
  websocket: {
    url: string;
  };
  api: {
    baseUrl: string;
  };
}

const envConfig: EnvConfig = {
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@zidioconnect.com',
  },
  websocket: {
    url: process.env.WS_URL || 'ws://localhost:8080',
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  },
};

export default envConfig; 