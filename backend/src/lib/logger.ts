import winston from "winston";

// Configuração centralizada do logger
const createLogger = () => {
  const level = process.env.LOG_LEVEL || "info";
  const environment = process.env.NODE_ENV || "development";

  // Formato para desenvolvimento (mais legível)
  const developmentFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
      return `${timestamp} [${level}]: ${message} ${metaStr}`;
    })
  );

  // Formato para produção (JSON estruturado)
  const productionFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  );

  const transports: winston.transport[] = [
    new winston.transports.Console()
  ];

  // Em produção, adiciona arquivo de log
  if (environment === "production") {
    transports.push(
      new winston.transports.File({ 
        filename: "logs/error.log", 
        level: "error" 
      }),
      new winston.transports.File({ 
        filename: "logs/combined.log" 
      })
    );
  }

  return winston.createLogger({
    level,
    format: environment === "production" ? productionFormat : developmentFormat,
    transports,
    // Não sair do processo em caso de erro
    exitOnError: false,
  });
};

// Instância singleton do logger
export const logger = createLogger();

// Função para criar loggers com contexto específico
export const createContextLogger = (context: string) => {
  return logger.child({ context });
};

// Tipos para melhor experiência de desenvolvimento
export type Logger = typeof logger;