import fs from 'fs';
import {Console} from "inspector";

export class ApiKey {
  resourceId: string;
  deployment: { [model: string]: string };
  apiKey: string;
  apiVersion: string;

  constructor(resourceId: string, deployment: {
    [model: string]: string
  }, apiKey: string, apiVersion: string = '2023-05-15') {
    this.resourceId = resourceId;
    this.deployment = deployment;
    this.apiKey = apiKey;
    this.apiVersion = apiVersion;
  }
}

export class UserToken {
  userId: string;
  token: string;

  constructor(userId: string, token: string) {
    this.userId = userId;
    this.token = token;
  }
}

export class Config {
  primaryApiKey: ApiKey;
  secondaryApiKey: ApiKey;
  userTokens: UserToken[];

  constructor(primaryApiKey: ApiKey, secondaryApiKey: ApiKey, userTokens: UserToken[]) {
    this.primaryApiKey = primaryApiKey;
    this.secondaryApiKey = secondaryApiKey;
    this.userTokens = userTokens;
  }
}

export function parseApiKey(apiKeyStr: string) {
  const split = apiKeyStr.split(':');
  const resourceId = split[0];
  const deploymentParts = split[1].split(',');
  const deployment: { [model: string]: string } = {};
  for (let i = 0; i < deploymentParts.length; i++) {
    let deploymentPair = deploymentParts[i].split('|');
    deployment[deploymentPair[0]] = deploymentPair[1];
  }
  const apiKey = split[2];
  const apiVersion = split[3];
  return new ApiKey(resourceId, deployment, apiKey, apiVersion);
}

function getConfig(): Config {
  console.log(`get config`);
  const primaryApiKeyEnv = process.env.PrimaryApiKey;
  const secondaryApiKeyEnv = process.env.SecondaryApiKey;
  const userTokensEnv = process.env.UserTokens;

  if (primaryApiKeyEnv && secondaryApiKeyEnv && userTokensEnv) {
    const primaryApiKey = parseApiKey(primaryApiKeyEnv);
    const secondaryApiKey = parseApiKey(secondaryApiKeyEnv);

    const tokens = userTokensEnv.split(',');
    const userTokens: UserToken[] = [];
    for (let token of tokens) {
      const split = token.split('|');
      userTokens.push(new UserToken(split[0], split[1]));
    }

    return new Config(primaryApiKey, secondaryApiKey, userTokens);
  } else {
    const configJson = fs.readFileSync('config.json', 'utf-8');
    const data = JSON.parse(configJson);

    const primaryApiKey = new ApiKey(data.primaryApiKey.resourceId, data.primaryApiKey.deployment, data.primaryApiKey.apiKey, data.primaryApiKey.apiVersion);
    const secondaryApiKey = new ApiKey(data.secondaryApiKey.resourceId, data.secondaryApiKey.deployment, data.secondaryApiKey.apiKey, data.secondaryApiKey.apiVersion);

    const userTokens = data.userTokens.map((token: any) => new UserToken(token.userId, token.token));

    return new Config(primaryApiKey, secondaryApiKey, userTokens);
  }
}

const config = getConfig();
export default config;