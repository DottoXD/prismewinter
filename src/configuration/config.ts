export type Configuration = {
  botToken: string;
  mongoUrl: string;
  clientId: string;
  botStatus: string;
  updateInteractions: boolean;
  mainGuild: string;
  logsChannel: string;
  mainColorCode: string;
  mainChillColorCode: string;
  botName: string;
  apiUrl: string;
  apiKey: string;
  lavalinkHost: string;
  lavalinkPort: number;
  lavalinkPassword: string;
};

export const config: Configuration = {
  botToken: '',
  mongoUrl: '',
  clientId: '',
  botStatus: 'Prisme Winter, a  new Typescript bot.',
  updateInteractions: true,
  mainGuild: '',
  logsChannel: '',
  mainColorCode: '#93E7FB',
  mainChillColorCode: '#F5EDD5',
  botName: '☃️ Prisme Winter',
  apiUrl: '',
  apiKey: '',
  lavalinkHost: "",
  lavalinkPort: 3000,
  lavalinkPassword: ""
};
